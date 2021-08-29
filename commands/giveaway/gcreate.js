const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'gcreate',
    permissions: ['MANAGE_MESSAGES', 'MANAGE_GUILD'],

    async execute(client, interaction) {
        let questions = [
            "How long do you want the giveaway to last?",
            "What would you like to giveaway? Describe only briefly the gift",
            "Now describe longer what exactly you want to give away and what it is for.",
            "How many winners should there be at the end of the giveaway?",
            "What channel do you want this giveaway to be hosted in? \n\nRespond with 'here' to host it in this channel, or respond with '#channel-name' to host it in another channel.",
            "What role/s do you want to ping after the creation? Write: ``everyone`` / ``@role``"
        ]
        let answers = [];



        const time_pattern = /^(\d+((h|H)|(d|D)|(m|M)))+$/;
        let channel;
 
        function askQuestion(i, ask = true) {
            const question = questions[i];



            

            if (ask) interaction.editReply({ embeds: [new Discord.MessageEmbed().setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date()).setColor(Utils.EmbedColors.Default).setTitle(`Giveaway Setup - ${i + 1}/6`).setDescription(question.toString())] })


            
            Utils.waitForResponse(interaction.user.id, interaction.channel)
                .then(msg => {
                    if (['cancel', 'stop'].includes(msg.content)) {



                        return interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Giveaway setup canceled`)] })


                    } else if (i == 0 && !time_pattern.test(msg.content.toLowerCase())) {

                         interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Invalid Time`).setDescription('That format is invalid. Example: ``1d1h1m``. **Please try again.**')] })
                        askQuestion(i, false);
                    } else if (i == 3 && (isNaN(msg.content) || parseInt(msg.content) < 1 || parseInt(msg.content) > 20)) {

                         interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Invalid Winners`).setDescription('The number of winners must be a number. Also a maximum of 20 people may win the giveaway. **Please try again.**')] })
                        askQuestion(i, false);
                    } else if (i == 4) {
                        channel = (msg.content.toLowerCase() == 'here') ? msg.channel : msg.mentions.channels.first() || Utils.findChannel(msg.content, interaction.guild, 'text', false);
                        if (!channel) {

                             interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Invalid Channel`).setDescription('That channel does not exist. **Please try again.**')] })

                            askQuestion(i, false);
                        }
                        else {
                            askQuestion(i + 1);
                        }
                    }
                    else if (i == 5) {
                        if (/<@&(\d{17,19})>/g.test(msg.content)) {
                            answers.push(msg.content);
                            interaction.deleteReply();
                            finishGiveaway();
                        }
                        else if (msg.content == "everyone") {
                            answers.push(`@everyone`);
                            interaction.deleteReply();
                            finishGiveaway();
                        }
                        else {

                             interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Invalid Mention`).setDescription('Sorry, this was invalid!\nMention an ``Role``, or type ``everyone`` to ping everyone in your guild!\n\n**Please try again!**')] })
                            askQuestion(i, false);
                        }
                    }
                    else {
                        answers.push(msg.content);
                        if (i >= questions.length - 1)
                        { 
                            interaction.deleteReply();
                            finishGiveaway();
                        }
                        else
                        {
                             askQuestion(i + 1);
                        }
                    }
                    msg.delete()
                })
        }

        await interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle(`Loading Giveaway Setup..`)]})

        askQuestion(0);

        function finishGiveaway() {








            function getTimeElement(letter) {
                const find = answers[0].toLowerCase().match(new RegExp(`\\d+${letter}`));
                return parseInt(find ? find[0] : 0);
            }
            const mins = getTimeElement("m");
            const hours = getTimeElement("h");
            const days = getTimeElement("d");

            let total = 0;
            total += mins * 60000;
            total += hours * 60 * 60000;
            total += days * 24 * 60 * 60000;
            const endAt = Date.now() + total;



            if (channel.guild.id != interaction.guild.id) {
                return interaction.channel.send(Embed({ preset: 'error', description: "Sorry, you can't create giveaways on other guilds!" }));
            }


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

            channel.send({
                content: answers[4], embeds: [new Discord.MessageEmbed()
                    .setTitle(`${answers[3]}x ${answers[1]}`)
                    .setColor(Utils.EmbedColors.Default)
                    .setDescription(`${answers[2]}\n\n> :tada: Click the **button** below this message to enter the giveaway!\n\u200B\n\u200B\n`)
                    .setFooter('Pepe Discord Bot • Ends on', client.user.displayAvatarURL({ dynamic: true }))
                    .addField("Hosted by", `<@${interaction.user.id}>`, true)
                    .addField("Total winner", answers[3], true)
                    .addField("Total participations", "0", true)
                    .addField("Ending in ", Utils.getTimeDifference(new Date(), new Date(endAt)), true)
                    .addField("Web Page ", `[(Click here)](https://pepebot.info/Giveaway/?${endAt})`, true)
                    .addField("Win chance ", "0%", true)
                    .setTimestamp(endAt)
                ], components: [row]
            }).then(async msg => {





            await client.dbconnection.query('INSERT INTO giveaways(messageID, name, end, winnercount, channel, guild, ended, start, winner, creator, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [msg.id, answers[1], endAt, parseInt(answers[3]), msg.channel.id, interaction.guild.id, false, Date.now(), '[]', interaction.user.id, answers[2]])

 

            const row = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
    
                .setLabel('Click Here')
                .setStyle("LINK")
                .setURL(`https://discord.com/channels/${channel.guild.id}/${channel.id}`)
            );
    
            await interaction.channel.send({ content: `<@${interaction.user.id}>`, embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Giveaway created!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())], ephemeral: true, components: [row] })


            });


        }
    },
};