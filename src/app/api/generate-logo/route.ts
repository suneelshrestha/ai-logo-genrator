import {NextResponse} from 'next/server';
import {GoogleGenerativeAI} from '@google/generative-ai';
import mime from 'mime-types';

const apiKey = 'AIzaSyD6uhDAKu6tX2xo3JLArxP6dZX9-QeLtao';

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is missing in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash-exp-image-generation'});

export async function POST(req: Request) {
  try {
    const {prompt} = await req.json();
    if (!prompt) {
      return NextResponse.json({error: 'Prompt is required'}, {status: 400});
    }

    // Generate image using Gemini AI
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{text: "Generate a detailed image description for 'a man playing football' that can be used in an AI image generator."}],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    console.log('API Response:', JSON.stringify(result, null, 2));

    if (!result.response) {
      return NextResponse.json({error: 'No response from API'}, {status: 500});
    }

    // Extract image from response
    const candidates = result.response.candidates || [];
    for (const candidate of candidates) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          const mimeType = part.inlineData.mimeType;
          const fileExtension = mime.extension(mimeType) || 'png';
          const base64Image = part.inlineData.data;

          return NextResponse.json({
            message: 'Image generated successfully',
            image: `data:image/${fileExtension};base64,${base64Image}`,
          });
        }
      }
    }

    return NextResponse.json({error: 'No image generated'}, {status: 500});
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
