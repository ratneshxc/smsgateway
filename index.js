var request = require('request');

module.exports.checkWorking = msg => "Yo " + msg;

module.exports.msg91SendOne = (authkey, number, message, senderid, route, dialcode) => {
    var url = 'http://api.msg91.com/api/sendhttp.php?authkey=' + authkey + '&mobiles=' + number + '&message=' + message + '&sender=' + senderid + '&route=' + route + '&country=' + dialcode;
    var encodeurl = encodeURI(url);
    request(encodeurl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //check for error
            CheckErrorForMsg91(body, function (response) {
                callback(response);
            });
        }
    });
}

module.exports.msg91SendMultiple = (authkey, numbers, message, senderid, route, dialcode) => {
    numbers.forEach(function (number) {
        var url = 'http://api.msg91.com/api/sendhttp.php?authkey=' + authkey + '&mobiles=' + number + '&message=' + message + '&sender=' + senderid + '&route=' + route + '&country=' + dialcode;
        var encodeurl = encodeURI(url);
        request(encodeurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //check for error
                CheckErrorForMsg91(body, function (response) {
                    callback(response);
                });
            }
        });
    });
}

//check error response for msg91
function CheckErrorForMsg91(body, callback) {
    switch (body) {
        case 'code: 200':
            callback('Ok');
            break;
        case 'code: 101':
            callback('Missing Mobile No.');
            break;
        case 'code: 102':
            callback('Missing Message');
            break;
        case 'code: 103':
            callback('Missing Password');
            break;
        case 'code: 202':
            callback('Invalid Mobile No.');
            break;
        case 'code: 203':
            callback('Invalid Sender ID');
            break;
        case 'code: 207':
            callback('Auth Key Invalid');
            break;
        case 'code: 208':
            callback('IP is black listed');
            break;
        case 'code: 301':
            callback('Not Have Sufficient Balance to Send Sms');
            break;
        case 'code: 302':
            callback('Expired User Account');
            break;
        case 'code: 303':
            callback('Banned User Account.');
            break;
        case 'code: 306':
            callback('This route is currently unavailable');
            break;
        case 'code: 307':
            callback('Schedule time is Incorrect');
            break;
        case 'code: 308':
            callback('Campaign name cannot greater than 32 characters');
            break;
        case 'code: 309':
            callback('Selected group(s) may not belongs to you');
            break;
        case 'code: 310':
            callback('SMS is too long. System pause this request automatically.');
            break;
        case 'code: 311':
            callback('Request discarded because same request was generated twice within 10 seconds.');
            break;
        default:
            callback(body);
    }
}

module.exports.textlocalSendOne = (username, hash, message, number, sender, test) => {
    let url = 'http://api.textlocal.in/send/?' + username + hash + message + number + sender + test;
    let encodeurl = encodeURI(url);
    request(encodeurl, function (error, response, body) {
        if (!error && response.status == 'success') {
            //check for error
            CheckErrorForTextloacl(body, function (response) {
                callback(response);
            });
        }
    });
}

module.exports.textlocalSendMultiple = (username, hash, message, numbers, sender, test) => {
    numbers.forEach(function (number) {
        let url = 'http://api.textlocal.in/send/?' + username + hash + message + number + sender + test;
        let encodeurl = encodeURI(url);
        request(encodeurl, function (error, response, body) {
            if (!error && response.status == 'success') {
                //check for error
                CheckErrorForTextloacl(body, function (response) {
                    callback(response);
                });
            }
        });
    });
}

//check error response for msg91
function CheckErrorForTextloacl(body, callback) {
    switch (body) {
        case 'code: 4':
            callback('No recipients specified');
            break;
        case 'code: 5':
            callback('No message content.');
            break;
        case 'code: 6':
            callback('Message too long.');
            break;
        case 'code: 7':
            callback('Insufficient credits.');
            break;
        case 'code: 8':
            callback('Invalid schedule date.');
            break;
        case 'code: 9':
            callback('Schedule date is in the past.');
            break;
        case 'code: 10':
            callback('Invalid group ID.');
            break;
        case 'code: 11':
            callback('Selected group is empty.');
            break;
        case 'code: 32':
            callback('Invalid number format.');
            break;
        case 'code: 33':
            callback('You have supplied too many numbers.');
            break;
        case 'code: 34':
            callback('You have supplied both a group ID and a set of numbers.');
            break;
        case 'code: 43':
            callback('Invalid sender name.');
            break;
        case 'code: 44':
            callback('No sender name specified.');
            break;
        case 'code: 51':
            callback('No valid numbers specified.');
            break;
        case 'code: 191':
            callback('Schedule time is outside that allowed.');
            break;
        case 'code: 192':
            callback('You cannot send message at this time.');
            break;
        default:
            callback(body);
    }
}