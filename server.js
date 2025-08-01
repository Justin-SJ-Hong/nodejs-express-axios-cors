// server.js

// const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({
  origin: ["http://127.0.0.1:5500"],
  methods: ['OPTIONS', 'POST', 'GET', 'PUT', 'DELETE'],
  headers: ["Content-Type"],
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS 설정을 위한 헤더
// const headers = {
//   'Access-Control-Allow-Origin': "http://127.0.0.1:9000",
//   'Access-Control-Allow-Origin': "http://127.0.0.1:5500",
//   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
//   'Access-Control-Allow-Headers': 'Content-Type',
// };

let data = { message: '여러분 화이팅!' };

app.options('/', (req, res) => {
  res.status(204).set(headers).send();
  return;
})

app.get('/', (req, res) => {
  // res.status(200).set('Content-Type': 'application/json', ...headers).send(JSON.stringify(data));
  res.status(200).json(data);
})

app.post('/', (req, res) => {
  const body = req.body;
  console.log('body type:', typeof req.body);
  console.log('raw body:', req.body);
  console.log('받은 POST 데이터:', body);
  data.message = body.message;
  console.log('parsed message:', data.message);
  res.status(200).send(`받은 POST 데이터: ${data.message}`)
})

app.put('/', (req, res) => {
  const body = req.body;
  data.message = body.message;
  console.log('업데이트된 데이터:', data.message);
  res.status(200).send(`업데이트된 데이터: ${data.message}`)
})

app.delete('/', (req, res) => {
  data = {}; // 데이터 삭제
  res.status(200).send('데이터가 삭제되었습니다.');
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행 중입니다.`);
})

// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }

//   if (req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
//     res.end(JSON.stringify(data));
//   }

//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`받은 POST 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'PUT') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`업데이트된 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'DELETE') {
//     data = {};
//     res.writeHead(200, headers);
//     res.end('데이터가 삭제되었습니다.');
//   }
// });

// server.listen(3000, () => {
//   console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
// });