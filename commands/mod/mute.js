const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const configs = require('../../config.js');

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
                }
            ]
        })
    }

    run(message, { muser }) {
        let sender = message.member;
        if (!muser.hasPermission('MANAGE_MESSAGES')) {

            if (!muser.roles.has(configs.muteroleid)) {
                muser.addRole(configs.muteroleid); //Mute action
                console.log("Mute detected"); //Log in glitch.com
                //logchannel.send(`${muser} was muted by ${sender}`); //Log in logchannel
                return message.channel.send(`${muser} You are muted now`);
            }
            else {
                return message.channel.send(`${sender}, that user is already muted`);
            }

        }
        else {
            return message.channel.send(`${sender} You cannot mute that person`);
        }

    }
}

module.exports = MuteCommand