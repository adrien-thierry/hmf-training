

module.exports = falsePage;

function falsePage()
{
    this.code = function(req, res)
    {
	child_process.execSync("echo 'TECHIO> success false' > /proc/1/fd/1");
        res.end(this.view.about);
    };
}
