var nyancat = require('./nyancat');
var express = require('express');
var bodyParser = require('body-parser');

var Slack = require('node-slack');
var slack = new Slack('sacky.slack.com','xoxb-4166797680-9ghkpzXYWWbcS6uVysGsFXiN');

var app = express();
var port = process.env.PORT || 3000;


// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });
app.post('/hello', nyancat);
app.post('/yesman',function(req,res) {

    var reply = slack.respond(req.body,function(hook) {

        return {
            text: 'Good point, ' + hook.user_name,
            username: '#yesman',
            channel: '#general'
        };

    });

    res.json(reply);

});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
