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

module.exports.LoadZones = LoadZones;
module.exports.CreateZone = Zone;
module.exports.checkCache = checkCache;
UTILS.checkCache = checkCache;
var wf = WF();

// cache could be '*' or ['.jpg', '.blabla' ...]
function checkCache (cache, path)
{
	if(cache.indexOf('*') > -1)
	{
		return true;
	}
    else
    {
        var j = cache.length;
        for(var i = 0; i < j; i++)
        {
            if( wfStringEndsWith(path, cache[i]) )
            {
                return true;
            }
        }
        return false;
    }
}

function Zone(_path, _name)
{
		this.path = _path + _name + "/";
		this.name = _name;
		this.shared = {};


	this.loadStatic = function()
	{
        var name = "/" + this.name;

		if(wf.CONF.SHARED_CACHE && this.init.shared !== undefined)
		{
			var shared = this.path + this.init.shared;
			var cache = this.init.cache;
			var rDir = function(p, s)
			{
				s = wf.DefaultStr(s);
				var tArr = { };
				var tmpArr = {};
				if(cache !== undefined && fs.statSync(p).isDirectory())
				{
					var pArr = fs.readdirSync(p);
					for(var d in pArr)
					{
						if(fs.statSync(p + '/' + pArr[d]).isDirectory())
						{
							tmpArr = rDir(p + '/' + pArr[d] , s + "/" + pArr[d]);
							for (var t in tmpArr)
							{
								tArr[t] = tmpArr[t];
							}
						}
						else
						{
							if(checkCache(cache, name + s + "/" + pArr[d]))
							{
								tArr[name + s + "/" + pArr[d]] = { };
								tArr[name + s + "/" + pArr[d]].buffer = fs.readFileSync(p + "/" + pArr[d]);
								tArr[name + s + "/" + pArr[d]].mime = wf.mimeUtil.lookup(pArr[d]);
								tArr[name + s + "/" + pArr[d]].path = p + "/" + pArr[d];
								tArr[name + s + "/" + pArr[d]].mtime = fs.lstatSync( p + '/' + pArr[d]).mtime;
							}
						}
					}
					return tArr;
				}
				return tArr;
			};
            try
            {
			     if(fs.statSync(shared).isDirectory())
			     {
				    this.shared = rDir(shared);
			     }
            }catch(e){}
		}
	};

	this.checkZone = function()
	{
		var folder = this.path;
		if(fs.existsSync(folder) && fs.lstatSync(folder).isDirectory())
		{
			this.zoneState = true;
			this.zone = folder;
		}
		else this.zoneState = false;
	};

	/* FONCTION DECLARATIONS */
	this.checkZone();
	this.init = new ZoneConf(_path, _name);
	this.loadStatic();
	/*************************/
}

function ZoneConf(_path, _name)
{

	this.path = _path + _name + '/';
	this.name = _name;
	var defaultConf = { "version": "0.0.0.0", "uri": this.name, "shared": wf.CONF['DEFAULT_SHARED_FOLDER'] };

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
			  console.log("[!] Error Zone conf : " + file);
			}
		}
    UTILS.joinDefaultConf(this, config, defaultConf);
	};

	/* FONCTION DECLARATIONS */
	this.readConf();
	/*************************/
}

function hookZoneCss(h, z, name)
{
	var path = wf.CONF.HOST_PATH + h + "/" + wf.CONF.ZONE_FOLDER + z + name;
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory())
	{
		var zone = new Zone(path, name);
		if(zone.init.css.length > 0 && fs.existsSync(zone.init.css) && zone.zoneState && zone.init.state)
		{
			var zoneCss = require(zone.init.css);
			for(var prop in zoneCss)
			{
				zoneCss[prop].path = zone.path + '/';
				if(zoneCss[prop].code !== undefined) zoneCss[prop].code();
			}
		}
	}
}

function cbZones(s, h)
{
	var zDir = wf.CONF.SRV_PATH + s + "/" + wf.CONF.HOST_FOLDER + wf.SERVERS[s].HOSTS[h].name + '/' + wf.CONF.ZONE_FOLDER;
	if(fs.existsSync(zDir) && fs.lstatSync(zDir).isDirectory())
	{
		wf.SERVERS[s].HOSTS[h].ZONES = { };
		var hArr = fs.readdirSync(zDir);
		for(var d in hArr)
		{
			var zTmp = new Zone(zDir, hArr[d]);

			if(zTmp.zoneState || (zTmp.init && zTmp.init && zTmp.init.state))
			{
			  wf.SERVERS[s].HOSTS[h].ZONES[zTmp.init.uri] = {'path': zDir, 'name': zTmp.name, 'init': zTmp.init, "shared": zTmp.shared };
			}
		}
	}
}

function LoadZones()
{
	wf.parseServersAndHosts(cbZones);
}
