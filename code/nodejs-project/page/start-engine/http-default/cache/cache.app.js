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

module.exports = cacheApp;
function cacheApp()
{
    var wf = WF();
    this.runOnce = function()
    {
        function doCache()
        {
            if(wf.CONF.SHARED_CACHE && wf.CONF.REFRESH_CACHE)
            {
                setInterval(getCache, wf.CONF.INTERVAL_CACHE);
            }
        }


		function cbCache(srv, host, zone)
		{
			if(wf.SERVERS[srv].HOSTS[host].ZONES[zone].init.shared !== undefined && wf.SERVERS[srv].HOSTS[host].ZONES[zone].init.cache !== undefined)
			{
				for(var folder in wf.SERVERS[srv].HOSTS[host].ZONES[zone].shared)
				{
					var tmp = wf.SERVERS[srv].HOSTS[host].ZONES[zone].shared[folder];

					function cbStat(err, stat)
					{
						if(err || !stat.isFile())
						{
							delete wf.SERVERS[srv].HOSTS[host].ZONES[zone].shared[folder];
						}

						else if( tmp.mtime != stat.mtime && UTILS.checkCache(wf.SERVERS[s].HOSTS[host].ZONES[zone].init.cache, tmp.path) )
						{
							try
							{
								var toAdd = {};
								toAdd.buffer = fs.readFileSync(tmp.path);
								toAdd.mime = wf.mimeUtil.lookup(tmp.path);
								toAdd.path = tmp.path;
								toAdd.mtime = stat.mtime;
								wf.SERVERS[srv].HOSTS[host].ZONES[zone].shared[folder] = toAdd;
							}
							catch(e){}
						}
					}

					fs.stat(tmp.path, cbStat);
				}
			}
		}

        function getCache()
        {
			wf.parseServersAndHostsAndZones(cbCache);
        }

        wf.eventEmitter.on("run", doCache);
    };
}
