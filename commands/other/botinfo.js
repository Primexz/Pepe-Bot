const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS
let cpuStat = require("cpu-stat")

const moment = require("moment");
const m = require("moment-duration-format");

module.exports = {


    name: 'botinfo',
    permissions: [],

    async execute(client, interaction) {





        const packages = require('../../package.json');

        interaction.reply({content: "Loading statistics.."})

        const DBTestStart = Date.now()
        await client.dbconnection.query("SELECT * FROM giveaways")
        const DBTestEnd = Date.now()

        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }


       const duration = moment.duration(client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");

        const totalMemory = (16010916 / 1000).toFixed(0);
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0);
        const usedMemoryPercent = usedMemory / totalMemory * 100;
        const memoryEmoji = usedMemoryPercent < 50 ? ":green_circle:" : (usedMemoryPercent < 90 ? ":yellow_circle:" : ":red_circle:");
        

        const botstat = (await client.dbconnection.query("SELECT * FROM botinfostats"))[0]




        const emb = new Discord.MessageEmbed()
        emb.setAuthor("Pepe Discord Bot - Information", client.user.displayAvatarURL({ dynamic: true }) )
        emb.setColor(Utils.EmbedColors.Default)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())
        emb.addFields(
            {name: "👾 Version", value: `\`\`\`${Utils.BotVersion}\nDiscord.js: 13.1.0\`\`\``, inline: true},
            {name: "🤖 CPU Usage", value: `\`\`\`${percent.toFixed(2)}%\n4 cores @ 2.26Ghz\`\`\``, inline: true},
            {name: "⏳ Memory Usage", value: `\`\`\`${(usedMemory/1000).toFixed(2)} / ${(totalMemory/1000).toFixed(1)} GB\n${usedMemoryPercent.toFixed(1)}% used\`\`\``, inline: true},
            {name: "⌚️ Uptime", value: `\`\`\`${duration}\`\`\``, inline: false},
            {name: "📶 WebSocket Ping", value: `\`\`\`${client.ws.ping} ms\`\`\``, inline: true},
            {name: "📶 Database Ping", value: `\`\`\`${DBTestEnd-DBTestStart} ms\`\`\``, inline: true},
            {name: "🤖 Uptime", value: `\`\`\`100.00%\`\`\``, inline: true},
            {name: "⌨️ Slash Commands executed", value: `\`\`\`${botstat.slashcmds}\`\`\``, inline: true},
            {name: "🖱️ Buttons clicked", value: `\`\`\`${botstat.btnclicks}\`\`\``, inline: true},
            {name: "🌐 Dashboard Logins", value: `\`\`\`${botstat.dashlogins}\`\`\``, inline: true},
            {name: "👤 Cached Users", value: `\`\`\`${Utils.betterInteger(client.users.cache.size)}\`\`\``, inline: true},
            {name: "📁 Cached Guilds", value: `\`\`\`${Utils.betterInteger(client.guilds.cache.size)}\`\`\``, inline: true},
            {name: "🖧 Shards", value: `\`\`\`${client.options.shardCount || 1}\`\`\``, inline: true},
            // {name: "🖧 Shards", value: `\`\`\`${client.ws.shards.size}\`\`\``, inline: true},
        )


        // emb.addFields(/bo
        //     {name: "Total cached guilds", value: client.guilds.cache.size.toString(), inline: true},
        //     {name: "Total cached users", value: client.users.cache.size.toString(), inline: true},
        //     {name: "Memory", value: `${memoryEmoji} **${usedMemory}**/**${totalMemory} MB** (${usedMemoryPercent.toFixed(1)}%)`, inline: true}
        // )


        interaction.editReply({ content: null, embeds: [emb] })
        });
    },
};