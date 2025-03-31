import {HfInference} from '@huggingface/inference';

const HF_TOKEN = process.env.HUGGING_FACE_API_KEY; // Ensure this is properly set in your environment

export const inference = new HfInference(HF_TOKEN);
