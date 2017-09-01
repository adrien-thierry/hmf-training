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

// CREATE SINGLETON
var single;

// SINGLETON CLASS
var singleton = function singleton()
{
    if(getCaller() != singleton.getInstance)
	{
		for(var i in this)
		{
		  delete this[i];
		}
  }
};

function getErrorStack(err, stack)
{
	return stack;
}

// GET SINGLETON CALLER
function getCaller()
{
  try
  {
    var err = new Error();
    var callerfile;
    var currentfile;

    err.prepareStackTrace = getErrorStack;

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length)
    {
      callerfile = err.stack.shift().getFileName();

      if(currentfile !== callerfile) return callerfile;
    }
  } catch (err) {}
  return undefined;
}

// GET SINGLETON INSTANCE
function getInstance()
{
    var caller = getCaller();
    if(caller !== undefined && single !== undefined && caller.indexOf(single.CONF.HOST_FOLDER) > -1)
    {
      var srv = caller.split(single.CONF.SRV_FOLDER)[1].split('/')[0];
      var host = caller.split(single.CONF.HOST_FOLDER)[1].split('/')[0];
	  var result = {};
	  if(single.SERVERS[srv])
	  {
		result =
		{
			HOST: single.SERVERS[srv].HOSTS[host],
		};
	  }
	  return result;
    }

    else if(single === undefined)
    {
        single = new singleton();
    }
    return single;
};

module.exports = getInstance;
