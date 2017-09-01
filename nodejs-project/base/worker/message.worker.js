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

module.exports.Message = new WorkerMessage();
UTILS.Message = new WorkerMessage();
var wf = WF();

function WorkerMessage()
{

  this.sendMaster = function(msg)
  {
    //wf.Log("[W] sending command : " + msg.cmd);
    process.send(msg);
  };

  this.restartWF = function()
  {
    this.sendMaster(
    {
        cmd: 'restartWF',
    });
  };

  this.reloadAllSrv = function()
  {
    this.sendMaster(
    {
        cmd: 'reloadAllSrv',
    });
  };

  this.reloadSrv = function(srv)
  {
      this.sendMaster(
      {
        cmd: 'reloadSrv',
        srvId: srv,
      });
  };

  this.haltMaster = function(action)
  {
      this.sendMaster
	  (
      {
        cmd: 'haltSystem',
        action: action,
      });
  };

  this.rebootMaster = function(action)
  {
      this.sendMaster(
      {
        cmd: 'rebootSystem',
        action: action,
      }
    );
  };

  this.addSrvClient = function(srvId, client)
  {
    this.sendMaster(
      {
        cmd:'relayWorker',
        action: 'addSrvClient',
        srvId: srvId,
        client: client,
        from: cluster.worker.id,
      }
    );
  };

  this.deleteSrvClient = function(srvId, clientId)
  {
    this.sendMaster(
      {
        cmd:'relayWorker',
        action: 'deleteSrvClient',
        srvId: srvId,
        clientId: clientId,
        from: cluster.worker.id
      }
    );
  };

  this.updateHostVar = function(srv, host, name, data)
  {
    wf.Message.sendMaster(
    {
        cmd: "relayWorker",
        action: "setHostVar",
        srvId: srv,
        hostId: host,
        varName: name,
        data: data,
        from: cluster.worker.id,
        restrict: true,
    });
  };

  this.updateSrvVar = function(srv, name, data)
  {
    wf.Message.sendMaster(
    {
        cmd: "relayWorker",
        action: "setSrvVar",
        srvId: srv,
        varName: name,
        data: data,
        from: cluster.worker.id,
        restrict: true,
    });
  };

  this.updateRootVar = function(name, data)
  {
    wf.Message.sendMaster(
    {
        cmd: "relayWorker",
        action: "setRootVar",
        varName: name,
        data: data,
        from: cluster.worker.id,
    });
  };

  this.createMaster = function(fn, param)
  {
    wf.Message.sendMaster(
    {
        cmd: "deploy",
        action: "create" + fn,
        param: param,
    });
  };

  this.installMaster = function(tmp, param)
  {
    wf.Message.sendMaster(
    {
        cmd: "deploy",
        action: "install",
        param:
        {
            tmp: tmp,
            list: param,
        }
    });
  };

  this.deleteMaster = function(param)
  {
    wf.Message.sendMaster(
    {
        cmd: "deploy",
        action: "delete",
        param: param
    });
  };

  this.stopMaster = function(srvId)
  {
    wf.Message.sendMaster(
    {
        cmd: "stopSrv",
        srvId: srvId
    });
  };

  this.dumpMaster = function(obj)
  {
      obj.cmd = "dump";
    wf.Message.sendMaster(obj);
  };

  this.execChrootedDaemonMaster = function(obj)
  {
    wf.Message.sendMaster(
        {
            cmd: "execChrootedDaemon",
            action: obj,
        });
  };
}
