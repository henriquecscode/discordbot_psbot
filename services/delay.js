const timeunits = require('./delaytimeunits.js');

exports.Delay = function (time, timeunit) {
    var duration
    if (time) {//The user has specified a time when setting its afk status
        duration = time
        if (timeunit) { //The user has specified a timeunit
            if(timeunit.startsWith("s")) duration = time
            else if (timeunit.startsWith("m")) duration = time * 60
            else if (timeunit.startsWith("h")) duration = time * 60 * 60
            else if (timeunit.startsWith("d")) duration = time * 24 * 60
            //The delay for the settimeout function is according to the timeunit
        }

        else {
            duration = time * 60 //Time unit is considered to be the minutes
        }

        return new Promise(resolve => { //Waits for time seconds https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
            setTimeout(() => {
                resolve('resolved');
            }, duration*1000);
        })
    }
}

exports.DelaySettings = function (data) {

    var time = null
    var timeunit = null
    var reason = null

    if (data) { //there is data
        data = data.split(/ +/g); //Gets the data to an array

        if (Number.isInteger(Number(data[0]))) { //The user has specified a time
            time = data[0];
            data.splice(0, 1);

            if (data.length > 0) { //The user specified a tim eunit or a reason

                var istimeunit = false; //checks if there is a time unit
                timeunit = data[0].toLowerCase();
                cuttimeunit = timeunit.slice(0,-1);
                for (var newtimeunit of timeunits) { //there was a time unit
                    if (timeunit === newtimeunit || cuttimeunit === newtimeunit) { //Checks if the time unit provided is equal to any of the indicated ones OR so seconds and second are both accepted
                        data.splice(0, 1);
                        istimeunit = true;
                    }
                }
                if (!istimeunit) { //there was no time unit
                    timeunit = null
                }

                if (data.length > 0) { //There was time, timeunit and a reason
                    reason = data.join(' ');
                }
            }
        }
        else { //There was no time just a reason
            reason = data.join(' ');
        }

    }

    return [time, timeunit, reason];
    //Returns the values
}

exports.DurationReason = function(time, timeunit, reason){
    var string  = '';
    if(time){ //Time
        if(timeunit){//
            string +=`Duration: \`${time} ${timeunit}\`\n`;
        }
        else{
            string +=`Duration: \`${time}\`\n`;
        }
    }
    if(reason){
        string +=`Reason: \`${reason}\``;
    }

    return string;
}