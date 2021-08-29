const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'ping',
    permissions: [],

	async execute(client, interaction) {

        
        let apiPing = client.ws.ping




        const DBTestStart = Date.now()
        await client.dbconnection.query("SELECT * FROM giveaways")
        const DBTestEnd = Date.now()



        const Start = Date.now()
        interaction.reply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setAuthor(`${client.user.username}'s - Current Ping`, client.user.displayAvatarURL({dynamic: true})).addField("__Websocket Latency__", `:green_circle: ${apiPing}ms`).setDescription(`\n\u200B\n`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
        
        
        .then(msg => {
            const End = Date.now()
            interaction.editReply({embeds: [new Discord.MessageEmbed().setDescription("Here you can see the current delays from the bot.\nThe higher the delays are, the longer it can take until the bot sends a response to your command.").setColor(Utils.EmbedColors.Success).setAuthor(`${client.user.username}'s - Current Ping`, client.user.displayAvatarURL({dynamic: true})).addField("__Websocket Latency__", `:green_circle: ${apiPing} ms / ${(apiPing/1000).toFixed(2)} secs`, true).addField("__Database Latency__", `:green_circle: ${DBTestEnd-DBTestStart} ms / ${((DBTestEnd-DBTestStart)/1000).toFixed(4)} secs`, true).addField("__Bot Latency__", `:green_circle: ${End - Start} ms / ${((End - Start)/1000).toFixed(2)} secs`, true).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
        })
    
    
    
    },
};