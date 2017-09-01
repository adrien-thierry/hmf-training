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

module.exports = init;
var wf = WF();
function init()
{
	// LOAD DATAMAP
	var self = this;

	var mapList = [];
	fs.readdir(this.link.dataPath, function(err, data)
	{
		if(data)
		{
			for(var a = 0; a < data.length; a++)
			{
				mapList.push( path.join(data[a], data[a] + wf.CONF.FDB_DATAMAP_END ));
				var storePath = path.join(self.link.dataPath, data[a],wf.CONF.FDB_STORE_FOLDER);
				try{wf.mkdirp(storePath);}catch(e){console.log(e);}
			}
			var i = 0;
			var j = 0;
			if(data) j = data.length;
			if(i < j)
				self.recursiveRead(self, "datamap", self.link.dataPath, mapList, data, i, j, self.loadData, self.CreateDatamap);
		}
		else
		{
			self.loadData(self);
		}
	});
};
