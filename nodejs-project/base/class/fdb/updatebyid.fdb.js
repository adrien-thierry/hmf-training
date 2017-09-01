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

module.exports = UpdateById;
var wf = WF();

function UpdateById(collection, id, update, option, cb)
{
	var self = this;

	if(!collection)
	{
		cb(Error(), null);
		return;
	}
	else if(!id)
	{
		cb(Error(), null);
		return;
	}
	else if(!update)
	{
		cb(Error(), null);
		return;
	}

	if(cb == undefined && option != undefined && typeof(option) == "function")
	{
		cb = option;
		option = {};
	}

	if(!option) option = {};
	if(!option.replace) option.replace = false;
	var dataPath = path.join(this.link.dataPath, collection,wf.CONF.FDB_STORE_FOLDER, id + "." + collection + wf.CONF.FDB_DATA_END);

	fs.readFile(dataPath, function(err, data)
	{
		var result = null;
		if(!err)
		{
			try
			{
				result = JSON.parse(data.toString());
				if(option.replace)
				{
					result = update;
				}
				else
				{
					for(var u in update)
					{
						result[u] = update[u];
					}
				}
				fs.writeFile(dataPath, JSON.stringify(result), function(errw)
				{
					if(!errw)
						self.link.data[collection][id] = result;
					cb(errw, wf.Clone(result));
				});
			}
			catch(e)
			{
				cb(e, wf.Clone(result));
			}
		}
		else
			cb(err, wf.Clone(result));
	});
};
