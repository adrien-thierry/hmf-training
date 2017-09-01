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
wf.AppServer.net = Net;

function Net(srv)
{
    function netHandler(socket)
    {
		socket.id = socket.remoteAddress + "_" + socket.remotePort;
        socket.srv = srv;
        // DEFAUL HOST IS LOCAL BECAUSE OF PROTOCOL
		if(wf.SERVERS[srv].HOSTS[wf.CONF.DEFAULT_NET])
		{
			socket.app = wf.SERVERS[srv].HOSTS[wf.CONF.DEFAULT_NET].appArray;
			// FORGE SERVERS
			socket.SERVER = wf.SERVERS[srv];
			// FORGE HOST
			socket.HOST = socket.SERVER.HOSTS[wf.CONF.DEFAULT_NET];
			// Set CLIENTS
			socket.SERVER.CLIENTS[socket.id] = socket;
			// Set disconnect function
			socket.on('end', function()
			{
				delete socket.SERVER.CLIENTS[socket.id];
			});
			// DO
			wf.LoopExec(socket, socket);
		}
		else
		{
			wf.Log("Local host is not defined");
		}
    }

    wf.SERVERS[srv].CLIENTS = {};
    wf.SERVERS[srv].HANDLES = {};
	// LISTEN ON EACH PORTS
    for(var p in wf.SERVERS[srv].port)
    {
        var name = srv + "_" + p + "_" + wf.SERVERS[srv].port[p];
        wf.Log(name);
        var tSrv = net.createServer(netHandler);
        wf.SERVERS[srv].HANDLES[name] = tSrv;
        tSrv.listen(wf.SERVERS[srv].port[p]);
    }
}
