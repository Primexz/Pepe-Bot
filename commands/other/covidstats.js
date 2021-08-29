const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const cov_api = require('novelcovid');
const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'covidstats',
    permissions: [],

	async execute(client, interaction) {
      //Thinking Animation Stuff
      await interaction.deferReply()



      let CovidData
      if (interaction.options.get('country')) {
        CovidData = await cov_api.countries({ country: interaction.options.get('country').value })
      }
      else {
        CovidData = await cov_api.all()
      }



      if (CovidData.message && CovidData.message == "Country not found or doesn't have any cases")
        return interaction.editReply({content: `Sorry, but **${interaction.options.get('country').value}** is an invalid country!`})










      if (CovidData.country) {
        const embed = new Discord.MessageEmbed()
          .addFields(
            { name: 'Total Cases', value: Utils.betterInteger(CovidData.cases) + ` (${((CovidData.cases / CovidData.population) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Deaths', value: Utils.betterInteger(CovidData.deaths) + ` (${((CovidData.deaths / CovidData.cases) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Recovered', value: Utils.betterInteger(CovidData.recovered) + ` (${((CovidData.recovered / CovidData.cases) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Population', value: `${Utils.betterInteger(CovidData.population)}`, inline: true },
            { name: 'Total Tests', value: `${Utils.betterInteger(CovidData.tests)}`, inline: true },
            { name: 'Cases Today', value: `${Utils.betterInteger(CovidData.todayCases)}`, inline: true },
          )
          .setColor(Utils.EmbedColors.Default)
          .setTitle('Corona Virus - Statistics')
          .setDescription(`> Location: **${CovidData.country}**\n\nAll current Corona numbers, but also mathematically calculated values e.g. how many people of the population were already infected.`)
          .setFooter("Pepe Discord Bot • Latest Corona Stats Update", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date(CovidData.updated))
          .setThumbnail(CovidData.countryInfo.flag)

        interaction.editReply({ embeds: [embed] })
      }
      else {
        const embed = new Discord.MessageEmbed()
          .addFields(
            { name: 'Total Cases', value: Utils.betterInteger(CovidData.cases) + ` (${((CovidData.cases / CovidData.population) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Deaths', value: Utils.betterInteger(CovidData.deaths) + ` (${((CovidData.deaths / CovidData.cases) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Recovered', value: Utils.betterInteger(CovidData.recovered) + ` (${((CovidData.recovered / CovidData.cases) * 100).toFixed(2)}%)`, inline: true },
            { name: 'Total Population', value: `${Utils.betterInteger(CovidData.population)}`, inline: true },
            { name: 'Total Tests', value: `${Utils.betterInteger(CovidData.tests)}`, inline: true },
            { name: 'Cases Today', value: `${Utils.betterInteger(CovidData.todayCases)}`, inline: true },
          )
          .setColor(Utils.EmbedColors.Default)
          .setTitle('Corona Virus - Statistics')
          .setDescription(`> Location: **Worldwide**\n\nAll current Corona numbers, but also mathematically calculated values e.g. how many people of the population were already infected.`)
          .setFooter("Pepe Discord Bot • Latest Corona Stats Update", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date(CovidData.updated))
          .setThumbnail("https://www.fondsprofessionell.de/content/fpim/uploads/news/6/c/0/1593000626_teaser.jpg")

        interaction.editReply({ embeds: [embed] })
      }
	},
};