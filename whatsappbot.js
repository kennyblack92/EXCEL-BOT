const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const axios = require('axios');

const SESSION_FILE_PATH = './session.json';

let sessionData;

// Load session data if available
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('Authenticated');
  sessionData = session;
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
});

client.on('message', async (msg) => {
  const lowercaseMsg = msg.body.toLowerCase();

  if (lowercaseMsg === 'hi' || lowercaseMsg === 'hello') {
    msg.reply('Hello! How can I assist you today?');
  } else if (lowercaseMsg === 'weather') {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'your_city_name',
          appid: 'your_api_key',
          units: 'metric'
        }
      });
      
      const weather = response.data.weather[0].description;
      const temperature = response.data.main.temp;

      msg.reply(`Current weather: ${weather}, Temperature: ${temperature}°C`);
    } catch (error) {
      msg.reply('Sorry, I couldn\'t fetch the weather information.');
    }
  } else {
    msg.reply('I\'m not sure how to respond to that.');
  }
});

client.initialize();
