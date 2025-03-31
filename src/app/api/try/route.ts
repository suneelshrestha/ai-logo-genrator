import {inference} from '@/lib/hf';

export async function POST() {
  try {
    const out = await inference.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: 'Astronaut riding a horse',
      parameters: {num_inference_steps: 5},
    });

    const buffer = Buffer.from(await out.arrayBuffer());
    console.log('img', buffer);
  } catch (error) {
    console.log('error');
  }
}
