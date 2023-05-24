// dependencies
import mongoose, { InferSchemaType, Model } from "mongoose";
import Utils from "../utils.server";
import "mongoose-type-email";

// schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      // @ts-ignore imported at top of file
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true,
    },
    accessLevel: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: false,
    },
    completedTour: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

// middleware ------------------------------------------------

// hash password
userSchema.pre("save", function (next) {
  // check if password is present and is modified
  if (this.password && this.isModified()) {
    // replace original password with new hashed password
    this.password = Utils.hashPassword(this.password);
  }
  // continue
  next();
});

type UserType = Model<InferSchemaType<typeof userSchema>>;

const User = (mongoose.models.User ||
  mongoose.model("User", userSchema)) as UserType;

// export
export default User;
