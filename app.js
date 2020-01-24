const Discord = require('discord.js');
const client = new Discord.Client();
const secrets = require('./secrets.json')
const fs = require('fs');
const request = require('request');

const cb = (msg) => {
    msg.reply(msg)
}

const download = (url, name) => {
    const file = fs.createWriteStream(`./images/${name}`);
    const sendReq = request.get(url);

    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        sendReq.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request errors
    sendReq.on('error', (err) => {
        fs.unlink(`./images/${name}`);
        return cb(err.message);
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(`./images/${name}`); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
};








client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    if (msg.member.user.tag !== 'ottg-discord#9373') msg.reply('Pong!');
  }
});


client.on(`message`, msg => {

    if (msg.member.user.tag === client.user.tag) {
        return
    }


    if(msg.attachments){//checks if an attachment is sent

        msg.reply('this message has an attachment')

        msg.reply(msg.attachments.name)
        msg.reply(msg.attachments.name)

        const file = fs.createWriteStream(`./images`);
        file.on('finish', () => file.close(cb));

        if(msg.attachments.name === `png`){//Download only png (customize this)

            msg.reply('this attachment is a png')

            download(msg.attachments.url, `${msg.author}-1.png`);//Function I will show later
        }
    }



});

client.on('message', msg => {

    console.log(msg.member.user.id)
    // if (client. === 'ping') {
    //   msg.reply('Pong!');
    // }

    if (msg.member.user.tag !== 'ottg-discord#9373') msg.reply(`Hello ${msg.member.user.tag}`)

  });



  




client.login(secrets.token);