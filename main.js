require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console

const path = require('path'); //To use path

const commando = require("discord.js-commando");
const client = new commando.Client({
    commandPrefix: process.env.PREFIX,
    unknowncommandresponse: false
})
//Sets generals options for the bot, using the discord.js-commando

const notifications = require('./commands/notifications/notificationsstoring.js'); //Imports notificationsstoring's functions


var guild;
var generalchannel;
var suggestionchannel;

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['mod', 'Managment commands - Only usable with the right permissions'],
        ['adverts', 'Advertisements - See what is going on with the bot'],
        ['admin', 'Admin commands - A list of special commands. Proceed with caution'],
        ['notifyme', 'Set of notifications commands you can use']
    ])
    //Add the command groups here
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
//Sets up the default discord.js-commando option

client.on('ready', function () {
    console.log(`Ready`);
    client.user.setActivity('in PS server') //Set's the bot playing status

    guild = client.guilds.get(process.env.GUILDID);
    generalchannel = guild.channels.get(process.env.GENERALCHANNELID);//Gets the generalchannel
    suggestionchannel = guild.channels.get(process.env.SUGGESTIONSCHANNELID); //Gets the suggestions channel
    //Setup()
});

client.on("message", (message) => {
});

client.on("guildMemberAdd", (member) => { //Welcome message
    generalchannel.send(`Hey ${member}, welcome to ${client.guilds.get(process.env.GUILDID).name}! :peanuts::peanuts::tada:
Please make sure read the ${guild.channels.get('304557023813697536')} & ${guild.channels.get('334704572624797699')} channels to get all the info there is to know about our server !
Enjoy your stay here ${member}! :tada::tada:`);

    let newcomerrole = guild.roles.get(process.env.NEWCOMERROLEID);
    member.addRole(newcomerrole.id);
    //Adds the role to the member that has just joined
})

client.on("guildMemberRemove", (member) => { //Leave message
    generalchannel.send(`${member} has just left ${guild}`);
})

client.on("presenceUpdate", (oldMember, newMember) => {
    let oldMemberstatus = oldMember.presence.status
    let newMemberstatus = newMember.presence.status

    if(oldMemberstatus === 'offline' && (newMemberstatus === 'online' || newMemberstatus === 'dnd')){
        let tonotify = notifications.tonotify(newMember.id)

        if(!tonotify){// This member has not been requested
            return
        }
        
        var tonotifystring = ''
        for(var i = 0; i < tonotify.length; i++){
            tonotifystring += `<@${tonotify[i]}>, `;
        }
        //Only way I got to do this - for(var arraymember in array) did not work :/

        generalchannel.send(`${tonotifystring}\n${newMember} is now online`);

        notifications.removenotification(newMember.id); //Removes that member from the notifications
    }
})

client.login(process.env.TOKEN); //Logs in using the token