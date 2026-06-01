import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import userModel from "./models/userModel.js";
import Product from "./models/product.js";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await userModel.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log("✓ Cleared existing data");

        // Create dummy users
        const hashedPassword = await bcryptjs.hash("password123", 10);
        
        const users = await userModel.insertMany([
            {
                name: "Admin User",
                email: "admin@shopIt.com",
                password: hashedPassword,
                role: "admin",
                varified: true
            },
            {
                name: "John Doe",
                email: "john@shopIt.com",
                password: hashedPassword,
                role: "user",
                varified: true
            },
            {
                name: "Jane Smith",
                email: "jane@shopIt.com",
                password: hashedPassword,
                role: "user",
                varified: true
            },
            {
                name: "Mike Johnson",
                email: "mike@shopIt.com",
                password: hashedPassword,
                role: "user",
                varified: false
            },
            {
                name: "Sarah Williams",
                email: "sarah@shopIt.com",
                password: hashedPassword,
                role: "user",
                varified: true
            }
        ]);
        console.log(`✓ Created ${users.length} users`);

        // Create dummy products
        const products = await Product.insertMany([
            {
                name: "Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation",
                price: 79.99,
                category: "Electronics",
                stock: 50,
                imageUrl: "https://via.placeholder.com/300?text=Headphones",
                ratings: 4.5,
                numReviews: 120
            },
            {
                name: "Smart Watch",
                description: "Feature-rich smartwatch with health tracking",
                price: 199.99,
                category: "Electronics",
                stock: 30,
                imageUrl: "https://via.placeholder.com/300?text=SmartWatch",
                ratings: 4.2,
                numReviews: 85
            },
            {
                name: "USB-C Cable",
                description: "Durable 2m USB-C charging and data cable",
                price: 12.99,
                category: "Accessories",
                stock: 200,
                imageUrl: "https://via.placeholder.com/300?text=Cable",
                ratings: 4.7,
                numReviews: 340
            },
            {
                name: "Phone Case",
                description: "Protective phone case with shockproof design",
                price: 24.99,
                category: "Accessories",
                stock: 150,
                imageUrl: "https://via.placeholder.com/300?text=PhoneCase",
                ratings: 4.3,
                numReviews: 210
            },
            {
                name: "Laptop Stand",
                description: "Adjustable aluminum laptop stand for better ergonomics",
                price: 39.99,
                category: "Office",
                stock: 75,
                imageUrl: "https://via.placeholder.com/300?text=LaptopStand",
                ratings: 4.6,
                numReviews: 95
            },
            {
                name: "Mechanical Keyboard",
                description: "RGB mechanical keyboard with Cherry MX switches",
                price: 129.99,
                category: "Electronics",
                stock: 40,
                imageUrl: "https://via.placeholder.com/300?text=Keyboard",
                ratings: 4.8,
                numReviews: 156
            },
            {
                name: "Wireless Mouse",
                description: "Ergonomic wireless mouse with long battery life",
                price: 34.99,
                category: "Electronics",
                stock: 100,
                imageUrl: "https://via.placeholder.com/300?text=Mouse",
                ratings: 4.4,
                numReviews: 178
            },
            {
                name: "4K Webcam",
                description: "Ultra HD webcam perfect for streaming and video calls",
                price: 89.99,
                category: "Electronics",
                stock: 35,
                imageUrl: "https://via.placeholder.com/300?text=Webcam",
                ratings: 4.5,
                numReviews: 67
            },
            {
                name: "Portable Charger",
                description: "20000mAh portable power bank with fast charging",
                price: 44.99,
                category: "Accessories",
                stock: 120,
                imageUrl: "https://via.placeholder.com/300?text=PowerBank",
                ratings: 4.6,
                numReviews: 234
            },
            {
                name: "LED Desk Lamp",
                description: "Adjustable LED desk lamp with USB charging port",
                price: 49.99,
                category: "Office",
                stock: 60,
                imageUrl: "https://via.placeholder.com/300?text=DeskLamp",
                ratings: 4.3,
                numReviews: 89
            }
        ]);
        console.log(`✓ Created ${products.length} products`);

        // Create dummy orders
        const orders = await Order.insertMany([
            {
                user: users[1]._id,
                products: [
                    {
                        productId: products[0]._id,
                        quantity: 1,
                        price: products[0].price
                    },
                    {
                        productId: products[2]._id,
                        quantity: 2,
                        price: products[2].price
                    }
                ],
                totalAmount: products[0].price + (products[2].price * 2),
                address: {
                    fullName: "John Doe",
                    street: "123 Main Street",
                    city: "New York",
                    postalCode: "10001",
                    country: "USA"
                },
                paymentId: "pay_1A2B3C4D5E6F",
                status: "Delivered"
            },
            {
                user: users[2]._id,
                products: [
                    {
                        productId: products[1]._id,
                        quantity: 1,
                        price: products[1].price
                    }
                ],
                totalAmount: products[1].price,
                address: {
                    fullName: "Jane Smith",
                    street: "456 Oak Avenue",
                    city: "San Francisco",
                    postalCode: "94102",
                    country: "USA"
                },
                paymentId: "pay_2B3C4D5E6F7G",
                status: "Shipped"
            },
            {
                user: users[3]._id,
                products: [
                    {
                        productId: products[5]._id,
                        quantity: 1,
                        price: products[5].price
                    },
                    {
                        productId: products[6]._id,
                        quantity: 1,
                        price: products[6].price
                    }
                ],
                totalAmount: products[5].price + products[6].price,
                address: {
                    fullName: "Mike Johnson",
                    street: "789 Pine Road",
                    city: "Los Angeles",
                    postalCode: "90001",
                    country: "USA"
                },
                paymentId: "pay_3C4D5E6F7G8H",
                status: "Processing"
            },
            {
                user: users[4]._id,
                products: [
                    {
                        productId: products[8]._id,
                        quantity: 1,
                        price: products[8].price
                    },
                    {
                        productId: products[9]._id,
                        quantity: 1,
                        price: products[9].price
                    }
                ],
                totalAmount: products[8].price + products[9].price,
                address: {
                    fullName: "Sarah Williams",
                    street: "321 Elm Street",
                    city: "Chicago",
                    postalCode: "60601",
                    country: "USA"
                },
                paymentId: "pay_4D5E6F7G8H9I",
                status: "Delivered"
            },
            {
                user: users[1]._id,
                products: [
                    {
                        productId: products[3]._id,
                        quantity: 3,
                        price: products[3].price
                    },
                    {
                        productId: products[7]._id,
                        quantity: 1,
                        price: products[7].price
                    }
                ],
                totalAmount: (products[3].price * 3) + products[7].price,
                address: {
                    fullName: "John Doe",
                    street: "123 Main Street",
                    city: "New York",
                    postalCode: "10001",
                    country: "USA"
                },
                paymentId: "pay_5E6F7G8H9I0J",
                status: "Processing"
            }
        ]);
        console.log(`✓ Created ${orders.length} orders`);

        console.log("\n✅ Database seeding completed successfully!");
        console.log("\n📊 Summary:");
        console.log(`   • Users: ${users.length}`);
        console.log(`   • Products: ${products.length}`);
        console.log(`   • Orders: ${orders.length}`);
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
