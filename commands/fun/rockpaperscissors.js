const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS


const getEmoji = choice => {
    return choice == 'rock' ? '⛰️' : choice == 'scissors' ? '✂️' : '🧻' 
}

capitalize = str => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}



module.exports = {


    name: 'rockpaperscissors',
    permissions: [],

    async execute(client, interaction) {

        let choices = ['rock', 'paper', 'scissors']
        const choice = interaction.options.get('try').value


        choices.splice(choices.indexOf(choice), 1);

        let botsChoice = choices[~~(Math.random() * choices.length)];

        let winner;

        if (botsChoice == 'rock' && choice == 'paper') winner = interaction.member
        if (botsChoice == 'rock' && choice == 'scissors') winner = client.user

        if (botsChoice == 'paper' && choice == 'scissors') winner = interaction.member
        if (botsChoice == 'paper' && choice == 'rock') winner = client.user

        if (botsChoice == 'scissors' && choice == 'rock') winner = interaction.member
        if (botsChoice == 'scissors' && choice == 'paper') winner = client.user




        const emb = new Discord.MessageEmbed()
        emb.setColor(Utils.EmbedColors.Default)
        emb.setTitle("Rock Paper Scissors")
        emb.setDescription(`**You chose:** ${`${capitalize(choice)} ${getEmoji(choice)}`}\n**Bot chose:** ${`${capitalize(botsChoice)} ${getEmoji(botsChoice)}`}\n\n**Result:** ${`<@${winner.id}>`} is the winner!`)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


        interaction.reply({ embeds: [emb] })


    },
};