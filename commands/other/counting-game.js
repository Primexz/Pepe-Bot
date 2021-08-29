const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'counting-game',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {
		const result = await interaction.options.get("channel")
		let clicks = "0"
  
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
		  .setTitle('Counting Game')
		  .setDescription('Click on the Buttons, to push up the count!\n\nCurrent Clicks: **' + clicks + '**')
		  .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
		  .setTimestamp(new Date());
  
  
  
  
  
  
  
  
  
		const resultmsg = await result.channel.send({ embeds: [embed], components: [row] });
		const reply = new Discord.MessageEmbed()
		  .setColor(Utils.EmbedColors.Success)
		  .setTitle('Counting Game Created!')
		  .setDescription(`Successfully created counting-game in channel <#${result.channel.id}>`)
		  .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
		  .setTimestamp(new Date());
  
		client.dbconnection.query("INSERT INTO ButtonCounting (count, msgid, guild) VALUES (?, ?, ?)", ["0", resultmsg.id, interaction.guild.id])
		interaction.reply({ embeds: [reply] })
		
	},
};