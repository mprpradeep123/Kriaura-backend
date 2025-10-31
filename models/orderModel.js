import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  landmark: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  products: [
    {
        productName: String,
        price: Number,
        quantity: Number
    }
  ],
  totalAmount: {
    type: Number
  },
  paymentId: {
    type: String
  },
  paymentStatus: {
    type: Boolean
  }
});

const Order = mongoose.model("order", orderSchema, "orders");

export default Order;
