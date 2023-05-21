// dependencies
import mongoose, { InferSchemaType, Model } from "mongoose";
import Utils from "../utils";
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
      require: true,
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

type User = Model<InferSchemaType<typeof userSchema>>;

// export
export default (mongoose.models.User ||
  mongoose.model("User", userSchema)) as User;
