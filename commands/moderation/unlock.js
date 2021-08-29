const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'unlock',
    permissions: ['MANAGE_CHANNELS'],

    async execute(client, interaction) {

 
        let result = (await client.dbconnection.query("SELECT * FROM lockedchannels WHERE guild =?", [interaction.guild.id])).find(b => b.CH_ID == interaction.channel.id);




        if (!result)  return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("This channel isn't locked!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        


        client.cachedChannelOverwrites = new Map();
        client.cachedChannelOverwrites.set(interaction.channel.name, interaction.channel.permissionOverwrites)
    
        let overwrites = [];
        await Utils.asyncForEach(interaction.guild.roles.cache, async (r, i) => {


        overwrites.push({ id: r.id, allow: ['SEND_MESSAGES'] });
        });
    
        await interaction.channel.permissionOverwrites.set(overwrites).catch(console.log);
    

        await client.dbconnection.query("DELETE FROM lockedchannels WHERE CH_ID =? AND guild =?", [interaction.channel.id, interaction.guild.id])


        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: Lockdown mode **DISABLED**").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


    }
};