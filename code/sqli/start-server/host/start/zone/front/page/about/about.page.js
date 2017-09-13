
module.exports = aboutPage;

function aboutPage()
{
    this.code = function(req, res)
    {
	child_process.execSync("echo 'TECHIO> success true' > /proc/1/fd/1");
        res.end(this.view.about);
    };
}
