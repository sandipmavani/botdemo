const Bot = require('node-telegram-bot-api');
const request = require('request');

const token = require('./token');

const bot = new Bot(token, {polling: true});


const languageMenu = {
  reply_markup: {
    inline_keyboard: [
      [{
        text: 'English',
        callback_data: 'en'
      }],
      [{
        text: 'Russia',
        callback_data: 'ru'
      }]
    ]
  }
};




const showLanguageMenu = function (chatId) {
  bot.sendMessage(chatId, 'Select your language', languageMenu);
}


const onEnglishTextClick = function (chatId) {
		let md = "Here is English text";
		 md += '\n https://www.google.com';
      bot.sendMessage(chatId, md)
}
const onRussianTextClick = function (chatId) {
		let md = "Вот текст на английском языке";
		 md += '\n https://www.google.com';
      bot.sendMessage(chatId, md)
}


bot.onText(/\/hi/, (msg, match) => {
  showLanguageMenu(msg.chat.id);
});

bot.onText(/\/en/, (msg, match) => {
  onEnglishTextClick(msg.chat.id);
});
bot.onText(/\/ru/, (msg, match) => {
  onRussianTextClick(msg.chat.id);
});



bot.on('callback_query', query => {
  const chatId = query.message.chat.id;
  const typeOfQuery = query.data;
  if (typeOfQuery === 'hi') {
    showLanguageMenu(chatId);
  } else if (typeOfQuery === 'en') {
    onEnglishTextClick(chatId);
  } 
  else if (typeOfQuery === 'ru') {
    onRussianTextClick(chatId);
  } 
  else if (currencies.indexOf(typeOfQuery) !== -1) {
    onCourseButtonClick(query, chatId);
  }
});

