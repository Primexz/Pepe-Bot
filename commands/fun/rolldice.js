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


    name: 'rolldice',
    permissions: [],

    async execute(client, interaction) {


        let diceSides = {
            1: "https://cdn.discordapp.com/attachments/637105382631669760/675091831746199552/dice-1.png",
            2: "https://cdn.discordapp.com/attachments/637105382631669760/675091832966873088/dice-2.png",
            3: "https://cdn.discordapp.com/attachments/637105382631669760/675091834485342238/dice-3.png",
            4: "https://cdn.discordapp.com/attachments/637105382631669760/675091835575861248/dice-4.png",
            5: "https://cdn.discordapp.com/attachments/637105382631669760/675091837228285982/dice-5.png",
            6: "https://cdn.discordapp.com/attachments/637105382631669760/675091838419337256/dice-6.png"
        };
        let dice = Object.keys(diceSides)[Math.floor(Math.random() * Object.keys(diceSides).length)];




        const emb = new Discord.MessageEmbed()
        emb.setColor(Utils.EmbedColors.Default)
        emb.setTitle("🎲 Dice Rolled")
        emb.setThumbnail(Object.values(diceSides)[Object.keys(diceSides).indexOf(dice)])
        emb.setDescription(`The dice was rolled and landed on **${dice}**`)
        emb.setFooter(`Rolled By: ${interaction.user.tag} • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


        interaction.reply({ embeds: [emb] })


    },
};