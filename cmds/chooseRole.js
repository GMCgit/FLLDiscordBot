const Discord = require("discord.js");

/**
 * @param {Object} bot
 * @param {Object} msg
 * @param {Array} args
 * @param {String} UserId
 */

module.exports.run = async (bot, msg, args, userId) => {
  //🟥 🟦 🟩
  msg.react("🟥");
  msg.react("🟦");
  msg.react("🟩");

  let member = msg.member;

  const RoboGame = msg.guild.roles.cache.find((role) => role.name === "RoboGame");
  const Projekt = msg.guild.roles.cache.find((role) => role.name === "Projekt");
  const CoreValues = msg.guild.roles.cache.find(
    (role) => role.name === "CoreValues"
  );

  const ReactionFilter = (reaction, user) => {
    if (user != "739459677296787506") {
      let tempUser = String(user);
      tempUser = tempUser.slice(0, tempUser.length - 1);
      tempUser = tempUser.slice(1);
      tempUser = tempUser.slice(1);
      if (tempUser === userId) {
        return true;
      }
    }
  };

  const ReactionCollector = msg.createReactionCollector(ReactionFilter, {
    time: 10000,
  });

  ReactionCollector.on("collect", (react, user) => {
    if (react.emoji.name === "🟥") {
      const roleTemp = msg.member.roles.cache.find(
        (role) => role.name === "RoboGame"
      );
      if (roleTemp) {
        member.roles.remove(roleTemp);
      } else {
        member.roles.add(RoboGame);
      }
    } else if (react.emoji.name === "🟦") {
      const roleTemp = msg.member.roles.cache.find(
        (role) => role.name === "Projekt"
      );
      if (roleTemp) {
        member.roles.remove(roleTemp);
      } else {
        member.roles.add(Projekt);
      }
    } else if (react.emoji.name === "🟩") {
      const roleTemp = msg.member.roles.cache.find(
        (role) => role.name === "CoreValues"
      );
      if (roleTemp) {
        member.roles.remove(roleTemp);
      } else {
        member.roles.add(CoreValues);
      }
    }
  });

  ReactionCollector.on("end", () => {
    msg.channel.send("Vrijeme istjeklo!");
  });

  const Help = new Discord.MessageEmbed()
    .setTitle("Kako koristi ovu funkciju")
    .addFields(
      { name: "🟥 - Robo game", value: "S ovim će te dobiti RoboGame role" },
      { name: "🟦 - Projekt", value: "S ovim će te dobiti Projekt role" },
      {
        name: "🟩 - Core values",
        value: "S ovim će te dobiti CoreValues role",
      },
      {
        name: "Ako želiš maknuti role",
        value: "Ako već imaš role koji si odabrao bot će ti ga maknuti ",
      }
    )
    .setColor("RANDOM");
  msg.channel.send(Help);
};

module.exports.help = {
  name: "chooseRole",
};
