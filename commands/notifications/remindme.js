const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
const delay = require('../../services/delay');

class RemindMe extends Command {
    constructor(client) {
        super(client, {
            name: 'remindme',
            aliases: ['remind', 'recall'],
            group: 'notifications',
            memberName: 'remindme',
            description: 'Give yourself a reminder',
            args: [

                {
                    key: 'data',
                    prompt: 'Please specify a reason and a time',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { data }) {

        let remindsettings = delay.DelaySettings(data);
        remindsettings.push(message.createdAt); //Adds the date to the array

        let indextoremove = notifications.AddRemind(message.member.id, remindsettings[0], remindsettings[1], remindsettings[2], remindsettings[3]);

        await delay.Delay(remindsettings[0], remindsettings[1], remindsettings[2]);
        notifications.RemoveRemind(message.member.id, indextoremove);

        message.channel.send(`Hey ${message.member}! Be reminded: \`${remindsettings[2]}\``);
    }
}

module.exports = RemindMe