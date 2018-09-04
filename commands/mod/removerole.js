const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class RemoveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'removerole',
            group: 'mod',
            memberName: 'removerole',
            description: 'Removes a role from the member specified',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'removeuser',
                    prompt: 'Please specify a user',
                    type: 'member'
                },
                {
                    key: 'removerole',
                    prompt: 'Please specify a role',
                    type: 'role'
                }
            ]
        })
    }
    run(message, { removeuser, removerole }) {
        if (removeuser.roles.has(removerole.id)) { //The user has the role to be removen
            if (!removeuser.hasPermission("ADMINISTRATOR")) { //The user is not an admin: the role can be removed
                removeuser.removeRole(removerole.id); //Remove role action
                console.log("Remove role detected"); //Log in glitch.com
                //logchannel.send(`${sender} has removed the role ${removerole} from ${removeuser}`); //Log in logchannel
                return message.channel.send(`${removeuser} has got ${removerole} removed`)
            }
            else { //We are trying to remove a role from an administrator
                return message.channel.send(` ${message.sender}, you cannot remove a role from that user`);
            }
        }
        else {
            return message.channel.send(`${removeuser} does not have ${removerole}`);
        }
    }
}

module.exports = RemoveRoleCommand