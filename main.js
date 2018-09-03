require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console
const commando = require("discord.js-commando");
const path = require('path'); //To use path

const client = new commando.Client({
    commandPrefix: process.env.PREFIX,
    unknowncommandresponse: false
    })
//Sets generals options for the bot, using the discord.js-commando

client.registry
    .registerDefaultTypes()
    .registerGroups([
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
//Sets up the default discord.js option

client.on('ready', function () { //Loads the info from the data file - Asyln
    console.log(`Ready`);
    client.user.setActivity('in PS server') //Set's the bot playing status
});

client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message

    if(message.author.bot) return; //If the author of the message is the bot

    if(message.content.startsWith(client.commandoPrefix))
    {
    var content = message.content
    console.log(content);
    content = content.slice(3)
    console.log(content)
    message.channel.send(content);
    }
});

client.login(process.env.TOKEN); //Logs in using the token