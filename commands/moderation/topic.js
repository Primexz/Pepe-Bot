const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'topic',
    permissions: ['MANAGE_CHANNELS'],

    async execute(client, interaction) {



        const topic = interaction.options.get('topic').value

        interaction.channel.setTopic(topic)
        interaction.reply({embeds: [new Discord.MessageEmbed().setTitle("Topic Updated").setDescription(`The channel's topic has been updated to \`\`\`${topic}\`\`\``).setColor(Utils.EmbedColors.Success).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
    }
};