# Pepe - The Discord Bot

## About the project
The project / The bot Pepe was first published under the name Monolog.
Due to problems and a very poorly optimized bot, I decided to completely rewrite the project and create the bot **Pepe**. 
First as a privately hosted bot, Pepe is now open source on Github, and can be installed and used by anyone. 

<br>

## Features
- Web Dashboard
- Web Transcripts
- Fully graphically configurabl
- Advanced Verification System
- uses all new Features from the Discord API
- Security Features
- Ticket System
- Moderation
- NSFW
- Giveaway
- Fun
- Music
- Other
- Admin



## What What do I need for this bot?
- Database based on MySQL or MariaDB
- Reverse Proxy (Dashboard)
- Webserver (Transcripts)
- Discord Bot Token
- Node.js 16 or higher
- NPM
- Linux :=)
- Basic knowledge about server administration and javascript




## Installation
**1. Clone Repository from Github**

```bash
git clone https://github.com/Primexz/Pepe-Bot.git
```

**2. Setup Database (index.js)**
```js
...
  const mariadb = require('mariadb');
  const pool = mariadb.createPool({
    host: 'localhost',
    user: 'youruser',
    password: 'yourdbpass',
    connectionLimit: 5
  });
...
```

**3. Change Settings (botconfig.json)**
```json
{
	"token": "yourbottoken",
	"bot_owner_id": "your_discord_id",
	"dev_mode": true,
	"dev_guild": "1234"
}
```

**4. Setup your Webserver (check [Examples](https://github.com/Primexz/Pepe-Bot/tree/main/Examples))**

**5. Change Path for Transcripts: [File](https://github.com/Primexz/Pepe-Bot/blob/main/modules/transcript.js)**
```js
...
    fs.writeFile(`yourwebpath/${id}.html`, html, err => {
      if (err) {
        console.error(err)
        return
      }
    })
...
```

**6. Install all required packages**

```bash
npm i
```

**7. Start Pepe**
```bash
node .
```

**8. Deploy All Commands**
```
Write on Discord: !deploy
```


## Packages used
- Dashboard based on: [Discord-Dashboard](https://github.com/breftejk/Discord.js-Web-Dashboard) (modified)
- Music Commands based on [Distube](https://github.com/skick1234/DisTube) (modified)

## Pictures
![1](https://i.imgur.com/XhYZCI0.png)
![2](https://i.imgur.com/ZeIkn3j.png)
![3](https://i.imgur.com/qYlsMBQ.png)
