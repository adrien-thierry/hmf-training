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

module.exports = homePage;

function homePage(ok)
{
		exec("echo 'TECHIO> open -p 8080 /' > /proc/1/fd/1", function(error, stdout, stderr){});
    this.code = function(req, res)
    {
				var view = this.view.home;
				var id = req.get.page || "home";
				var url = req.url.split("?");

				if(url.length > 1) url = url[1];
				else url = "";
				console.log("page = " + id);
				if( id.indexOf("'") == 0  ||  id.indexOf("%27") == 0 )
				{
					exec("echo 'TECHIO> success true'", function(error, stdout, stderr){});
				}
				view = view.replace('$_URL', url);
				view = view.replace('$_ID', id);
        res.end(view);
    };
}
