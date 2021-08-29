const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'history',
    permissions: ['VIEW_GUILD_INSIGHTS'],

    async execute(client, interaction) {


        let user; 
        
        try {
             user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch{
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }
        let page = interaction.options.get('page') ? parseInt(interaction.options.get('page').value) : 1

        let embed = new Discord.MessageEmbed()
            .setColor(Utils.EmbedColors.Default)




            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle("Loading statistics..").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        const history = await client.dbconnection.query("SELECT * FROM punishments WHERE user=? AND guild =?", [user.id, interaction.guild.id])

        embed.setAuthor(`${user.user.username} - Punishments`, user.user.displayAvatarURL({ dynamic: true }))
        

        if (!history || history.length == 0) return interaction.editReply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("This user has no punishment history!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

        let display = await Promise.all(history.map(async function (punishment) {

            return new Promise(async resolve => {
                let ineffect = "Yes";
                const displayType = punishment.type ? (punishment.type.charAt(0).toUpperCase() + punishment.type.substr(1, punishment.type.length)) : '';

                if (punishment.type == 'kick') {
                    return resolve("**ID:** {id}".replace(/{id}/g, punishment.id) + "\n" + `${"> **Type:** "}${displayType}\n${"> **Punished By:** "}<@${punishment.executor}>\n${ "> **Reason:** "}${punishment.reason}\n${"> **Date:** "}${new Date(punishment.time).toLocaleString()}`);
                } else if (punishment.type == 'tempban' || punishment.type == 'tempmute') {
                    return resolve("**ID:** {id}".replace(/{id}/g, punishment.id)+ "\n" + `${"> **Type:** "}${displayType}\n${"> **Punished By:** "}<@${punishment.executor}>\n${ "> **Reason:** "}${punishment.reason}\n${"> **Length:** "}${Utils.DDHHMMSSfromMS(punishment.length)}\n${"> **Date:** "}${new Date(punishment.time).toLocaleString()}`);
                }
             else if (punishment.type == 'warn' || punishment.type == 'warn') {
                return resolve("**ID:** {id}".replace(/{id}/g, punishment.id) + "\n" + `${"> **Type:** "}${displayType}\n${"> **Punished By:** "}<@${punishment.executor}>\n${ "> **Reason:** "}${punishment.reason}\n${"> **Date:** "}${new Date(punishment.time).toLocaleString()}`);
            }
                 else if (punishment.type == 'ban') {
                    await Utils.checkBan(interaction.guild, punishment.user)
                        .then(res => {
                            if (!res) ineffect = "No"
                            else ineffect = "Yes";
                        })
                } else if (punishment.type == 'blacklist') {
                    //if (!message.guild.member(punishment.user).roles.cache.find(r => r.name == config.Punishment_System.Blacklist_Role)) ineffect = lang.ModerationModule.Commands.History.InEffect[1];
                } else if (punishment.type == 'mute') {
                    if (!interaction.guild.member(punishment.user).roles.cache.find(r => r.name == "Pepe-Muted")) ineffect = "No";
                }

                return resolve("**ID:** {id}".replace(/{id}/g, punishment.id) + "\n" + `${"> **Type:** "}${displayType}\n${"> **Punished By:** "}<@${punishment.executor}>\n${ "> **Reason:** "}${punishment.reason}\n${"> **Date:** "}${new Date(punishment.time).toLocaleString()}\n${"> **In Effect:** "}${ineffect}`);
            })
        }))


        


        const length = display.length

        if (page > Math.ceil(display.length / 5))
            page = 1;

        display = display.slice((page - 1) * 5, page * 5)


        embed.setTitle(`Punishment History • Page ${page}/${Math.ceil(length / 5)}`);
        embed.setFooter(`Total: ${length} • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())
        embed.setDescription(display.join("\n"))

    
        interaction.editReply({embeds: [embed]});



    }
};