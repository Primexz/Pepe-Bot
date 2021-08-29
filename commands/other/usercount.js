const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'usercount',
    permissions: [],

    async execute(client, interaction) {



        const members = await interaction.guild.members.fetch();
        const all = interaction.guild.memberCount
        const people = members.filter(m => !m.user.bot).size
        const bots = members.filter(m => m.user.bot).size




        const emb = new Discord.MessageEmbed()
        emb.setAuthor(`${interaction.guild.name} - Usercount`, interaction.guild.iconURL() )
        emb.setColor(Utils.EmbedColors.Default)
        emb.setDescription(`At the moment the server **${interaction.guild.name}** has **${all} members**, of which **${people}** are **real people**, and **${bots}** are **bots**.`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())






        interaction.reply({ content: null, embeds: [emb] })
    },
};