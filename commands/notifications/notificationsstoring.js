var notifications = {}

exports.CreateMemberNotifications = function (userid) {

    notifications[userid] = {
        tonotify: [],
        afk: { time: null, timeunit: null, reason: null },
        mute: { time: null, timeunit: null, reason: null },
        reminder: { size: 0, data: [] }, //Can have multiple reminders, therefore, every reminder must have a time, a time unit and a res
    }
}

exports.RemoveMemberNotifications = function (userid) {
    notifications[userid] = null
}

exports.LogMemberNotification = function (userid) { //Console logs the notifications detail of that user
    console.log(notifications[userid])
}

exports.Tonotify = function (usermentionedid) { //Member mentioned is the person who got online
    let usernotification = notifications[usermentionedid];
    if (!usernotification) return console.log("User Notifications undefined");
    if (!notifications[usermentionedid].tonotify) return //There has not been a request for that person
    return notifications[usermentionedid].tonotify;
}
//Class function that returns the ids of the people that will be mentioned

exports.AddNotifyme = function (usermentionedid, tonotifyiduser) { //User mentioned is the person who got online and tonotifyid is the user that wants to get notified
    let usernotification = notifications[usermentionedid];

    for (var i = 0; i < usernotification.tonotify.length; i++) {
        if (usernotification.tonotify[i] === tonotifyiduser) { //That person has already made that request
            return 'duplicated' //Returns duplicated
        }
    }
    //Checks for a duplicated notifyme request

    usernotification.tonotify.push(tonotifyiduser);
    return 'success'

}

exports.RemoveNotifyme = function (usermentionedid) { //Removes the notifications for that user
    notifications[usermentionedid].tonotify = [];
}

exports.ToAfk = function (userid) { //Returns the afk status as an array
    return [notifications[userid].afk.time, notifications[userid].afk.timeunit, notifications[userid].afk.reason];
}

exports.AddAfk = function (userid, time, timeunit, reason) { //Adds the afk to that user
    let afkstatus = notifications[userid].afk;

    return status = AddNotification(afkstatus, time, timeunit, reason);
}

exports.RemoveAfk = async function (userid) { //Removes the afk from that user
    notifications[userid].afk = { time: null, timeunit: null, reason: null }
}

exports.ToMute = function (userid) { //Returns the mute status as an array
    return [notifications[userid].mute.time, notifications[userid].mute.timeunit, notifications[userid].mute.reason];
}

exports.AddMute = function (userid, time, timeunit, reason) { //Adds the mute to that user
    let mutestatus = notifications[userid].mute;

    return status = AddNotification(mutestatus, time, timeunit, reason);
}

exports.RemoveMute = function (userid) { //Removes the mute from that user
    notifications[userid].mute = { time: null, timeunit: null, reason: null }
}

exports.ToRemind = function (userid) { //Returns the reminder from that user
    let allreminders = [];
    let onereminder = [];
    let index = 0;
    for (var reminder of notifications[userid].reminder.data) {

        index = (index+1) % 4 //there are 4 items in the data
        if (reminder) { //There is a reminder
            onereminder.push(reminder);
        }
        if(index === 0){ //We have obtained all 4 data
            allreminders.push(onereminder);
            onereminder = [];
        }
    }
    return allreminders
}

exports.AddRemind = function (userid, time, timeunit, reason, date) { //Adds a reminder to the reminders array
    notifications[userid].reminder.size++; //Increases the number of reminders

    notifications[userid].reminder.data.push(time, timeunit, reason, date); //Addds to the array of reminders

    return notifications[userid].reminder.size - 1 //Returns the index of the reminder so I can use it in the removal
}

exports.RemoveRemind = function (userid, index) {
    //The size does not change since the reminders are added to the end of the array even if others reminders have been eliminated
    
    notifications[userid].reminder.data = notifications[userid].reminder.data.slice(index, 1);
}

function AddNotification(notification, time, timeunit, reason) { //Adds the status data to the notification object
    if (notification.time === time && notification.timeunit === timeunit && notification.reason === reason) {
        //The user has said the same thing twice
        return 'duplicated'
    }
    //else if ((notification.time !== time || notification.timeunit !== timeunit || notification.reason !== reason) && (notification.time || notification.timeunit || notification.reason)) {
    else if (!notification.time && !notification.timeunit && !notification.reason) { //There is no status yet
        notification.time = time;
        notification.timeunit = timeunit;
        notification.reason = reason;
        return 'created'
    }
    else {
        //An update occurs when a variable is changed (first part of the condition) AND there was already data in the status
        //The user has updated its afk status
        notification.time = time;
        notification.timeunit = timeunit;
        notification.reason = reason;
        return 'updated'
    }
}
