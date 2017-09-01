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

module.exports.Crypto = new Crypto();
UTILS.Crypto = new Crypto();
var wf = WF();

/**
 * Catalog of useful crypto functions
 * @class Crypto
 * @memberof WF
 *
*/
function Crypto()
{

    this.randomInt = function(low, high)
    {
       return Math.floor( Math.random() * (high - low + 1) + low);
    };

    this.encryptAE = function(text, iv)
    {
      var algorithm = 'aes-256-gcm';
      var password = wf.CONF['AES_KEY'];
      var cipher = crypto.createCipheriv(algorithm, password, iv)
      var encrypted = cipher.update(text, 'utf8', 'hex')
      encrypted += cipher.final('hex');
      var tag = cipher.getAuthTag();
      return {
        content: encrypted,
        tag: tag,
      };
    };

    this.decryptAE = function(encrypted, iv)
    {
      var algorithm = 'aes-256-gcm';
      var password = wf.CONF['AES_KEY'];
      var decipher = crypto.createDecipheriv(algorithm, password, iv)
      decipher.setAuthTag(encrypted.tag);
      var dec = decipher.update(encrypted.content, 'hex', 'utf8')
      dec += decipher.final('utf8');
      return dec;
    };


    this.encryptText = function(text, password)
    {
      if(password == undefined) password = wf.CONF['AES_KEY'];
      var algorithm = 'aes-256-ctr';
      var cipher = crypto.createCipher(algorithm, password)
      var crypted = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex');
      return crypted;
    };

    this.decryptText= function(text, password)
    {
		try
		{
            if(password == undefined) password = wf.CONF['AES_KEY'];
            var algorithm = 'aes-256-ctr';
            var decipher = crypto.createDecipher(algorithm, password)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            return dec;
		}
		catch(e)
		{
			return "";
		};
    };

    this.randomString = function(length)
    {
		return crypto.randomBytes(length).toString('hex');
    };

	this.createSHA512 = function(str)
	{
		var shasum = crypto.createHash('sha512');
		return shasum.update(str).digest('hex');
	};

	this.createSHA256 = function(str)
	{
		var shasum = crypto.createHash('sha256');
		return shasum.update(str).digest('hex');
	};

	this.createSHA1 = function(str)
	{
		var shasum = crypto.createHash('sha1');
		return shasum.update(str).digest('hex');
	};

	this.createMD5 = function(str)
	{
		var shasum = crypto.createHash('MD5');
		return shasum.update(str).digest('hex');
	};

    this.createMD5Async = function(fw, cb)
	{
        var hash = crypto.createHash('MD5');
        hash.setEncoding('hex');
        fw.on('end', function()
        {
            hash.end();
            cb(hash.read());
        });
        fw.pipe(hash);
	};
}
