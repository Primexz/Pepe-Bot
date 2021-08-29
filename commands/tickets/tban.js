const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'tban',
    permissions: ['MANAGE_GUILD'],

	async execute(client, interaction) {

        let user; 
        
        try {
             user = await interaction.guild.members.fetch(interaction.options.get('banuser').value)
        }
        catch{
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }



        const dbcheck = (await client.dbconnection.query("SELECT * FROM ticket_ban WHERE user=? AND guild=?", [user.id, interaction.guild.id]))[0]
  


        if(!dbcheck)
        {
  
          await client.dbconnection.query("INSERT INTO ticket_ban(user, guild) VALUES(?, ?)", [user.id, interaction.guild.id])
  
          const embed = new Discord.MessageEmbed()
          .setColor(Utils.EmbedColors.Default)
          .setTitle('Pepe - Ticket Manager')
          .setDescription(`Successfully **banned** <@${user.id}> from opening tickets!`)
          .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date());
          interaction.reply({embeds: [embed]})
        }
        else{
          await client.dbconnection.query("DELETE FROM ticket_ban WHERE user=? AND guild=?", [user.id, interaction.guild.id])
  
          const embed = new Discord.MessageEmbed()
          .setColor(Utils.EmbedColors.Default)
          .setTitle('Pepe - Ticket Manager')
          .setDescription(`Successfully **unbanned** <@${user.id}> from opening tickets!`)
          .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date());
          interaction.reply({embeds: [embed]})
  
        }
    
    },
};