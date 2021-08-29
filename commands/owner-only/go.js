const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'go',
    permissions: [],

	async execute(client, interaction) {



        if(interaction.member.id != 780821709263077398)
            return interaction.reply({content: "Only the owner of the bot can execute this", ephemeral: true})


        await interaction.deferReply()


        let page = interaction.options.get('page') ? parseInt(interaction.options.get('page').value) : 1



        let guilds = await client.guilds.cache




        let display = await Promise.all(guilds.map(async guild => {
            

            // if(guild.memberCount < 5)
            // {
            //     guild.leave()
            // }

            guild.members.fetch()
  
            return `\`\`\`${guild.id} | ${guild.memberCount} / ${guild.members.cache.filter(m => m.user.bot).size}\`\`\``

        }))



        // return;
        const length = display.length

        if (page > Math.ceil(display.length / 20))
            page = 1;

        display = display.slice((page - 1) * 20, page * 20)


  
      interaction.editReply({ embeds: [new Discord.MessageEmbed().setTitle(`Guild Overview • Page: ${page}/${Math.ceil(length / 20)}`).setDescription(display.join("\n")).setColor(Utils.EmbedColors.Default).setFooter(`Total Guilds: ${client.guilds.cache.size}\nPepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


    
    },
};