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

module.exports.Config = Config;
var wf = WF();

/**
 * CRUD functions for store json config file
 * @memberof WF
 * @class Config
 * @example var conf = new wf.Config("/my/path/conf.json");
 * @example conf.value = {"one":1, "two":3};
 * @example conf.Save();
 * @example conf.Read();
 *
*/
function Config(path, name)
{
    /**
     * The path of the config
     * @property path
     * @memberof! WF.Config
     * @type string
    */
    this.path = path;
    this.name = name;
    /**
     * The value of the config
     * @property value
     * @memberof! WF.Config
     * @type Object
    */
    this.value = {};

    /**
     * Read a config file
     * @method Read
     * @memberof! WF.Config
    */
    this.Read = function(cb)
    {
        try
        {
            fs.readFile(this.path, function(data)
            {
               this.value = JSON.parse(data);
              if(cb && typeof cb == "function") cb();
            });
        }
        catch(e){}
    };

    /**
     * Save a config file
     * @method Save
     * @memberof! WF.Config
    */
    this.Save = function()
    {
        fs.writeFile(this.path, JSON.stringify(this.value), 'binary', function(err){wf.Log(err);});
    };
}
