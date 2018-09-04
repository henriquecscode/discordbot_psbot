const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class DeleteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            aliases: ['clear', 'purge', 'remove'],
            group: 'mod',
            memberName: 'delete',
            description: 'Deletes the specified number of messages',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'numberofmessages',
                    prompt: 'Please specify a user',
                    type: 'integer'
                }
            ]
        })
    }

    async run(message, { numberofmessages }) {


        message.delete(); //Deletes the command message and catches the error if there was any
        let todelete = await message.channel.fetchMessages({ limit: numberofmessages+1 }); //Grabs the last "numbertodelete" messages in the channel
        message.channel.bulkDelete(todelete) //Delete action
            .catch(error => console.error(error)); //Catches any errors

        console.log("Delete detected"); //Log in glitch.com
        //logchannel.send(`${todelete.size} messages deleted by ${sender}`); //Log in logchannel

        return message.channel.send(`${todelete.size-1} messages have been deleted`);
    }
}

module.exports = DeleteCommand