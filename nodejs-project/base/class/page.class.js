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

module.exports.PageClass = {Page: Page, PageConf: PageConf};
var wf = WF();

function Page(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;
	this.view = {};

	this.checkPage = function()
	{
		var file = this.path + this.name + wf.CONF.PAGE_END;
		if(fs.existsSync(file))
		{
			this.pageState = true;
			this.page = file;
			this.init = new PageConf(_path, _name);
			this.getPageModules();
		}
		else this.pageState = false;
	};

	this.loadViews = function()
	{
		var v = this.path + this.init.view + "/";
		if(fs.existsSync(v) && fs.lstatSync(v).isDirectory())
		{
			var dArr = fs.readdirSync(v);
			var dArrL = dArr.length;
			for(var d = 0; d < dArrL; d++)
			{
				if(wfStringEndsWith(dArr[d], wf.CONF.VIEW_END))
				{
					var ind = dArr[d].replace(wf.CONF.VIEW_END, "");
					this.view[ind] = fs.readFileSync(v + dArr[d], 'utf8');
				}
			}
		}
	};

	function getPageModulesArray(c, state)
	{
		if(state === undefined) state = false;
		var mArr = [];
		if(fs.existsSync(c) && fs.lstatSync(c).isDirectory())
		{
			var dArr = fs.readdirSync(c);
			for(var d in dArr)
			{
				if (fs.lstatSync(c + '/' + dArr[d]).isDirectory())
				{
					var mod = new Module(c, dArr[d]);
					if(mod.modState && state === false && mod.conf.config.state) {  mArr.push(mod); }
					else if(mod.modState && state) {  mArr.push(mod); }
				}
			}
		}
		mArr.sort(function(a, b){return a.conf.config.pos - b.conf.config.pos;});
		return mArr;
	}

	this.getPageModules = function()
	{
		var mPath = this.path + this.init.mod;
		if(this.init.mod !== undefined && fs.existsSync(mPath) && fs.lstatSync(mPath).isDirectory())
		{
			this.modules = getPageModulesArray(mPath, true);
		}
	};

	/* FONCTION DECLARATIONS */
	this.checkPage();
	this.loadViews();
	/*************************/
}

function PageConf(_path, _name)
{
	this.path = _path + _name + "/";
  this.name = _name;
  var defaultConfig = { "state": true, "pos": 100, "view": wf.CONF['DEFAULT_VIEW_FOLDER'], "uri": this.name, };

	this.readConf = function()
	{
    var config = {};
		var file = this.path + this.name + wf.CONF.CONFIG_END;
		if(fs.existsSync(file))
		{
			try
			{
			  config = require(file);
			}
			catch(e)
			{
			  console.log("[!] Error Page conf : " + file);
			}
		}
    UTILS.joinDefaultConf(this, config, defaultConfig);

	};

	/* FONCTION DECLARATIONS */
	this.readConf();
	/*************************/
}
