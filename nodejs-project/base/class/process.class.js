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

module.exports.ProcessClass = {Process: Process, ProcessConf: ProcessConf};
var wf = WF();

function Process(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;

	this.checkProcess = function()
	{
		var file = this.path + this.name + wf.CONF.PROCESS_END;
		if(fs.existsSync(file))
		{
			this.processState = true;
			this.init = new ProcessConf(_path, _name);
		}
		else this.processState = false;
	};
	/* FONCTION DECLARATIONS */
	this.checkProcess();
	this.init = new ProcessConf(_path, _name);
	/*************************/
}

function ProcessConf(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;
	var defaultConf = { "state": true, "log":"all", "pos": 100, "type":"cmd", "mode":"exec", restart: 'none', 'attempt': 5, 'delay': 3000, 'started': 10000, 'wait': false, cmd:'', args: [], options: {}, cron: {'day':'*', date:'*', 'month':'*', 'hour':'0', 'minute':'0'} };

	this.readConf = function()
	{
    var config = {};
		var file = this.path + this.name + wf.CONF.PROCESS_END;
		if(fs.existsSync(file))
		{
			try
			{
			  config = require(file);
			}
			catch(e)
			{
			  console.log("[!] Error process conf : " + file);
			}
		}
    UTILS.defaultConf(this, config, defaultConf);
	};

	/* FONCTION DECLARATIONS */
	this.readConf();
	/*************************/
}
