const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
const notify = require('../../services/notify.js'); //Imports the notification
const configs = require('../../config.js');

class UnAFKCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unafk',
            aliases: ['back', 'here'],
            group: 'notifications',
            memberName: 'unafk',
            description: 'Remove your afk role',
            guildOnly: true,

        })
    }

    run(message) {
        notifications.RemoveAfk(message.member.id); //Removes the role and the data of the user
        if (!message.member.roles.has(configs.afkroleid)) {
            return message.channel.send(`${message.member}, you don't have the afk role.\nDo p$afk to add it`);
        }

        message.member.removeRole(configs.afkroleid);

        message.channel.send(`Your afk role has been removed`);



        let generalchannel = message.channel.guild.channels.get(configs.generalchannelid);
        notify.DoNotify(generalchannel, message.member);
    }
}
module.exports = UnAFKCommand