const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['profilepic', 'profile'],
            group: 'adverts',
            memberName: 'avatar',
            description: 'Shows the profile pic of the mentioned member',
            guildOnly: false,
            args:[
                {
                    key: "user",
                    prompt: "Specify a user",
                    type: "user"
                }
            ]
        })
    }

    run(message, {user}){
        message.channel.send(user.avatarURL);
    }
}

module.exports = AvatarCommand