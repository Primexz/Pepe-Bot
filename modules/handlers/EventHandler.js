
const fs = require('fs');
const chalk = require("chalk");
module.exports = {
    events: [],
    find: function (name) {
        this.events.find(e => e.name.toLowerCase() == name.toLowerCase())
    },
    set: function (name, event) {
        if (!name || !event || !['[object Function]', '[AsyncFunction]', '[object AsyncFunction]'].includes({}.toString.call(event))) return error('Invalid event object.');
        function CallEvent(...args) {
            try {
                event(require('../variables').client, ...args);
            } catch (err) {
                console.log(err);
            }
        }
        this.client.on(name, CallEvent);

        const EventObject = {
            name,
            run: event,
            call: CallEvent
        }


        this.events.push(EventObject);
    },
    init: function (client) {
        this.client = client;
        fs.readdir('./events', function (err, files) {
            if (err) throw err;
            files
                .filter(f => f.endsWith('.js'))
                .forEach(event => {
                    module.exports.set(event.split(".js")[0], require('../../events/' + event));
                })
            console.log(chalk.hex("#a6a626").bold("[EVH]   ") + module.exports.events.length + ' events have been loaded.');

            return module.exports;
        })
    }
}
// 268921   8501   2264617    63250   1621556358   98b92d11c290961ffb72ae1af511cf55a8b1cfda   2264617