const {Command} = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class KickCommand extends Command{
    constructor(client){
        super(client, {
            name: 'kick',
            group: 'mod',
            memberName: 'kick',
            description: 'Kicks the member specified',
            userPermissions:['KICK_MEMBERS']
        })
    }

    run(message) {
        let kuser = message.mentions.members.first(); //Gets the person to kick
        let sender = message.member; //Gets the person who sent the message
        if (!kuser) return message.channel.send(`${sender} Please specify a user`);
        if (!kuser.hasPermission("KICK_MEMBERS")) {

            kuser.kick(); //Kick action
            console.log("Kicking detected"); //Log in glitch.com
            //logchannel.send(`${kuser} was kicked by ${sender}`); //Log in logchannel
            return message.channel.send(`${kuser} has been kicked`);
        }

        else {
            return message.channel.send(`${sender} You can't kick that user`);
        }

    }
}

module.exports = KickCommand