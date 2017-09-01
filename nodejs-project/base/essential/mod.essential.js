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

module.exports.hookMod = hookMod;
module.exports.LoadMods = LoadMods;
UTILS.hookMod = hookMod;
var wf = WF();

function hookMod(req, res, p)
{
	if(!req.srv || !req.host || !req.zone) return;
    var mArr = wf.SERVERS[req.srv].HOSTS[req.host].ZONES[req.zone].MODS[p];
    req.modPath = p;
	for(var mod in mArr)
	{
        req.mod = mArr[mod].name;
        var exec = wf.Clone(mArr[mod].exec);
        exec.path = mArr[mod].path + "/" + mArr[mod].name + "/";
	    if(exec.code) exec.code(req, res);
	}
}

function addMods(srv, host, zone, directory)
{
	var tmpDir = fs.readdirSync(directory);
	for(var m = 0; m < tmpDir.length; m++)
	{
	  var mTmp = new wf.ModClass.Module(directory, tmpDir[m]);
	  if(mTmp.modState && mTmp.init.config.state)
	  {
		var cTmp = require(directory + mTmp.name + "/" + mTmp.name + wf.CONF.MOD_END);
		var eTmp = {};
		for( var c in cTmp)
		{
		  for(var f in cTmp[c])
		  {
			if(typeof(cTmp[c][f]) == "function")
			eTmp[f] = cTmp[c][f];
		  }
		}
		eTmp.ZONE = wf.SERVERS[srv].HOSTS[host].ZONES[zone];
		wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[pArr[p]].push({'path': directory, 'name': mTmp.name, 'conf': mTmp.conf, 'exec': eTmp, 'view': mTmp.view });
	  }
	}
}

function storeMods(srv, host, zone, current)
{
	var result = wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[current];
	wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[current] = {};
	for(var i = 0; i < result.length; i++)
	{
	   if(result[i] !== undefined)
	   {
		 wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[current][result[i].name] = result[i];
	   }
	}
}

function cbMods(srv, host, zone)
{
	var pDir = wf.CONF.SRV_PATH + srv + "/" + wf.CONF.HOST_FOLDER + wf.SERVERS[srv].HOSTS[host].name + "/" + wf.CONF.ZONE_FOLDER + wf.SERVERS[srv].HOSTS[host].ZONES[zone].name + '/'  + wf.CONF.MOD_FOLDER;
	if(fs.existsSync(pDir) && fs.lstatSync(pDir).isDirectory())
	{
	  wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS = {};
	  var pArr = fs.readdirSync(pDir);
	  var pArrL = pArr.length;
	  for(var p = 0; p < pArrL; p++)
	  {
		wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[pArr[p]] = [];
		var directory = pDir + pArr[p] + "/";
		// Load Mods
		addMods(srv, host, zone, directory);
		// Sort Mods
		wf.SERVERS[srv].HOSTS[host].ZONES[zone].MODS[pArr[p]].sort(function(a, b){return a.init.config.pos - b.init.config.pos;});
		// Store Mods
		storeMods(srv, host, zone, pArr[p]);
	  }
	}
}

function LoadMods()
{
	wf.parseServersAndHostsAndZones(cbMods);
}
