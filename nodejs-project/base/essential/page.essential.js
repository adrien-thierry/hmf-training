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
 * @namespace Page
 * @description Page module file description
 * @param config {object} config object initialized at server start
 *
 * @example function myPage(config)
 *  {
 *
 *     this.code = function(req, res)
 *     {
 *         res.end('Hello, world !');
 *     }
 *
 *  }
 *  module.exports = myPage;
 *
 * page.view is an object of view files stored in a view folder. For example :
 * page :
 *   - home :
 *     - home.page.js
 *     - view :
 *       - home.html
 *
 * you can then do :
 *
 *   res.end(page.view.home);
 *
 * You can also use a html engine, like Pug (ex-jade), on your view :
 *
 * var pug = require('pug');
 *
 * function myPage(page)
 * {
 *    this.constuct = function()
 *     {
 *         for(var v in page.view)
 *         {
 *           // we compile and create html here for efficiency. You can just compile here and call page.view.home(locals) in this.code(){}
 *           page.view[v] = pug.compile(page.view[v].toString())();
 *         }
 *      }
 *
 *     this.code = function(req, res)
 *     {
 *         // if http://url/?page=something
 *         if(req.get.page && page.view[req.get.page])
 *         {
 *           // we send the view 'something'
 *           res.end(page.view[req.get.page]);
 *         }
 *         // else, we send home by default, you could replace that by 404 or what you want
 *         else res.end(page.view.home);
 *     };
 *
 *     this.constuct();
 * }
 *  module.exports = myPage;
*/

/**
 * @method code
 * @description method that is called at each request loop
 * @memberof Page
 * @param req {object} http request object
 * @param res {object} http response object
 *
*/

module.exports.LoadPages = LoadPages;
var wf = WF();

function pushPages(srv, host, zone, directory, result)
{
	var pArr = fs.readdirSync(directory);
	for(var p = 0; p < pArr.length; p++)
	{
		var pTmp = new wf.PageClass.Page(directory, pArr[p]);
		if(pTmp.pageState && pTmp.init.state)
		{
			var cTmp = require(directory + pTmp.name + "/" + pTmp.name + wf.CONF.PAGE_END);
			if(typeof cTmp == "function")
			{
				cTmp = new cTmp(pTmp);
				result[p] = {'path': directory, 'name': pTmp.name, 'uri':pTmp.init.uri, 'init': pTmp.init, 'exec': cTmp, 'view':pTmp.view };
			}
		}
	}
}

function cbPages(srv, host, zone)
{
	var pDir = wf.CONF.SRV_PATH + srv + "/" + wf.CONF.HOST_FOLDER + wf.SERVERS[srv].HOSTS[host].name + "/" + wf.CONF.ZONE_FOLDER + wf.SERVERS[srv].HOSTS[host].ZONES[zone].name + '/' + wf.CONF.PAGE_FOLDER;
	if(fs.existsSync(pDir) && fs.lstatSync(pDir).isDirectory())
	{
		wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES = {};
		var result = [];
		// Push Pages
		pushPages(srv, host, zone, pDir, result);
		// Sort pages
		result.sort(function(a, b){return a.init.pos - b.init.pos;});
		// Forge URI
		for(var i = 0; i < result.length; i++)
		{
			if(result[i] !== undefined)
			{
				wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[result[i].uri] = result[i];
			}
		}
	}
}

function LoadPages()
{
	wf.parseServersAndHostsAndZones(cbPages);
}
