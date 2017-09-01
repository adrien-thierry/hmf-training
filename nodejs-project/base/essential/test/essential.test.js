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
WF().SERVERS = {};

// TEST app.essential.js
console.log("[+] Loading app essential");
test = require('../app.essential.js');
for(var exp in test)
{
		test[exp]({loop:0,app:[{exec:{}}]});
}

// TEST event.essential.js
console.log("[+] Loading event essential");
test = require('../event.essential.js');

// TEST host.essential.js
console.log("[+] Loading host essential");
test = require('../host.essential.js');
for(var exp in test)
{
		test[exp]({host:[{}]});
		new test[exp]({host:[{}]});
}

// TEST mimeutil.essential.js
console.log("[+] Loading mimeutil essential");
test = require('../mimeutil.essential.js');
console.log("[+] Lookup test.js -> " + test.mimeUtil.lookup('test.js'));

// TEST mod.essential.js
console.log("[+] Loading mod essential");
test = require('../mod.essential.js');
for(var exp in test)
{
		new test[exp]({mod:[{}]});
}

// TEST page.essential.js
console.log("[+] Loading page essential");
test = require('../page.essential.js');
for(var exp in test)
{
		new test[exp]({page:[{}]});
}

// TEST process.essential.js
console.log("[+] Loading process essential");
test = require('../process.essential.js');
for(var exp in test)
{
		new test[exp]();
}

// TEST script.essential.js
console.log("[+] Loading srv essential");
test = require('../srv.essential.js');
for(var exp in test)
{
	if(typeof test[exp] == "function")
		test[exp]({app:[]});
}

// TEST zone.essential.js
console.log("[+] Loading zone essential");
test = require('../zone.essential.js');
for(var exp in test)
{
	new test[exp]([]);
}

console.log('[+] ESSENTIAL TEST OK');
