const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const weather = require("weather-js")
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'weather',
    permissions: [],

    async execute(client, interaction) {



        weather.find({ search: interaction.options.get('location').value, degreeType: 'C' }, async function (err, result) {
            if (result === undefined || result.length === 0) { return console.log("no result") }

            var current = result[0].current
            var location = result[0].location



            const emb = new Discord.MessageEmbed()
            emb.setAuthor(`🌞 Weather for ${current.observationpoint}`)
            emb.setColor(Utils.EmbedColors.Default)
            emb.setThumbnail(current.imageUrl) 
            emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
            emb.setTimestamp(new Date())
            emb.addFields(
                { name: "⏰ Timezone", value: `UTC${location.timezone}`, inline: true },
                { name: "Degree Type", value: location.degreetype, inline: true },
                { name: "🌡Temperature", value: `${current.temperature} Degrees`, inline: true },
                { name: "Feels Like", value: `${current.feelslike} Degrees`, inline: true },
                { name: "🌪 Winds", value: current.winddisplay, inline: true },
                { name: "Humidity", value: `${current.humidity}%`, inline: true }
            )

            interaction.reply({ embeds: [emb] })

        })

    },
};