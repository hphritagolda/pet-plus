// dependencies
import type { InferSchemaType, Model } from "mongoose";
import mongoose from "mongoose";

// schema
const petSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

type PetType = Model<InferSchemaType<typeof petSchema>>;

const Pet = (mongoose.models.Pet ||
  mongoose.model("Pet", petSchema)) as PetType;

// export
export default Pet;
