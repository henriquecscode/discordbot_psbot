require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console

const path = require('path'); //To use path

const notifications = require('./commands/notifications/notificationsstoring.js'); //Imports notificationsstoring's functions
const configs = require('./config.js') //Imports the id configurations

console.log(configs);

const commando = require("discord.js-commando");
const client = new commando.Client({
    commandPrefix: configs.prefix,
    unknowncommandresponse: false
})
//Sets generals options for the bot, using the discord.js-commando

var guild;
var generalchannel;
var suggestionchannel;

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['mod', 'Managment commands - Only usable with the right permissions'],
        ['adverts', 'Advertisements - See what is going on with the bot'],
        ['admin', 'Admin commands - A list of special commands. Proceed with caution'],
        ['notifications', 'Set of notifications commands you can use']
    ])
    //Add the command groups here
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
//Sets up the default discord.js-commando option

client.on('ready', function () {
    console.log(`Ready`);
    client.user.setActivity('in PS server') //Set's the bot playing status

    guild = client.guilds.get(configs.guildid);
    generalchannel = guild.channels.get(configs.generalchannelid);//Gets the generalchannel
    suggestionchannel = guild.channels.get(configs.suggestionschannelid); //Gets the suggestions channel
    
    console.log(`Creating Guild Notifications`);
    let guildusersid = guild.members.keyArray(); //Gets the ids of all the users
    for(var userid of guildusersid){
        notifications.CreateMemberNotifications(userid)
    }
    console.log(`Notifications Created`);
    //Adds the notificationss

});

client.on("message", (message) => {
    if(message.author.bot) return
    message.mentions.members.forEach(element => {
        if(element.roles.has(configs.afkroleid)){
            message.channel.send(`${message.member}, ${element} is now afk. Please try later.`);
        }
    });
    //If the user is afk it will say so
    
});

client.on("guildMemberAdd", (member) => { //Welcome message
    generalchannel.send(`Hey ${member}, welcome to ${client.guilds.get(configs.guildid).name}! :peanuts::peanuts::tada:
Please make sure read the ${guild.channels.get('304557023813697536')} & ${guild.channels.get('334704572624797699')} channels to get all the info there is to know about our server !
Enjoy your stay here ${member}! :tada::tada:`);

    let newcomerrole = guild.roles.get(configs.newcomerroleid);
    member.addRole(newcomerrole.id);
    //Adds the role to the member that has just joined

    notifications.CreateMemberNotifications(member.id);
    //Adds the new members to the notifications
})

client.on("guildMemberRemove", (member) => { //Leave message
    generalchannel.send(`${member} has just left ${guild}`);

    notifications.RemoveMemberNotifications(member.id);
})

client.on("presenceUpdate", (oldMember, newMember) => {
    let oldMemberstatus = oldMember.presence.status
    let newMemberstatus = newMember.presence.status

    if(oldMemberstatus === 'offline' && (newMemberstatus === 'online' || newMemberstatus === 'dnd')){
        let tonotify = notifications.Tonotify(newMember.id)

        if(tonotify.length === 0){// This member has not been requested
            return
        }
        
        var tonotifystring = ''
        for(var i = 0; i < tonotify.length; i++){
            tonotifystring += `<@${tonotify[i]}>, `;
        }
        //Only way I got to do this - for(var arraymember in array) did not work :/

         generalchannel.send(`${tonotifystring}\n${newMember} is now online`);

        notifications.RemoveNotifyme(newMember.id); //Removes that member from the notifications
    }
})

client.login(process.env.TOKEN); //Logs in using the token