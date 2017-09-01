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

module.exports.Model = Model;
UTILS.Model = Model;

/**
 * Data model
 * @class Model
 * @memberof WF
 *
*/
function Model(empty)
{
	this.empty = false;
	if(empty === true) this.empty = true;

	if(this.field === undefined) this.field = {}
	this.data = {};
	this.query = {};
	this.options = {};
	this.cb = function (err, data) {};

	this.construct = function()
	{
		if(this.empty === false)
		{
			for(var v in this.field)
			{
				if(typeof(this.field[v]) === 'object')
				{
					if(this.field[v].bydefault !== undefined)
					{
					  this.data[v] = this.field[v].bydefault;
					}
				}
			}
		}
	}

	this.Delete = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = "21";
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			this.link.Delete(this.collection, this.data, this.options, this.ForgeCallback());
		}
		else
		{
			this.cb(error, null);
		}
	}

	this.Insert = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = "21";
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			this.link.Insert(this.collection, this.data, this.options, this.ForgeCallback());
		}
		else
		{
			this.cb(error, null);
		}
	}
	this.Create = this.Insert;

	this.Update = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = "21";
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			this.link.Update(this.collection, this.query, this.data, this.options, this.ForgeCallback());
		}
		else
		{
			this.cb(error, null);
		}
	}

	this.Save = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = "21";
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			this.link.Save(this.collection, this.data, this.options, this.ForgeCallback());
		}
		else
		{
			this.cb(error, null);
		}
	}

	this.Find = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = 21;
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			this.link.Find(this.collection, this.data, this.options, this.ForgeCallback());
		}
		else
		{
			this.cb(error, null);
		}
	}

    // DATA : MUST BE A STRING !
    this.Distinct = function()
	{
        this.ApplyModifier();
		var error = {value: false};
		error = this.ApplyValidator();
		if(this.link === undefined)
		{
			error.value = true;
			error.message = "DB Link undefined"
			error.code = 21;
		}
		if(error.value === false)
		{
			this.ApplyBefore();
			try
			{
			     this.link.Distinct(this.collection, this.data, this.query, this.ForgeCallback());
			}catch(e){console.error(e);};
		}
		else
		{
			this.cb(error, null);
		}
	}


	this.ApplyModifier = function()
	{
		for(var v in this.data)
		{
			if(this.field[v] !== undefined && this.field[v].modifier !== undefined)
			{
				this.data[v] = this.field[v].modifier(this.data[v]);
			}
		}
        for(var v in this.query)
		{
			if(this.field[v] !== undefined && this.field[v].modifier !== undefined)
			{
				this.query[v] = this.field[v].modifier(this.query[v]);
			}
		}
	}

	this.ApplyValidator = function()
	{
		var error =
		{
			value: false,
			message: "",
		}
		for(var v in this.data)
		{
			if(this.field[v] !== undefined && this.field[v].validator !== undefined)
			{
				if(!this.field[v].validator(this.data[v]))
				{
					error.value = true;
					error.message = "Field [ " + v + " ] is not valid";
					break;
				}
			}
		}
		return error;
	}

  this.ApplyBefore = function()
  {
     if(this.before !== undefined)
     {
       this.before({}, this.data);
     }
  }

  this.ForgeCallback = function()
  {
    var cbf;
    if(this.after !== undefined)
    {
      var f1 = this.after;
      var f2 = this.cb;
      cbf = function(err, data)
      {
         f1(err, data);
         f2(err, data);
      }
    }
    else
    {
      var f1 = this.cb;
      cbf = function(err, data){ f1(err, data); }
    }

    return cbf;
  }
	this.construct();
}

