const colors = require('colors');
const { config } = require('process');

const err = (text) => {
    return text + ` Do you need help? Join our Discord server: ${'https://discord.gg/CzfMGtrdaA'.blue}`;
}

class Dashboard {
    constructor(config) {
        if (!config.port) throw new Error(err("You need to define the dashboard server port."));
        this.config = config;
    }

    init() {
        const config = this.config;
        const express = require('express');
        const app = express();
        const session = require('express-session');
        const FileStore = require('session-file-store')(session);
        const bodyParser = require('body-parser');
        const partials = require('express-partials');



        let v13support = false;

        const Discord = require('discord.js');
        if (Discord.version.slice(0, 2) == "13") v13support = true;

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(partials());

        if (config.theme) {
            app.set('views', config.theme.viewsPath);
            app.use(express.static(config.theme.staticPath));
            app.use('/', express.static(config.theme.staticPath));
            app.use('/:a/', express.static(config.theme.staticPath));
            app.use('/:a/:b/', express.static(config.theme.staticPath));
            app.use('/:a/:b/:c/', express.static(config.theme.staticPath));
            app.use('/:a/:b/:c/:d/', express.static(config.theme.staticPath));
        } else {
            app.set('views', require('path').join(__dirname, '/views/project1'));
            app.use(express.static(require('path').join(__dirname, '/static')));
            app.use('/', express.static(require('path').join(__dirname, '/static')));
            app.use('/:a/', express.static(require('path').join(__dirname, '/static')));
            app.use('/:a/:b/', express.static(require('path').join(__dirname, '/static')));
            app.use('/:a/:b/:c/', express.static(require('path').join(__dirname, '/static')));
            app.use('/:a/:b/:c/:d/', express.static(require('path').join(__dirname, '/static')));
        }
        app.set('view engine', 'ejs');

        let sessionIs;

        if (!config.sessionFileStore) config.sessionFileStore = false;

        if (config.sessionFileStore) {
            sessionIs = session({
                secret: config.cookiesSecret || 'total_secret_cookie_secret',
                resave: true,
                saveUninitialized: true,
                cookie: {
                    expires: new Date(253402300799999),
                    maxAge: 253402300799999,
                },
                store: new FileStore
            });
        } else {
            sessionIs = session({
                secret: config.cookiesSecret || 'total_secret_cookie_secret',
                resave: true,
                saveUninitialized: true,
                cookie: {
                    expires: new Date(253402300799999),
                    maxAge: 253402300799999,
                },
            });
        }

        app.use(sessionIs);

        let themeConfig = {};
        if (config.theme) themeConfig = config.theme.themeConfig;

        if (!config.invite) config.invite = {};

        if (config.theme) config.theme.init(app, this.config);

        app.use((req, res, next) => {
            if (!req.body) req.body = {};

            req.client = config.client;
            req.redirectUri = config.redirectUri;

            req.themeConfig = themeConfig;

            req.websiteTitle = config.websiteTitle || "Pepe - Discord Bot";
            req.iconUrl = config.iconUrl || 'https://cdn.discordapp.com/attachments/848963336708030525/863545055388893224/851126355671515176.png';
            next();
        });

        require('./router')(app);

        app.get('/', (req, res) => {

            res.render('index', { req: req, themeConfig: req.themeConfig, bot: config.bot });
        });

        app.get('/invite', (req, res) => {
            res.redirect(`https://discord.com/oauth2/authorize?client_id=870055161123450891&permissions=8&scope=bot%20applications.commands`);
        });

        app.get('/manage', (req, res) => {
            if (!req.session.user) return res.redirect('/discord?r=/manage');
            config.bot.dbconnection.query("UPDATE botinfostats SET dashlogins = dashlogins + 1")


            res.render('guilds', { req: req, bot: config.bot, themeConfig: req.themeConfig });
        });

        app.use('/privacy-policy', (req,res) => {
            res.render('pp', { req: req, bot: config.bot, themeConfig: req.themeConfig });
        });


        app.use('/profile', (req,res) => {
            if (!req.session.user) return res.redirect('/discord?r=/manage');
            res.render('profile', { req: req, bot: config.bot, themeConfig: req.themeConfig });
        });


        app.get('/guild/:id', async (req, res) => {
            if (!req.session.user) return res.redirect('/discord?r=/guild/' + req.params.guildId);
            let bot = config.bot;
            if (!bot.guilds.cache.get(req.params.id)) return res.redirect('/manage?error=noPermsToManageGuild');
            const membercheck = await bot.guilds.cache.get(req.params.id).members.fetch(req.session.user.id);
            if (v13support) {
                if (!membercheck.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return res.redirect('/manage?error=noPermsToManageGuild');
            } else {
                if (!membercheck.hasPermission('MANAGE_GUILD')) return res.redirect('/manage?error=noPermsToManageGuild');
            }
            let actual = {};
            for (const s of config.settings) {
                for (const c of s.categoryOptionsList) {
                    if (!actual[s.categoryId]) {
                        actual[s.categoryId] = {};
                    }
                    if (!actual[s.categoryId][c.optionId]) {
                        actual[s.categoryId][c.optionId] = await c.getActualSet({ guild: { id: req.params.id } });
                    }
                }
            }
            res.render('guild', { settings: config.settings, actual: actual, bot: config.bot, req: req, guildid: req.params.id, themeConfig: req.themeConfig });
        });

        app.post('/settings/update/:guildId/:categoryId', async (req, res) => {
            if (!req.session.user) return res.redirect('/discord?r=/guild/' + req.params.id);
            let bot = config.bot;
            if (!bot.guilds.cache.get(req.params.guildId)) return res.redirect('/manage?error=noPermsToManageGuild');
            const membercheck2 = await bot.guilds.cache.get(req.params.guildId).members.fetch(req.session.user.id);
            if (v13support) {
                if (!membercheck2.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) return res.redirect('/manage?error=noPermsToManageGuild');
            } else {
                if (!membercheck2.members.cache.get(req.session.user.id).hasPermission('MANAGE_GUILD')) return res.redirect('/manage?error=noPermsToManageGuild');
            }

            let cid = req.params.categoryId;
            let settings = config.settings;

            let category = settings.find(c => c.categoryId == cid);

            if (!category) return res.send({ error: true, message: "No category found" });

            category.categoryOptionsList.forEach(option => {
                if (option.optionType.type == "switch") {
                    if (req.body[option.optionId] || req.body[option.optionId] == null || req.body[option.optionId] == undefined) {
                        if (req.body[option.optionId] == null || req.body[option.optionId] == undefined) {
                            option.setNew({ guild: { id: req.params.guildId }, user: { id: req.session.user.id }, newData: false });
                        } else {
                            option.setNew({ guild: { id: req.params.guildId }, user: { id: req.session.user.id }, newData: true });
                        }
                    }
                } else {
                    if (req.body[option.optionId] || req.body[option.optionId] == null) option.setNew({ guild: { id: req.params.guildId }, user: { id: req.session.user.id }, newData: req.body[option.optionId] });
                }
            });
        
        return res.redirect('/guild/' + req.params.guildId + '?success=true');
        });

        if (!config.SSL) config.SSL = {};

        if (!config.noCreateServer) {
            if (config.SSL.enabled) {
                if (!config.SSL.key || !config.SSL.cert) console.log(err(`${'discord-dashboard issue:'.red} The SSL preference for Dashboard is selected (config.SSL.enabled), but config does not include key or cert (config.SSL.key, config.SSL.cert).`));
                let options = {
                    key: config.SSL.key || "",
                    cert: config.SSL.cert || ""
                };
                const https = require('https');
                https.createServer(options, app);
            } else {
                app.listen(config.port);
            }
        }

        let pport = "";

        if (config.port != 80 && config.port != 443) {
            pport = `:${config.port}`;
        }
        const chalk = require("chalk");

        console.log(`${chalk.hex("#e8c61e")(`[DASH]`)}  Web-Dashboard started.`)



        this.app = app;
    }

    getApp() {
        return this.app;
    }
}

module.exports = {
    Dashboard: Dashboard,
    formTypes: {
        select: (list, disabled) => {
            if (!list) throw new Error(err("List in the 'select' form type cannot be empty."));
            if (typeof (list) != "object") throw new Error(err("List in the 'select' form type should be an JSON object."));
            let keys = Object.keys(list);
            let values = Object.values(list);
            return { type: "select", data: { keys, values }, disabled: disabled || false };
        },
        input: (placeholder, min, max, disabled, required) => {
            if (min) {
                if (isNaN(min)) throw new Error(err("'min' in the 'input' form type should be an number."));
            }
            if (max) {
                if (isNaN(max)) throw new Error(err("'max' in the 'input' form type should be an number."));
            }
            if (min && max) {
                if (min > max) throw new Error(err("'min' in the 'input' form type cannot be higher than 'max'."));
            }
            return { type: "input", data: placeholder, min: min || null, max: max || null, disabled: disabled || false, required: required || false };
        },
        textarea: (placeholder, min, max, disabled, required) => {
            if (min) {
                if (isNaN(min)) throw new Error(err("'min' in the 'input' form type should be an number."));
            }
            if (max) {
                if (isNaN(max)) throw new Error(err("'max' in the 'input' form type should be an number."));
            }
            if (min && max) {
                if (min > max) throw new Error(err("'min' in the 'input' form type cannot be higher than 'max'."));
            }
            return { type: "textarea", data: placeholder, min: min || null, max: max || null, disabled: disabled || false, required: required || false };
        },
        switch: (defaultState, disabled) => {
            if (typeof (defaultState) != 'boolean') throw new Error(err("'state' in the 'switch' form type should be boolean (true/false)."));
            return { type: "switch", data: defaultState, disabled: disabled };
        },
        line: () => {
            return {type: "line" };
        },
        channelsSelect: (disabled) => {
            return {
                type: "channelsSelect", function:
                    (client, guildid) => {
                        let list = {};
                        client.guilds.cache.get(guildid).channels.cache.forEach(channel => {

                            if(channel.type != 'GUILD_TEXT')
                            {
                                return;
                            }

                            list[channel.name] = channel.id;
                        });
                        return { values: Object.values(list), keys: Object.keys(list) };
                    },
                disabled
            };
        },
        categorySelect: (disabled) => {
            return {
                type: "categorySelect", function:
                    (client, guildid) => {
                        let list = {};
                        client.guilds.cache.get(guildid).channels.cache.forEach(channel => {

    
                            if(channel.type != 'GUILD_CATEGORY')
                            {
                                return;
                            }
                                
                            list[channel.name] = channel.id;
                        });
                        return { values: Object.values(list), keys: Object.keys(list) };
                    },
                disabled
            };
        },
        rolesSelect: (disabled) => {
            return {
                type: "rolesSelect", function:
                    (client, guildid) => {
                        let list = {};
                        client.guilds.cache.get(guildid).roles.cache.forEach(role => {
                            list[role.name] = role.id;
                        });
                        return { values: Object.values(list), keys: Object.keys(list) };
                    },
                disabled
            };
        }
    },
}