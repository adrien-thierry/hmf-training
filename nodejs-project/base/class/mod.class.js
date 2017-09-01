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

module.exports.ModClass = { Module: Module, ModConf: ModConf };
var wf = WF();

function Module(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;
	this.view = {};

	this.checkModule = function()
	{
		var file = this.path + this.name + WF().CONF.MOD_END;
		if(fs.existsSync(file))
		{
			this.modState = true;
			this.mod = file;
		}
		else this.modState = false;
	};

	this.loadViews = function()
	{
		var v = this.path + this.init.config.view + "/";
		if(fs.existsSync(v) && fs.lstatSync(v).isDirectory())
		{
			var dArr = fs.readdirSync(v);
			for(var d = 0; d < dArr.length; d++)
			{
				if( wfStringEndsWith( dArr[d],wf.CONF.VIEW_END) )
				{
					var ind = dArr[d].replace(WF().CONF.VIEW_END, "");
					this.view[ind] = fs.readFileSync(v + dArr[d]);
				}
			}
		}
	};

	this.checkModule();
	this.init = new ModConf(_path, _name);
	this.loadViews();
}

function ModConf(_path, _name)
{
	this.path = _path;
	this.name = _name;
	var defaultConfig = { "state": true, "pos": 0, "css": "", "view": "view" };

	this.readConf = function()
	{
    var config = {};
		var file = this.path + "/" + this.name + "/" + this.name + WF().CONF.CONFIG_END;
		if(fs.existsSync(file))
		{
			try
			{
				config = require(file);
			}
			catch(e)
			{
				console.log("[!] Error Mod conf : " + file);
			}
		}
    UTILS.joinDefaultConf(this, config, defaultConfig);
	};

	this.readConf();
}
