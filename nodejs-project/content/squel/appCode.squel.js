module.exports = appCode;

function appCode(self)
{
    // LAUNCHED WHEN SRV FIRED EVENT
    this.code = function(req, res) {};
    // LAUNCHED ONLY ON ONE THREAD AT START
    this.runOnce = function(){};
}