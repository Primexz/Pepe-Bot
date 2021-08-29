const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    id: 'counting_button',

	async execute(client, interaction) {
        const databaseinfo = (await client.dbconnection.query("SELECT * FROM ButtonCounting WHERE msgid=? AND guild=?", [interaction.message.id, interaction.guild.id]))[0]
 


        if(!databaseinfo)
          return;
  
        client.dbconnection.query("UPDATE ButtonCounting SET count=? WHERE msgid=? AND guild=?", [databaseinfo.count += 1, interaction.message.id, interaction.guild.id])
        const row = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('counting_button')
              .setLabel('Click me!')
              .setStyle('PRIMARY')
              .setEmoji('⌨️')
          );
        const embed = new Discord.MessageEmbed()
          .setColor(Utils.EmbedColors.Default)
          .setTitle(`${databaseinfo.count} | Counting Game`)
          .setDescription('Click on the Buttons, to push up the count!\n\nCurrent Clicks: **' + databaseinfo.count + '**')
          .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date())
  
        await interaction.message.edit({ embeds: [embed], components: [row] });
        interaction.deferUpdate()
    
    
    },
};