const fs = require('fs');
const url = require('url');
const http = require('http');
const slugify = require('slugify');
const tempReplace = require('./module/replace');

const dataobj = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data = JSON.parse(dataobj);

const overview= fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const template_card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const products = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
// const tempReplace = require(`${__dirname}/modules/replace.js`);



const server=http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const slug = data.map(el => slugify(el.productName, { lower: true }));
    console.log(slug)
    if (pathname === '/') {
        res.end("hello")
    }
    else if (pathname === '/overview') {
        let cards = data.map((el) => tempReplace(template_card, el)).join('');
        let result = overview.replace(/{%PRODUCT-DETAILS%}/g, cards)
        res.end(result);
    }
        
    else if (pathname === '/product') {
        const ids = data[query.id];
        let result = tempReplace(products, ids)
        res.end(result);
        }
    else {
        res.end("page not found")
    }
})

server.listen(8000, () => {
    console.log("loading")
})