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

module.exports = Delete;
var wf = WF();

function Delete(collection, query, option, cb)
{
	var self = this;

	var result = [];

	var dataPath = path.join(this.link.dataPath, collection, wf.CONF.FDB_STORE_FOLDER);

	if(cb == undefined && option != undefined && typeof(option) == "function")
	{
		cb = option;
		option = {};
	}

	if(option.raw)
	{
		fs.readdir(dataPath, function(err, file)
		{
			var dataArray = [];
			var i = 0;
			var j = 0;
			if(file) j = file.length;
			if(i < j)
				self.findRecursive(dataPath, dataArray, file, i, j, deleteData);
			else cb(null, wf.Clone(dataArray));
		});
	}
	else
	{
		if(this.link.data[collection])
			deleteData(self.link.data[collection]);
		else cb(null, []);
	}

	function deleteData(dataArray)
	{
		var result = [];
		if(query && typeof query == "object")
		{
			if(Object.keys(query).length == 0) result = dataArray;
			else if(dataArray)
			{
				if(typeof dataArray == "array")
				{
					result = dataArray;
					var e = result.length;
					for(var d = 0; d < e; d++)
					{
						// mettre du recursif
						for(var r in query)
						{
							if(!result[d][r] || result[d][r] !== query[r])
							{
								result.splice(d, 1);
								d--;
								e--;
								break;
							}
						}
					}
				}
				else
				{
					var result = [];
					for(var d in dataArray)
					{
						var good = true;
						// mettre du recursif
						for(var r in query)
						{
							if(!dataArray[d][r] || dataArray[d][r] !== query[r])
							{
								good = false;
								break;
							}
						}
						if(good) result.push(dataArray[d]);
					}
					dataArray = result;
				}
			}
		}
		for(var del = 0; del < result.length; del++)
		{
			fs.unlink(path.join(dataPath, result[del].id + "." + collection + wf.CONF.FDB_DATA_END), function(){});
			delete self.link.data[collection][result[del].id];
		}
		cb(null, wf.Clone(result));
	}
};
