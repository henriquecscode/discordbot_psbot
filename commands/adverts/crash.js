const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const configs = require('../../config.js');

class CrashCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'crash',
            group: 'adverts',
            memberName: 'crash',
            description: 'Report a bot crash or missbehaving',
            aliases: ['report', 'bug'],
            args:[
                {
                    key: "data",
                    prompt: "Specify a reason",
                    type: "string"
                }
            ]
        })
    }

    run(message, { data }) {
        console.log("Crash report detected");
        
        let suggestionchannel = message.guild.channels.get(configs.suggestionschannelid);
        suggestionchannel.send(`${message.author} has reported a crash in the bot. Reason is:\n\`${data}\``);
        
        message.channel.send(`${message.author}, your crash report has been registered. Thank you for your contribution.\n\`${data}\``);
    }
}
module.exports = CrashCommand