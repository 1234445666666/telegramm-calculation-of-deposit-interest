const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf('private_token');

bot.start((ctx) => ctx.reply('Здравствуйте!Приветствую вас в моем боте! Здесь вы можете рассчитать проценты по вкладу. Чтобы начать введите /menu'))

bot.command('menu', ctx => {
    ctx.reply('Выберите команду: /calculate , для подсчета процентов по вкладу. Так же по команде /web можно перейти на сайт по процентвов по вкладу.')
})

bot.command('calculate', ctx => {
    ctx.reply('Эта команда позволяет вам рассчитать проценты по вкладу. Введите сумму вклада и срок в днях и процентную ставку через пробел.')
})

bot.command('web', ctx => {
    ctx.reply('https://1234445666666.github.io/website-calculation-of-deposit-interest/')
})

bot.on(message('text'), (ctx) => {
    const text = ctx.message.text;
    const parts = text.split(' ');

    // Проверяем, что введены все три значения
    if (parts.length !== 3){ 
        let missingFields = [];
        if (!parts[0]) missingFields.push('сумма');
        if (!parts[1]) missingFields.push('количество дней');
        if (!parts[2]) missingFields.push('процентная ставка');

        ctx.reply(`Вы не ввели: ${missingFields.join(', ')}.\nПример: 10000 365 10`);
        return; 
    };

    const sum = parseFloat(parts[0]); 
    const days = parseFloat(parts[1]); 
    const rate = parseFloat(parts[2]); 

    //Проверка все ли знания являются числами
    let invalidFields = [];
    if (isNaN(sum)) invalidFields.push('сумма');
    if (isNaN(days)) invalidFields.push('количество дней');
    if (isNaN(rate)) invalidFields.push('процентная ставка');

    if (invalidFields.length > 0) {
        ctx.reply(`Некорректные данные: ${invalidFields.join(', ')}.\nПример: 10000 365 10`);
        return; 
    };

    // Рассчитываем итоговую сумму
    const total = ((sum * (rate / 100)) / 365) * days;
    const result = (sum + total).toFixed(2); 

    ctx.reply(`Ваша сумма вклада после ${days} дней составляет ${result} рублей.`);
});



bot.launch();


