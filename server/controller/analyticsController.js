import Order from "../models/Order.js";
import User from "../models/userModel.js";
import Product from "../models/product.js";

const getAdminStates = async (req, res) => {
    try{
        const totalUsers = await User.countDocuments({role: 'user'});
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});

        const orders = await Order.find({})
        
        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({
            totalOrders,
            totalUsers,
            totalProducts,
            totalRevenue: totalRevenueData
        });

    } catch (error) {
        res.status(500).json({ message: error.message });       
    }
}

export {getAdminStates};