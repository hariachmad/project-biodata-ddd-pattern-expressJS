const app = require('./app');
const http = require('http');

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error',()=>console.log("Tidak bisa koneksi ke server"));
server.on('listening',()=>console.log(`Server on port http://localhost: ${port}`));