const chalk = require("chalk");
const Utils = require('../modules/utils.js');
const variables = Utils.variables;
let axios = require("axios")



module.exports = async (client) => {



    //Activity Handeling
    const Stats = [
        { type: "WATCHING", text: "{guildcount} servers" },
        { type: "LISTENING", text: "{streamcount} voice streams" },
        { type: "PLAYING", text: "/help" },
    ]
    async function nextStatus() {
        let status;
        status = Stats[Math.floor(Math.random() * Stats.length)];
        const finaltext = status.text.replace(/{guildcount}/g, client.guilds.cache.size).replace(/{streamcount}/g, client.voice.adapters.size)
        client.user.setActivity(finaltext, { type: status.type })
    }
    nextStatus();
    setInterval(nextStatus, 120000)






    //Giveaway Handler
    const GiveawayHandler = await require('../modules/handlers/GiveawayHandler.js')(client);
    setInterval(async function () {
        GiveawayHandler(client);
    }, 10 * 1000);




    console.log(`${chalk.hex("#ff00dd")(`[START]`)} ${chalk.bold("Bot started successfully")} - ${client.user.id} - ${client.user.tag} - ${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels`)
}
