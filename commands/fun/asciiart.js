const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS
let ascii = require("figlet")
module.exports = {


    name: 'asciiart',
    permissions: [],

    async execute(client, interaction) {


        ascii(interaction.options.get('text').value, function(err, art) {
        

        interaction
        .reply({content: `\`\`\`${art}\`\`\`` })
        .catch(error=>{
  
          if (!error) return
  
            interaction.reply({content: "Sorry, this text is too long!"})
  
        })
    })

    },
};