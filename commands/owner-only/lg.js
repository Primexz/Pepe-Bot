const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'lg',
    permissions: [],

	async execute(client, interaction) {


        if(interaction.member.id != 780821709263077398)
            return interaction.reply({content: "Only the owner of the bot can execute this", ephemeral: true})

        let gid = user =interaction.options.get('gid').value


        let guild = client.guilds.cache.get(gid)

        let guildname = guild.name

        guild.leave()


        interaction.reply({content: `Successfully left: ${guildname}`})
    
    },
};