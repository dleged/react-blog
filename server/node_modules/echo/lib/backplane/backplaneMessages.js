var Message = function(){
};

var LoginMessage = function(context){
    this.type = 'identity/login';
    this.source = context;
    this.payload = {
        context: context
    }
};

LoginMessage.prototype = new Message();
LoginMessage.prototype.loadFromRpx = function(rpxPayload){
    var profile = rpxPayload.profile;
    this.payload.entry = {
        accounts: [
            {
                identityUrl: profile.identifier,
                username: profile.preferredUsername,
                emails: [{
                    value: profile.verifiedEmail,
                    primary: true
                }],
                photos: [{
                    value: profile.photo,
                    type: "avatar"
                }]
            }
        ],
        displayName: profile.displayName,
        id: 1
    }
};

exports.Message = Message;
exports.LoginMessage = LoginMessage;