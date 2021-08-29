const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'slowmode',
    permissions: ['MANAGE_CHANNELS'],

    async execute(client, interaction) {



        const opts = interaction.options.get('toggle')


        if (opts.options.get("off")) {
            interaction.channel.setRateLimitPerUser(0, `Slowmode disabled by ${interaction.user.tag}`);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: The slow mode in this channel has been successfully deactivated!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }
        else if (opts.options.get("on")) {
            const time = opts.options.get("on").options.get("time").value


            if (time > 21600)
                return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: Sorry, Discord's API allows a maximum slowmode of 6 hours | 21600 seconds!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

            interaction.channel.setRateLimitPerUser(time, `Slowmode enabled by ${interaction.user.tag}`);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`:white_check_mark: The slow mode in this channel was successfully activated, and the rate limit was set to ${time} seconds!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }
        else {
            console.log("Invalid Sub Command from slowmode recieved!")
        }
    }
};