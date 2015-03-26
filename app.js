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

// Not sure if this works but it could be funny at some point.
app.post('/yesman',function(req,res) {

    var reply = slack.respond(req.body,function(hook) {
      Hook = hook.user_name
        return {
            text: 'Good point, ' + hook.user_name,
            username: '#yesman',
            channel: '#general'
        };

    });
    var replyForIngrid = slack.respond(req.body,function(hook){
      Hook = hook.user_name
      return {
        text: 'Seriously Ingrid, you can suck it.',
        username: '#yesman',
        channel: '#general'
      };

    });

    if (Hook === "ing") {
      res.json(replyForIngrid);
    }
    else {
      res.json(reply);
    }
});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
