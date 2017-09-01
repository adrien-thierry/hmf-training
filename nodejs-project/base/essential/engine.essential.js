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
 * @namespace Engine
 * @description Engine module file description
 * @param config {object} config object initialized at server start
 *
 * @example function myEngine(config)
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
 * @memberof Engine
 * @param req {object} http request object
 * @param res {object} http response object
 *
*/

/**
 * @method runOnce
 * @memberof Engine
 * @description method that is called only on one thread
 *
*/

module.exports.LoadEngines = LoadEngines;

var wf = WF();

function addEngine(tmpDir, tmpArray, result)
{
	var confModule = new wf.AppClass.App(tmpDir, tmpArray);
	if(confModule.appState && confModule.init.state)
	{
		var newModule = {};
		try
		{
			var loadedModule = require(tmpDir + confModule.name + "/" + confModule.name + wf.CONF.APP_END);
			if(loadedModule && typeof loadedModule == "function")
			{
				newModule = new loadedModule(confModule);
				if(newModule.code !== undefined && typeof newModule.code === "function") newModule.execute = true;
			}
		}
		catch(e){console.log("Error in Engine : " + tmpDir + confModule.name + "/" + confModule.name + wf.CONF.APP_END);}
		result.push({'path': tmpDir, 'name': confModule.name, 'init': confModule.init, 'place': tmpArray, 'exec': newModule, 'view': confModule.view });
	}
}

function parseEngines(pDir, dir)
{
  var tmpDir = pDir + dir + "/";
  try
  {
    var result = [];

    var tmpArray = fs.readdirSync(tmpDir);
    wf.ENGINES[dir] = {};
    for(var m = 0; m < tmpArray.length; m++)
    {
      addEngine(tmpDir, tmpArray[m], result);
    }
    result.sort(function(a, b){return a.init.pos - b.init.pos;});
    for(var i = 0; i < result.length; i++)
    {

      if(result[i] !== undefined)  wf.ENGINES[dir][result[i].name] = result[i];
    }
  }
  catch(e)
  {
    console.log("[!] Warning : " + tmpDir + " is not a directory");
  }
}

function LoadEngines()
{
	var pDir = wf.CONF.ENGINE_PATH;
	if(fs.existsSync(pDir) && fs.lstatSync(pDir).isDirectory())
	{
		wf.ENGINES = {};
		var pArr = fs.readdirSync(pDir);
		for(var p = 0; p < pArr.length; p++)
		{
			parseEngines(pDir, pArr[p]);
		}
	}
}
