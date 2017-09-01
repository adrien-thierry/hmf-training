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

var _0777 = parseInt('0777', 8);


module.exports.mkdirp = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirPErr(err, opts, path, p, made, cb)
{
	if (!err)
	{
		made = made || p;
		return cb(null, made);
	}

	if (typeof opts === 'function')
	{
        f = opts;
        opts = {};
    }
	var xfs = opts.fs || fs;

	switch (err.code)
	{
		case 'ENOENT':
			mkdirP(path.dirname(p), opts, function (err, made)
			{
				if (err) cb(err, made);
				else mkdirP(p, opts, cb, made);
			});
			break;

		default:
			xfs.stat(p, function (er2, stat)
			{
				if (er2 || !stat.isDirectory()) cb(err, made);
				else cb(null, made);
			});
			break;
	}
}

/**
 * Recursive mkdir directory function
 * @name mkdirp
 * @memberof WF
 * @return void
 *
*/
function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function')
	{
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object')
	{
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined)
	{
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    var cb = f || function () {};
    p = path.resolve(p);

    xfs.mkdir(p, mode, function (err)
	{
        mkdirPErr(err, opts, path, p, made, cb);
    });
}

function syncCatch(err, path, p, opts, made)
{
	switch (err.code)
	{
		case 'ENOENT' :
			made = sync(path.dirname(p), opts, made);
			sync(p, opts, made);
			break;
		default:
			var stat;
			try
			{
				stat = xfs.statSync(p);
			}
			catch (err1)
			{
				throw err;
			}
			if (!stat.isDirectory()) throw err;
			break;
	}
}

mkdirP.sync = function sync (p, opts, made)
{
    if (!opts || typeof opts !== 'object')
	{
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined)
	{
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    p = path.resolve(p);

    try
	{
        xfs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err)
	{
        syncCatch(err, path, p, opts, made);
    }
    return made;
};
