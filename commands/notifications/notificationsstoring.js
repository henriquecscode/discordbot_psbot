
var notifications = {}

exports.tonotify = function(membermentionedid){ //Member mentioned is the person who got online

    if(!notifications[membermentionedid]) return //There has not been a request for that person
    return notifications[membermentionedid].tonotify;
}
//Class function that returns the ids of the people that will be mentioned

exports.addnotification = function(membermentionedid, tonotifyidmember){ //Member mentioned is the person who got online and tonotifyid is the member that wants to get notified
    let tonotifyidarray = notifications[membermentionedid];
    if (!tonotifyidarray) { //There hasn't been a request for this member yet
        notifications[membermentionedid] = {tonotify: []}; //Creates an object in the index membermneionted id with the property tonotify, which is an array
        notifications[membermentionedid].tonotify.push(tonotifyidmember); //Adds a value to the tonotify array
        return 'success'
    }

    for (var i = 0; i < tonotifyidarray.tonotify.length; i++) {
        console.log('inside the loop');
        if (tonotifyidarray.tonotify[i] === tonotifyidmember) { //That person has already made that request
            return 'duplicated' //Returns duplicated
        }
    }
    //Checks for a duplicated notification request

    tonotifyidarray.tonotify.push(tonotifyidmember);
    return 'success'

}

exports.removenotification = function(membermentionedid){ //Removes the notifications for that member
    console.log(Array.isArray(notifications));
    delete notifications[membermentionedid];    
}
