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

module.exports.Service = new WorkerService();
var wf = WF();

function WorkerService()
{
  this.startSrv = function()
  {
        wf.Srv.Run();
  };

  this.stopSrv = function()
  {
      process.exit();
  };

  this.loadAll = function()
  {
      // LOAD SLAVES SERVICES

      wf.LoadServer(process.env.srvId); // LOAD SRV
      wf.LoadHost(); // LOAD HOST FOR SRV
      wf.LoadZones(); // LOAD ZONES
      wf.LoadPages(); // LOAD PAGES IF ANY
      wf.LoadEngines(); // LOAD ENGINES
      wf.LoadServerEngine(); // LOAD ENGINES FOR SRV
      wf.LoadApps(); // LOAD APPS FOR HOST
      wf.LoadHooks(); // LOAD HOOKS
	  wf.LoadModels(); // LOAD MODELS
	  wf.LoadAppArray(); // LOAD APP ARRAY FOR EACH HOST
      // RUN SERVERS
      wf.Srv.Run(); // RUN THE SERVER
      wf.eventEmitter.emit("run"); // LAUNCH RUN EVENT

  };

  this.reloadAllSrv = function(obj)
  {
	process.exit();
  };

  this.deleteSrvClient = function(obj)
  {
     wf.Log("[!] deleting client " + obj.clientId + " from server " + obj.srvId);
     wf.Srv.deleteClient(obj.srvId, obj.clientId);
  };

  this.addSrvClient = function(obj)
  {
    wf.Log("[!] Adding client " + obj.client.id + " to srv " + obj.srvId);
    if(wf.SERVERS[obj.srvId].CLIENTS[obj.client.id] === undefined)
    {
      wf.SERVERS[obj.srvId].CLIENTS[obj.client.id] = obj.client;
    }
  };

  this.setRootVar = function(obj)
  {
      wf.Log("Receive setRootVar for : " + obj.varName);
      if(obj.varName && obj.data)
      {
          wf[obj.varName] = obj.data;
      }
  };

  this.setSrvVar = function(obj)
  {
      if(obj.srvId && obj.varName && obj.data)
      {
          wf.SERVERS[obj.srvId][obj.varName] = obj.data;
      }
  };

  this.setHostVar = function(obj)
  {
      if(obj.srvId && obj.hostId && obj.varName && obj.data)
      {
          if(wf.SERVERS[obj.srvId] && wf.SERVERS[obj.srvId].HOSTS[obj.hostId])
            wf.SERVERS[obj.srvId].HOSTS[obj.hostId][obj.varName] = obj.data;
      }
  };
}
