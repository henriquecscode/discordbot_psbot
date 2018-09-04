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
                    key: 'membermentioned',
                    prompt: 'Please specify a member',
                    type: 'member'
                }
            ]
        })
    }
    run(message, {membermentioned}) {

        if(membermentioned.presence.status === 'online' || membermentioned.presence.status === 'dnd'){
            return message.channel.send(`${message.member}, that user is already online`)
        }
        //If user is already online

        let status = notifications.addnotification(membermentioned.id, message.member.id); //Checks for duplicated requests while adding to the notifications
        if(status === 'duplicated'){
            return message.channel.send(`${message.member}, you have already asked for that mention`)
        }
        //If noitifcation was already requested

        message.channel.send(`${message.member}, you will be notified when that members gets online`);
        console.log(`Notification request`)


    }
}

module.exports = NotifyMeGetsOnlineCommand