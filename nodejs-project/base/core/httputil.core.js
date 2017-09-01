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

module.exports.httpUtil = new httpUtil(http);
module.exports.httpsUtil = new httpUtil(https);
UTILS.httpUtil = new httpUtil(http);
UTILS.httpsUtil = new httpUtil(https);

/**
 * httpUtil Catalog of standard http call
 * @class httpUtil
 * @name httpUtil
 * @memberof WF
 *
*/
function httpUtil(httpHandler)
{
    /**
     * Get option of an url like : http://domain/route/one:1;two:2;
     * @memberof httpUtil
     * @example wf.httpUtil.getOption("one:1;two:2");
     *
    */
    this.getOption = function(str)
    {
        var result = {};
        var arr = str.split(";");
        for(var a in arr)
        {
            var tmp = arr[a].split(":");
            if(tmp[1])
                result[tmp[0]] = tmp[1];
        }
        return result;
    };

    /**
     * Send a http request.
     * @memberof httpUtil
     * @example wf.httpUtil.httpGet(opt, cbError, cbOk, "utf-8");
     *
    */
    this.httpGet = function(opt, cbError, cbOk, encoding)
    {
        if(!encoding) encoding = "utf8";
        opt.path = encodeURI(opt.path);
        var get = httpHandler.request(opt);
        get.on("error", function(err)
        {
            cbError(err);

        });
        get.on("response", function(response)
        {
            var data = "";
            response.on("data", function(chunk)
            {
                data += chunk.toString(encoding);
            });
            response.on("end", function()
            {
                cbOk(data);
            });
        });
        get.end();
        return;
    };

    /**
     * Send a http request and redirect output in a pipe, then call a callback when finished.
     * @memberof httpUtil
     * @example wf.httpUtil.httpGetPipe(opt, cbError, cbPipe, cbOk);
     *
    */
    this.httpGetPipe = function(opt, cbError,cbPipe, cbOk)
    {
        opt.path = encodeURI(opt.path);
        var get = httpHandler.request(opt);
        get.on("error", function(err)
        {
            cbError(err);

        });
        get.on("response", function(response)
        {
            if(cbPipe)
                cbPipe(response);
            response.on("end", function()
            {
                if(cbOk)
                    cbOk();
            });
        });
        get.end();
        return;
    };

    /**
     * standardized json result object.
     * @memberof httpUtil
     * @example wf.httpUtil.dataSuccess(req, res, "Rest request ok !", {"value":"ok"}, "0.1");
     *
    */
    this.dataSuccess = function(req, res, message, data, version)
    {
        req.continue = false;
        var result =
        {
            success: true,
            status: "Ok",
            message: message,
            code: 0,
            ask: req.url,
            data: data,
            version: version,
            date: new Date(Date.now()),
        };
        res.end(JSON.stringify(result));
     };

    /**
     * standardized json error object.
     * @memberof httpUtil
     * @example wf.httpUtil.dataError(req, res, "Rest request error", 500, "0.1");
     *
    */
    this.dataError = function(req, res, status, message, code, version)
    {
        req.continue = false;
        var result =
        {
            success: false,
            status: status,
            code: code,
            message: message,
            ask: req.url,
            data: null,
            version: version,
            date: new Date(Date.now()),
        };
        res.end(JSON.stringify(result));
     };

}
