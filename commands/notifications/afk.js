const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
const notify = require('../../services/notify.js'); //Imports the notification
const configs = require('../../config.js'); //configs
const delay = require('../../services/delay.js'); //Delay

class AFKCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'afk',
            aliases: ['brb', 'gone', 'away'],
            group: 'notifications',
            memberName: 'afk',
            description: 'Set your role to afk',
            guildOnly: true,
            args: [

                {
                    key: 'data',
                    type: 'string',
                    prompt: ' Please insert a valid duration and reason',
                    default: ''
                }
            ]
        })
    }

    async run(message, { data }) { //Async so we can wait for a time before removing the role

        let afksettings = delay.DelaySettings(data); //Uses the data to set the time, the time unit and the reason
        //[time, timeunit, reason]

        let status = notifications.AddAfk(message.author.id, afksettings[0], afksettings[1], afksettings[2]); //Adds the data to the user, according to any previous afk status
        let durationreason = delay.DurationReason(afksettings[0], afksettings[1], afksettings[2]);

        if (status === 'duplicated' && message.member.roles.has(configs.afkroleid)) { //Already asked for that afk status
            message.channel.send(`${message.member}, you already have the afk role.\nDo p$unafk to remove it.`)
        }
        else if( status === 'duplicated' && !message.member.roles.has(configs.afkroleid)){ //Does not have the the role, but an empty afk status
            message.channel.send(`${message.member}, you have been set afk`);
            message.member.addRole(configs.afkroleid);
        }
        else { //There is going to be a new delay set
            if (status === 'updated') { //Updates the afk status
                message.channel.send(`${message.member}, your afk status has been updated\n${durationreason}`);
            }
            else { //Creates the afk status and removes the role after the time specified
                message.channel.send(`${message.member}, you have been set afk\n${durationreason}`);
                message.member.addRole(configs.afkroleid);
            }

            if (afksettings[0]) { //There was a delay time specified
                await delay.Delay(afksettings[0], afksettings[1]);

                let datasettings = notifications.ToAfk(message.author.id)
                if (afksettings[0] === afksettings[0] && afksettings[1] === datasettings[1] && afksettings[2] === datasettings[2]) {
                    //The status has not been changed, therefore the time is the same
                    notifications.RemoveAfk(message.author.id);
                    message.member.removeRole(configs.afkroleid);

                    let generalchannel = message.channel.guild.channels.get(configs.generalchannelid);
                    notify.DoNotify(generalchannel, message.member);

                }
            }
        }
    }

}

module.exports = AFKCommand

/*if (!data) { //there was no data, just the afk command
    message.channel.send(`You have been set afk`);
}
else {

    data = data.split(/ +/g); //Gets the data to an array
    var time = null
    var timeunit = null
    var reason = null

    if (Number.isInteger(Number(data[0]))) { //The user has specified a time
        time = data[0];
        data.splice(0, 1);

        if (data.length > 0) { //There is still data
            switch (data[0]) { //Switch with the possible timeunit

                //There was a time unit
                case "minutes":
                case "min":
                case "hours":
                case "days":
                    timeunit = data[0];
                    data.splice(0, 1);
                    if (data.length > 0) { //There was time, timeunit and a reason
                        reason = data.join(' ');
                        message.channel.send(`You have been set afk for ${time} ${timeunit}\nReason: \`${reason}\``);
                    }
                    else { //There was time and timeunit but no reason
                        message.channel.send(`You have been set afk for ${time} ${timeunit}`);
                    }
                    break;

                //There was time and a reason but not a time unit
                default:
                    reason = data.join(' ');
                    message.channel.send(`You have been set afk for ${time}\nReason: \`${reason}\``);
                    break;

            }
        }
        else { //There was time but not a reason
            message.channel.send(`You have been set afk for ${time}`);
        }
    }
    else { //There was no time just a reason
        reason = data.join(' ');
        message.channel.send(`You have been set afk\nReason: \`${reason}\``);
    }
}*/