const Utils = require('./utils.js');

module.exports = {
    set: function (variable, value, expireAfter = 0) {
        if (variable == 'set') return Utils.error('Cannot set variable \'set\'');
        this[variable] = value;
        if (expireAfter > 0)
            setTimeout(function () {
                delete this[variable];
            }, expireAfter);
        return value;
    }
}
// 268921   8501   2264617    63250   1621556358   98b92d11c290961ffb72ae1af511cf55a8b1cfda   2264617