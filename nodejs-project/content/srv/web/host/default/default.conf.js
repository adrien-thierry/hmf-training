var hostConf=
{
	"state": true,
	"pos": 0,
	"default_zone": "front", // default zone for /
	"default_page": "home", // default view for /
    "host":
    {
      "*": "localhost",
    },

    "app":
    {
		"log": "Logger app",
		"api": "Api app",
    },
}
module.exports = hostConf
