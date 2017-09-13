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

module.exports = pageEngine;
var wf = WF();

function createRoute(srv, host, zone, page, path)
{
	var context = wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[page];
	if(wf.SERVERS[srv].HOSTS[host].default_page && wf.SERVERS[srv].HOSTS[host].default_page == page)
	{
		for(var u in wf.SERVERS[srv].HOSTS[host].host)
		{
			wf.Router.ANY(u, path, wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[page].exec.code.bind(context));
		}
	}
	else
	{
		for(var v in wf.SERVERS[srv].HOSTS[host].host)
		{
			wf.Router.ANY(v, path + page, wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[page].exec.code.bind(context));
		}
	}
}

function cbPages(srv, host, zone)
{
	var path = "/";
	if(wf.SERVERS[srv].HOSTS[host].default_zone && wf.SERVERS[srv].HOSTS[host].default_zone != zone)
	{
		path += zone + "/";
	}
	for(var page in wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES)
	{
		if(wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[page].exec && wf.SERVERS[srv].HOSTS[host].ZONES[zone].PAGES[page].exec.code)
		{
			createRoute(srv, host, zone, page, path);
		}
	}
}

function pageEngine()
{
    wf.parseServersAndHostsAndZones(cbPages);
}
