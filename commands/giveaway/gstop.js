const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'gstop',
    permissions: ['MANAGE_MESSAGES', 'MANAGE_GUILD'],

    async execute(client, interaction) {




        const giv_id = interaction.options.get('giveawaymessageid').value



        const giveaway = (await client.dbconnection.query("SELECT * FROM giveaways WHERE messageID =? AND guild =?", [giv_id, interaction.guild.id]))[0]



        if (!giveaway || giveaway.guild != interaction.guild.id)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This giveaway don't exist in my database!`).setTimestamp(new Date())] })

        if(giveaway.ended)
        return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This giveaway is already ended!`).setTimestamp(new Date())] })


        const guild = client.guilds.cache.get(giveaway.guild);
        const channel = !!guild ? guild.channels.cache.get(giveaway.channel) : undefined;
        if (!guild || !channel) return;



        channel.messages.fetch(giveaway.messageID).then(async msg => {
            if (!msg || msg.deleted) return await client.dbconnection.query("DELETE FROM giveaways WHERE messageID =? AND guild =?", [giveaway.messageID, giveaway.guild])

            const winners = [];
            const reactionsdb = await client.dbconnection.query("SELECT * FROM giveawayentries WHERE giveaway =? AND guild =?", [giveaway.messageID, giveaway.guild]);
            const reactions = reactionsdb.map(r => r.user)



            if (reactions.length == 0)
            {
                await client.dbconnection.query("UPDATE giveaways SET ended=? WHERE messageID=?", [true, giveaway.messageID])

                await msg.edit({
                    embeds: [new Discord.MessageEmbed()
                       .setTitle(`🎉 **GIVEAWAY ENDED** 🎉`)
                       .setColor(Utils.EmbedColors.Default)
                       .setDescription(`**No one joined!**\n\n**Item:** ${giveaway.name}\n`)
                       .setFooter('Pepe Discord Bot • Ended on', client.user.displayAvatarURL({ dynamic: true }))
                       .setTimestamp(giveaway.end)
                   ], components: []
                })

                return channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`No one joined the giveaway: ${giveaway.messageID}`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
            } 
        


            for (let i = 0; i < giveaway.winnercount; i++) {
                let user = reactions[~~(Math.random() * reactions.length)];
                if(! await guild.members.fetch(user))
                    return;
                winners.push(user);
                reactions.splice(reactions.indexOf(user), 1);
                await client.dbconnection.query("DELETE FROM giveawayentries WHERE giveaway=? AND user=? AND guild =?", [giveaway.messageID, user, giveaway.guild])
            }



            await client.dbconnection.query("UPDATE giveaways SET winner=? WHERE messageID=?", [JSON.stringify(winners), giveaway.messageID])
            await client.dbconnection.query("UPDATE giveaways SET ended=? WHERE messageID=?", [true, giveaway.messageID])



            await msg.edit({
                embeds: [new Discord.MessageEmbed()
                   .setTitle(`🎉 **GIVEAWAY ENDED** 🎉`)
                   .setColor(Utils.EmbedColors.Default)
                   .setDescription(`**Winner:**\n${winners.filter(u => u).map(u => "<@" + u + "> ").join("\n")}\n\n**Item:** ${giveaway.name}\n**Total participations:** ${reactionsdb.length}\n**Win Chance:** ${((giveaway.winnercount / reactionsdb.length)*100).toFixed(2)} %`)
                   .setFooter('Pepe Discord Bot • Ended on', client.user.displayAvatarURL({ dynamic: true }))
                   .setTimestamp(giveaway.end)
               ], components: []
            })




            await channel.send({
                
                embeds: [new Discord.MessageEmbed()
                   .setTitle(`🎉 Giveaway Winners`)
                   .setColor(Utils.EmbedColors.Default)
                   .setDescription(`Congratulations to ${winners.filter(u => u).map(u => "<@" + u + "> ").join(", ")} for winning the giveaway.`)
                   .setFooter('Pepe Discord Bot • Ended on', client.user.displayAvatarURL({ dynamic: true }))
                   .setTimestamp(Date.now())
               ], components: []
            })

            channel.send(winners.filter(u => u).map(u => "<@" + u + ">").join(",")).then(m => client.setTimeout(() => m.delete(), 2500));



            await interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`The giveaway has been successfully stopped!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})


         })


    }
};