const fs = require('fs');
const http = require('http');
// const url = require(url);

const dataobj = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');


const server = http.createServer((req, res) => {
    console.log(req)
    const pathname = req.url;  //it is a string
    console.log(pathname)
    if (pathname === '/') {
      res.end('hello world');  
    }
    else if (pathname === '/overview') {
        res.end('this is an overview')
    }
        
    else if (pathname === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        //     if(err) return console.log(err)
        //     let productData = JSON.parse(data);
        //     res.writeHead(200, {
        //     'Content-type': 'application/json',
        //   })
        //     res.end(data);
        // })

        res.end(dataobj)
        }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>page not found</h1>')
    }
    
})

server.listen(8000, () => {
    console.log("loading")
})