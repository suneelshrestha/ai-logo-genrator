import {inference} from '@/lib/hf';
import User from '@/models/user.model';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  const {prompt, userEmail} = await req.json();
  if (!prompt) {
    return NextResponse.json({message: 'prompt is required'});
  }
  try {
    const out = await inference.textToImage({
      model: 'strangerzonehf/Flux-Midjourney-Mix2-LoRA',
      inputs: prompt,
      parameters: {
        num_inference_steps: 50, // Increase steps
        guidance_scale: 7.5, // More control over quality
        width: 720, // Higher resolution
        height: 720,
        scheduler: 'DPM++ 2M Karras', // High-quality scheduler
      },
      options: {use_cache: false},
    });

    if (out instanceof Blob) {
      const buffer = Buffer.from(await out.arrayBuffer());
      const base64Image = buffer.toString('base64');

      // Save the image to the database
      await User.findOneAndUpdate(
        {email: userEmail},
        {
          $push: {logos: {image: base64Image}},
        }
      );

      return NextResponse.json(
        {
          message: 'Image generated successfully',
          image: `data:image/png;base64,${base64Image}`,
        },
        {status: 200}
      );
    } else {
      console.error('Unexpected output:', out);
      return NextResponse.json({message: 'Unexpected output format'});
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({message: 'Error occurred during inference'});
  }
}
