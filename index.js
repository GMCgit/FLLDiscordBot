// require packages
const Discord = require("discord.js");
const fs = require("fs");

// initialise the bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//read commands files
fs.readdir("./cmds", (err, files) => {
  if (err) {
    console.log(err);
  }

  let cmdFiles = files.filter((f) => f.split(".").pop() === "js");

  if (cmdFiles.length === 0) {
    console.log("No files found");
    return;
  }

  cmdFiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    bot.commands.set(props.help.name, props);
  });
});

const prefix = "$";

bot.on("ready", async () => {
  console.log("Hello, im ready");
});

bot.on("message", (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  let msg_array = msg.content.split(" ");
  let command = msg_array[0];
  let args = msg_array.slice(1);

  if (!command.startsWith(prefix)) return;
  if (bot.commands.get(command.slice(prefix.length))) {
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) {
      let UserId = msg.author.id;
      cmd.run(bot, msg, args, UserId).then(() => {
        console.log(`Someone used a commad!`);
      });
    }
  }
});

bot.login(process.env.token);
