const { startPriceWatcher } = require('../services/trackPriceService');
const Product = require('../models/product');

const TrackController = {
    async trackProduct(req, res) {
        try{
            const { url } = req.body;
            const { price } = await Product.findOne({url: url});
            
            startPriceWatcher(url, price, 5000);
            
            res.sendStatus(200);
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = TrackController;