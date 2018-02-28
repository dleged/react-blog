describe("backplane messages", function(){
    var backplaneMessages = require('backplane/backplaneMessages.js');
    var Message = backplaneMessages.Message;
    var LoginMessage = backplaneMessages.LoginMessage;

    describe("Message base",function(){
        var message;

        beforeEach(function(){
            message = new Message();
        });

        describe("initialize", function(){
            beforeEach(function(){
                message.initialize('message_type');
            });
        });

        it("should create a well formed message with set parameters", function(){

        });
    });

    describe("identity/login message",function(){
        var message;

        beforeEach(function(){
            message = new LoginMessage('source context');
        });

        it("should be an instance of Message",function(){
            expect(message instanceof Message).toBeTruthy();
        });

        it("should have type 'identity/login'",function(){
            expect(message.type).toEqual('identity/login');
        });

        it("should set the source and payload context",function(){
            expect(message.source).toEqual('source context');
            expect(message.payload.context).toEqual('source context');
        });

        describe("loadFromRpx", function(){
            beforeEach(function(){
                message.loadFromRpx({ profile:
                { name:
                { givenName: 'first'
                    , familyName: 'last'
                    , formatted: 'first last'
                }
                    , photo: 'photo url'
                    , address: { formatted: 'Hong Kong' }
                    , verifiedEmail: 'verified@mail.com'
                    , displayName: 'handle'
                    , preferredUsername: 'username'
                    , url: 'some url'
                    , gender: 'male'
                    , utcOffset: '08:00'
                    , providerName: 'Facebook'
                    , identifier: 'some id url'
                    , email: 'me@mail.com'
                }
                    , limited_data: 'false'
                    , stat: 'ok'
                });
            });

            it("should translate the rpx message into a poco payload", function(){
                expect(message.payload.entry).toEqual({
                    accounts: [
                        {
                            identityUrl: "some id url",
                            username: "username",
                            emails: [{
                                value: "verified@mail.com",
                                primary: true
                            }],
                            "photos": [{
                                value: "photo url",
                                type: "avatar"
                            }]
                        }
                    ],
                    displayName: 'handle',
                    id: 1
                });
            });
        });

    });
});
