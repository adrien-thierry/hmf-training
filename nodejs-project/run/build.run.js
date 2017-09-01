'use strict'

// DEFINE GLOBAL WF VAR
global.UTILS = {};
global.WF = require('../start/singleton.js');
var wf = WF();
wf.CONF = {};
wf.CONF["MAIN_PATH"] = __dirname + "/../";
wf.CONF["BASE_PATH"] = wf.CONF["MAIN_PATH"] + "base" + "/";

// Get global var
require('../start/load.start.js');

// LOAD CONF
wf.Load.Base("conf", wf.CONF['MAIN_PATH']);

// remove useless files
var useless = wf.CONF['USELESS'];
checkUseless(wf.CONF['MAIN_PATH'], doClean);
doBuild();



/****** UTILS ********/

function doBuild()
{
	
}

function doClean(err, results)
{
	if(err)
	{
		throw err;
	}
	else
	{
		var j = results.length;
		for(var i = 0; i < j; i++)
		{
			var err = fs.unlinkSync(results[i]);
			if(err)
			{
				console.log("[!] Unlink error -> " + results[i]);
			}
			else
			{
				console.log("[-] Deleted -> " + results[i]);
			}
		}
	}
}

function checkUseless(dir, done) 
{
  var results = [];
  fs.readdir(dir, function(err, list) 
  {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) 
	{
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) 
	  {
        if (stat && stat.isDirectory()) 
		{
          checkUseless(file, function(err, res) 
		  {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else 
		{
			var j = useless.length;
			for(var i = 0; i < j; i++)
			{
				if(endsWith(file, useless[i]))
				{
					results.push(file);
					break;
				}
			}
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


function endsWith(haystack, needle)
{
  return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
}

