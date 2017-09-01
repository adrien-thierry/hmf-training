	var wf = WF();
  /*** DEBUG CONF	***/

	wf.CONF['DEBUG'] = true;
	wf.CONF['THROW_ERROR'] = false;

  /*** SERVER CONF ***/
    wf.CONF['MAX_POST_SIZE'] = 5 * 1000 * 1000; //5MB
    wf.CONF['SERVER'] = "FortressJS";
    wf.CONF['X-POWERED-BY'] = "FortressJS";

  /*** APP SETTINGS ***/

	wf.CONF['DEFAULT_TPL'] = "default";

	wf.CONF['CONTENT_FOLDER'] = "content/";
	wf.CONF['CONTENT_PATH'] = wf.CONF['MAIN_PATH'] + wf.CONF['CONTENT_FOLDER'];

	wf.CONF['CORE_FOLDER'] = "core/";

	wf.CONF['APP_FOLDER'] = 'app/';
	wf.CONF['APP_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['APP_FOLDER'];

	wf.CONF['SCRIPT_FOLDER'] = 'script/';
	wf.CONF['SCRIPT_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['SCRIPT_FOLDER'];

	wf.CONF['SRV_FOLDER'] = 'srv/';
	wf.CONF['SRV_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['SRV_FOLDER'];

	wf.CONF['HOST_FOLDER'] = "host/";

	wf.CONF['ENGINE_FOLDER'] = "engine/";
	wf.CONF['ENGINE_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['ENGINE_FOLDER'];

  wf.CONF['SQUEL_FOLDER'] = "squel/";
	wf.CONF['SQUEL_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['SQUEL_FOLDER'];

	wf.CONF['PROCESS_FOLDER'] = "process/";
	wf.CONF['PROCESS_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['PROCESS_FOLDER'];

	wf.CONF['VAR_FOLDER'] = "var/";
	wf.CONF['VAR_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['VAR_FOLDER'];

	wf.CONF['FDB_FOLDER'] = "fdb/";
	wf.CONF['FDB_PATH'] = path.join(wf.CONF.VAR_PATH, wf.CONF.FDB_FOLDER);

	wf.CONF['LOG_FOLDER'] = "log/";
	wf.CONF['LOG_PATH'] = wf.CONF['VAR_PATH'] + wf.CONF['LOG_FOLDER'];

  wf.CONF['TMP_FOLDER'] = "tmp/";
	wf.CONF['TMP_PATH'] = wf.CONF['CONTENT_PATH'] + wf.CONF['TMP_FOLDER'];

	wf.CONF['CONFIG_FOLDER'] = "config/";
  wf.CONF['APPCONFIG_END'] = ".json";

	wf.CONF['DEFAULT_NET'] = "local";
	wf.CONF['ZONE_FOLDER'] = "zone/";
	wf.CONF['MOD_FOLDER'] = 'mod/';
	wf.CONF['PAGE_FOLDER'] = 'page/';
	wf.CONF['TPL_FOLDER'] = 'tpl/';
	wf.CONF['PLUGIN_FOLDER'] = "plugin/";
	wf.CONF['MODEL_FOLDER'] = "model/";
  wf.CONF['JAIL_FOLDER'] = "jail/";

  /*** DEFAULT INIT ***/
  wf.CONF['DEFAULT_SHARED_FOLDER'] = "jail";
  wf.CONF['DEFAULT_VIEW_FOLDER'] = "view";
  wf.CONF['DEFAULT_ZONE'] = "front";
  wf.CONF['DEFAULT_PAGE'] = "home";
  wf.CONF['DEFAULT_HOST'] = "localhost";
  /*** ***/

	/*** FILE END ***/

	wf.CONF['APP_END'] = '.app.js';
	wf.CONF['DEF_END'] = '.def.js';
	wf.CONF['CONFIG_END'] = ".conf.js";
	wf.CONF['PAGE_END'] = '.page.js';
	wf.CONF['CODE_END'] = '.code.js';
	wf.CONF['CSS_END'] = '.css.js';
	wf.CONF['MOD_END'] = '.mod.js';
	wf.CONF['TPL_END'] = '.tpl.js';
	wf.CONF['VIEW_END'] = '.html';
	wf.CONF['SCRIPT_END'] = '.script.js';
	wf.CONF['MODEL_END'] = '.model.js';
	wf.CONF['PROCESS_END'] = '.process.js';
  wf.CONF["SQUEL_END"] = ".squel.js";
	wf.CONF['OUT_END'] = '.out';
	wf.CONF['LOG_END'] = '.log';
  wf.CONF['ERROR_END'] = '.error';
  wf.CONF['ZIP_END'] = '.zip';

  /*** FILE NAME ***/
  wf.CONF['INSTALL_FILE'] = "install.json";
