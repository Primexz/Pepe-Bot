const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'giv_leave',

  async execute(client, interaction) {
    
    const givaway_msgid = interaction.message.id
    const giveaway_ch = interaction.channel.id
    const giveaway_guild = interaction.guild.id
    const giveaway_entryidiot = interaction.user.id

   
    const giveawaycheck = (await client.dbconnection.query("SELECT * FROM giveaways WHERE messageID =? AND channel = ? AND guild =?", [givaway_msgid, giveaway_ch, giveaway_guild]))[0]

    if(!giveawaycheck)
      return interaction.reply({content: 'Hm, weird, looks like there is no giveaway under this message id. :=/'})


      const alrdy_entrycheck = (await client.dbconnection.query("SELECT * FROM giveawayentries WHERE giveaway =? AND user =? AND guild =?", [givaway_msgid, giveaway_entryidiot, giveaway_guild]))[0]


      if(!alrdy_entrycheck)
        return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`You can't leave the giveaway because you haven't joined the giveaway yet!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())], ephemeral: true,})




      await client.dbconnection.query("DELETE FROM giveawayentries WHERE giveaway =? AND user =? AND guild =?", [givaway_msgid, giveaway_entryidiot, giveaway_guild])

      return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`You have successfully exited the giveaway: ${giveawaycheck.name}`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())], ephemeral: true,})

  },
};