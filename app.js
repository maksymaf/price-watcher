require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: ['http://localhost:3000', 'http://localhost:5500']}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/scrape', require('./routes/scrapeRoute'));
app.use('/api/track', require('./routes/trackRoute'));

(async function main() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }catch(error){
        console.error(`Failed to connect to MongoDB ${error.stack}`);
        process.exit(1);
    }
})();
