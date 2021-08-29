const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS
const request = require("request-promise")

async function getRandomMeme(subreddit, callback) {
    const memes = [];
    request("https://reddit.com/r/" + subreddit + "/.json?limit=20", async function (error, response, body) {
        const content = await JSON.parse(body)
        if (error) {
            interaction.editReply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: There was an error fetching memes from this subreddit! Please try another subreddit!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
            return callback()
        }
        if (content.error) {
            interaction.editReply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: There was an error fetching memes from this subreddit! Please try another subreddit!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
            return callback(content.error)
        }
        content.data.children.forEach(entry => {
            let imageUrl = entry.data.url;
            if (entry.data.over_18 == true || entry.data.is_video == true) return;
            if (!imageUrl || imageUrl.includes('gfycat') || imageUrl.includes('.gifv') || imageUrl.includes('imgur.com') || imageUrl.includes('makeagif.com') || imageUrl.includes('v.redd.it') || !imageUrl.includes('i.redd.it')) return;
            if (!imageUrl.includes('gfycat') && !imageUrl.includes('.gifv') && !imageUrl.includes('png') && !imageUrl.includes('jpg') && !imageUrl.includes('gif')) {
                imageUrl = imageUrl + '.png'
            }
            memes.push({
                title: entry.data.title,
                imageUrl: imageUrl,
                url: "https://reddit.com" + entry.data.permalink,
                ups: entry.data.ups,
                comments: entry.data.num_comments
            })
        })
        callback(memes)
    })
}


const RandomSubReddits = [
    "dankmemes",
    "memes",
    "wholesomememes",
    "raimimemes",
    "memeeconomy",
    "metal_me_irl"
]

module.exports = {

    
    name: 'meme',
    permissions: [],

	async execute(client, interaction) {
        
        const category = interaction.options.get('subred') ? interaction.options.get('subred').value : RandomSubReddits[Math.floor(Math.random() * RandomSubReddits.length)] 


        await interaction.reply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle("Loading meme..").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
        await getRandomMeme(category, function (memes) {
            if (memes == 403) return  interaction.editReply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: There was an error fetching memes from this subreddit! Please try another subreddit!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})

            if (!memes || memes.length === 0) {
                return interaction.editReply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: There was an error fetching memes from this subreddit! Please try another subreddit!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
                
            } else {
                let curMeme = memes[Math.floor(Math.random() * memes.length)]
                console.log(curMeme)



                if(!curMeme)
                    return interaction.editReply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: There was an error fetching memes from this subreddit! Please try another subreddit!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})

                interaction.editReply({embeds: [new Discord.MessageEmbed().setURL(curMeme.url).setImage(curMeme.imageUrl).setColor(Utils.EmbedColors.Success).setTitle(curMeme.title).setFooter(`👍 ${curMeme.ups} | 💬 ${curMeme.comments} (${category})`,).setTimestamp(new Date())]})
            }
        })
    
    },
};