const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'automod',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {

		await Utils.guildDataBaseSetup(interaction.guild)

		const databaseinformation = (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [interaction.guild.id]))[0]
  
		if(!databaseinformation)
		  return;
  
		let antiadvertise = databaseinformation.advertise
		let antispam = databaseinformation.spam
		let antimassmention = databaseinformation.massmention
		let antiselfbot = databaseinformation.selfbot
  
  
  
  
		const row = new Discord.MessageActionRow()
		  .addComponents(
			new Discord.MessageButton()
			  .setCustomId('toggle_advertise')
			  .setLabel('Anti Advertise')
			  .setStyle(antiadvertise ? 'SUCCESS' : 'DANGER')
			  .setEmoji('🛡️')
		  )
		  .addComponents(
			new Discord.MessageButton()
			  .setCustomId('toggle_spam')
			  .setLabel('Anti Spam')
			  .setStyle(antispam ? 'SUCCESS' : 'DANGER')
			  .setEmoji('🛡️')
		  )
		  .addComponents(
			new Discord.MessageButton()
			  .setCustomId('toggle_mention')
			  .setLabel('Anti Mass Mention')
			  .setStyle(antimassmention ? 'SUCCESS' : 'DANGER')
			  .setEmoji('🛡️')
		  )
		  .addComponents(
			new Discord.MessageButton()
			  .setCustomId('toggle_selfbot')
			  .setLabel('Anti Selfbot')
			  .setStyle(antiselfbot ? 'SUCCESS' : 'DANGER')
			  .setEmoji('🛡️')
		  );
  
		const embed = new Discord.MessageEmbed()
		  .setColor(Utils.EmbedColors.Default)
		  .setTitle('Pepe - Auto Moderation')
		  .setDescription('Here, you can easily setup all auto moderation features, by toggeling them on and off!\n\n**Better configuration on the [Dashboard](https://dashboard.pepebot.info)**')
		  .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
		  .setTimestamp(new Date());
  
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};