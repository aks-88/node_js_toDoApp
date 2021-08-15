module.exports.getDate= function (){
    var today= new Date();
    var options= {
        weekday:"long",
        day:"numeric",
        month:"long"

    }
    var getDay= today.toLocaleDateString("en-US",options);
    return getDay;

}

module.exports.getDay= function (){
    var today= new Date();
    var options= {
        weekday:"long"

    }
    var getDay= today.toLocaleDateString("en-US",options);
    return getDay;

}