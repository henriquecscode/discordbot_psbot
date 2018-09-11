const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
const configs = require('../../config.js');

class NotifyMe extends Command {
    constructor(client) {
        super(client, {
            name: 'notifyme',
            group: 'notifications',
            memberName: 'notifyme',
            description: 'Get a notification when someone gets online',
            guildOnly: true,
            args: [

                {
                    key: 'membermentioned',
                    prompt: 'Please specify a member',
                    type: 'member'
                }
            ]
        })
    }
    run(message, { membermentioned }) {

        if ((membermentioned.presence.status === 'online' || membermentioned.presence.status === 'dnd') && !membermentioned.roles.has(configs.afkroleid)) {
            return message.channel.send(`${message.author}, that user is already online`)
        }
        //If user is already online

        var status = notifications.AddNotifyme(membermentioned.id, message.author.id); //Checks for duplicated requests while adding to the notifications
        if (status === 'duplicated') {
            return message.channel.send(`${message.author}, you have already asked for that mention`)
        }
        //If noitifcation was already requested

        message.channel.send(`${message.author}, you will be notified when that members gets online`);
        console.log(`Notification request`)

    }

}

module.exports = NotifyMe