const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions

class NotifyMeGetsOnlineCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'notifyme',
            group: 'notifyme',
            memberName: 'notifyme',
            description: 'Get a notification when someone gets online',
            args: [

                {
                    key: 'usermentioned',
                    prompt: 'Please specify a user',
                    type: 'user'
                }
            ]
        })
    }
    run(message, {usermentioned}) {

        if(usermentioned.presence.status === 'online' || usermentioned.presence.status === 'dnd'){
            return message.channel.send(`${message.author}, that user is already online`)
        }
        //If user is already online

        let status = notifications.addnotification(usermentioned.id, message.author.id); //Checks for duplicated requests while adding to the notifications
        if(status === 'duplicated'){
            return message.channel.send(`${message.author}, you have already asked for that mention`)
        }
        //If noitifcation was already requested

        message.channel.send(`${message.author}, you will be notified when that members gets online`);
        console.log(`Notification request`)


    }
}

module.exports = NotifyMeGetsOnlineCommand