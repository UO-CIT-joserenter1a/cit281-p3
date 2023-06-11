const http = require('http');
const fs = require("fs");
const fastify = require("fastify")();
const mod = require('./p3-module.js');

const hostname = '127.0.0.1';
const port = 8080;


fastify.get('/', (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      reply.code(500).send();
    } else {
      reply
        .header('Content-Type', 'text/html')
        .code(200)
        .send(data);
    }
  });
});

fastify.get('/coin', (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  const value = mod.coinCount({ denom: parseInt(denom), count: parseInt(count) });
  reply
    .header('Content-Type', 'text/html')
    .send(`<h2>The total value is ${value}</h2><br/><a href="/">Home</a>`);
});

// Define the route
fastify.get('/coins', (request, reply) => {
    // Get the value of the 'option' query parameter
    const { option } = request.query;
  
    // Define the test data values
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
  
    // Calculate the total coin value based on the provided option
    let totalValue;
    switch (option) {
      case '1':
        coinValue = mod.coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case '2':
        coinValue = mod.coinCount(...coins);
        break;
      case '3':
        coinValue = mod.coinCount(coins);
        break;
      default:
        // If the 'option' parameter is not recognized, return an error
        reply.code(400).send('Invalid option');
        return;
    }
  
    // Return the total coin value
    reply
        .header('Content-Type', 'text/html')
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
  });
  

fastify.listen({port: port, hostname: hostname}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
