const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'greroll',
    permissions: ['MANAGE_MESSAGES', 'MANAGE_GUILD'],

    async execute(client, interaction) {

        const giv_id = interaction.options.get('giveawaymessageid').value




        const giveaway = (await client.dbconnection.query("SELECT * FROM giveaways WHERE messageID = ? AND guild = ?", [giv_id, interaction.guild.id]))[0]


        if (!giveaway || giveaway.guild != interaction.guild.id)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This giveaway don't exist in my database!`).setTimestamp(new Date())] })







        client.guilds.cache.get(giveaway.guild).channels.cache.get(giveaway.channel).messages.fetch(giveaway.messageID).then(async msg => {

            if (!giveaway.ended)
                return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`That giveaway has't ended yet!`).setTimestamp(new Date())] })







            const giv = await client.dbconnection.query("SELECT winner FROM giveaways WHERE messageID=?", [giveaway.messageID])
            let winners = JSON.parse(giv[0].winner)
            let newWinners = [];
            const users = winners;
            const rea = await client.dbconnection.query("SELECT * FROM giveawayentries WHERE giveaway=?", [giveaway.messageID])
            const reactions = rea.map(r => r.user)
            const channel = interaction.guild.channels.cache.get(giveaway.channel)



            if (!channel)
                return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`The giveaway channel don't exists on your guild!`).setTimestamp(new Date())] })


            console.log(reactions.length)

            if (reactions.length == 0)
                return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`No more users joined the giveaway!`).setTimestamp(new Date())] })



        



            if (users.length !== undefined && users.length > 1) {
                await Utils.asyncForEach(users, async userID => {

                    const rea2 = await client.dbconnection.query("SELECT * FROM giveawayentries WHERE giveaway=?", [giveaway.messageID])
                    const updatedReactions = rea2.map(r => r.user)
                    let newWinner = updatedReactions[~~(Math.random() * updatedReactions.length)]
                    newWinners.push(newWinner)
                    await client.dbconnection.query("DELETE FROM giveawayentries WHERE giveaway=? AND user=? AND guild =?", [giveaway.messageID, newWinner, giveaway.guild])
                })

                await end()
                channel.send({content: users.map(u => "<@" + u + ">")}).then(m => client.setTimeout(() => m.delete(), 2500));
            } else {
                winners.splice(winners.indexOf(users.id), 1)
                newWinners = winners
                let newWinner = reactions[~~(Math.random() * reactions.length)];
                newWinners.push(newWinner);
                if (newWinner) await client.dbconnection.query("DELETE FROM giveawayentries WHERE giveaway=? AND user=? AND guild =?", [giveaway.messageID, newWinner, giveaway.guild])

                await end()
                channel.send({content: "<@" + (users.id || users) + ">"}).then(m => client.setTimeout(() => m.delete(), 2500));
            }

            async function end() {


                console.log(newWinners)
                newWinners = newWinners.filter(winner => !!winner);




                channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription(`**New Winners:** ${newWinners.map(u => "<@" + u + ">").join(", ")}\n**Giveaway:** ${giveaway.name}`).setTitle(`🔄 Giveaway Rerolled`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

                


                await msg.edit({
                    embeds: [new Discord.MessageEmbed()
                       .setTitle(`🎉 **GIVEAWAY ENDED** 🎉`)
                       .setColor(Utils.EmbedColors.Default)
                       .setDescription(`**Winner:**\n${newWinners.map(u => "<@" + u + ">").join("\n")}\n\n**Item:** ${giveaway.name}\n**Total participations:** ${reactions.length}\n**Win Chance:** ${((giveaway.winnercount / reactions.length)*100).toFixed(2)} %`)
                       .setFooter('Pepe Discord Bot • Ended on', client.user.displayAvatarURL({ dynamic: true }))
                       .setTimestamp(giveaway.end)
                   ], components: []
                })



                await client.dbconnection.query("UPDATE giveaways SET winner=? WHERE messageID=?", [JSON.stringify(newWinners), giveaway.messageID])
                return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Giveaway successfully rerolled!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
            }




        })


        return



    },
};