const Product = require('../models/product');

const ProductController = {
    async getAllProducts(_, res){
        try{
            const products = await Product.find({});
            res.status(200).json(products);
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    },

    async addProduct(req, res){
        try{
            const {name, image, price, url} = req.body;

            const productAlreadyExist = await Product.findOne({url});
            if (productAlreadyExist){
                return res.status(400).json({message: "Product with this url already exists"});
            }

            const product = new Product({name, image, price, url});
            await product.save();
            res.status(201).json(product);
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    },

    async deleteProduct(req, res){
        try{
            const {id} = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct){
                return res.status(404).json({message: "Product with this id does not exist"});
            }
            res.status(200).json(deletedProduct);
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    },

    async patchProduct(req, res){
        try{
            const {id} = req.params;
            const {name, price, image, url} = req.body;

            const updateObj = {};
            if (name) updateObj.name = name;
            if (price) updateObj.price = price;
            if (image) updateObj.image = image;
            if (url) updateObj.url = url;

            const updatedProduct = await Product.findByIdAndUpdate(id, updateObj, {new: true});

            if (!updatedProduct){
                return res.status(404).json({message: "Product with this id does not exist"})
            }
            res.status(200).json(updatedProduct);

        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ProductController;