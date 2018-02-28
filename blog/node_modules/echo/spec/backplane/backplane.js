var sys = require('sys');
var utils = require('utils.js');

var MockRequest = function(encoded){
    this.headers = {
        authentication: encoded
    };
};

MockRequest.prototype.addListener = function(){};

var MockResponse = function(){
};

MockResponse.prototype.writeHead = function(){};
MockResponse.prototype.end = function(){};


describe('backplane', function(){
    var backplane = require('backplane/backplane.js');
    describe("handler", function(){
        var callback;

        beforeEach(function(){
            spyOn(utils, 'mergeOptions');
            callback = backplane.handler({options: 'I am the options file'});
        });

        it("should call the merge function before returning the callback",function(){
            expect(utils.mergeOptions)
                    .toHaveBeenCalledWith(backplane
                    ,['authHandler','decode64Handler','messageStore']
                    ,{options: 'I am the options file'})
        });

        it("should return a callback",function(){
            expect(typeof callback).toEqual('function');
        });

        describe("bus",function(){
            var req, res;

            beforeEach(function(){
                callback = backplane.handler({});
                req = new MockRequest();
                req.url = '/v1/bus/valid_bus';
                res = new MockResponse();
                spyOn(req,'addListener');
                spyOn(res,'writeHead');
                spyOn(res,'end');
            });

            describe("GET request",function(){
                beforeEach(function(){
                    req.method = "GET";
                    spyOn(backplane.messageStore,'getBusMessages');
                    spyOn(backplane, 'processGetBus').andReturn('process_return');
                    callback(req,res);
                });

                it("should call the processGetChannel",function(){
                    expect(backplane.processGetBus).toHaveBeenCalledWith(res);
                });

                it("should call the messageStore function passing its getMessagesCallback",function(){
                    expect(backplane.messageStore.getBusMessages).toHaveBeenCalledWith('valid_bus','process_return');
                });
            });
        });

        describe("channel",function(){
            var req, res;

            beforeEach(function(){
                callback = backplane.handler({});
                req = new MockRequest();
                req.url = '/v1/bus/valid_bus/channel/valid_channel';
                res = new MockResponse();
                spyOn(req,'addListener');
                spyOn(res,'writeHead');
                spyOn(res,'end');
            });

            describe("POST request",function(){
                beforeEach(function(){
                    req.method = "POST";
                    spyOn(backplane,'validate').andReturn(true);
                    spyOn(backplane, 'processPost').andReturn('process_result');
                    spyOn(backplane, 'postEnd').andReturn('end_result');
                    callback(req,res);
                });

                it('should call the processPost to get the callback',function(){
                    expect(backplane.processPost).toHaveBeenCalledWith(req);
                });

                it('should use processPost result the data event',function(){
                    expect(req.addListener).toHaveBeenCalledWith('data','process_result');
                });

                it("should call the postEnd function to get the callback",function(){
                    expect(backplane.postEnd).toHaveBeenCalledWith(req,res,'valid_bus','valid_channel');
                });

                it('should use postEnd for the end event',function(){
                    expect(req.addListener).toHaveBeenCalledWith('end','end_result');
                });
            });

            describe("GET request",function(){
                beforeEach(function(){
                    req.method = "GET";
                    spyOn(backplane.messageStore,'getChannelMessages');
                    spyOn(backplane, 'processGetChannel').andReturn('process_return');
                    callback(req,res);
                });

                it("should call the processGetChannel",function(){
                    expect(backplane.processGetChannel).toHaveBeenCalledWith(res);
                });

                it("should call the messageStore function passing its getMessagesCallback",function(){
                    expect(backplane.messageStore.getChannelMessages).toHaveBeenCalledWith('valid_bus','valid_channel','process_return');
                });
            });
        });
    });

    describe('connectHandler',function(){
        var callback, req, res, nextWrapper, handlerWrapper;

        beforeEach(function(){
            req = new MockRequest();
            res = new MockResponse();
            nextWrapper = { next: function(){} };
            handlerWrapper = { handler: function(){} };
            spyOn(handlerWrapper,'handler');
            spyOn(backplane, 'handler').andReturn(handlerWrapper.handler);
            spyOn(nextWrapper,'next');
            callback = backplane.connectHandler({options: 'I am the options file'});
        });

        it("should return a callback",function(){
            expect(typeof callback).toEqual('function');
        });

        it("should get the normal handler callback",function(){
            expect(backplane.handler).toHaveBeenCalledWith({options: 'I am the options file'});
        });

        describe('with matching url', function(){
            beforeEach(function(){
                req.url = '/v1/bus/some_bus/channel/some_channel';
                callback(req,res,nextWrapper.next);
            });

            it("should not call next()",function(){
                expect(nextWrapper.next).not.toHaveBeenCalled();
            });

            it("should call the normal handler callback",function(){
                expect(handlerWrapper.handler).toHaveBeenCalledWith(req,res);
            });
        });

        describe('with url it should ignore',function(){
            beforeEach(function(){
                req.url = '/v1/cus/some_bus/channel/some_channel';
                callback(req,res,nextWrapper.next);
            });

            it("should call next()",function(){
                expect(nextWrapper.next).toHaveBeenCalled();
            });
        });
    });

    describe('validate', function(){
        beforeEach(function(){
            spyOn(backplane, 'decode64Handler').andReturn('valid_bus:valid_key');
        });

        describe("with valid key",function(){
            var result;

            beforeEach(function(){
                spyOn(backplane, 'authHandler').andReturn(true);
                result = backplane.validate(new MockRequest('Basic valid_bus:valid_key'));
            });

            it('should call authenticationHandler with passed key',function(){
                expect(backplane.authHandler).toHaveBeenCalledWith('valid_bus','valid_key');
            });

            it('should return true',function(){
                expect(result).toBeTruthy();
            });

            it('should call the decode64Handler',function(){
                expect(backplane.decode64Handler).toHaveBeenCalled();
            });
        });

        describe("with invalid key",function(){
            var result;

            beforeEach(function(){
                spyOn(backplane, 'authHandler').andReturn(false);
                result = backplane.validate(new MockRequest('Basic valid_bus:invalid_key'));
            });

            it('should return false',function(){
                expect(result).toBeFalsy();
            });
        });

        it('should throw exception if header isn not correct',function(){
            var result;
            try
            {
                backplane.validate = backplane.validate(new MockRequest('NotBasic valid_bus:valid_key'));
            }
            catch(err)
            {
                result = err;
            }

            expect(result.name).toEqual("AuthenticationException");
            expect(result.message).toEqual("The backplane library only supports basic Authentication.");
        });
    });

    describe('processPost',function(){
        var callback, req;

        beforeEach(function(){
            req = new MockRequest();
            callback = backplane.processPost(req);
        });

        it('should return a callback function',function(){
            expect(typeof callback).toEqual('function');
        });

        describe("call callback once", function(){
            beforeEach(function(){
                callback('first_chunk');
            });

            it('should return the input string',function(){
                expect(req.content).toEqual('first_chunk');
            });

            describe("call the callback twice", function(){
                beforeEach(function(){
                    callback(',second_chunk');
                });

                it("should concatenate the chunks", function(){
                    expect(req.content).toEqual('first_chunk,second_chunk')
                });
            });

        });

    });

    describe("postEnd", function(){
        var res, callback, req;

        beforeEach(function(){
            res = new MockResponse();
            req = new MockRequest();
            req.content = "valid_message";
            spyOn(backplane.messageStore,'save');
            spyOn(res,'writeHead');
            spyOn(res,'end');
            callback = backplane.postEnd(req,res,'valid_bus','valid_channel');
        });

        it("should return a callback",function(){
            expect(typeof callback).toEqual('function');
        });

        describe("callback", function(){
            var req;
            beforeEach(function(){
                callback();
            });

            it("should write 200 and content type to head",function(){
                expect(res.writeHead).toHaveBeenCalledWith(200,{"Content-Type": "text/plain"})
            });

            it("should call write end",function(){
                expect(res.end).toHaveBeenCalled();
            });

            it('should save new message to messageStore',function(){
                expect(backplane.messageStore.save).toHaveBeenCalledWith('valid_bus','valid_channel','valid_message');
            });
        });
    });

    describe("processChannelGet", function(){
        var callback,res;

        beforeEach(function(){
            res = new MockResponse();
            callback = backplane.processGetChannel(res);
        });

        it("should return a callback", function(){
            expect(typeof callback).toEqual('function');
        });

        describe('call the callback function passing in the mock array of messages',function(){
            beforeEach(function(){
                spyOn(res,'writeHead');
                spyOn(res,'end');
                callback([{ "message": { "x": 1 }, "channel_name": "valid_channel" }
                    ,{ "message": { "x": 2 }, "channel_name": "valid_channel" }]);
            });

            it("should write 200 and content type to head",function(){
                expect(res.writeHead).toHaveBeenCalledWith(200,{"Content-Type": "application/json"})
            });

            it("should call write end",function(){
                expect(res.end).toHaveBeenCalledWith('[{"message":{"x":1},"channel_name":"valid_channel"}' +
                        ',{"message":{"x":2},"channel_name":"valid_channel"}]');
            });
        });
    });


    describe("processGetBus", function(){
        var callback,res;

        beforeEach(function(){
            res = new MockResponse();
            callback = backplane.processGetBus(res);
        });

        it("should return a callback", function(){
            expect(typeof callback).toEqual('function');
        });

        describe('call the callback function passing in the mock array of messages',function(){
            beforeEach(function(){
                spyOn(res,'writeHead');
                spyOn(res,'end');
                callback([{ "message": { "x": 1 }, "channel_name": "valid_channel" }
                    ,{ "message": { "x": 2 }, "channel_name": "another_channel" }]);
            });

            it("should write 200 and content type to head",function(){
                expect(res.writeHead).toHaveBeenCalledWith(200,{"Content-Type": "application/json"})
            });

            it("should call write end",function(){
                expect(res.end).toHaveBeenCalledWith('[{"message":{"x":1},"channel_name":"valid_channel"}' +
                        ',{"message":{"x":2},"channel_name":"another_channel"}]');
            });
        });
    });
});