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

module.exports.AppClass = { App:App, AppConf: AppConf };

var wf = WF();

function App(_path, _name)
{
	/* CONSTRUCTOR 	*/
	this.path = _path + _name + "/";
	this.name = _name;
	this.view = {};
	/*				*/
	this.checkApp = function()
	{
		var file = this.path + this.name + wf.CONF.APP_END;
		if(fs.existsSync(file))
		{
			this.appState = true;
			this.app = file;
		}
		else this.appState = false;
	};
	this.loadViews = function()
	{
		var v = this.path + this.init.view + "/";
		if(fs.existsSync(v) && fs.lstatSync(v).isDirectory())
		{
			var dArr = fs.readdirSync(v);
			var darrL = dArr.length;
			for(var d = 0; d < darrL; d++)
			{
				if( wfStringEndsWith( dArr[d],wf.CONF.VIEW_END) )
				{
					var ind = dArr[d].replace(wf.CONF.VIEW_END, "");
					this.view[ind] = fs.readFileSync(v + dArr[d]);
				}
			}
		}
	};
	this.checkApp();
	this.init = new AppConf(_path, _name);
	this.loadViews();
}

function AppConf(_path, _name)
{
	this.path = _path;
	this.name = _name;
	var defaultConf = { "state" : true, "pos" : 0, "view": "view", "version": "0.0" };
	this.readConf = function()
	{
    var config = {};
		var file = this.path + "/" + this.name + "/" + this.name + wf.CONF.CONFIG_END;
		if(fs.existsSync(file))
		{
			try
			{
				config = require(file);

			}
			catch(e)
			{
				console.log("[!] Error conf : " + file);
			}
		}
    UTILS.joinDefaultConf(this, config, defaultConf);
	};
	this.readConf();
}
