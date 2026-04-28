import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    symbol: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      minlength: 10
    },

    hourChange: {
      type: Number,
      required: true,
      maxlength: 3
    }
  },
  {
    timestamps: true
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;