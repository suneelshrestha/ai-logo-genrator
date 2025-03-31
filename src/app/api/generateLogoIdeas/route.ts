import {GoogleGenerativeAI} from '@google/generative-ai';
import {NextRequest, NextResponse} from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyDG6QVd7m7bkz0xHRn0UwYpWGg-b7YbpRY');
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

export async function GET(res: NextRequest) {
  //   const prompt = await res.text();

  try {
    const res = await model.generateContent(
      "Generate 4 logo ideas for a brand named 'HoodiesHub'. The brand specializes in high-quality hoodies with a vintage style. The logos should be described in around 4-5 words each, focusing on elements like retro vibes, comfort, and timeless fashion. The color palette should be dark, featuring black, deep brown, and muted gold, and the style should evoke a sense of casual, cozy, and classic wear"
    );
    const content = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      return NextResponse.json({message: 'Error generating the content'}, {status: 404});
    }
    const ideasArray = content.split('\n').map((line) => line.replace(/^\d+\.\s*/, '').trim());

    return NextResponse.json({data: ideasArray}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'External Server error '}, {status: 500});
  }
}
