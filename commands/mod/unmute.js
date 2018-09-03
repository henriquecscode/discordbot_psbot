const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'mod',
            memberName: 'unmute',
            description: 'Unmutes the member specified',
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
        let sender = message.member;
        if (!umuser.hasPermission("MANAGE_CHANNELS")) {
            let muterole = message.guild.roles.get(process.env.MUTEROLEID)
            
            if (umuser.roles.has(muterole.id)) {

                umuser.removeRole(muterole.id); //Unmute action
                console.log("Unmute detected"); //Log in glitch.com
                //logchannel.send(`${umuser} was umuted by ${sender}`); //Log in logchannel
                return message.channel.send(`${umuser} you have been unmuted`);
            }
            else {
                return message.channel.send(`${sender} that user is not muted`);
            }
        }
    }
}

module.exports = UnmuteCommand