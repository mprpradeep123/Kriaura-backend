import Order from "../models/orderModel.js";
import sendEmail from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      landmark,
      email,
      mobile,
      pincode,
      products,
      totalAmount,
      paymentId,
      paymentStatus,
    } = req.body;

    // ✅ Validate request body
    if (
      !firstName ||
      !lastName ||
      !address ||
      !landmark ||
      !email ||
      !mobile ||
      !pincode ||
      !products ||
      !totalAmount ||
      !paymentId ||
      !paymentStatus
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all details!" });
    }

    // ✅ Save new order to DB
    const newOrder = new Order({
      firstName,
      lastName,
      address,
      landmark,
      email,
      mobile,
      pincode,
      products,
      totalAmount,
      paymentId,
      paymentStatus,
    });

    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder);

    // ==========================
    // 🛍️ Product List HTML (Reusable)
    // ==========================
    const productListHtml =
      Array.isArray(products) && products.length > 0
        ? products
            .map((p, i) => {
              const name = p?.productName || "Unknown Product";
              const price = p?.price ? `₹${p.price}` : "Price N/A";
              const quantity = p?.quantity || 1;
              return `<li>${i + 1}. ${name} — ${price} × ${quantity} nos</li>`;
            })
            .join("")
        : "<li>No product details available</li>";

    // ==========================
    // ✉️ 1. Email to Customer
    // ==========================
    const customerSubject = "✅ Payment Successful - Your Order Confirmation";
    const customerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>Thank you for your purchase, ${firstName}!</h2>
        <p>Your payment was successful 🎉</p>
        <p><strong>Order ID:</strong> ${paymentId}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

        <h3>🛒 Products Ordered:</h3>
        <ul>${productListHtml}</ul>

        <p><strong>Delivery Address:</strong> ${address}, ${landmark}, ${pincode}</p>
        <p><strong>Contact:</strong> ${mobile}</p>

        <p style="margin-top:10px;">We appreciate your trust in us. Your order will be processed soon.</p>
        <p style="margin-top:10px;">Thanks for choosing <strong>Kriyaura</strong>!</p>
      </div>
    `;

    await sendEmail(email, customerSubject, "", customerHtml);

    // ==========================
    // 📩 2. Email to Admin
    // ==========================
    const adminSubject = `🛍️ New Order Received from ${firstName} ${lastName}`;
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>🆕 New Order Details</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${mobile}</p>
        <p><strong>Address:</strong> ${address}, ${landmark}, ${pincode}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Payment Status:</strong> ${paymentStatus ? "Success ✅" : "Failed ❌"}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

        <h3>🛒 Products Ordered:</h3>
        <ul>${productListHtml}</ul>

        <p style="margin-top:15px;">— Automated Notification from <b>Kriyaura Store</b></p>
      </div>
    `;

    await sendEmail("kriyaurawellness@gmail.com", adminSubject, "", adminHtml);

    // ✅ Send Response
    return res.status(200).json({
      success: true,
      message: "Order placed & emails sent successfully!",
    });
  } catch (error) {
    console.error("❌ Order creation error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// Get all orders
// ==========================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
