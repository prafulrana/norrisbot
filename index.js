// var Bot = require('slackbots');

// // create a bot
// var settings = {
//     token: process.env.BOT_API_KEY,
//     name: 'My Bot'
// };
// var bot = new Bot(settings);

// bot.on('start', function() {
//     bot.postMessageToUser('praful', 'hello bro!');
// });

// bot.on('message', function(data) {
//     // all ingoing events https://api.slack.com/rtm 
//     bot.postMessageToUser(data.user, 'hi', function(data) {/* ... */});
//     console.log(data);
// });

'use strict'; // Important! This uses many ES6 features.

var slack = require('easy-slackbot'); // or './index' if running locally
var SlackBot = slack.Bot;
var Command = slack.Command;

// Create your custom command
class MyCmd extends Command {
    constructor(commands) {
        // Commands are the commands that will trigger your handler
        // can be 'string' or ['string', 'array']
        super(commands);
    }

    // Override the default handler (!)
    handler(data, ctx, slack, callback) {
        console.log("oh munna" + data);
        // data = incoming message data. I recommend console.logging it
        // ctx = commandtext. Array of words in message. Log it.
        // slack = SlackBot instance. Use it to do slack.getUser(data.user).name
        // callback = call this function with your response message.

        // This scope is NOT MyCmd. It is the SlackBot scope.
        // To access private methods, I recommend making them
        // static and accessing them through `MyCmd.Method()`

        var response = 'Hello there!';
        callback(response);
    }
}

// Set up the bot
var bot = new SlackBot({
    // API Auth token
    token: process.env.BOT_API_KEY,
    // Botname from @botmention
    name: 'My Bot',
    // Provide a onTeamJoin handler
    welcome: function(data) {
        callback('Welcome!');
    },
    // Command prefix
    prefix: '!',
    // Pass any custom commands
    commands: [
        new MyCmd(['hi', 'hello', 'hey']),
    ]
});

// Add an anonymous function if you can't be bothered to
// set up a whole extends Command class.
bot.addCommandDirectly('help', (data, ctx, slack, callback) => {
    console.log("hello");
    callback('Read the docs, *fool*.');
});

// Connect async
bot.connect();
