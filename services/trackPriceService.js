const { scrape } = require('./scrapeService');
const Product = require('../models/product');

async function startPriceWatcher(url, currentPrice, delay) {
    console.log('Зара має бути setinterval');
    const priceWatcher = setInterval(async () => {
        try{
            if (!(await Product.findOne({url})).isSubscribed){
                console.log('Підписка на продукт не дійсна. Перериваю інтервал')
                clearInterval(priceWatcher);
                return;
            }
            const {price} = await scrape(url);
            currentPrice = (await Product.findOne({url})).price;
            if (currentPrice != price){
                await Product.findOneAndUpdate({url}, {price: price, isSubscribed: false});
                clearInterval(priceWatcher);
                if (currentPrice < price){
                    console.log(`Увага: ціна на товар зросла! ${currentPrice} -> ${price}`);
                }else{
                    console.log(`Увага: ціна на товар впала! ${currentPrice} -> ${price}`); 
                }
                return;
            }
            console.log(`Ціна на товар не змінилась...`);
        }catch(error){
            console.error(error.message);
        }

    }, delay);
}

module.exports = {startPriceWatcher};