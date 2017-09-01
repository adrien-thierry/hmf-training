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

module.exports.FDB = FDB;
UTILS.FDB = FDB;
var wf = WF();

var DEFAULT_CONF =
{
	state: true,
	cache:{ refresh: true, timeout: 1000,}
};

var DEFAULT_DATAMAP =
{
	config:
	{
		footprint:
		{
			type:"item", // none, item, full
			item:{}
		},
	},
};

var DEFAULT_DATA = {};

function FDB(obj)
{
	this.CONFIG = {};
	this.DATAMAP = {};
	this.DATA = {};

	// CRUD FUNCTIONS
	this.FindById = require(path.join(__dirname, "fdb", "findbyid.fdb.js")).bind(this);
	this.Count = require(path.join(__dirname, "fdb", "count.fdb.js")).bind(this);
	this.Find = require(path.join(__dirname, "fdb", "find.fdb.js")).bind(this);
	this.Create = require(path.join(__dirname, "fdb", "create.fdb.js")).bind(this);
	this.Insert = this.Create;
	this.Save = require(path.join(__dirname, "fdb", "save.fdb.js")).bind(this);
	this.UpdateById = require(path.join(__dirname, "fdb", "updatebyid.fdb.js")).bind(this);
	this.Update = require(path.join(__dirname, "fdb", "update.fdb.js")).bind(this);
	this.DeleteById = require(path.join(__dirname, "fdb", "deletebyid.fdb.js")).bind(this);
	this.Delete = require(path.join(__dirname, "fdb", "delete.fdb.js")).bind(this);
	// END CRUD FUNCTIONS

	// INIT DB
	this.init = require(path.join(__dirname, "fdb", "init.fdb.js")).bind(this);
	// END INIT

	// DB LINK
	this.link =
	{
		connected: false,
		database: null,
		folder: null,
		path: null,
		datamap: {},
		data: {},
		dataPath: null,
		config: null,
		configPath: null,
	};
	// END DB LINK

	function loadIt(self, arr, i, j)
	{
		var d = arr[i];
		if(d == undefined) return;

    if(!self.link.buffer) self.link.buffer = {};
		if(!self.link.data[d]) self.link.data[d] = {};
		var folder = path.join(self.link.dataPath, d,wf.CONF.FDB_STORE_FOLDER);

    // Init empty buffer
    self.link.buffer[d] = Buffer.from([]);

		fs.readdir(folder, function(err, files)
		{
			if(!err)
			{
				files.filter(function(file)
				{
					return file.substr(- (".".length + d.length + wf.CONF.FDB_DATA_END.length)) === "." + d + wf.CONF.FDB_DATA_END;
				}).forEach(function(file)
				{
					var dataJson = path.join(folder, file);
					fs.readFile(dataJson, function(err, data)
					{
						if(!err)
						{
							try
							{
								var fIndex = file.split("." + d + wf.CONF.FDB_DATA_END)[0];

                // TODO : stockage en buffer
								self.link.data[d][fIndex] = JSON.parse(data.toString());
                self.link.buffer[d] = Buffer.concat( [ self.link.buffer[d], Buffer.from([0]), data ] );
							}
							catch(e)
							{
                console.log(e);
								console.log("[!] Corrupted data : " + dataJson);
							}
						}
						else
						{
							console.log(err);
							// ERROR
						}
					});
				});
			}
		});
		startLoad(self, arr, i, j);
	}

	function startLoad(self, arr, i, j)
	{
		i++;
		if(i < j)
			loadIt(self, arr, i, j);
	}

	// LOAD DATA
	this.loadData = function(self)
	{
		if(!self) return;
		if(!self.link || !self.link.datamap) return;
		var i = 0;
		var j = 0;
		var arr = [];
		for(var d in self.link.datamap)
		{
			arr.push(d);
		}
		var j = arr.length;
		loadIt(self, arr, i, j);

	};
	// END LOAD DATA

	this.Error = function(code, message)
	{
		return {};
	}

	this.updateStore = function(dataPath, coll, arr, i, j)
	{
		var self = this;

		var currentPath = path.join(dataPath, arr[i].id + "." + coll + wf.CONF.FDB_DATA_END);
		fs.writeFile(currentPath, JSON.stringify(arr[i]), function(errw)
		{
			if(!errw)
			{
				self.link.data[coll][arr[i].id] = arr[i];
				i++;
				if(i < j)
					self.updateStore(dataPath, coll, arr, i, j);
			}
			else cb(errw, null);
		});
	}

	this.findRecursive = function(dataPath, dataArray, arr, i, j, cb)
	{
		var self = this;
		var inArr = arr;
		fs.readFile(path.join(dataPath, arr[i]), function(err, data)
		{
			if(!err)
			{
				try
				{
					dataArray.push(JSON.parse(data.toString()));
				}
				catch(e)
				{
					// Error
				}
			}
			i++;
			if(i < j)
				self.findRecursive(dataPath, dataArray, inArr, i, j, cb);
			else
				cb(dataArray);
		});
	}

	/* DB UTIL */
	this.checkConnection = function(self)
	{
		if(self.link.config.state)
		{
			self.link.connected = true;
			self.init();

			// on charge les datamap + les data ici
			// on check ce qu'il est dans datamap et pas dans le dossier data et on delete
			// on check ce qu'il y a dans data et pas dans datamap et on le rajoute
		}
	};
	/* END DB UTIL */

	this.CreateConf = function(cb)
	{
		this.link.config = DEFAULT_CONF;
		var toWrite = JSON.stringify(DEFAULT_CONF);
		fs.writeFile(this.link.configPath, toWrite, function(err){ if(cb) cb(err)});
	};

	this.CreateDatamap = function(index, dPath, cb)
	{
		this.link.datamap[index] = DEFAULT_DATAMAP;
		var toWrite = JSON.stringify(DEFAULT_DATAMAP);
		fs.writeFile(dPath, toWrite, function(err){ if(cb) cb(err);});
	};

	this.checkDatamap = function(index, dPath, cb)
	{
		var self = this;
		fs.readFile(dPath, function(err, data)
		{
			if(err)
			{
				if(err.code == "ENOENT")
				{
					self.CreateDatamap(index, dPath, cb);
				}
				else
				{
					if(cb && typeof cb == "function") cb(err);
					console.dir("[!] Error : " + err);
				}
			}
			else
			{
				self.link.datamap[index] = JSON.parse(data.toString());
				if(cb && typeof cb == "function") cb();
			}
		});
	};

	this.ReadConf = function(cb, error)
	{
		var self = this;
		fs.readFile(this.link.configPath, function(err, data)
		{
			if(err)
			{
				if(err.code == "ENOENT")
				{
					self.CreateConf();
				}
				else
				{
						console.dir("[!] Error : " + err);
				}
			}
			else
			{
				self.link.config = JSON.parse(data.toString());
			}
			cb(self);
		});
	};

	this.recursiveRead = function (self, variable, folder, arr, data, i, j, cbOk, cbErr)
	{
		if(!self.link[variable]) self.link[variable] = {};
		var index = data[i];
		var toRead = path.join(folder, arr[i]);
		fs.readFile(toRead, function(err, result)
		{
			if(!err)
			{
				var tmp = JSON.parse(result).toString();
				self.link[variable][index] = tmp;
			}
			else
			{
				if(cbErr) cbErr(self, index, toRead);
			}
			i++;
			if(i < j)
			{
				self.recursiveRead(self, variable, folder, arr, data, i, j, cbOk, cbErr);
			}
			else
			{
				cbOk(self);
			}
		});
	}

	// constructor
	this.construct = function()
	{
		if(!obj.database)
		{
			console.log("[!] Error, no database given");
		}

		this.link.database = obj.database;
		if(!obj.folder) this.link.folder = wf.CONF.FDB_PATH;
		else this.link.folder = obj.folder;

		this.link.path = path.join(this.link.folder, this.link.database);
		try{wf.mkdirp(this.link.path);}catch(e){console.log(e);}

		this.link.configPath = path.join(this.link.path, this.link.database + ".conf.js");

		this.link.dataPath = path.join(this.link.path, wf.CONF.FDB_DATA_FOLDER);
		try{wf.mkdirp(this.link.dataPath)}catch(e){console.log(e);}

		this.ReadConf(this.checkConnection);
	};
	this.construct();
}
