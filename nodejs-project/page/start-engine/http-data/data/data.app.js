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

module.exports = dataEngine;
var wf = WF();

function dataEngine()
{
  function parseData(req, res)
  {
    try
    {
      if(req.contentLength > wf.CONF.MAX_POST_SIZE)
      {
        res.destroy();
      }
      else
      {
        req.on("data", function(d)
        {
          try
          {
            req.postData = Buffer.concat([req.postData, d]);
          }
          catch(e){}

          if(req.postData.length > wf.CONF.MAX_POST_SIZE)
          {
            res.destroy();
          }
        });

        var root = this;
        req.on("end", function()
        {
          next(req, res);
        });
      }
    }
    catch(e)
    {
      res.destroy();
    }
  }

  this.code = function(req, res)
  {
    var cbDestroy = function()
    {
      req.destroy();
    };
    req.contentLength = parseInt(req.headers['content-length']);
    req.postData = Buffer.from([]);
    req.on("error", cbDestroy);
    req.on("clientError",  cbDestroy);

    if(req.method != "POST" && req.method != "PUT")
    {
      return;
    }
    else
    {
      req.continue = false;
      parseData(req, res);
    }
  };
}
