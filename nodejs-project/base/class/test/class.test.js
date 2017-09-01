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

var test;
var wf = WF();
wf.CONF['ERROR'] = true;


test = require('../app.class.js');
var loadFDB = require('../fdb.class.js');
console.log("[+] Loading FortressDB");
var fdb = new loadFDB.FDB({database:"Test"});
// test with existing data
setTimeout(function()
{
	console.log("[+] Saving");
	// SAVE
	fdb.Save("test", {"id": "my_first_post", "Title":"Hey ! My First post !", "content":"This is the content of my first post"}, function(err, dataS)
	{
		console.log(dataS)
		// FindById
		console.log("[+] Finding");
		fdb.FindById("test","my_first_post", function(err, dataF)
		{
			console.log(dataF);
			console.log("[+] Updating");
			fdb.UpdateById("test", "my_first_post", {"tag": "one tag, cool, blabla"}, function(err, dataU)
			{
				console.log(dataU);
				console.log("[+] Counting");
				fdb.Count("test", {}, function(err, dataC)
				{
					console.log("Total : " + dataC);
					console.log("[+] Deleting");
					fdb.DeleteById("test", "my_first_post",
					function(err, data)
					{
						console.log(data)
					});
				});
			});
		});
	});
}, 3000);
// test with null data
setTimeout(function()
{
	console.log("[+] Saving");
	// SAVE
	fdb.Save("test", {"id": "_my_first_post", "Title":"Hey ! My First post !", "content":"This is the content of my first post"}, function(err, dataS)
	{
		console.log(dataS)
		// FindById
		console.log("[+] Finding");
		fdb.FindById("test","my_first_post", function(err, dataF)
		{
			console.log(dataF);
			console.log("[+] Updating");
			fdb.UpdateById("test", "my_first_post", {"tag": "one tag, cool, blabla"}, function(err, dataU)
			{
				console.log(dataU);
				console.log("[+] Counting");
				fdb.Count("test", {}, function(err, dataC)
				{
					console.log("Total : " + dataC);
					console.log("[+] Deleting");
					fdb.DeleteById("test", "my_first_post",
					function(err, data)
					{
						console.log(data)
						console.log("[+] Deleting");
						fdb.DeleteById("test", "_my_first_post",
						function(err, data)
						{
							console.log(data)
						});
					});
				});
			});
		});
	});
}, 5000);

//fdb.Update("user", {"age":15, "name":"Owned !"}, {age:999}, function(err, data){ console.log(err); console.log(data);});

console.log("[+] Loading host");
test = require('../host.class.js');
console.log("[+] Loading mod");
test = require('../mod.class.js');
console.log("[+] Loading page");
test = require('../page.class.js');
console.log("[+] Loading process");
test = require('../process.class.js');

console.log('[+] CLASS TEST OK');
