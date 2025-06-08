const http = require("http");
const server = http.createServer();

const port = 5000;
server.listen(port, () => console.log(`server is runnig on port ${port}`));