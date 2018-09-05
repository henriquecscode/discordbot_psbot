const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
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

    run(message){

        if(!message.member.roles.has(configs.afkroleid)){
            return message.channel.send(`${message.member}, you don't have the afk role.\nDo p$afk to add it`);
        }

        notifications.RemoveAfk(message.author.id); //Removes the role and the data of the user
        message.member.removeRole(configs.afkroleid);

        message.channel.send(`Your afk role has been removed`);
    }
}

module.exports = UnAFKCommand