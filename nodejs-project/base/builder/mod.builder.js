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

/******************************* MOD UTILS ******************************/
UTILS.LoadMod = function(req, res, v)
{
    var view = req.HOST.ZONES[req.zone].MODS[req.modPath][req.mod].view;
    if(view[v] !== undefined)
    {
      res.tpl.inner += view[v];
    }
};
UTILS.GetModView = function(req, res, v)
{
    var view = req.HOST.ZONES[req.zone].MODS[req.modPath][req.mod].view;
    if(view[v] !== undefined)
    {
      return view[v];
    }
};
UTILS.EndMod = function(req, res, v)
{
    if(req.HOST.ZONES[req.zone].MODS[req.modPath][req.mod].view[v] !== undefined)
    {
      res.end(req.HOST.ZONES[req.zone].MODS[req.modPath][req.mod].view[v]);
    }
    else res.end("Undefined view");
};
/****************************************************************************/
