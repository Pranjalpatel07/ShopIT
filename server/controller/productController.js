import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

const getProduct = async (req, res) => {
    try{
        const products = await Product.find({})
        res.json(products);
        
    }catch(error){
        res.status(500).json({message:"server error product not found"})
    }
    
}

const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product) res.json(product);
    }catch{
        res.status(500).json({message:"Server error product not found"})
    }
    
}

const createProduct = async (req, res) => {
    try{
        const {name, description, price, category, stock} = req.body;
        let imageUrl = '';
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        const saveProduct = await product.save()
        res.status(201).json(saveProduct)
    }catch(error){
        console.error("Create Product Error:", error);
        res.status(500).json({message:`server error in file uploading: ${error.message}`})
    }
}

const updateProduct = async (req, res) => {
    try{
        const {name, description, price, category, stock} = req.body || {};
        const product = await Product.findById(req.params.id)
        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.stock = stock || product.stock
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(result)
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            return res.json(updatedProduct)
        }
        return res.status(404).json({message:"Product not found"})
    }catch(error){
        console.error("Update Product Error:", error)
        res.status(500).json({message:"Server error while updating product"})
    }
}


const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:"Product removed"})
        }else{
            res.status(404).json({message:"Product not found"})
        }
    }catch(error){
        res.status(500).json({message:"server error in deleting"})
    }
}

export {getProduct, getProductById, createProduct, updateProduct, deleteProduct}