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

module.exports.HostClass = { Host: Host, HostConf: HostConf };
var wf = WF();

function Host(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;

	this.checkHost = function()
	{
		var folder = this.path;

		if(fs.existsSync(folder) && fs.lstatSync(folder).isDirectory())
		{
			this.hostState = true;
			this.host = folder;
		}
		else this.hostState = false;
	};

	/* FONCTION DECLARATIONS */
	this.checkHost();
	this.init = new HostConf(_path, _name);

	/*************************/
}

function HostConf(_path, _name)
{
	this.path = _path + _name + "/";
	this.name = _name;
  var host = {};
  host[WF.DEFAULT_HOST] = "Default host";
	var defaultConf = { "version": "0.0.0.0", "state":true, "pos":100, "default_zone": wf.CONF['DEFAULT_ZONE'], "default_page": wf.CONF['DEFAULT_PAGE'], "host": host };

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
				console.log("[!] Error Host conf : " + file);
			}
		}
    UTILS.joinDefaultConf(this, config, defaultConf);
	};

	/* FONCTION DECLARATIONS */
	this.readConf();
	/*************************/
}
