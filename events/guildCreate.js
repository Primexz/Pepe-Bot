const chalk = require("chalk");
const Utils = require('../modules/utils.js');
const variables = Utils.variables;
const fetch = require('node-fetch');

module.exports = async (client, guild) => {


    
    fetch(
        'yourhook',
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
                author: {
                  name: 'Pepe - Event Handler',
                  icon_url: 'https://cdn.discordapp.com/avatars/870055161123450891/b8cdd2a522e0212bafe4793e28663f12.webp?size=2048',
                },
                description: `Joined guild: **${guild.name}**`,
              },
            ],
          }),
        }
      );

}
