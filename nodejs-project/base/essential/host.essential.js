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

module.exports.LoadHost = LoadHost;
var wf = WF();

function LoadHost()
{
  for(var srv in wf.SERVERS)
  {
    wf.SERVERS[srv].HOSTS = {};
    wf.SERVERS[srv].HOSTMAP = {};
    var tmpMap = [];
    var hDir = wf.CONF.SRV_PATH + srv + "/" + wf.CONF.HOST_FOLDER;

    if(fs.existsSync(hDir) && fs.lstatSync(hDir).isDirectory())
    {
      var hArr = fs.readdirSync(hDir);
	  for(var d in hArr)
      {
        var hTmp = new wf.HostClass.Host(hDir, hArr[d]);
        if(hTmp.hostState && hTmp.init.state)
        {
            wf.SERVERS[srv].HOSTS[hArr[d]] =
            {
              'id': hArr[d],
              'path': hDir,
              'host':hTmp.init.host,
              'hostState': hTmp.hostState,
              'state': hTmp.init.state,
              'name': hTmp.name,
              'app': hTmp.init.app,
              'default_zone': hTmp.init.default_zone,
              'default_page': hTmp.init.default_page,
              'default_url': hTmp.init.default_url,
              'init': hTmp.init,
            };
            for(var i in hTmp.init.host)
            {
                tmpMap.push({pos: hTmp.init.pos, host:i, hostId: hArr[d]});
            }

        }
      }
    }
      tmpMap.sort(function(a, b){return a.pos - b.pos;});
      for(var n = 0; n < tmpMap.length; n++)
      {
          wf.SERVERS[srv].HOSTMAP[tmpMap[n].host] = tmpMap[n].hostId;
      }
  }
}
