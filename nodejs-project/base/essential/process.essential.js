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

/**
 * @namespace Process
 * @description Process file description
 * @param config {object} config object initialized at server start
 *
 * @example
 * in file : myproc.process.js
 * var proc =
 * {
 *   "state": true,
 *   "pos": 100,
 *   "restart": 'none', // auto or none
 *   "attempt": 5, // 0 = infinte
 *   "delay": 3000, // ms
 *   "started": 10000, // delay before first start
 *   "wait": false, // true or false, if true delay by "delay" ms
 *   "type": "cmd", // cmd || file
 *   "cmd":"ps", // command to launch if type == cmd
 *   "file": "file.js", // js file to launch
 *   "args": [], // args of command to launch. If type == file, args[0] is replaced by file
 *   "options": {}, // command options
 *   "mode": "exec", // exec mode : exec || cron || mixed. Default is exec
 *   "onOut": function(data){}, // called on process output
 *   "onError": function(data){}, // called on process error
 *   "onClose": function(){}, // called when process is closed
 *   "cron" : { 'day':'*', date:'*', 'month':'*', 'hour':'0', 'minute':'0' } // cron options if mode == cron || mixed, every day at 00h00 by default
 *
 * };
 * module.exports = proc;
 *
*/
'use strict';

module.exports.LoadProcess = LoadProcess;
var wf = WF();

function LoadProcess()
{
	wf.PROCESS = {};
	var sArr = [];
	var c = wf.CONF.PROCESS_PATH;
	if(fs.existsSync(c) && fs.lstatSync(c).isDirectory())
	{
		var dArr = fs.readdirSync(c);
		var d = dArr.length;
		while(d--)
		{
			if (fs.lstatSync(c +'/' + dArr[d]).isDirectory() && dArr[d] != "." && dArr[d] != "..")
			{

				var proc = new wf.ProcessClass.Process(c, dArr[d]);
				if(proc.processState && proc.init && proc.init.state)
				{
					sArr.push(proc);
				}
			}
		}
		sArr.sort(function(a, b){return a.init.pos - b.init.pos;});
	}

	wf.PROCESS = sArr;

  var launchCronJob = false;
	var sL = sArr.length;
	for( var i = 0; i < sL; i++)
	{
    if(sArr[i].init.mode == "exec" || sArr[i].init.mode == "mixed")
    {
		  var wait = sanitInt(sArr[i].init.wait, false);
		  manageProcess(sArr[i], wait);
    }
    else if(launchCronJob === false && sArr[i].init.mode == "cron")
    {
      launchCronJob = true;
    }
	}

  // if at leat one cron job
  if(launchCronJob) manageCronJob();
}

function manageProcess(proc, wait)
{
	if(wait === false)
	{
		setImmediate(function()
		{
			startProcess(proc);
		});
	}
	else
	{
		var delay = sanitInt(proc.init.delay, 3000);
		setTimeout(function()
		{
			startProcess(proc);
		}, delay);
	}

}

