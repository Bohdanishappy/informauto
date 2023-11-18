import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Car from '@/models/car';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const item = await Car.findOne({ ticket: params.id });
    if (!item)
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    return NextResponse.json({ item: item }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const {
    name,
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
    // Find the existing prompt by ID
    const item = await Car.findOne({ ticket: params.id });
    if (!item) {
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    }
    // Update the Item with new data
    item.name = name;
    item.mainPicture = mainPicture;
    item.recomendedToBuy = recomendedToBuy;
    item.notRecomendedToBuy = notRecomendedToBuy;
    item.toJudge = toJudge;
    item.basicInfo = basicInfo;
    item.recommendationFromMechanic = recommendationFromMechanic;
    item.photoVideoReport = photoVideoReport;
    item.roadTest = roadTest;
    item.interior = interior;
    item.exterior = exterior;
    await item.save();
    return NextResponse.json(
      { message: 'Successfully updated the Item', item: item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    console.log('params.id', params.id);
    // Find the item by ID and remove it
    await Car.findOneAndDelete({ ticket: params.id });
    return NextResponse.json(
      { message: 'Item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
