var notifications = {}

exports.CreateMemberNotifications = function(userid){
    
        notifications[userid] = {
            tonotify: [],
            afk: {time: null, timeunit: null, reason: null}
        }
}

exports.RemoveMemberNotifications = function(userid){
    notifications.splice(userid,1);
}

exports.LogMemberNotification = function(userid){ //Console logs the notifications detail of that user
    console.log(notifications[userid])
}

exports.Tonotify = function(usermentionedid){ //Member mentioned is the person who got online
    let usernotification = notifications[usermentionedid];
    if(!usernotification) return console.log("User Notifications undefined");
    if(!notifications[usermentionedid].tonotify) return //There has not been a request for that person
    return notifications[usermentionedid].tonotify;
}
//Class function that returns the ids of the people that will be mentioned

exports.AddNotifyme = function(usermentionedid, tonotifyiduser){ //User mentioned is the person who got online and tonotifyid is the user that wants to get notified
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

exports.RemoveNotifyme = function(usermentionedid){ //Removes the notifications for that user
    notifications[usermentionedid].tonotify = [];    
}

exports.AddAfk = function(userid, time, timeunit, reason){ //Adds the afk to that user
    notifications[userid].afk.time = time;
    notifications[userid].afk.timeunit = timeunit;
    notifications[userid].afk.reason = reason;
}

exports.RemoveAfk = async function(userid){ //Removes the afk from that user
    notifications[userid].afk = {time: null, timeunit: null, reason: null}
}

function WaitFor(time){ //Waits for time seconds https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    })
}
