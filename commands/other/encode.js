const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const weather = require("weather-js")
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'encode',
    permissions: [],

    async execute(client, interaction) {



        const string = interaction.options.get('encodestr').value

        let encodedString = string.split("").map(x => x.charCodeAt(0).toString(2)).join(" ");



            const emb = new Discord.MessageEmbed()
            emb.setColor(Utils.EmbedColors.Default)
            emb.setTitle("Your binary string:")
            emb.setDescription(encodedString)
            emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
            emb.setTimestamp(new Date())


            interaction.reply({ embeds: [emb] })


    },
};