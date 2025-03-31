import dbConnect from '@/db/db';
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({message: '✅ Database connected successfully!'}, {status: 200});
  } catch (error: any) {
    console.error('❌ Database connection failed:', error);
    return NextResponse.json({message: '❌ Database connection failed', error: error.message}, {status: 500});
  }
}
