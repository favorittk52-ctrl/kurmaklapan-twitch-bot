const tmi = require('tmi.js');
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Twitch bot is running');
}).listen(process.env.PORT || 3000);

const client = new tmi.Client({
  options: { debug: false },
  connection: { reconnect: true, secure: true },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_TOKEN
  },
  channels: ['kurmaklapan']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  const msg = message.toLowerCase().trim();

  if (msg === '!telegram') {
    client.say(channel, 'Telegram: https://t.me/larpkurma');
  }

  if (msg === '!правила') {
    client.say(channel, 'Правила чата: 1. Не оскорблять. 2. Не спамить. 3. Без рекламы. 4. Не провоцировать конфликты. 5. Уважать всех участников.');
  }
});

client.on('connected', () => {
  console.log('Бот kurmaklapan запущен!');
});
