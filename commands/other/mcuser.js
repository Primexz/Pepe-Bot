const Utils = require("../../modules/utils.js");
const request = require("request");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS


module.exports = {


    name: 'mcuser',
    permissions: [],

    async execute(client, interaction) {




        const userr = interaction.options.get('mcuser').value

        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${userr}`,
            json: true
        }, async function (error, response, body) {
            if (error) return console.log(error)
            else {
                if (!body) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("Please provide a valid username!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
                let namehistory = [];

                request({
                    url: `https://api.mojang.com/user/profiles/${body.id}/names`,
                    json: true
                }, async function (error, response, body) {
                        body.forEach(name => {
                            namehistory.push(name.name);
                        })
                })
                // let msg = await message.channel.send(Embed({ title: lang.MinecraftModule.Commands.Mcuser.FetchingData }));
                setTimeout(function () {
                    // msg.delete();


                    const emb = new Discord.MessageEmbed()
                    emb.setTitle(`Minecraft User Information - ${body.name}`)
                    emb.setColor(Utils.EmbedColors.Default)
                    emb.setThumbnail(`https://mc-heads.net/body/${body.id}/128.png`) 
                    emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
                    emb.setTimestamp(new Date())
                    emb.addFields(
                        { name: "Name History", value: namehistory.reverse().join("\n"), inline: true },
                        { name: "UUID", value: body.id, inline: true },
                        { name: "Name MC Link", value: `[Click Here](https://namemc.com/profile/${body.name})`, inline: true },
                    )
        


                    interaction.reply({ embeds: [emb] })



                }, 1500);
            }
        })








    },
};