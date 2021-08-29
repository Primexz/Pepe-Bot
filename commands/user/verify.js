const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'verify',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {
	


		const databaseinfo5 = (await client.dbconnection.query("SELECT * FROM verifysystem WHERE guild=?", [interaction.guild.id]))[0]
		if (!databaseinfo5) {
			return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setDescription('You have not configured the verification system, please go to the [dashboard](https://dash.pepebot.info/) and make your desired settings in the verify category!').setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
		}



		
		const row = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton()
				.setCustomId('verify_btn')
				.setLabel('Start Verification')
				.setStyle('PRIMARY')
				.setEmoji('🔓')
		);


		const emb = new Discord.MessageEmbed()
        emb.setAuthor(`${interaction.guild.name} | Verification`, interaction.guild.iconURL())
        emb.setColor(Utils.EmbedColors.Default)
		emb.setDescription(`${databaseinfo5.description}`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


		interaction.reply({components: [row], embeds: [emb]})



	},
};