const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const configs = require('../../config.js');

class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'mod',
            memberName: 'unmute',
            description: 'Unmutes the member specified',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'umuser',
                    prompt: 'Please specify a user',
                    type: 'member'
                }
            ]
        })
    }

    run(message, { umuser }) {
        if (!umuser.hasPermission("MANAGE_CHANNELS")) {
            
            if (umuser.roles.has(configs.muteroleid)) {

                umuser.removeRole(configs.muteroleid); //Unmute action
                console.log("Unmute detected"); //Log in glitch.com
                //logchannel.send(`${umuser} was umuted by ${sender}`); //Log in logchannel
                return message.channel.send(`${umuser} you have been unmuted`);
            }
            else {
                return message.channel.send(`${message.member} that user is not muted`);
            }
        }
    }
}

module.exports = UnmuteCommand