const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'mod',
            memberName: 'ban',
            description: 'Bans the member specified',
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'buser',
                    prompt: 'Please specify a user',
                    type: 'member'
                }
            ]
        })
    }

    run(message, { buser }) {
        if (!buser.hasPermission("BAN_MEMBERS")) {

            message.guild.member(buser).ban(); //Ban action
            console.log("Ban detected"); //Log in glitch.com 
            //logchannel.send(`${buser} was banned by ${sender}`); //Log in logchannel
            return message.channel.send(`${buser} has been banned`);
        }

        else {
            return message.channel.send(`${sender}, you can't ban that user`);
        }
    }
}

module.exports = BanCommand