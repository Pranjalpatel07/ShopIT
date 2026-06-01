import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
const createOrder = async (req, res) => {
    try {
        const options = {
            amount: Math.round(req.body.amount * 100), // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay Create Order Error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }   
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto 
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex"); 
        if (generated_signature === razorpay_signature) {
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to verify payment" });
    }
};

export { createOrder, verifyPayment };