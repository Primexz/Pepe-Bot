const chalk = require("chalk");
const Utils = require('../modules/utils.js');
const Discord = require('discord.js');

module.exports = async (client, member) => {


    //Age Stuff
    const dbcheck = (await client.dbconnection.query("SELECT * FROM othermodules WHERE guild=?", [member.guild.id]))[0]
    if (dbcheck && dbcheck.altaccountdetection) {
    const age = Date.now() - member.user.createdAt
    if (age < 48 * 1000 * 60 * 60) {



        const emb = new Discord.MessageEmbed()
        emb.setAuthor(`${member.guild.name} | Account Age Check`, member.guild.iconURL())
        emb.setColor(Utils.EmbedColors.Error)
		emb.setDescription(`__**Your account is too young!**__\n\n**${member.guild.name}** requires an minimum account age of 48 hours.\nYour account is: ${(age / 1000 / 60 / 60).toFixed(0)} hours old!`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


		await member.send({embeds: [emb]})

        member.kick(`Invalid Account Age: ${Utils.DDHHMMSSfromMS(age)}`)

        let punishment = {
            type: 'kick',
            user: member.id,
            tag: member.user.tag,
            reason: `Invalid Account Age: ${Utils.DDHHMMSSfromMS(age)}`,
            time: Date.now(),
            executor: client.user.id,
            guild: member.guild.id,
            length: null,
        }

        await Utils.addPunishment(punishment)
        bot.emit('userPunished', punishment, member, bot.user)
    }
    }



    //Welcome Message Stuff
    const ch_data = (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [member.guild.id]))[0]

    if(!ch_data)
        return;

    const ch_msg_toggle = ch_data.ch_toggle
    const ch_msg_channel = ch_data.ch_channel
    const ch_msg_msg = (ch_data.ch_message)


    const dm_msg_toggle = (ch_data.dm_toggle)
    const dm_msg_msg = (ch_data.dm_message)




    if (ch_msg_toggle == 1) {
        const msg_ch = await member.guild.channels.cache.get(ch_msg_channel)
        msg_ch.send({
            embeds: [new Discord.MessageEmbed()
                .setAuthor(`${member.guild.name}`, member.guild.iconURL())
                .setColor(Utils.EmbedColors.Default)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(ch_msg_msg.replace(/{user-mention}/g, `<@${member.user.id}>`).replace(/{user-name}/g, member.user.username).replace(/{user-tag}/g, member.user.tag).replace(/{guild-name}/g, member.guild.name).replace(/{member-count}/g, member.guild.memberCount))
                .setFooter('Pepe Discord Bot', client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp(Date.now())
            ]
        })
    }


    if (dm_msg_toggle == 1) {
        const user = await member.guild.members.fetch(member.id)
        user.send({
            content: `<@${member.user.id}>`,
            embeds: [new Discord.MessageEmbed()
                .setAuthor(`${member.guild.name}`, member.guild.iconURL())
                .setColor(Utils.EmbedColors.Default)
                .setDescription(dm_msg_msg.replace(/{user-mention}/g, `<@${member.user.id}>`).replace(/{user-name}/g, member.user.username).replace(/{user-tag}/g, member.user.tag).replace(/{guild-name}/g, member.guild.name).replace(/{member-count}/g, member.guild.memberCount))
                .setFooter('Pepe Discord Bot', client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp(Date.now())
            ]
        })
    }




}