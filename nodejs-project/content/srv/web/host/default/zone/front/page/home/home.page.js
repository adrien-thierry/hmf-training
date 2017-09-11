

module.exports = homePage;

function homePage(ok)
{
    this.code = function(req, res)
    {
	var uri = req.url.split("?");
	if(uri[1]) uri = uri[1]
	else uri = "";
        if(req.get.id && req.get.id =="'") console.log("TECHIO> success true");
        
	var view = this.view.home.toString();
	view = view.replace("$_URL", uri);
	res.end(view);
    };
}
