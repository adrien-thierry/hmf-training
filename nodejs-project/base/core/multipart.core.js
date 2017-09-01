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

module.exports.MultipartParser = MultipartParser;

var NL = '\r\n'; // RFC2046 S4.1.1
var BOUNDARY_PREFIX = NL+'--'; // RFC2046 S5.1.1
var HEADER_PAIR_DELIM = ':';
var HEADER_SUB_DELIM = '=';

var proxyf = function(func, callingproxy)
{
    var proxyFunction;
    proxyFunction = function()
    {
      return func.apply(callingproxy, arguments);
    };
    return proxyFunction;
};

function MultipartParser(contentType, data)
{
	this.parts = {};
	this.fields = {};
	this.isMultipart = false;

	if ( typeof contentType == 'string' )
    {
		contentType = contentType.trim();
		this.isMultipart = contentType.indexOf('multipart/form-data') === 0;
		parse.call(this, contentType, data);
	}
}

function parse(contentType, rawData)
{
	if ( !this.isMultipart )
	{
		return;
	}
  data = rawData.toString('binary');
	if ( data.substr(0, NL.length) != NL )
    {
		data = NL+data;
	}
	var params = parseHeaderValue(contentType);
	if ( params.hasOwnProperty('boundary') )
  {
        var parts = data.split(BOUNDARY_PREFIX+params.boundary);
        parts.forEach(proxyf(function(chunk, i, arr)
    {
            // split the headers and body for this chunk
            var pieces = splitHeaderBody(chunk);
            if ( pieces.header && pieces.body )
      {
                // build headers object
                var headers = parseHeader(pieces.header);
                // if nested multipart form-data; recurse
                if ( headers.hasOwnProperty('content-type') && headers['content-type'].indexOf('multipart/form-data') === 0 )
        {
                    parse.call(this, headers['content-type'], pieces.body);
                }
        else if ( headers.hasOwnProperty('content-disposition') )
        {
                    var disposition = parseHeaderValue(headers['content-disposition']);
                    if ( disposition !== undefined && disposition.hasOwnProperty('name') )
                    {
                        // PUT FIELDS INFO
                        this.fields[disposition.name] =
                        {
                            headers: headers,
                            disposition: disposition,
                            mime: headers['content-type']||'',
                        };
                        // PUT FILENAME IF ANY
                        if(disposition.filename !== undefined)
                        {
                            this.fields[disposition.name].filename = disposition.filename;
                        }
                        // CONSTRUCT PARTS
                        this.parts[disposition.name] = //pieces.body;
                        {

                            headers: headers,
                            disposition: disposition,
                            mime: headers['content-type']||'',
                            body: pieces.body
                        };
                    }
                }
            }
        },this));
    }
}

function splitHeaderBody(data)
{
	var sections = data.split(NL+NL/*;2*/);
	var obj =
  {
		"header": sections[0],
		//"body": sections[1]
	};
  sections.splice(0, 1);
  var body = "";
  var lSections = sections.length;
  for(var i = 0; i < lSections; i++)
  {
    body += sections[i];
    if(i != (lSections - 1)) body += NL+NL;
  }
  obj.body = body;
  return obj;
}

function parseHeader(header)
{
	var headers = {};
    var headersArr = header.split(NL)
			.map(function(v){return v.trim();})
			.filter(function(v){return !!v;});
	headersArr.forEach(function(v){
		var o = {};
        var t = v.split(HEADER_PAIR_DELIM, 2);
		if ( typeof t[1] == 'string' )
        {
			t[1] = t[1].trim();
		}
		headers[t[0].toLowerCase().trim()] = t[1];
	});
	return headers;
}

function parseHeaderValue(value)
{
	var params = {};
    var paramsArr = value.split(';')
			.map(function(v){return v.trim();})
			.filter(function(v){return !!(v||v.indexOf('='));});
	paramsArr.forEach(function(v){
		var o = {};
        var t = v.split(HEADER_SUB_DELIM, 2);
		if ( typeof t[1] == 'string' ) {
			t[1] = t[1].replace(/^[\s'"]+|[\s'"]+$/g, '');
		}
		params[t[0].toLowerCase().trim()] = t[1];
	});
	return params;
}
