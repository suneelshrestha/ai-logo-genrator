import {NextResponse} from 'next/server';
import {GoogleGenerativeAI} from '@google/generative-ai';

const apiKey = 'AIzaSyDG6QVd7m7bkz0xHRn0UwYpWGg-b7YbpRY';
if (!apiKey) throw new Error('GEMINI_API_KEY is missing');

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-pro-vision',
});

interface RequestBody {
  prompt: string;
}

interface SuccessResponse {
  message: string;
  imageData?: string; // Base64 encoded image
  imageUrl?: string; // Fallback URL
  mimeType?: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
  stack?: string;
}

export async function POST(req: Request): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const requestData = (await req.json()) as RequestBody;
    const {prompt} = requestData;

    if (!prompt?.trim()) {
      return NextResponse.json({message: 'Prompt is required'}, {status: 400});
    }

    // Generate content with explicit instructions
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate an image based on this prompt and return ONLY a direct image URL that will be accessible for download: ${prompt}`,
            },
          ],
        },
      ],
    });

    const responseText = await result.response.text();
    console.log('Raw API response:', responseText); // For debugging

    // Improved URL extraction
    const extractUrl = (text: string): string | null => {
      const patterns = [
        /!\[.*?\]\((.*?)\)/, // Markdown image
        /(https?:\/\/[^\s]+\.(jpg|jpeg|png|webp))/i, // Direct image URL
        /(https?:\/\/[^\s]+)/i, // Generic URL (fallback)
      ];

      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
          if (pattern.source === /!\[.*?\]\((.*?)\)/.source) {
            return match[1];
          }
          return match[0];
        }
      }
      return null;
    };

    const imageUrl = extractUrl(responseText);
    if (!imageUrl) {
      throw new Error('No valid image URL found in the response');
    }

    // Try to fetch and convert to base64
    try {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        console.warn(`Image fetch failed (${imageResponse.status}), returning URL instead`);
        return NextResponse.json({
          message: 'Image generated but could not be converted to base64',
          imageUrl: imageUrl,
        });
      }

      const arrayBuffer = await imageResponse.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = imageResponse.headers.get('content-type') || imageUrl.match(/\.(jpe?g|png|webp)/i)?.[0].replace('.', 'image/') || 'image/jpeg';

      return NextResponse.json({
        message: 'Image generated successfully',
        imageData: `data:${mimeType};base64,${base64Data}`,
        mimeType: mimeType,
      });
    } catch (fetchError) {
      console.warn('Image fetch error, returning URL instead:', fetchError);
      return NextResponse.json({
        message: 'Image generated but could not be converted to base64',
        imageUrl: imageUrl,
      });
    }
  } catch (error: unknown) {
    console.error('Error generating image:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        message: 'Error occurred during image generation',
        error: errorMessage,
        stack: errorStack,
      },
      {status: 500}
    );
  }
}
