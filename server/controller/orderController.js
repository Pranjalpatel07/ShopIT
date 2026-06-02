import Order from '../models/Order.js'
import {sendEmail} from '../utils/sendEmail.js'

// Create new order

const createOrder = async (req, res) => {
    try{
        const {items, totalAmount, address, paymentId}= req.body;
        if(!items || !totalAmount || !address || !paymentId){
            return res.status(400).json({message:"invalid order data"})
        }
        else{
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })    
            await order.save();

            const message = `Dear ${req.user.name},\n\nYour order has been successfully created. Your order ID is ${order._id}.\n\nThank you for shopping with us!\n\nBest regards,\nShopIt Team`;

            await sendEmail(req.user.email, 'Order Created', message)
            res.status(201).json({message:"Order created successfully", order})
         }

    }catch(error){
        res.status(500).json({message:"Server error while creating order",error: error.message})
    }
}

const myOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id})
        res.status(200).json({orders})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"Server error while fetching orders",error})
    }
};

const getOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user', 'id name');
        res.status(200).json({orders})
    }catch(error){
        res.status(500).json({message:"Server error while fetching orders",error: error.message})
    }
};

const updateOrderStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = status || order.status;
            await order.save();
            res.status(200).json({message:"Order status updated successfully", order})
        }else{
            res.status(404).json({message:"Order not found"})
        }
    }catch(error){
        res.status(500).json({message:"Server error while updating order status",error})
    }
};


export {createOrder, myOrders, getOrders, updateOrderStatus}