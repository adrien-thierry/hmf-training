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

module.exports = PostHttp;

function PostHttp()
{
    var wf = WF();

	function parseMultipartReq(req, multipart)
	{
		for(var r in multipart.parts)
		{
			req.post[r] = multipart.parts[r].body;
		}
		req.field = multipart.fields;
		req.multipart = multipart.isMultipart;
	}

	function parseReqRaw(req)
	{
		var tmp = req.postData.toString();
		var obj = tmp.split("&");
		for(var o = 0; o < obj.length; o++)
		{
			var t = obj[o].split("=");
			if(t[1] === undefined) t[1] = "";
			req.post[t[0]] = unescape(t[1].replace(/\+/gi, " "));
		}
	}

	function parseReqPost(req)
	{
		var multipart = new wf.MultipartParser(req.headers['content-type'], req.postData);
		if(multipart.isMultipart)
		{
			parseMultipartReq(req, multipart);
		}
		else if(req.postData.lastIndexOf !== undefined && req.postData.indexOf("{", 0) === 0)
		{
			try
			{
				req.post = JSON.parse(req.postData);
			}
			catch(e){}
		}
		else
		{
			parseReqRaw(req);
		}
	}

	function parseReqJSON(req)
	{
		for(var p in req.post)
		{
			if(req.post[p].indexOf && req.post[p].indexOf("{", 0) === 0)
			{
				try
				{
					var tmpJ = JSON.parse(req.post[p]);
					req.post[p] = tmpJ;
				}catch(e){ }
			}
		}
	}

	this.code = function(req, res)
	{
    req.post = {};
    if(req.method == "POST" || req.method == "PUT")
    {
      if(req.postData !== undefined)
      {
        parseReqPost(req);
        // PARSE JSON
        parseReqJSON(req);
      }
    }
	};
}
