const { scrape } = require('../services/scrapeService');

const ScrapeController = {
    async scrapeProduct(req, res) {
        try{
            const { url } = req.body;
            const data = await scrape(url);
            
            res.status(200).json(data);
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ScrapeController;