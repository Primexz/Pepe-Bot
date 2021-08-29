const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const ms = require("ms");
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'tempban',
    permissions: ['BAN_MEMBERS'],

    async execute(client, interaction) {

        let user;

        try {
            user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch {
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        const reason = await interaction.options.get('reason').value


        const time = await interaction.options.get('time').value


        if (!ms(time))
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`The ban time was invalid!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })



        if (user.user.bot == true)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`You can't punish bots!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

        if (user.id == interaction.member.id)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Uhm, you can't punish yourself.. :=)`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        if (user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("You cannot tempban this user!").addField("__Your highest role position__", `${interaction.member.roles.highest.position}`, true).addField(`__${user.user.username}'s highest role position__`, `${user.roles.highest.position}`, true).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        if (interaction.guild.me.roles.highest.position <= user.roles.highest.position)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`I can't tempban this user because ${user.user.username} highest role is higher than my highest role!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })







        await user.user.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("Banned :=(").setDescription(`Uh no, you got **tempbanned** on **${interaction.guild.name}!**\n\n**Reason:** ${reason}\n**Executor:** <@${interaction.member.id}> (${interaction.user.tag})\n**Ban Length:** ${Utils.DDHHMMSSfromMS(ms(time))}`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        user.ban({ reason: reason });


        let punishment = {
            type: "tempban",
            user: user.id,
            tag: user.user.tag,
            reason: reason,
            time: interaction.createdAt.getTime(),
            executor: interaction.member.id,
            length: ms(time),
            guild: interaction.guild.id,

        }


        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle("User punished!").setDescription(`<@${user.id}> (${user.id}) has been successfully tempbanned by <@${interaction.member.id}>!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })



        setTimeout(function () {
            interaction.guild.members.unban(user, 'Tempban complete • Length: ' + Utils.DDHHMMSSfromMS(ms(time)) + ' • Punished By: ' + interaction.user.tag);

            interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`User Unbanned`).setDescription(`**${user.user.tag}** is no longer banned!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

        }, ms(time));


        await Utils.addPunishment(punishment)




    }
};