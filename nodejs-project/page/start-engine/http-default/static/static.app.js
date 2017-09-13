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

module.exports = RouteStatic;
function RouteStatic()
{
    var wf = WF();

	function sendFile(req, res, url)
	{
    try
    {
		  res.writeHead(200,
		  {
  			'Content-type': req.HOST.ZONES[req.zone].shared[url].mime,
  			'Content-length': req.HOST.ZONES[req.zone].shared[url].buffer.length,
  			'Cache-Control': 'public, max-age=3600',
  			'Access-Control-Allow-Origin': req.url, // "*"
  			'X-Frame-Options': "SAMEORIGIN", // DENY, SAMEORIGIN, or ALLOW-FROM
  		});
      res.end(req.HOST.ZONES[req.zone].shared[url].buffer);
    }
    catch(e)
    {
      console.log("Static error : " + err + " | req : " + req.rawUrl);
      req.continue = true;
      next(req, res);
    }


	}

	function addToCache(req, stat, folder, url)
	{
		var toAdd = {};
		fs.readFile(folder, function(err, data)
		{
			if(!err)
			{
				toAdd.buffer = data;
				var cLength = toAdd.buffer.byteLength;
				toAdd.mime = wf.mimeUtil.lookup(folder);
				toAdd.path = folder;
				toAdd.mtime = stat.mtime;
				if(req.HOST.ZONES[req.zone].shared === undefined)
				{
					req.HOST.ZONES[req.zone].shared = {};
				}
				req.HOST.ZONES[req.zone].shared[url] = toAdd;
			}
		});
	}

    this.code = function(req, res)
    {
        var sUrl = "";
        if(req.zone == req.HOST.default_zone)
        {
            if(req.url.indexOf("/" + req.HOST.default_zone) < 0)
            {
                sUrl = "/" + req.zone + req.url;
            }
        }
        else
        {
            sUrl = req.url;
        }


        if(req.HOST.ZONES[req.zone] && req.HOST.ZONES[req.zone].shared !== undefined && req.HOST.ZONES[req.zone].shared[sUrl] !== undefined)
        {
            req.continue = false;
            sendFile(req, res, sUrl);
        }
        else if(req.HOST.ZONES[req.zone].init && req.HOST.ZONES[req.zone].init.shared !== undefined )
        {

            var f = "";

            if ( req.url.indexOf("/" + req.zone) === 0)
                f = req.url.replace("/" + req.zone, '');

            else f = req.url;

            req.continue = false;

            f = path.join(req.HOST.ZONES[req.zone].path, req.HOST.ZONES[req.zone].name, req.HOST.ZONES[req.zone].init.shared, f);

            f = path.resolve(f);

            var fold = path.join(req.HOST.ZONES[req.zone].path, req.HOST.ZONES[req.zone].name, req.HOST.ZONES[req.zone].init.shared);

            if(f == fold || f.indexOf( fold + "/" ) < 0)
            {
              req.continue = true;
              return;
            }
            else
            {
              try
              {

                fs.stat(f, function(err, stat)
                {
                    if(err)
                    {
                        next(req, res);
                    }
                    else if(stat.isFile())
                    {
                        var cLength = 0;
                        if( req.HOST.ZONES[req.zone].init.cache && UTILS.checkCache(req.HOST.ZONES[req.zone].init.cache, f) )
                        {
                                addToCache(req, stat, f, sUrl);
                        }
                        res.writeHead(200,
                        {
                            'Content-type': wf.mimeUtil.lookup(f),
                            'Cache-Control': 'public, max-age=3600',
                            'Access-Control-Allow-Origin': req.url, // "*"
                            'X-Frame-Options': "SAMEORIGIN", // DENY, SAMEORIGIN, or ALLOW-FROM
                        });
                        fs.createReadStream(f, {bufferSize: 64 * 1024}).pipe(res);
                    }
                    else
                    {
                        req.continue = true;
                        next(req, res);
                    }
                });
              }
              catch(e)
              {
                console.log("URL : " + req.rawUrl);
                 console.log(e);
              }
            }
        }
        return;
    };
}
