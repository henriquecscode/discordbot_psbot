const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const configs = require('../../config.js');

class SuggestionCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            group: 'adverts',
            memberName: 'suggest',
            description: 'Suggest a new idea for the bot',
            args:[
                {
                    key: "suggestion",
                    prompt: "Want to give a suggestion? Write it after the command",
                    type: "string"
                }
            ]
        })
    }
    run(message, { suggestion }) {
        console.log(`Suggestion detected`);
        
        let suggestionschannel = message.guild.channels.get(configs.suggestionschannelid);
        suggestionschannel.send(`${message.author} has suggested:\n\`\`\`${suggestion}\`\`\``);

        message.channel.send(`${message.author}, your suggestion has been acknowledged. Thank you for contributing\n\`${suggestion}\``)
    }
}
module.exports = SuggestionCommand