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

if(cluster.isMaster)
{

  // MASTER STATIC LOAD ORDER
  // CHANGE ONLY IF YOU KNOW WHAT YOU DO
  wf.Load.Base("conf", wf.CONF.MAIN_PATH);
  wf.Load.Base("proto");
  wf.Load.Base("class");
  wf.Load.Base("builder");
  wf.Load.Base("essential");
  wf.Load.Base("core");
  wf.Load.Base("util");
  wf.Load.Base("layer");
  wf.Load.Base("model");
  wf.Load.Base("master");

  // LOG ERRORS BUT DON'T STOP THREAD
  if(wf.CONF.THROW_ERROR) process.on('uncaughtException', uncaughtExceptionCb);
  // LOAD MASTER SERVICES
  wf.Service.Start();

}
else
{
	// SLAVE STATIC LOAD ORDER
	// CHANGE ONLY IF YOU KNOW WHAT YOU DO
	wf.Load.Base("conf", wf.CONF.MAIN_PATH);
	wf.Load.Base("proto");
	wf.Load.Base("class");
	wf.Load.Base("builder");
	wf.Load.Base("essential");
	wf.Load.Base("core");
	wf.Load.Base("util");
  wf.Load.Base("server");
	wf.Load.Base("layer");
	wf.Load.Base("model");
	wf.Load.Base("worker");

    // LOG ERRORS BUT DON'T STOP THREAD
    if(wf.CONF.THROW_ERROR) process.on('uncaughtException', uncaughtExceptionCb);
	// START SERVICES
	wf.Service.loadAll();

}

function uncaughtExceptionCb (err)
{
	wf.Log("uncaughtExceptions => " + err);
}
