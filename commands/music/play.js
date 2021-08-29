const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS
const distube = require('../../modules/variables.js').distube


module.exports = {

    
    name: 'music-play',
    permissions: [],

	async execute(client, interaction) {
        const song = interaction.options.get('song').value



        try{
        await distube.play(interaction, song.toString());
        // await distube.playVoiceChannel(interaction.member.voice.channel, song.toString(), null, false, false, null, interaction.channel, null);

        }
        catch (error){
            if(error.toString().includes("NOT_IN_VOICE"))
            {
                const emb = new Discord.MessageEmbed()
                emb.setColor(Utils.EmbedColors.Error)
                emb.setTitle(":x: You are not in any voice channel!\nYou can't listen to music if you are not in a voice channel! :=)")
                interaction.reply({embeds: [emb]})
            }
            else{
                console.log(error)
            }
        }
    
    },
};