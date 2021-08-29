const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'clear',
    permissions: ['MANAGE_MESSAGES'],

    async execute(client, interaction) {


        let channell = await interaction.options.get('channel')
        let channel = channell ? channell.channel : interaction.channel
        let msgamount = interaction.options.get('messageamount').value



        let error = false;



        if (isNaN(msgamount) || parseInt(msgamount) < 1 || parseInt(msgamount) > 500) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Invalid message-count number!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        //await message.delete();


        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle(`Starting deleting messages..`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })



        let amount = parseInt(msgamount) + 1;
        let fullBulkDeleteAmts = new Array(Math.floor(amount / 100));
        let bulkDeleteAmts = [...fullBulkDeleteAmts, (amount - (fullBulkDeleteAmts.length * 100))];

        await Utils.asyncForEach(bulkDeleteAmts, async (amount, i) => {
            if (error) return;
            await channel.bulkDelete(amount ? amount : 100, false).then(messages => {
            }).catch(async err => {
                error = true;
                if (err.code == 50013) return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`The bot don't have enough perms, to bulk delete messages!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                else if (err.code == 50034) return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`You can not delete messages older than 14 days.`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                else {
                    console.log(err)
                    return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`An unknown error occured!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                }
            });
            if ((i + 1) !== bulkDeleteAmts.length) await Utils.delay(2)
        })

        if (!error) return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Successfully deleted ${msgamount} messages!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] }).then(msg => {
            if (msg && !msg.deleted) setTimeout(function () { msg.delete() }, 5000);


            
        });


    }
};