function logger(appConfig)
{
	this.code = function(req, res)
	{
		console.log("[+] Logger : " + req.method + " " + req.url);
	};
}
module.exports = logger;
