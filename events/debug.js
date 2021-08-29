const chalk = require("chalk");
const Utils = require('../modules/utils.js');
const variables = Utils.variables;
let axios = require("axios")
const fetch = require('node-fetch');



module.exports = async (client, info) => {

if(info.includes("Provided token"))
    return;

fetch(
    'https://discord.com/api/webhooks/877633271939346502/bh1-RE3Q90GTX8C5C3x8Cs422WWM_mhOmuBTA0PV0ePAQbnb2zXDakZrSH5LA8NuPf3F',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        embeds: [
          {
            avatar_url: 'https://cdn.discordapp.com/avatars/870055161123450891/b8cdd2a522e0212bafe4793e28663f12.webp?size=2048',
            color: 2481695,
            timestamp: new Date(),
            description: `${info}`,
          },
        ],
      }),
    }
  );
 
}