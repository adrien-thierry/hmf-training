/*
 * This file is part of FortressJS - Fast, secure, powerful and simple I/O framework
 * Copyright (c) 2014-2016 Adrien THIERRY
 * http://fortressjs.com - http://seraum.com
 *
 * sources : https://github.com/seraum/fortressjs
 *
 * this program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * You can be released from the requirements of the license by purchasing
 * a commercial license. Buying such a license is mandatory as soon as you
 * develop commercial activities involving the FortressJS software without
 * disclosing the source code of your own applications. Visit http://seraum.com/
 * and feel free to contact us.
 *
 */

var wf = WF();

// CREATE UTILS OBJECT
global.UTILS = {};

// GET CURRENT NODE VERSION
var nv = getNodeVersion();

// REQUIRE STD Object AND SET IT TO GLOBAL
global.cluster = require('cluster');
global.os = require('os');
global.child_process = require('child_process');
global.exec = child_process.exec;
global.spawn = child_process.spawn;
global.execFile = child_process.execFile;
global.fs = require('fs');
global.http = require('http');
global.https = require('https');
if( nv.major === 0 || (nv.major === 1 && nv.minor < 12) ){global.http.setMaxHeaderLength(10000000);} // SET HTTP MAXHEADER IF OLDER VERSION OF NODEJS
global.http.globalAgent.maxSockets = Infinity;
global.path = require('path');
global.net = require('net');
global.url  = require('url');
global.querystring = require('querystring');
global.zlib  = require('zlib');
global.crypto = require('crypto');
global.vm = require('vm');
global.cluster = require('cluster');
global.extend = require('util')._extend;
global.events = require('events');
global.stream = require("stream");
global.EOL = os.EOL;

// GLOBAL EVENT EMITTER
wf.eventEmitter = new events.EventEmitter();


// SET DEFAULT AND UTILS FUNCTIONS
wf.Default = function(arg, def)
{
	if(arg === undefined) return def;
	else return arg;
};
UTILS.Default = wf.Default;

wf.DefaultStr = function(arg)
{
	return wf.Default(arg, "");
};
UTILS.DefaultStr = wf.DefaultStr;

wf.Redirect = function(res, url)
{
		res.writeHead(302,
        {
			'Location': url
		});
	res.stop = true;
	res.end("");
};
UTILS.Redirect = wf.Redirect;

wf.Clone = function(obj)
{
	var result = {};
	if(obj instanceof Array) result = [];
	for (var i in obj)
	{
		if (obj[i] && typeof obj[i] == "object")
		{
		  result[i] = wf.Clone(obj[i]);
		}
		else
		{
			result[i] = obj[i];
		}
	}
	return result;
};
UTILS.Clone = wf.Clone;

UTILS.checkState = function(state)
{
	if(state == "true") this.config.state = true;
	else this.config.state = false;
};
UTILS.checkPos = function(pos)
{
	if(!isNan(this.config.pos)) this.config.pos = parseInt(pos);
};

UTILS.defaultConf = function(config, more)
{
	if(!config) config = {};
	if(config.state === undefined) config.state = true;
	if(!config.pos) config.pos = 100;
	if(more)
	{
		for(var m in more)
		{
			if(!config[m]){config[m] = more[m];}
		}
	}
};

UTILS.joinDefaultConf = function(init, config, more)
{
  if(!init) init = {};
	if(!config) config = {};
  for(var c in config)
  {
     init[c] = config[c];
  }
	if(init.state === undefined) init.state = true;
	if(init.pos === undefined || init.pos === null) init.pos = 100;
	if(more)
	{
		for(var m in more)
		{
			if(!init[m]){init[m] = more[m];}
		}
	}
};

wf.Load = new wfLoader();
function wfLoader()
{
	/* PUBLIC */
	this.Base = function(path, cpath)
	{
		var bpath = "";
		if(cpath === undefined)
			bpath = wf.CONF.BASE_PATH + path + "/";
		else bpath = cpath + path + "/";
		var files = this.loadFiles(path, bpath);
		if(files !== undefined)
		{
			files.forEach(function(file)
			{
				var t = require(bpath + file);
				for(var prop in t)
				{
					(wf)[prop] = t[prop];
				}
			});
		}
	};

	this.loadFiles = function(path, bpath, complete)
	{
		if(complete === undefined) complete = false;
		if(fs.existsSync(bpath))
		{
			return fs.readdirSync(bpath).filter(function (file)
			{
				var ext = "";
				if(!complete)
				{
					ext = "." + path + ".js";
				}
				else
				{
					ext = path;
				}
				if(file.substr(-(ext.length)) === ext)
					return fs.statSync(bpath + file).isFile();
			});
		}
	};
}

function getNodeVersion()
{
	var v = process.version;
	v = v.split('.');
	var res =
	{
		major: v[0],
		minor: v[1],
		rev: v[2],
	};
	return res;
}
