const { Command } = require('discord.js-commando'); //Imports the Command class from the discord.js-commando
const notifications = require('./notificationsstoring.js'); //Imports notificationsstoring's functions
const configs = require('../../config.js');

class AFKCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'afk',
            aliases: ['brb', 'gone', 'away'],
            group: 'notifications',
            memberName: 'afk',
            description: 'Set your role to afk',
            guildOnly: true,
            details: 'p$afk <?number<?timeunit> <?reason>\nTime units: \`minutes, min, hours, days`',
            args: [

                {
                    key: 'data',
                    prompt: 'Please specify a user',
                    type: 'string',
                    default: ''
                }
            ]
        })
    }

    async run(message, { data }) { //Async so we can wait for a time before removing the role

        if(message.member.roles.has(configs.afkroleid)){
            return message.channel.send(`${message.member}, you already have the afk role.\nDo p$unafk to remove it`);
        }

        if (!data) { //there was no data, just the afk command
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
        }
            notifications.AddAfk(message.author.id, time, timeunit, reason);
            message.member.addRole(configs.afkroleid);

            //notifications.LogMemberNotification(message.author.id);
        

        var afkduration
        if (time) {//The user has specified a time when setting its afk status
            afkduration = time
            if (timeunit) { //The user has specified a timeunit
                if (timeunit.startsWith("m")) afkduration = time * 60 * 1000
                else if (timeunit.startsWith("h")) afkduration = time * 60 * 60 * 1000
                else if (timeunit.startsWith("d")) afkduration = time * 24 * 60 * 1000
                //The delay for the settimeout function is according to the timeunit
            }

            else {
                afkduration = time * 60 //Time unit is considered to be the minutes
            }

            let resolved = await WaitFor(afkduration); //Waits before removing the role

            notifications.RemoveAfk(message.author.id); //Removes the role and the data of the user
            message.member.removeRole(configs.afkroleid);
        }

        //If no time was specified the user will have to manually remove their role

        function WaitFor(time) { //Waits for time seconds https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                }, time);
            })
        }
    }



}

module.exports = AFKCommand

/*    run(message, { time, data }) {
        console.log(time);
        console.log(data);
        console.log(!Number.isInteger(time));
        if(!Number.isInteger(time)){
            console.log(`Is not integer`);
            time = null; //If the supposed time is a string, then set it to null
            data = `${time} ${data}`; //Since the time was a string, it must be added to the reason
        }

        console.log("time" +time);
        console.log("data" + data);
        if (!time && !data) { //there was no time nor data, just the afk command
            message.channel.send(`You have been set afk`);
        }

        else if (!time) { //there was no time, just the reason
            message.channel.send(`You have been set afk\nReason:\`${data}\``);
        }

        else if (!data) { //there was no reason, just the time
            message.channel.send(`You have been set afk for ${time}`);
        }

        else { //there is both a reason and a time
            var data = data.split(/ +/g);
            var timeunit = data[0];
            var reason

            switch (timeunit) {
                case "minutes":
                case "min":
                case "hours":
                case "days":
                    data.splice(0, 1);
                    break;
                //The time has minutes, hours or days specified

                default:
                    timeunit = null
                    break;
                //There was no time unit
            }
            if(data.length === 0){ //There was no reason but a time unit
                message.channel.send(`You have been set as afk for ${time} ${timeunit}`)
            }
            else{
            reason = data.join(' ');
            message.channel.send(`You have been set as afk for ${time}\nReason: \`${reason}\``);
            }
        }

        notifications.AddAfk(message.author.id, time, timeunit, reason);

    }
    */

    /*
        run(message, { data }) {
        if(!data){ //there was no data, just the afk command
            return message.channel.send(`You have been set afk`);
        }

        var data = data.split(/ +/g);
        var time
        var reason

        var time = Number(data[0]); //Converts the time (if given) to a number to see if it passes the condition

        if (Number.isInteger(time)) { //The user specified a time
            switch (data[1]) {
                case "minutes":
                case "min":
                case "hours":
                case "days":
                    time = `**${time} ${data[1]}**`;
                    data.splice(0, 2);
                    break;
                //The time has minutes, hours or days specified

                default:
                    time = (`**${time}**`)
                    data.splice(0, 1);
                    break;
                //Just a number set
            }
        }
        else { //If no time was specified
            time = `**unspecified**`;
        }

        if (!data) { //After the removal of the time (if given) there was no more data
            reason = `**unspecified**`
        }
        else {
            data = data.join(' ');
            reason = `\`${data}\``;//Sets the reasons after removing the time from the data
        }
            notifications.AddAfk(message.author.id, time, reason);

            message.channel.send(`You have been set as afk for ${time}\nReason: ${reason}`);

    }
    */