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

module.exports = Save;
var wf = WF();

function Save(collection, data, option, cb)
{
	var self = this;

	if(!self.link.data[collection]) self.link.data[collection] = {};
	if(!collection)
		cb(Error(), null);
	else if(!data)
		cb(Error(), null);

	if(cb == undefined && option != undefined && typeof(option) == "function")
	{
		cb = option;
		option = {};
	}

	if(!data.id) data.id = wf.UID.generate();

	var colpath = path.join(self.link.dataPath, collection);
	var storepath = path.join(colpath,wf.CONF.FDB_STORE_FOLDER);

	function first()
	{
		self.checkDatamap(collection, path.join(colpath, collection +wf.CONF.FDB_DATAMAP_END), two);
	}
	function two()
	{
		try{wf.mkdirp(storepath, three);}catch(e){console.log(e);}
	}
	function three()
	{
		var dPath = path.join(storepath, data.id + "." + collection + wf.CONF.FDB_DATA_END);

		var stored = {};
		try
		{
			stored = JSON.stringify(data);
		}
		catch(e)
		{
			if(cb) cb(e);
		}
		fs.writeFile(dPath, stored, function(err)
		{
			if(!err)
				self.link.data[collection][data.id] = data;
			if(cb) cb(err, wf.Clone(data));
		});
	}
	try{wf.mkdirp(colpath, first);}catch(e){console.log(e);}
};
