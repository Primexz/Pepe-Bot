const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'tictactoe',
    permissions: [],

    async execute(client, interaction) {



        await interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle("Loading TicTacToe..").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })




        let spacing = " "
        let board = [
            [Utils.getEmoji(1) + spacing, Utils.getEmoji(2) + spacing, Utils.getEmoji(3) + spacing],
            [Utils.getEmoji(4) + spacing, Utils.getEmoji(5) + spacing, Utils.getEmoji(6) + spacing],
            [Utils.getEmoji(7) + spacing, Utils.getEmoji(8) + spacing, Utils.getEmoji(9) + spacing],
        ]
        let emojis = [[Utils.getEmoji(1), Utils.getEmoji(2), Utils.getEmoji(3)], [Utils.getEmoji(4), Utils.getEmoji(5), Utils.getEmoji(6)], [Utils.getEmoji(7), Utils.getEmoji(8), Utils.getEmoji(9)]]
        let flattenedEmojis = Array.prototype.concat.apply([], emojis)

        async function checkBoard() {
            let gameOver = false;
            let isTie = false;

            // Horizontal check
            board.forEach(async row => {
                row = row.join('').replace(/\s+/g, '')
                if (row.includes('222') || row.includes('111')) {
                    gameOver = true;
                }
            })

            // Vertical check
            for (let i = 0; i <= 2; i++) {
                let column = `${board[0][i]}${board[1][i]}${board[2][i]}`.replace(/\s+/g, '')
                if (column.includes('111') || column.includes('222')) {
                    gameOver = true;
                }
            }

            // Diagnol check
            let diagnols = [
                `` + board[0][0] + board[1][1] + board[2][2],
                `` + board[0][2] + board[1][1] + board[2][0]
            ]

            await Utils.asyncForEach(diagnols, async diagnol => {
                diagnol = diagnol.replace(/\s+/g, '')
                if (diagnol.includes('111') | diagnol.includes('222')) {
                    gameOver = true;
                }
            })

            // Tie check
            let fullBoard = board.map(row => row.join("")).join("\n");
            if (!gameOver) {
                if (flattenedEmojis.every(emoji => !fullBoard.includes(emoji))) {
                    isTie = true;
                    gameOver = true;
                }
            }

            return {
                over: gameOver,
                tie: isTie
            };
        }




        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('accept_tictactoe')
                .setLabel('Accept Invite')
                .setEmoji("✔️")
                .setStyle('SUCCESS'))
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('deny_tictactoe')
                .setLabel('Deny Invite')
                .setEmoji("❌")
                .setStyle('DANGER')
        );




    const TicFields = [new Discord.MessageButton().setCustomId(Utils.getEmoji(1)).setEmoji("1️⃣").setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(2)).setEmoji('2️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(3)).setEmoji('3️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(4)).setEmoji('4️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(5)).setEmoji('5️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(6)).setEmoji('6️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(7)).setEmoji('7️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(8)).setEmoji('8️⃣').setStyle('SECONDARY'), new Discord.MessageButton().setCustomId(Utils.getEmoji(9)).setEmoji('9️⃣').setStyle('SECONDARY')]

    const tic1 = new Discord.MessageActionRow()
        .addComponents(TicFields[0])
        .addComponents(TicFields[1])
        .addComponents(TicFields[2]);
    const tic2 = new Discord.MessageActionRow()
        .addComponents(TicFields[3])
        .addComponents(TicFields[4])
        .addComponents(TicFields[5]);
    const tic3 = new Discord.MessageActionRow()
        .addComponents(TicFields[6])
        .addComponents(TicFields[7])
        .addComponents(TicFields[8]);


    function disableComponent(reaction)
    {
        const checkvalue = flattenedEmojis.indexOf(reaction.customId) + 1
        if (checkvalue <= 3)
            (tic1.components.find(shit => shit.customId == Utils.getEmoji(checkvalue))).setDisabled(true)
        else if (checkvalue <= 6 && checkvalue > 3)
            (tic2.components.find(shit => shit.customId == Utils.getEmoji(checkvalue))).setDisabled(true)
        else if (checkvalue <= 9 && checkvalue > 6)
            (tic3.components.find(shit => shit.customId == Utils.getEmoji(checkvalue))).setDisabled(true)
    }




        async function addIntoSlot(slot, turn) {
            return new Promise(async (resolve, reject) => {
                let row;
                if ([0, 1, 2].includes(slot)) row = 0;
                if ([3, 4, 5].includes(slot)) row = 1;
                if ([6, 7, 8].includes(slot)) row = 2;
                slot = slot - (row * 3);

                if (!['❌', '⭕'].includes(board[row][slot])) {
                    board[row][slot] = turn + spacing;
                    return resolve('success');
                } else reject('column full')
            })
        }






        
        let user;
        try {
            user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch {
            return interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        if (user.id == interaction.user.id || user.user.bot)
            return interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: You can not play TicTacToe with yourself or an bot!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })



        let alrdycheck = []
        


        interaction.channel.send(`<@${user.id}>`).then(m => m.delete());



        interaction.editReply({ components: [row], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription("{user} has invited you to play Tic-Tac-Toe! Do you agree to join? You have 60 seconds to accept the invite.".replace(/{user}/g, `<@${interaction.user.id}>`)).setTitle("Tic-Tac-Toe Invitation").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
            .then(async m => {


                const filter = m => m.user.id == user.id

                await m.awaitMessageComponent({ filter, max: 1, time: 60000, errors: ['time'] }).then(async reaction => {

                    reaction.deferUpdate()


                    if (reaction.customId == "deny_tictactoe") {
                        interaction.channel.send(`<@${interaction.user.id}>`).then(m => m.delete());
                        interaction.editReply({ components: [], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setDescription("{user} did not agree to play Tic-Tac-Toe!".replace(/{user}/g, `<@${user.id}>`)).setTitle("TicTacToe canceld!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                    } else {



                        let gameOver = false;
                        let players = { 1: interaction.member, 2: user };
                        let turn = 2;



                        interaction.editReply({ components: [tic1, tic2, tic3,], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription("❌ {player-1} **vs** ⭕ {player-2}\n\n{board}\n\n**Turn:**\n{turn}".replace(/{player-1}/g, `<@${players[1].id}>`).replace(/{player-2}/g, `<@${players[2].id}>`).replace(/{board}/g, board.map((row, i) => row.join("")).join("\n").replace(/1 /g, '❌' + spacing).replace(/2 /g, '⭕' + spacing)).replace(/{turn}/g, `${turn == 1 ? "❌" : "⭕"} <@${players[turn].id}>`)).setTitle("Tic-Tac-Toe").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

                            .then(async msg => {

                                while (!gameOver) {


                                    await interaction.editReply({ components: [tic1, tic2, tic3,], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription("❌ {player-1} **vs** ⭕ {player-2}\n\n{board}\n\n**Turn:**\n{turn}".replace(/{player-1}/g, `<@${players[1].id}>`).replace(/{player-2}/g, `<@${players[2].id}>`).replace(/{board}/g, board.map((row, i) => row.join("")).join("\n").replace(/1 /g, '❌' + spacing).replace(/2 /g, '⭕' + spacing)).replace(/{turn}/g, `${turn == 1 ? "❌" : "⭕"} <@${players[turn].id}>`)).setTitle("Tic-Tac-Toe").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })



                                    const filter = m => m.user.id == players[turn].id

                                    await msg.awaitMessageComponent({ filter, max: 1 }).then(async reaction => {

                                        reaction.deferUpdate()



                                        disableComponent(reaction)

                                        //Mayby DisableComponent Bypass Fix
                                        if(alrdycheck.includes(reaction.customId))
                                            return;

                                        alrdycheck.push(reaction.customId)



                                        await addIntoSlot(flattenedEmojis.indexOf(reaction.customId), turn).then(async res => {

                                            let boardStatus = await checkBoard();
                                            if (boardStatus.over == true) {



                                                if (boardStatus.tie) {
                     

                                                    await interaction.editReply({ components: [], embeds: [new Discord.MessageEmbed().setColor("#fca903").setDescription("❌ {player-1} **vs** ⭕ {player-2}\n\n{board}\n\n**WINNER:**\n{winner}".replace(/{player-1}/g, `<@${players[1].id}>`).replace(/{player-2}/g, `<@${players[2].id}>`).replace(/{board}/g, board.map((row, i) => row.join("")).join("\n").replace(/1 /g, '❌' + spacing).replace(/2 /g, '⭕' + spacing)).replace(/{winner}/g, "Tie")).setTitle("TicTacToe | GAME OVER").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

                                                    await interaction.channel.send({ components: [], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription("GG! It was a tie {player-1} and {player-2}!".replace(/{player-1}/g, `<@${players[turn].id}>`).replace(/{player-2}/g, `<@${players[(turn == 1 ? 2 : 1)].id}>`)).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                                                } else {


                                                    await interaction.editReply({ components: [], embeds: [new Discord.MessageEmbed().setColor(turn == 1 ? '#e03131' : '#ffe600').setDescription("❌ {player-1} **vs** ⭕ {player-2}\n\n{board}\n\n**WINNER:**\n{winner}".replace(/{player-1}/g, `<@${players[1].id}>`).replace(/{player-2}/g, `<@${players[2].id}>`).replace(/{board}/g, board.map((row, i) => row.join("")).join("\n").replace(/1 /g, '❌' + spacing).replace(/2 /g, '⭕' + spacing)).replace(/{winner}/g, `${turn == 1 ? "❌" : "⭕"} <@${players[turn].id}>`)).setTitle("TicTacToe | GAME OVER").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

    
                                                    await interaction.channel.send({ components: [], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setDescription("🎉🎉 Congrats! {winner}, you won the Tic-Tac-Toe game against {loser} 🎉🎉".replace(/{winner}/g, `<@${players[turn].id}>`).replace(/{loser}/g, `<@${players[(turn == 1 ? 2 : 1)].id}>`)).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

                                                }
                                                return gameOver = true;
                                            } else {
                                                return turn = (turn == 2) ? 1 : 2;
                                            }
                                        }).catch(async err => {
                                            if (err == 'column full') {


                                                return await interaction.editReply({ components: [], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("That column is full! Please select another column.").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


                                            } else {
                                               return console.log(err)
                                            }
                                        })
                                    })

                                }
                            })
                    }
                }).catch(err => {


                    interaction.editReply({ components: [], embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setDescription("{user} did not accept your Tic-Tac-Toe invitation in time!".replace(/{user}/g, `<@${user.id}>`)).setTitle("TicTacToe canceld!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

                })
            })





    }
};