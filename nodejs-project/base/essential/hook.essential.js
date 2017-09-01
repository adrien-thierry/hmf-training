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

module.exports.LoadHooks = LoadHooks;

var wf = WF();

/**
 * @namespace Plugin
 * @description Plugin module file description
 * @param config {object} config object initialized at server start
 *
 * @example function myPlugin(config)
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
 * @memberof Plugin
 * @param req {object} http request object
 * @param res {object} http response object
 *
*/

/**
 * @method runOnce
 * @memberof Plugin
 * @description method that is called only on one thread
 *
*/

function LoadHooks()
{
	wf.parseServersAndHosts(cbHooks);
}

function cbHooks(s,h)
{
	var hookArr = {};
	wf.SERVERS[s].HOSTS[h].HOOKS = {};
	var root = wf.SERVERS[s].HOSTS[h].path + wf.SERVERS[s].HOSTS[h].name + "/" + wf.CONF.PLUGIN_FOLDER;
	if(fs.existsSync(root) && fs.lstatSync(root).isDirectory())
	{
		var current = fs.readdirSync(root);
		for(var c in current)
		{
			parseHook(root, current[c], hookArr);
		}
		for(var o in hookArr)
		{
			hookArr[o].sort(function(a, b){return a.init.pos - b.init.pos;});
			wf.SERVERS[s].HOSTS[h].HOOKS[o] = hookArr[o];
		}
	}
}

function parseHook(root, current, hookArr)
{
	if (fs.lstatSync(root +'/' + current).isDirectory() && current != "." && current != "..")
	{
		var app = new wf.AppClass.App(root, current);
		if(app.appState && app.init.state && app.init.hook !== undefined)
		{
			var tmpDir = root +'/' + current;
			var newModule = {};
			try
			{

				var loadedModule = require(tmpDir + "/" + app.name + wf.CONF.APP_END);
				if(loadedModule && typeof loadedModule == "function")
				{
					newModule = new loadedModule(app);
					if(newModule.code !== undefined && typeof newModule.code === "function") newModule.execute = true;
					if(newModule.runOnce && process.env.wrkId && process.env.wrkId === 0) newModule.runOnce();
					newModule.getView = function(v)
					{
						if(app.view[v] !== undefined)
						{
							return app.view[v];
						}
					};
				}
			}
			catch(e){ console.log(e); console.log("Error in Hook conf : " +  tmpDir + app.name + "/" + app.name + wf.CONF.APP_END); }
			if(hookArr[app.init.hook] === undefined) hookArr[app.init.hook] = [];
			hookArr[app.init.hook].push({'name': app.name, 'hooked': true, 'init': app.init, 'exec': newModule, 'view': app.view });
		}
	}
}
