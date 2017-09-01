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

module.exports.LoadAppArray = LoadAppArray;
var wf = WF();

function LoadAppArray()
{
	for(var srv in wf.SERVERS)
	{
		for(var host in wf.SERVERS[srv].HOSTS)
		{
            // LOAD APP IN AN ARRAY FOR A HOST
            wf.SERVERS[srv].HOSTS[host].appArray = [];
            var map = wf.SERVERS[srv].map;
            if(!map) loadNoMap(srv, host);
            else loadWithMap(srv, host, map);
        }
	}
}

function noMapAddEngine(srv, host)
{
	if(wf.SERVERS[srv] !== undefined && wf.SERVERS[srv].engineArray !== undefined)
    {
        for(var current = 0; current < wf.SERVERS[srv].engineArray.length; current++)
        {
            if(wf.SERVERS[srv].engineArray[current].exec.runOnce && process.env.wrkId && process.env.wrkId === 0)
                wf.SERVERS[srv].engineArray[current].exec.runOnce();
            wf.SERVERS[srv].HOSTS[host].appArray.push(wf.SERVERS[srv].engineArray[current]);
        }
    }
}

function noMapAddApp(srv, acId, tmp)
{
	// LOAD APP FOR APID
	for(var current = 0; current < wf.SERVERS[srv].APPS[acId].length; current++)
	{
		if(wf.SERVERS[srv].APPS[acId][current] !== undefined)
		{
		  tmp.push(wf.SERVERS[srv].APPS[acId][current]);
		}
	}
}

function noMapAddHook(srv, host, apid, tmp)
{
	// LOAD HOOKS AT THE RIGHT PLACE
	if(wf.SERVERS[srv].HOSTS[host].HOOKS !== undefined && wf.SERVERS[srv].HOSTS[host].HOOKS[apid] !== undefined)
	{
		for(var hook = 0; hook < wf.SERVERS[srv].HOSTS[host].HOOKS[apid].length; hook++)
		{
			tmp.push(wf.SERVERS[srv].HOSTS[host].HOOKS[apid][hook]);
		}
	}
}

function noMapSortApp(srv, host, tmp)
{
  if(!tmp) return;
	tmp.sort(function(a, b){return a.init.pos - b.init.pos;});
	for(var current = 0; current < tmp.length; current++)
	{
		if(tmp[current].exec.runOnce && process.env.wrkId && process.env.wrkId === 0)
		tmp[current].exec.runOnce();
		wf.SERVERS[srv].HOSTS[host].appArray.push(tmp[current]);
	}
}

function loadNoMap(srv, host)
{
    noMapAddEngine();
    for(var acid in wf.SERVERS[srv].HOSTS[host].app)
    {
        var tmp = [];
        // LOAD APPS
        if(wf.SERVERS[srv].APPS !== undefined && wf.SERVERS[srv].APPS[acid] !== undefined)
        {
			noMapAddEngine(srv, host);
			noMapAddApp(srv, acid, tmp);
			noMapAddHook(srv, host, acid, tmp);
			noMapSortApp(srv, tmp);
        }
    }
}


function createMap(map, aMap, iMap)
{
    for(var i = 0; i < map.length; i++)
    {
        iMap[map[i]]  = i;
        aMap.push([]);
    }

    if(!iMap.app)
    {
        iMap.app = map.length;
        aMap.push([]);
    }
}

function mapAddEngine(srv, aMap, iMap)
{
	if(wf.SERVERS[srv] !== undefined && wf.SERVERS[srv].engineArray !== undefined)
    {
        for(var current = 0; current < wf.SERVERS[srv].engineArray.length; current++)
        {
            if(wf.SERVERS[srv].engineArray[current].init && wf.SERVERS[srv].engineArray[current].init.at)
            {
				if(aMap[iMap[wf.SERVERS[srv].engineArray[current].init.at]])
				{
					aMap[iMap[wf.SERVERS[srv].engineArray[current].init.at]].push(wf.SERVERS[srv].engineArray[current]);
				}
            }
        }
    }
}

function mapAddApp(srv, acid, aMap, iMap)
{
	for(var current = 0; current < wf.SERVERS[srv].APPS[acid].length; current++)
	{
		if(wf.SERVERS[srv].APPS[acid][current] !== undefined)
		{
			aMap[iMap.app].push(wf.SERVERS[srv].APPS[acid][current]);
		}
	}
}

function mapAddHook(srv, host, acid, aMap, iMap)
{
	if(wf.SERVERS[srv].HOSTS[host].HOOKS !== undefined && wf.SERVERS[srv].HOSTS[host].HOOKS[acid] !== undefined)
	{
		for(var current = 0; current < wf.SERVERS[srv].HOSTS[host].HOOKS[acid].length; current++)
		{
			aMap[iMap.app].push(wf.SERVERS[srv].HOSTS[host].HOOKS[acid][current]);
		}
	}
}

function mapPushAppArray(srv, host, aMap, iMap, current)
{
	for(var i = 0; i < aMap[iMap[current]].length; i++)
	{
		if(aMap[iMap[current]][i].exec.runOnce && process.env.wrkId && process.env.wrkId === 0)
			aMap[iMap[current]][i].exec.runOnce();
		wf.SERVERS[srv].HOSTS[host].appArray.push(aMap[iMap[current]][i]);
	}
}

function loadWithMap(srv, host, map)
{
    var aMap = [];
    var iMap = {};
    createMap(map, aMap, iMap);
	mapAddEngine(srv, aMap, iMap);

    for(var acid in wf.SERVERS[srv].HOSTS[host].app)
    {
        if(wf.SERVERS[srv].APPS !== undefined && wf.SERVERS[srv].APPS[acid] !== undefined)
        {
          // LOAD APPS
		  mapAddApp(srv, acid, aMap, iMap);
          // LOAD HOOKS AT THE RIGHT PLACE
          mapAddHook(srv, host, acid, aMap, iMap);
		  // Sort Map
          aMap[iMap.app].sort(function(a, b){return a.init.pos - b.init.pos;});
        }
    }

    for(var current in iMap)
    {
       mapPushAppArray(srv, host, aMap, iMap, current);
    }
}
