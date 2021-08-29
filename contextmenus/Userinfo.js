const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    id: 'Userinfo',
    permissions: [],

    async execute(client, interaction) {





        let user = await interaction.guild.members.fetch(interaction.options.getUser('user'))



        let roles = user.roles.cache.map(r => r.toString()).join(", ").replace(", @everyone", "");



        const emb = new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle("User Info").setThumbnail(user.user.displayAvatarURL({ dynamic: true })).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())

        emb.addField("User", `<@${user.id}>`)
        emb.addField("ID", user.id)
        emb.addField("Account created", user.user.createdAt.toLocaleString())
        emb.addField("Guild joined", user.joinedAt.toLocaleString())
        emb.addField("Roles", roles.length == 0 ? 'None' : roles)






        if (user.id == interaction.guild.ownerId)
            emb.addField("Other", "Server Owner");
        else if (user.user.bot)
            emb.addField("Other", "Bot");
        else {

        }


        interaction.reply({ embeds: [emb], ephemeral: true })



    },
};