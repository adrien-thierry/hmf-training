

module.exports = homePage;

function homePage(ok)
{
    this.code = function(req, res)
    {
        if(req.get.id && req.get.id =="'") console.log("TECHIO> success true");
        res.end(this.view.home);
    };
}
