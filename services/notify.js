const notifications = require('../commands/notifications/notificationsstoring.js');

exports.DoNotify = function (generalchannel, mentioned){
    let tonotify = notifications.Tonotify(mentioned.id)

    if (tonotify.length === 0) {// This member has not been requested
        return
    }

    var tonotifystring = ''
    for (var i = 0; i < tonotify.length; i++) {
        tonotifystring += `<@${tonotify[i]}>, `;
    }
    //Only way I got to do this - for(var arraymember in array) did not work :/

    generalchannel.send(`${tonotifystring}\n${mentioned} is now online`);

    notifications.RemoveNotifyme(mentioned.id); //Removes that member from the notifications
}