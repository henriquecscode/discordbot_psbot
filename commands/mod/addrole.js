const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando

class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            group: 'mod',
            memberName: 'addrole',
            description: 'Adds a role to the member specified',
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'adduser',
                    prompt: 'Please specify a user',
                    type: 'member'
                },
                {
                    key: 'addrole',
                    prompt: 'Please specify a role',
                    type: 'role'
                }
            ]
        })
    }
    run(message, { adduser, addrole }) {
        if (!adduser.roles.has(addrole.id)) { //The user does not have the role to be given
            if (!adduser.hasPermission("ADMINISTRATOR")) { //The user is not an admin: the role can be added

                adduser.addRole(addrole.id); //Add role action
                console.log("Add role detected"); //Log in glitch.com
                //logchannel.send(`${sender} has added the role ${addrole} to ${adduser}`);
                return message.channel.send(`${adduser}, you have got the ${addrole} role`)
            }
            else { //We are trying to give a role to another administrator
                return message.channel.send(` ${message.sender}, you cannot give that user a role`);
            }
        }
        else {
            return message.channel.send(`${adduser} already has ${addrole}`);
        }
    }
}

module.exports = AddRoleCommand