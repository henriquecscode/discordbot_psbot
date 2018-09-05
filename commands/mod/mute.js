const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('../../commands/notifications/notificationsstoring.js'); //Imports notificationsstoring's functions
const configs = require('../../config.js'); //configs
const delay = require('../../services/delay.js'); //Delay

class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'mod',
            memberName: 'mute',
            description: 'Mutes the member specified',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'muser',
                    prompt: 'Please specify a user',
                    type: 'member'
                },
                {
                    key: 'data',
                    type: 'string',
                    prompt: 'Please insert a valid duration and reason',
                    default: ''
                }
            ]
        })
    }

    async run(message, { muser , data}) {
        if (!muser.hasPermission('MANAGE_MESSAGES')) {

            if (!muser.roles.has(configs.muteroleid)) {

                let mutesettings = delay.DelaySettings(data); //Uses the data to set the time, the time unit and the reason
                
                let status = notifications.AddMute(muser.id, mutesettings[0], mutesettings[1], mutesettings[2]);
                let durationreason = delay.DurationReason(mutesettings[0], mutesettings[1], mutesettings[2]);

                if (status === 'duplicated') { //Already asked for that mute status
                    message.channel.send(`${message.member}, that user already has that mute.\nDo p$unmute to remove it`);
                }
                else { //There is going to be a new delay set
                    if (status === 'updated') { //Updates the mute status and resets the time to remove the role
                        message.channel.send(`${message.member}, his mute has been updated\n${durationreason}`);
                    }
                    else { //Creates the mute status
                        message.channel.send(`${message.member}, the user has been muted\n${durationreason}`);
                        muser.addRole(configs.muteroleid);
                    }
                    console.log("Mute detected");
                    if(mutesettings[0]){ //There was a delay time specified
                        await delay.Delay(mutesettings[0], mutesettings[1]);

                        let datasettings = notifications.ToMute(muser.id);

                        if(mutesettings[0] === datasettings[0] && mutesettings[1] === datasettings[1] && mutesettings[2] === datasettings[2]){
                        notifications.RemoveMute(muser.id);
                        muser.removeRole(configs.muteroleid);
                        }
                    }
                }

            }
            else {
                return message.channel.send(`${message.member}, that user is already muted`);
            }

        }
        else {
            return message.channel.send(`${message.member} You cannot mute that person`);
        }

    }
}

module.exports = MuteCommand