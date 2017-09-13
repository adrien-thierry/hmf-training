var wf = WF();

var startConf=
{
    "state": false, // true | false, default is true
    "type": "http", // "http", "net", ... see base/server/
    "name": "Webserver", // Server name
    "port": {"http": 8080}, // { "http": 80, "http2":81 }
    "thread": 1, // int value or os.cpus().length
    "engine":
    {
      "start-engine": {at: "start"},
    },
    "map": ["start" ] // Order app/engine launching map
}
module.exports = startConf;
