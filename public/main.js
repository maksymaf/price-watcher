const scrapeBtn = document.getElementById('scrapeBtn');
const urlInput = document.getElementById('urlInput');

document.addEventListener('DOMContentLoaded', async () => {
    await displayProducts()
})

async function displayProducts() {
    const container = document.querySelector('.cards-container');
    try{
        const response = await fetch('/api/products', {method: 'GET'});
        const products = await response.json();
        
        container.innerHTML = '';

        products.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card')

            card.innerHTML = `
                <img id="productImage" alt="product" src="${item.image}" />
                <div class="info">
                    <h2 id="productName">${item.name}</h2>
                    <p id="productPrice">${item.price} грн</p>
                    <div class="row space-between">
                        <a id="productLink" target="_blank" href=${item.url}>Перейти до товару ↗</a>
                        <button class="subscribe-btn">Subscribe</button>
                    </div>
                </div>
            `
            container.appendChild(card);
        });

    }catch(error){
        console.error(error.message);
        container.textContent = '❌ Не вдалося завантажити товари';
    }
}

async function scrapeProduct(url) {
    try{
        const response = await fetch('/api/scrape', {
            method: 'POST', 
            body: JSON.stringify({url}), 
            headers: {"Content-Type": "application/json"}
        });

        const scrapedProduct = await response.json();
        return scrapedProduct;
    }catch(error){
        console.log(error.message);
        container.textContent = '❌ Не вдалось знайти товар';
    }   
}

async function addProduct(url) {
    try{
        const scrapedProduct = await scrapeProduct(url);
        await fetch('/api/products', {
            method: 'POST', 
            body: JSON.stringify(scrapedProduct),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }catch(error){
        console.error(error.message);
        container.textContent = '❌ Не вдалося додати товар';
    }    
}

scrapeBtn.addEventListener('click', async () => {
    if (urlInput.value){
        await addProduct(urlInput.value.trim());
        await displayProducts();
        urlInput.value = '';
    }
});
