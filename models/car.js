import { Schema, model, models } from 'mongoose';

const CarSchema = new Schema({
  name: { type: String },
  ticket: { type: String },
  mainPicture: { type: String },
  recomendedToBuy: { type: Boolean },
  notRecomendedToBuy: { type: Boolean },
  toJudge: { type: Boolean },
  basicInfo: {},
  recommendationFromMechanic: {},
  photoVideoReport: {},
  roadTest: {},
  interior: {},
  exterior: {},
});

const Car = models.Car || model('Car', CarSchema);

export default Car;
