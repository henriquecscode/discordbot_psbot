const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class GithubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'github',
            group: 'adverts',
            memberName: 'github',
            description: 'See how the bot development is going on',
        })
    }
    run(message) {
        message.channel.send(`${message.author}, interested in seeing how the bot works?\nCheck out the code at https://github.com/henriquecscode/discordbot_psbot`);
    }
}

module.exports = GithubCommand