import * as mongoose from "mongoose";
import { gender } from "../utils/constants.js";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    gender: {
      type: String,
      lowercase: true,
      enum: [gender.male, gender.female],
    },
    bio: { type: String, lowercase: true },
    postcode: { type: String, lowercase: true },
    state: { type: String, lowercase: true },
    lga: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    address: { type: String, lowercase: true },
    city: { type: String, lowercase: true },
    dateOfBirth: {
      type: String,
      lowercase: true,
    },
    age: { type: String, lowercase: true },
    phone: { type: String, lowercase: true },
    profileImage: {
      asset_id: {
        type: String,
        required: false,
      },
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      secure_url: {
        type: String,
        required: false,
      },
      thumbnail_url: {
        type: String,
        required: false,
      },
    },
    facebook: { type: String },
    tiwtter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },

  { timestamps: true }
);
export default ProfileSchema;
