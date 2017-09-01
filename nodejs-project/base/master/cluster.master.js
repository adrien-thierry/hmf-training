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
module.exports.Cluster = new MasterCluster();


function MasterCluster()
{
	wf.CLUSTERS = {};

	this.exitFunction = function(worker, code, signal)
	{
		//wf.Log("[M] A worker died; reloading one with srvid : " + worker.srvId + " - " + worker.wrkId);
        if(wf.SERVERS[worker.srvId] && wf.SERVERS[worker.srvId].state)
        {
            wf.Cluster.createWorker( worker.srvId, worker.wrkId );
        }
		delete wf.CLUSTERS[worker.id];
	};

    // ON CAPTE LA FERMETURE D'UN WORKER ET ON LE RELANCE
    cluster.on('exit', this.exitFunction);

	this.createWorker = function(srvId, wrkId)
	{
		var currentCluster = cluster.fork( { srvId: srvId, wrkId: wrkId } );
		wf.CLUSTERS[currentCluster.id] = currentCluster;
		wf.CLUSTERS[currentCluster.id].srvId = srvId;
        wf.CLUSTERS[currentCluster.id].wrkId = wrkId;
		cluster.workers[currentCluster.id].on('message', function(msg)
		{
  			 if(msg.cmd !== undefined)
			{
			   wf.Event.DoCmd(msg);
			}
		});
		return currentCluster;
	};

	this.deleteClusters = function()
	{
		for(var currentCluster in wf.CLUSTERS)
		{
			this.deleteCluster(wf.CLUSTERS[currentCluster].id);
		}
	};

	this.deleteCluster = function(id)
	{
		delete wf.CLUSTERS[id];
	};
}
