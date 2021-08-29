const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const weather = require("weather-js")
const Permissions = Discord.Permissions.FLAGS


var getEmojiDetails = function(emoji){
    emojiID = emoji.split('<').join('').split('>').join('').split(':')[2]
    emojiName = emoji.split('<').join('').split('>').join('').split(':')[1]
    emojiType = emoji.split('<').join('').split('>').join('').split(':')[0]
    return {id: emojiID, name: emojiName, type: emojiType}
}

module.exports = {


    name: 'addemoji',
    permissions: ['MANAGE_EMOJIS_AND_STICKERS'],

    async execute(client, interaction) {


        const string = interaction.options.get('emoji').value


        let emoji = getEmojiDetails(string)

        if(!emoji.id)
        {
            return interaction.reply({content: "Sorry, please send an valid custom emoji!", ephemeral: true})
        }

       if(emoji.type === 'a') {await interaction.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.gif`, emoji.name); }
       else {await interaction.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.png`, emoji.name); } 


       interaction.reply({content: `Successfully added ${string} to ${interaction.guild.name}!`})



    },
};