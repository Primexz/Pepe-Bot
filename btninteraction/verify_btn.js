const Utils = require("../modules/utils.js");
const Discord = require('discord.js');
const { CaptchaGenerator } = require('captcha-canvas');
const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    id: 'verify_btn',

	async execute(client, interaction) {



    const databaseinfo5 = (await client.dbconnection.query("SELECT * FROM verifys WHERE userid=? AND guildid = ?", [interaction.user.id, interaction.guild.id]))[0]
    if (databaseinfo5) {
      return interaction.reply({ ephemeral: true,embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle('You already have a captcha!\nPlease check your DMs, and finish the captcha').setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
    }





    const options = { height: 200, width: 600 };
    const captcha = new CaptchaGenerator(options);
    captcha.setCaptcha({characters: 8})
    const correct_captcha = captcha.text;
    const buffer = await captcha.generate();




    
    const attachment = new Discord.MessageAttachment(buffer, `PepeVerify-${interaction.user.id}.png`);
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${interaction.guild.name} | Verification`, interaction.guild.iconURL())
      .setDescription(`Welcome to Captcha verification for **${interaction.guild.name}**\n\nTo get access to all channels, this server requires captcha verification.\n\nBelow this text you will find an image.\nWrite **verify xxxxxx** to me, to complete the captcha!\n\nExample: **verify AAEFAFED**\n\n\n\n __Your unique captcha:__`)
      .setImage(`attachment://PepeVerify-${interaction.user.id}.png`)
      .setColor(233724)
      .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))





    interaction.member.send({ embeds: [embed], files: [attachment]})
      .then(async m => {
        await client.dbconnection.query('INSERT INTO verifys (captcha, userid, guildid) VALUES (?, ?, ?)', [correct_captcha, interaction.user.id, interaction.guild.id])



        interaction.reply({ ephemeral: true,embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle('Your captcha was generated successfully, and I sent you your captcha via private message!').setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

      })
      .catch(err => {
        if (err.name == 'DiscordAPIError' && err.code == '50007') {
            return interaction.reply({ ephemeral: true,embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("Your DM's are locked, please unlock them and run the command again!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        } else {
          console.log(err)
          return interaction.reply({ ephemeral: true,embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("An unknown error occured, please write the Developer Prime#1234").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }
      })



    },
};