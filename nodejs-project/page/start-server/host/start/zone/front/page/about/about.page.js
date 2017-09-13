
module.exports = aboutPage;

function aboutPage()
{
    exec("echo 'TECHIO> open -p 8080 /about-us' > /proc/1/fd/1", function(error, stdout, stderr){});
    this.code = function(req, res)
    {
	child_process.execSync("echo 'TECHIO> success true' > /proc/1/fd/1");
        res.end(this.view.about);
    };
}
