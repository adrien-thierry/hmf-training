/*
 * This file is part of FortressJS - Fast, secure, powerful and simple I/O framework
 * Copyright (c) 2014-2016 Adrien THIERRY
 * http://fortressjs.com - http://seraum.com
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

module.exports = FindById;
var wf = WF();
function FindById(collection, id, option, cb)
{
	var self = this;
	/*

		option.filter
		option.alter
		option.orderBy

	*/

	if(cb == undefined && option != undefined && typeof(option) == "function")
	{
		cb = option;
		option = {};
	}

	// search in fs
	if(option.raw)
	{
		var dataPath = path.join(this.link.dataPath, collection,wf.CONF.FDB_STORE_FOLDER, id + "." + collection + wf.CONF.FDB_DATA_END);
		fs.readFile(dataPath, function(err, data)
		{
			var result = null;
			if(!err)
			{
				try
				{
					result = JSON.parse(data.toString());
					cb(err, wf.Clone(result));
				}
				catch(e)
				{
					cb(e, wf.Clone(result));
				}
			}
			else
				cb(err, wf.Clone(result));
		});
	}
	// search in ram
	else
	{
		var result = null;
		if(this.link.data[collection][id]) result = this.link.data[collection][id];
		cb(null, wf.Clone(result));
	}
};
