var express = require('express');
var wechat = require('wechat');

var app = express();

var config = {
    token: 'chen2momo',
    appid: 'wxef0ce5031f519532',
    encodingAESKey: 'uFpF9v7iWERItPZhRwTdvUo0lFXqiwPuiBkcUlPd8MQ'
};

app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
}));

app.get('/test',function(req, res)
{
    res.send('Hello World!');
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});