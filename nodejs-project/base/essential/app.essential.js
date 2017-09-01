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

/**
 * @namespace App
 * @description App module file description
 * @param config {object} config object initialized at server start
 *
 * @example function myApp(config)
 *  {
 *
 *     this.code = function(req, res)
 *     {
 *         req.continue = false; // stop the app loop for this request
 *
 *         res.end('Hello, world !');
 *     }
 *
 *     this.runOnce = function()
 *     {
 *       // do something here, it will be called only on 1 thread
 *     }
 *
 *     // we forge a route
 *     wf.Router.GET('*', '/about', routeCallback);
 *
 *     function routeCallback(req, res)
 *     {
 *       // do something here, it will be called when route match
 *     }
 *  }
*/

/**
 * @method code
 * @description method that is called at each request loop
 * @memberof App
 * @param req {object} http request object
 * @param res {object} http response object
 *
*/

/**
 * @method runOnce
 * @memberof App
 * @description method that is called only on one thread
 *
*/


module.exports.LoadApps = LoadApps;

var wf = WF();

global.next = function(req, res){ process.nextTick(function() { UTILS.LoopExec(req, res); }); };

function LoadApps()
{
	wf.parseServers(cbApps);
}

function parseApp(srv, appPath, root, current)
{
	var confModule = new wf.AppClass.App(root, current);
	if(confModule.appState && confModule.init.state)
	{
		var newModule = {};
		try
		{
			var loadedModule = require(root + confModule.name + "/" + confModule.name + wf.CONF.APP_END);
			if(loadedModule && typeof loadedModule == "function")
			{
				newModule = new loadedModule(confModule);
				if(newModule.code !== undefined && typeof newModule.code === "function") newModule.execute = true;
			}
		}
		catch(e) { console.log("Error in App : " +  root + confModule.name + "/" + confModule.name + wf.CONF.APP_END);}
		wf.SERVERS[srv].APPS[appPath].push(
		{
		'	path': root, 'name': confModule.name, 'init': confModule.init, 'place': appPath, 'exec': newModule, 'view': confModule.view,
		});
	}
}

function parseAppContainer(srv, rootPath, appPath)
{
	wf.SERVERS[srv].APPS[appPath] = [];
	var tmpDir = rootPath + appPath + "/";
	if(fs.lstatSync(tmpDir).isDirectory())
	{
		var tmpArray = fs.readdirSync(tmpDir);
		for(var m = 0; m < tmpArray.length; m++)
		{
			parseApp(srv, appPath, tmpDir, tmpArray[m]);
		}
		wf.SERVERS[srv].APPS[appPath].sort(function(a, b){return a.init.pos - b.init.pos;});
		var result = wf.SERVERS[srv].APPS[appPath];
		wf.SERVERS[srv].APPS[appPath] = result;
	}
}

function cbApps(s)
{
	var rootPath = wf.CONF.SRV_PATH + s + '/' + wf.CONF.APP_FOLDER;
	wf.SERVERS[s].APPS = {};
	if(fs.existsSync(rootPath) && fs.lstatSync(rootPath).isDirectory())
	{
		var appPath = fs.readdirSync(rootPath);
		for(var p = 0; p < appPath.length; p++)
		{
			parseAppContainer(s, rootPath, appPath[p]);
		}
	}
}
