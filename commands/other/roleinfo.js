const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'roleinfo',
    permissions: ['MANAGE_ROLES'],

    async execute(client, interaction) {


        let role;
        try {
            role = await interaction.guild.roles.cache.get(interaction.options.get('role').value)
        }
        catch {
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this role on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        const members = role.members
            .array()
            .slice(0, 12)
            .map((member, i) => {
                if (i == 11) return '...'
                return ' <@' + member.user.id + '>'
            });




        const emb = new Discord.MessageEmbed().setDescription(`<@&${role.id}>`).setColor(role.hexColor).setTitle("Role Info").setFooter(`Role ID: ${role.id} • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())

        emb.addField("Created On", role.createdAt.toLocaleString(), true)
        emb.addField("\u200B", `\u200B`, true)
        emb.addField("Role Position", role.rawPosition.toString(), true)
        emb.addField("Permissions", role.permissions.toArray().map(perm => perm.toLowerCase().replace(/_/g, ' ')).join(", ") || "None", true)
        emb.addField("\u200B", `\u200B`, true)
        emb.addField(`Members [${role.members.size ? role.members.size : 0}]`, members && members.length ? members.join("") : "None", true)

        interaction.reply({ embeds: [emb] })
    },
};