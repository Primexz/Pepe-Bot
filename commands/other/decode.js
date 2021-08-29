const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const weather = require("weather-js")
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'decode',
    permissions: [],

    async execute(client, interaction) {



        const string = interaction.options.get('decodestr').value



      if (
        string.split(" ")
          .map(x => {
            if (isNaN(parseInt(x))) return "true"
            else return "false"
          })
          .includes("true")
      )
        return interaction.reply({ content: 'Please enter an valid binary string!', ephemeral: true })


      let decodedString = string.split(" ")
        .map(x => {
          return String.fromCharCode(parseInt(x, 2))
        }).join("")






            const emb = new Discord.MessageEmbed()
            emb.setColor(Utils.EmbedColors.Default)
            emb.setTitle("Your decoded string:")
            emb.setDescription(decodedString)
            emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
            emb.setTimestamp(new Date())


            interaction.reply({ embeds: [emb] })


    },
};