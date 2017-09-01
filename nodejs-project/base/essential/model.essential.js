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

module.exports.LoadModels = LoadModels;
var wf = WF();

function LoadModels()
{
	wf.parseServersAndHosts(cbModels);
}

function cbModels(s, h)
{
	wf.SERVERS[s].HOSTS[h].MODELS = {};
	var currentPath = wf.SERVERS[s].HOSTS[h].path + wf.SERVERS[s].HOSTS[h].name + "/" + wf.CONF.MODEL_FOLDER;
	var mArr = wf.Load.loadFiles(wf.CONF.MODEL_END, currentPath, true);
	if(mArr && mArr !== null)
	{
		var j = mArr.length;
		for(var i = 0; i < j; i++)
		{
			var name = mArr[i].split(wf.CONF.MODEL_END)[0];
			try
			{
				wf.SERVERS[s].HOSTS[h].MODELS[name] = require(currentPath + mArr[i]);
			}
			catch(e)
			{
				console.log("[!] Error conf : " + currentPath + mArr[i]);
			}
		}
	}
}
