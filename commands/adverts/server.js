const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const {RichEmbed} = require('discord.js');
const Discord = require('discord.js'); //Imports discod commando for embed

class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: ['serverinfo', 'info'],
            group: 'adverts',
            memberName: 'server',
            description: 'Shows the info of the server',
            guildOnly: true
        })
    }

    run(message){
        var embed = new Discord.RichEmbed();
        let server = message.channel.guild;
        embed.setTitle(server.name);
        embed.setTimestamp(server.createdAt)
        embed.setDescription(`Number of members: ${server.memberCount}`);
        message.channel.send("Here is the server info", embed);
    }
}

module.exports = ServerCommand