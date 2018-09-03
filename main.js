require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console

const path = require('path'); //To use path

const commando = require("discord.js-commando");
const client = new commando.Client({
    commandPrefix: process.env.PREFIX,
    unknowncommandresponse: false
    })
//Sets generals options for the bot, using the discord.js-commando

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['mod', 'Managment commands - Only usable with the right permissions'],
        ['adverts', 'Advertisements - See what is going on with the bot'],
        ['admin', 'Admin commands - A list of special commands. Proceed with caution']
    ])
    //Add the command groups here
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
//Sets up the default discord.js option

client.on('ready', function () {
    console.log(`Ready`);
    client.user.setActivity('in PS server') //Set's the bot playing status
    //Setup();
});

client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message
});

client.on("guildMemberAdd", (member) => { //Welcome message
    let guild = client.guilds.get(process.env.GUILDID);
    let welcomechannel = guild.channels.get(process.env.WELCOMECHANNELID);
    welcomechannel.send(`Hey ${member}, welcome to ${client.guilds.get(process.env.GUILDID).name}! :peanuts::peanuts::tada:
Please make sure read the ${guild.channels.get('304557023813697536')} & ${guild.channels.get('334704572624797699')} channels to get all the info there is to know about our server !
Enjoy your stay here ${member}! :tada::tada:`);
})

client.login(process.env.TOKEN); //Logs in using the token

function Setup(){ //Overwrites the permissions for the mute rule -- Not working due to the way the server permissions are designed
    let guild = client.guilds.get(process.env.GUILDID);
    let channels = guild.channels
    let roles = guild.roles

    let mutedrole = roles.get(process.env.MUTEROLEID); //Gets the muted role id
    if(!mutedrole){ //If there was no mutedrole found
        guild.createRole({
            name: 'Muted',
            color: 'RED',
        })
        console.log("Created role");
    }
    else{
        console.log("Found the role");
    }

    channels.forEach(element => {
        element.overwritePermissions(mutedrole.id, {'SEND_MESSAGES':false});
    });
    //For all of the channels in the guild, Muted role won't have permission to send messages
    
}