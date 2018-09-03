const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

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
        message.channel.send(`${message.member}, your suggestion has been acknowledged. Thank you for contributing\n\`${suggestion}\``)

        let henry = message.guild.members.get(process.env.HENRYID);
        henry.send(`${message.member} has suggested:\n\`\`\`${suggestion}\`\`\``);
        let omar = message.guild.members.get(process.env.OMARID);
        omar.send(`${message.member} has suggested:\n\`\`\`${suggestion}\`\`\``);
        let triple = message.guild.members.get(process.env.TRIPEID);
        tripLe.send(`${message.member} has suggested:\n\`\`\`${suggestion}\`\`\``);
        //Sends me a message with the suggestion
    }
}
module.exports = SuggestionCommand