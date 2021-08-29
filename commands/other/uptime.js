const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS

const moment = require("moment");
const m = require("moment-duration-format");

module.exports = {


    name: 'uptime',
    permissions: [],

    async execute(client, interaction) {





       const duration = moment.duration(client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");




        const emb = new Discord.MessageEmbed()
        emb.setTitle("Pepe's current uptime")
        emb.setDescription(`Pepe Discord Bot is online and available since **${duration}**`)
        emb.setColor(Utils.EmbedColors.Default)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())





        interaction.reply({ content: null, embeds: [emb] })
 
    },
};