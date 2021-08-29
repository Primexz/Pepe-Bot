const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'invites',
    permissions: [],

	async execute(client, interaction) {
	



		


		let user;
		try{
		user = interaction.options.get('user') ? await interaction.guild.members.fetch(interaction.options.get('user').value) : interaction.member
		}
		catch {
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }

        let guildInvites = await interaction.guild.invites.fetch();
        let invites = guildInvites.filter(i => {
            if (i.inviter) {
                return i.inviter.id == user.id;
            }
        });
        let count = 0;
        invites.forEach(invite => {
            count += invite.uses;
        })


   

		const emb = new Discord.MessageEmbed()
		emb.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
		emb.setTitle("Invites")
		emb.setDescription(`<@${user.id}> has invited **${count}** ${(count !== 1) ? "people" : "person"} to this server!`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


		interaction.reply({embeds: [emb]})



	},
};