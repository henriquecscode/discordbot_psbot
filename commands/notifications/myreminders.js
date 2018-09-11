const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions

class MyReminders extends Command {
    constructor(client) {
        super(client, {
            name: 'myreminders',
            aliases: ['showreminders', 'displayreminders', 'reminders'],
            group: 'notifications',
            memberName: 'myreminders',
            description: 'Shows your reminders',
        })
    }
    async run(message) {

        let reminders = notifications.ToRemind(message.author.id);
        let allreminders = '';

        if(reminders.length === 0){
            return message.channel.send(`${message.author}, you don't have any reminders`);
        }

        for(var reminder of reminders){
            allreminders += `**${reminder[2]}**. In: **${reminder[0]} ${reminder[1]}**. Asked on: \`${reminder[3]}\`\n`;
        }

        message.channel.send(`${message.author}, here are your reminders:\n${allreminders}`);
    }
}

module.exports = MyReminders