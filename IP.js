var os = require('os');
var interfaces = os.networkInterfaces();

var IP;

Object.keys(interfaces).forEach(function (ifname) {
    var alias = 0;

    interfaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }

        if (alias < 1) {
            IP = iface.address;
        }
    });
});

module.exports = IP
