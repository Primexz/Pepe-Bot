const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'say',
    permissions: ['MENTION_EVERYONE', 'SEND_MESSAGES', 'MANAGE_MESSAGES'],

    async execute(client, interaction) {

        const rawembed = interaction.options.get('msg').value

        if(!rawembed.includes("_embed "))
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setDescription("You entered an invalid Embed String! Please generate an custom valid string [Here](https://robyul.chat/embed-creator)\n\nNote: On image fields you can enter: **me**, or **server** to show your profile picture, or your guild's picture").setFooter("Pepe Discord Bot", interaction.guild.iconURL({ dynamic: true })).setTimestamp(new Date())] })



        let embed = {
            author: {},
            footer: {},
            thumbnail: {},
            image: {},
            fields: []
          }
          let text;
    
          rawembed.replace("_embed #channel", "").split("|").forEach(property => {
            property = property.trim()
    
            let key = property.substring(0, property.indexOf("=")).trim()
            let value = property.substring(property.indexOf("=") + 1).trim()
    
            if (key == "author") {
              let startOfName = value.indexOf("name=") == -1 ? undefined : value.indexOf("name=");
              let startOfIcon = value.indexOf("icon=") == -1 ? undefined : value.indexOf("icon=");
              let startOfURL = value.indexOf("url=") == -1 ? undefined : value.indexOf("url=");
    
              let name = typeof startOfName == "number" ? value.substring(startOfName + 5, startOfIcon || startOfURL).trim() : undefined;
              let icon = typeof startOfIcon == "number" ? value.substring(startOfIcon + 5, startOfURL).trim() : undefined;
              let url = typeof startOfURL == "number" ? value.substring(startOfURL + 4).trim() : undefined;
    
              if (icon == "me") icon = interaction.user.displayAvatarURL({ dynamic: true });
              if (icon == "server") icon = interaction.guild.iconURL({ dynamic: true });
              if (url == "me") url = interaction.user.displayAvatarURL({ dynamic: true });
              if (url == "server") url = interaction.guild.iconURL({ dynamic: true });
    
              embed.author.name = name;
              embed.author.iconURL = icon;
              embed.author.url = url;
    
            } else if (key == "thumbnail") {
              if (value == "me") value = interaction.user.displayAvatarURL({ dynamic: true });
              if (value == "server") value = interaction.guild.iconURL({ dynamic: true });
    
              embed.thumbnail.url = value;
            } else if (key == "image") {
              if (value == "me") value = interaction.user.displayAvatarURL({ dynamic: true });
              if (value == "server") value = interaction.guild.iconURL({ dynamic: true });
    
              embed.image.url = value;
            } else if (key == "footer") {
              let startOfName = value.indexOf("name=") == -1 ? undefined : value.indexOf("name=");
              let startOfIcon = value.indexOf("icon=") == -1 ? undefined : value.indexOf("icon=");
    
              if (startOfName == undefined) return embed.footer.text = value;
    
              let name = typeof startOfName == "number" ? value.substring(startOfName + 5, startOfIcon).trim() : undefined;
              let icon = typeof startOfIcon == "number" ? value.substring(startOfIcon + 5).trim() : undefined;
    
              if (icon == "me") icon = interaction.user.displayAvatarURL({ dynamic: true });
              if (icon == "server") icon = interaction.guild.iconURL({ dynamic: true });
    
              embed.footer.text = name;
              embed.footer.iconURL = icon;
            } else if (key == "color") {
              embed[key] = parseInt(value.replace("#", ""), 16);
            } else if (key == "field") {
              let startOfName = value.indexOf("name=") == -1 ? undefined : value.indexOf("name=");
              let startOfValue = value.indexOf("value=") == -1 ? undefined : value.indexOf("value=");
              let startOfInline = value.indexOf("inline=");
    
              let name = typeof startOfName == "number" ? value.substring(startOfName + 5, startOfValue).trim() : undefined;
              let v = typeof startOfValue == "number" ? value.substring(startOfValue + 6, startOfInline == -1 ? undefined : startOfInline).trim() : undefined;
              let inline = startOfInline == -1 ? true : value.substring(startOfInline + 7).trim();
    
              if (typeof inline == "string") inline = inline == "false" || inline == "no" ? false : true;
    
              if (!name) name = "\u200b";
              if (!v) v = "\u200b";
    
              embed.fields.push({ name, value: v, inline })
            } else if (key == "ptext") {
              text = value
            } else embed[key] = value;
          });
    
          if (!embed.color) embed.color = Utils.EmbedColors.Default;

          










        interaction.reply({embeds: [embed] })
    },
};