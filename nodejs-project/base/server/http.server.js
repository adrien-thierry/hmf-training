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

var wf = WF();
wf.AppServer.http = HttpServer;

function HttpServer(srv)
{

    function httpHandler(req, res)
    {
        //SECURITY : IF NO HOST WE DROP THE REQUEST
        if(!req.headers.host)
        {
          return;
        }
        var ioh = req.headers.host.indexOf(":");
        if(ioh > -1)
        {
            req.host = req.headers.host.substring(0, ioh);
        }
        else req.host = req.headers.host;

		// IF DOMAIN.ABC
        if(wf.SERVERS[srv].HOSTMAP[req.host])
        {
            req.srv = srv;
            req.srvId = srv;
            req.hostId = wf.SERVERS[srv].HOSTMAP[req.host];
			req.SERVER = wf.SERVERS[srv];
            req.HOST = req.SERVER.HOSTS[wf.SERVERS[srv].HOSTMAP[req.host]];
            req.app = req.HOST.appArray;
            wf.LoopExec(req, res);
        }
		// IF *
        else if(wf.SERVERS[srv].HOSTMAP['*'])
        {
            req.srv = srv;
            req.srvId = srv;
            req.hostId = wf.SERVERS[srv].HOSTS[wf.SERVERS[srv].HOSTMAP['*']];
            req.SERVER = wf.SERVERS[srv];
            req.HOST = req.SERVER.HOSTS[wf.SERVERS[srv].HOSTMAP['*']];
            req.app = wf.SERVERS[srv].HOSTS[wf.SERVERS[srv].HOSTMAP['*']].appArray;
            // START ENGINE/APP LOOP
            wf.LoopExec(req, res);
        }
        else
        {
			// BLANK PAGE IF NOTHING WITH THIS HOST NAME EXISTS HERE, CREATE A HOOK FOR EMPTY ENGINE
            res.end();
        }
    }

    // LISTEN ON EACH PORTS
    wf.SERVERS[srv].HANDLES = {};
    for(var p in wf.SERVERS[srv].port)
    {
        var name = srv + "_" + p + "_" + wf.SERVERS[srv].port[p];
        wf.Log(name);
        var tSrv = http.createServer(httpHandler).listen(wf.SERVERS[srv].port[p]);
        wf.SERVERS[srv].HANDLES[name] = tSrv;
    }
}
