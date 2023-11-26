import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Car from '@/models/car';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const {
    name,
    ticket,
    mainPicture,
    recomendedToBuy,
    notRecomendedToBuy,
    toJudge,
    basicInfo,
    recommendationFromMechanic,
    photoVideoReport,
    roadTest,
    interior,
    exterior,
  } = await req.json();

  try {
    await connectToDB();
    const item = new Car({
      name,
      ticket,
      mainPicture,
      recomendedToBuy,
      notRecomendedToBuy,
      toJudge,
      basicInfo,
      recommendationFromMechanic,
      photoVideoReport,
      roadTest,
      interior,
      exterior,
    });

    await item.save();

    return NextResponse.json(
      { message: 'Item Created Successfully', item },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
