const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const { bot_owner_id } = require('../../botconfig.json');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'lg',
    permissions: [],

	async execute(client, interaction) {


        if(interaction.member.id != bot_owner_id)
            return interaction.reply({content: "Only the owner of the bot can execute this", ephemeral: true})

        let gid = user =interaction.options.get('gid').value


        let guild = client.guilds.cache.get(gid)

        let guildname = guild.name

        guild.leave()


        interaction.reply({content: `Successfully left: ${guildname}`})
    
    },
};