function startProcess(proc)
{
    var execError = false;
    var error = "";

    var level = getLog(proc.init.log);

    var NAME = proc.name;

    var logPath = wf.CONF.LOG_PATH + wf.CONF.PROCESS_FOLDER + NAME + "/" ;
    var logOut = logPath + NAME + wf.CONF.OUT_END;
    var logFile = logPath + NAME + wf.CONF.LOG_END;
    var logErr = logPath + NAME + wf.CONF.ERROR_END;

    if(proc.init.type == "cmd")
    {
      if(proc.init.cmd === undefined || typeof proc.init.cmd != "string" || proc.init.cmd.length < 1)
      {
        if(level > 0)
        {
          wf.wLog(logErr, "[!] cmd is not valid" + os.EOL);
        }
        return;
      }
    }
    else if(proc.init.type == "file")
    {
      if(proc.init.file && typeof proc.init.file == "string" && proc.init.file.length > 0)
      {
        proc.init.cmd = process.argv[0];
        proc.init.args[0] = path.join(proc.init.path, proc.init.file);
      }
      else
      {
        if(level > 0)
        {
          wf.wLog(logErr, "[!] file is not valid" + os.EOL);
        }
        return;
      }
    }

    if( proc.init.cmd !== undefined && typeof proc.init.cmd == "string" && proc.init.cmd.length > 0)
    {
      if(proc.restarted === undefined) proc.restarted = 0;

      var eProc = {};
      try
      {
        eProc = spawn(proc.init.cmd, proc.init.args, proc.init.options);
      }
      catch(e)
      {
        execError = true;
        error = e;
      }

      if(execError)
      {
        if(level > 0)
        {
          wf.wLog(logErr, "[!] Error on spawing command -> " + error.toString() + os.EOL);
        }
        return;
      }
      else
        wf.wLog(logFile, "[+] Process " + NAME + " started" + os.EOL);

      wf.PROCESS[NAME] =
      {
        init: proc,
        handle: eProc,
      };

      var sProc = proc;

      var started = sanitInt(proc.init.started, 10000);
      var to = setTimeout(function()
      {
        if(eProc !== undefined)
        {
          sProc.restarted = 0;
        }
      }, started);

      // ON STDOUT
      eProc.stdout.on('data', function (data)
      {
        if(level > 0 && level < 3)
        {
          wf.wLog(logOut, data);
        }

        if(proc.init.onOut && typeof proc.init.onOut == "function")
        {
          proc.init.onOut(data);
        }
      });
      // ON STDERR
      eProc.stderr.on('data', function (data)
      {
        if(level > 0)
        {
          wf.wLog(logErr, "stderr: " + data + os.EOL);
        }
        wf.Error('stderr: ' + data + os.EOL);
        if(proc.init.onError && typeof proc.init.onError == "function")
        {
          proc.init.onError(data);
        }
      });

      // ON CLOSE
      eProc.on('close', function (code)
      {
        clearTimeout(to);
        var end = NAME + ' exited with code : ' + code + os.EOL;
        if(level > 0)
        {
          wf.wLog(logFile, end);
        }

        if(proc.init.onClose && typeof proc.init.onClose == "function")
        {
          proc.init.onClose();
        }
        if(sProc.init.restart == 'auto' && (sProc.init.attempt === 0 || sProc.restarted < sProc.init.attempt) )
        {
          var delay = sanitInt(sProc.init.delay, 3000);
          sProc.restarted = sProc.restarted + 1;
          var rMess = "Restarting attempts : " + sProc.restarted + " - " + NAME + os.EOL;

          wf.wLog(logFile, rMess);

          setTimeout(function()
          {
            startProcess(sProc);
          }, delay);
        }
      });
    }
    else
    {
      if(level > 0)
      {
        wf.wLog(logErr, "[!] command is not valid" + os.EOL);
      }
      return;
    }
}

function manageCronJob()
{
  setInterval(checkCronJob, 1000 * 60);
  checkCronJob();
}

function checkCronJob()
{
  var date = new Date(Date.now());
  var sI = wf.PROCESS.length;
  for(var i = 0; i < sI; i++)
  {
    if(wf.PROCESS[i].init.mode == "cron" || wf.PROCESS[i].init.mode == "mixed")
    {
      if(validate(date, wf.PROCESS[i].init.cron))
      {
        wf.PROCESS[i].restarted = 0;
        startProcess(wf.PROCESS[i]);
      }
    }
  }
}

function validate(date, conf)
{
  if(!check(date, conf.day, 'getDay')) return false;
  if(!check(date, conf.date, 'getDate')) return false;
  if(!check(date, conf.month, 'getMonth')) return false;
  if(!check(date, conf.minute, 'getMinutes')) return false;
  if(!check(date, conf.hour, 'getHours')) return false;

  return true;
}

function check(date, value, cb)
{
  if(value == "*")
  {
    return true;
  }
  else if(value.indexOf("*/") > -1)
  {
    var tmp = value.split('/');
    var d1 = parseInt(date[cb](), 10);
    var d2 = parseInt(tmp[1], 10);

    if( d1 == 0 || d1 % d2 == 0 ) return true;
  }
  else if(parseInt(value, 10) == parseInt(date[cb](), 10)) return true;
  return false;
}

// SANIT INT FOR SETTIMEOUT
function sanitInt(value, def)
{
	var res = value | 0;
	if(res === 0) res = def;
	return res;
}

function sanitBool(value, def)
{
	var res = value | false;
	if(res === false) res = def;
	return res;
}

function getLog(str)
{
	if(str === undefined || str === "none") return 0;
	if(str === "all") return 1;
	if(str === "info") return 2;
	if(str === "error") return 3;
}
