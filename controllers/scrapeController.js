const axios = require('axios');
const cheerio = require('cheerio');

const ScrapeController = {
    async scrapeProduct(req, res) {
        try{
            const { url } = req.body;
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
                }
            });

            const $ = cheerio.load(data);

            const name = $('[data-qaid="image_preview"]').attr('alt').split('-')[0].trim();
            const image = $('[data-qaid="image_preview"]').attr('src');
            const price = parseInt($('[data-qaid="main_product_info"] [data-qaid="product_price"]').text().split(/\s+/)[0]);
            
            res.status(200).json({name, image, price, url});
        }catch(error){
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ScrapeController;