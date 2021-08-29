const Utils = require('../utils');
const Discord = require('discord.js');


module.exports = async function (client) {
    const Giveaways = await client.dbconnection.query("SELECT * FROM giveaways WHERE ended != 1")



    Giveaways.forEach(async giveaway => {

 
        const guild = client.guilds.cache.get(giveaway.guild);
        const channel = !!guild ? guild.channels.cache.get(giveaway.channel) : undefined;
        if (!guild || !channel) return;
    

   
        if (giveaway.end <= Date.now() && !giveaway.ended) {


            
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

                channel.send(winners.filter(u => u).map(u => "<@" + u + ">").join(",")).then(m =>  setTimeout(function () {m.delete()}, 2500));


             })


            //  .catch(async err => {
            //     //     return await Utils.variables.db.update.giveaways.deleteGiveaway(giveaway.messageID);
            //     // })

        } else if (!giveaway.ended) {



            channel.messages.fetch(giveaway.messageID).then(async msg => {

                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('giv_entry')
                        .setLabel('Enter Giveaway')
                        .setStyle('PRIMARY')
                        .setEmoji('🎉'))
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('giv_leave')
                        .setLabel('Leave Giveaway')
                        .setStyle('DANGER')
                        .setEmoji('⬅️')
                );



        const reactionsdb = await client.dbconnection.query("SELECT * FROM giveawayentries WHERE giveaway =? AND guild =?", [giveaway.messageID, giveaway.guild]);


      
 
            await msg.edit({
                 embeds: [new Discord.MessageEmbed()
                    .setTitle(`${giveaway.winnercount}x ${giveaway.name}`)
                    .setColor(Utils.EmbedColors.Default)
                    .setDescription(`${giveaway.description}\n\n> :tada: Click the **button** below this message to enter the giveaway!\n\u200B\n\u200B\n`)
                    .setFooter('Pepe Discord Bot • Ends on', client.user.displayAvatarURL({ dynamic: true }))
                    .addField("Hosted by", `<@${giveaway.creator}>`, true)
                    .addField("Total winner", giveaway.winnercount.toString(), true)
                    .addField("Total participations", Utils.betterInteger(reactionsdb.length), true)
                    .addField("Ending in ", Utils.getTimeDifference(new Date(), new Date(giveaway.end)), true)
                    .addField("Web Page ", `[(Click here)](https://pepebot.info/Giveaway/?${giveaway.end})`, true)
                    .addField("Win chance ", `${((giveaway.winnercount / reactionsdb.length.toString())*100).toFixed(2)} %`, true)
                    .setTimestamp(giveaway.end)
                ], components: [row]
            })

                
            })

        }
    })
    return module.exports;
}
// 268921   8501   2264617    63250   1621556358   98b92d11c290961ffb72ae1af511cf55a8b1cfda   2264617