// 264 Final Project
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
});
  
// Catch Ctrl+C and exit with message
process.on('SIGINT', () => {
    console.log('\nProcess %d is being terminated.', process.pid);
    console.log('Stopping Server...\n');
    process.exit(0);
});

