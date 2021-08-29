const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'invitetop',
    permissions: [],

	async execute(client, interaction) {
	



        const guildInvites = await interaction.guild.invites.fetch();

        const users = [];
        

        if (guildInvites.size < 1) return message.channel.send(Embed({
            title: lang.Other.OtherCommands.Invitetop.Title.replace(/{current-page}/g, page).replace(/{max-pages}/g, 1),
            description: lang.Other.OtherCommands.Invitetop.NoInvites
        }));


        let page = interaction.options.get('page') ? parseInt(interaction.options.get('page').value) : 1


        guildInvites.forEach(async invite => {
            if (!invite.inviter) return;
            const user = users.find(u => u.id == invite.inviter.id);
            if (!user) {
                users.push({
                    id: invite.inviter.id,
                    invites: invite.uses
                })
            } else {
                user.invites += invite.uses;
            }
        })
        if (page > Math.ceil(users.length / 15)) page = 1;
   


        const topUsers = users.sort((a, b) => b.invites - a.invites).slice((page - 1) * 15, 15 * page);




		const emb = new Discord.MessageEmbed()
		emb.setTitle(`Invite Leaderboard (Page ${page}/${Math.ceil(users.length / 15)})`)
		emb.setDescription(topUsers.map((u, i) => `**${i + 1}.** <@${u.id}> - **${u.invites}** invite${u.invites == 1 ? '' : 's'}`).join('\n'))
        emb.setFooter(`Total Invites: ${guildInvites.map(i => i.uses).reduce((acc, curr) => acc + curr)} • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


		interaction.reply({embeds: [emb]})



	},
};