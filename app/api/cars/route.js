import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Car from '@/models/car';

export const GET = async (req) => {
  try {
    await connectToDB();
    const items = await Car.find({});
    return NextResponse.json({ cars: items }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
