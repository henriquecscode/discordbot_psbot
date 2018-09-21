const { Command } = require('discord.js-commando')

class SetStatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'admin',
            memberName: 'status',
            description: 'Sets the status of the bot',
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'status',
                    prompt: 'Please specify a status',
                    type: 'string'
                }
            ]
        })
    }
    run(message, { status }) {
        this.client.user.setActivity(status);
        message.channel.send(`My status got set to \`${status}\``);
    }
}

module.exports = SetStatusCommand