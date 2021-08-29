const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const distube = require('../../modules/variables.js').distube
const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'music-filter',
    permissions: [],

	async execute(client, interaction) {


            const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('music_filter_select')
					.setPlaceholder('Select your music filter')
					.setMinValues(0)
					.setMaxValues(3)
					.addOptions([
						{
							label: '3D',
							description: 'Enable/Disable the 3D Sound Filter',
							value: '3d',
                            emoji: '🎵'
						},
						{
							label: 'Bassboost',
							description: 'Enable/Disable the Bassboost Sound Filter',
							value: 'bassboost',
                            emoji: '🎵'
						},
						{
							label: 'Bassboost2',
							description: 'Enable/Disable the Bassboost Sound Filter',
							value: 'bassboost2',
                            emoji: '🎵'
						},
						{
							label: 'Echo',
							description: 'Enable/Disable the Echo Sound Filter',
							value: 'echo',
                            emoji: '🎵'
						},
                        {
							label: 'Karaoke',
							description: 'Enable/Disable the Karaoke Sound Filter',
							value: 'karaoke',
                            emoji: '🎵'
						},
                        {
							label: 'Nightcore',
							description: 'Enable/Disable the Nightcore Sound Filter',
							value: 'nightcore',
                            emoji: '🎵'
						},
                        {
							label: 'Vaporwave',
							description: 'Enable/Disable the Vaporwave Sound Filter',
							value: 'vaporwave',
                            emoji: '🎵'
						},
                        {
							label: 'Flanger',
							description: 'Enable/Disable the Flanger Sound Filter',
							value: 'flanger',
                            emoji: '🎵'
						},
                        {
							label: 'Gate',
                            description: 'Enable/Disable the Gate Sound Filter',
							value: 'gate',
                            emoji: '🎵'
						},
                        {
							label: 'Haas',
							description: 'Enable/Disable the Haas Sound Filter',
							value: 'haas',
                            emoji: '🎵'
						},
                        {
							label: 'Reverse',
							description: 'Enable/Disable the Reverse Sound Filter',
							value: 'reverse',
                            emoji: '🎵'
						},
                        {
							label: 'Surround',
                            description: 'Enable/Disable the Surround Sound Filter',
							value: 'surround',
                            emoji: '🎵'
						},
                        {
							label: 'Mcompand',
							description: 'Enable/Disable the Mcompand Sound Filter',
							value: 'mcompand',
                            emoji: '🎵'
						},
                        {
							label: 'Phaser',
							description: 'Enable/Disable the Phaser Sound Filter',
							value: 'phaser',
                            emoji: '🎵'
						},
                        {
							label: 'Tremolo',
                            description: 'Enable/Disable the Tremolo Sound Filter',
							value: 'tremolo',
                            emoji: '🎵'
						},
                        {
							label: 'Earwax',
							description: 'Enable/Disable the Earwax Sound Filter',
							value: 'earwax',
                            emoji: '🎵'
						},
					]),
			);
    
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Pepe - Music Filter')
                .setDescription('**Select** the **music filters** you want to use and **confirm**!')
                .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp(new Date())
    
            await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
        
    },
};