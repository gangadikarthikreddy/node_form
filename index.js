console.log("hello");

const fs = require("fs");

// synchronus:blocking code
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(text)
// const data = `we know that we have ${text} .\n created on ${Date.now()}`;
// fs.writeFileSync('./txt/result.txt', data);

//Asynchronous :non-blocking code

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("not found");
  console.log(data1);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile( "./txt/final.txt",`${data1}.\n ${data2}.\n${data3}`,'utf-8',(err) => {
          if (err) return console.log("problem in writting data");
          fs.appendFile('./txt/append.txt',`.\n hello world`, 'utf-8', (err) => {
              if(err) return console.log("warning")
          })
        },
      );
    });
  });
});

console.log("loading");
