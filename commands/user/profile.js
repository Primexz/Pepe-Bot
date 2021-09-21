const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'profile',
    permissions: [],

	async execute(client, interaction) {
	



		


		let user;
		try{
		user = interaction.options.get('user') ? await interaction.guild.members.fetch(interaction.options.get('user').value) : interaction.member
		}
		catch {
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        const dbstats = (await client.dbconnection.query("SELECT * FROM statistics WHERE user = ? AND guild = ?", [user.id, interaction.guild.id]))[0]

		
        const { xp, level } = await Utils.getExperience(user);




        let xpBar = "[";

        const levelXp = ~~(level * (175 * level) * 0.5);
        const percent = (xp / levelXp) * 100;

        const filledBars = ~~(percent / 5);

        if (filledBars > 0) {
            xpBar += "**";

            let i = 0;
            while (i < filledBars) {
                xpBar += "=";
                i++;
            }

            xpBar += "**" + "=".repeat((20 - filledBars) || 0) + "]";
        } else {
            xpBar += "=".repeat(20) + "]";
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
        emb.setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }) )
		emb.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        emb.setColor(Utils.EmbedColors.Default)
		emb.setTitle(":bar_chart: Profile")
		emb.setDescription(`${xpBar} **${~~percent}%** to level ${level + 1}`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())
        emb.addFields(
            {name: ":arrow_right: Level", value: `${level}`, inline: true},
			{name: ":sparkles: XP", value: `${xp}`, inline: true},
			{name: ":sparkles: XP to next level", value: `${levelXp - xp}`, inline: true},
			{name: ":incoming_envelope: Messages Sent", value: `${dbstats ? dbstats.totalmsgs : 0}`, inline: true},
			{name: ":gear: Commands executed", value: `${dbstats ? dbstats.totalcmds : 0}`, inline: true},
			{name: ":tickets: Tickets opened", value: `${dbstats ? dbstats.tickets : 0}`, inline: true},
			{name: ":mailbox_with_mail: Invites", value: `${count}`, inline: true},
        )

		interaction.reply({embeds: [emb]})



	},
};
