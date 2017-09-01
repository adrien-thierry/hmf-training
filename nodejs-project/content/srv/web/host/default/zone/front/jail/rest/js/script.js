/**
 * Gestion des class
 * @namespace class
 */


window.onload = function() {

	// Initialise les tabs
	jsTabs();

	// Toggle class active on root element
	var root = document.querySelectorAll('.root > header h2');
	for( var i = 0; i < root.length; i++ ) {
		root[i].addEventListener('click', function() {
			this.closest('div.root').classList.toggle('active');
		});
	}

	// Toggle class active on method element
	var method = document.querySelectorAll('.method > .header .title, .method > .header .description');
	for( var i = 0; i < method.length; i++ ) {
		method[i].addEventListener('click', function() {
			this.closest('ul.method').classList.toggle('active');
		});
	}

  /*
	// Open modal when click on a link element
	var modalLinks = document.querySelectorAll( '.links a' );
	for( var i = 0; i < modalLinks.length; i++ ) {
		modalLinks[i].addEventListener('click', function() {
			openModal();
		});
	}
  */

	// Closing modal when click on mask element
	var maskModal = document.querySelector( '.modal .mask' );
	maskModal.addEventListener('click', function() {
		closeModal();
	});

	// Closing modal when click on close element
	var maskModalCloser = document.querySelector( '.modal .modal-content i' );
	maskModalCloser.addEventListener('click', function() {
		closeModal();
	});

	// pretty JSON
	var jsonContent = document.querySelectorAll( '.json-view' );
	for( var i = 0; i < jsonContent.length; i++ ) {
    try
    {
		  jsonContent[i].innerHTML = '<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(jsonContent[i].innerHTML)) + '</code></pre>';
    }
    catch(e){}
	}

}

var jsonPrettyPrint = {
	replacer: function(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class=json-key>';
		var val = '<span class=json-value>';
		var str = '<span class=json-string>';
		var r = pIndent || '';
		if (pKey)
		r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal)
		r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	},
	toHtml: function(obj) {
		var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
		return JSON.stringify(obj, null, 3)
		.replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
		.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		.replace(jsonLine, jsonPrettyPrint.replacer);
	}
};


function setModal(linkArray)
{
  var content = "";
  var tpl = '<li><a href="#">_LINK</a></li>';
  for(var a = 0; a < linkArray.length; a++)
  {
    content += tpl.replace("_LINK", linkArray[a]);
  }
  document.getElementById("modalUL").innerHTML = content;
}


/**
* Initialise les tabs sur la page
*
* @return void
*
*/
function jsTabs() {
	var jsonTabs = document.querySelectorAll( '.json.tabs' );

	/* Boucle sur chaque tableau */
	for( var i = 0; i < jsonTabs.length; i++ )  {
		var tabs = jsonTabs[i].querySelectorAll('.tab-header');
		var tabsChild = jsonTabs[i].querySelectorAll('.tab-content');

		removeTabClass( tabs, tabsChild, 'active' ); // enlève toutes les classes actives
		addTabClass( tabs[0], tabsChild[0], 'active' ); // rajoute les classes active sur les premiers éléments des tabs
		clickTab(tabs, tabsChild);
	}

	/* A l'intérieur de chaque tableau, boucle sur les tabs */
	function clickTab(tabs, tabdChild) {
		var parent = tabs, child = tabsChild;
		for( var n = 0; n < parent.length; n++ )  {
			parent[n].addEventListener('click', function() {
				toggleClass( this, parent, child );
			});
		}
	}

	function toggleClass(header, tabs, tabsChild) {
		removeTabClass( tabs, tabsChild, 'active' );
		header.classList.add('active');

		for( var y = 0; y < tabsChild.length; y++ ) {
			if ( tabsChild[y].id == header.dataset.id ) {
				tabsChild[y].classList.add('active');
			}
		}
	}
	function removeTabClass( tabs, tabsChild, classe ) {
		removeClasses( tabs, classe );
		removeClasses( tabsChild, classe );
	}
	function addTabClass( tab, tabChild, classe ) {
		tab.classList.add(classe);
		tabChild.classList.add(classe);
	}
}

/**
* Ajoute la class aux éléments ciblés
*
* @param {NodeList} groupElement Les boutons
* @param {string} class Le nom de la classe
* @memberof class
*
* @return void
*
*/
function addClasses(groupElement, classe) {
	for( var i = 0; i < groupElement.length; i++ ) {
		groupElement[i].classList.add(classe);
	}
}

/**
* Enlève la class aux éléments ciblés
*
* @param {NodeList} groupElement Les boutons
* @param {string} class Le nom de la classe
* @memberof class
*
* @return void
*
*/
function removeClasses(groupElement, classe) {
	for( var i = 0; i < groupElement.length; i++ ) {
		groupElement[i].classList.remove(classe);
	}
}

/**
* Active la modal
*
* @return void
*
*/
function openModal() {
	var modal = document.querySelector('.modal');
	modal.classList.add('active');
}

/**
* Désactive la modal
*
* @return void
*
*/
function closeModal() {
	var modal = document.querySelector('.modal');
	modal.classList.remove('active');
}


function printJson()
{
  var jsonContent = document.querySelectorAll( '.json-view' );
	for( var i = 0; i < jsonContent.length; i++ ) {
    try
    {
		  jsonContent[i].innerHTML = '<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(jsonContent[i].innerHTML)) + '</code></pre>';
    }
    catch(e){}
	}
}

function GET(id, model, url)
{

  var element = $( "#" + id + "-form");
	element.submit(false);

	var data = element.serializeArray();
	var query = "";
	for(var el in data)
	{
		if(startsWith(data[el].name, "query.") && data[el].value)
		{
			query += data[el].name.substring(6) + ":" + data[el].value + ";";
		}
	}

	var targetUrl = url + "get/" + model + "/" + query;

	$( "#" + id + "-tab-2").find(".json-view")[0].innerHTML = targetUrl;

  printJson();

	ajax(id, targetUrl, "GET", null);
}

function POST(id, model, url)
{
	var element = $( "#" + id + "-form");
	element.submit(false);

	var data = element.serializeArray();
	var query = {};
	for(var el in data)
	{
		if(startsWith(data[el].name, "query.") && data[el].value)
		{
			query[data[el].name.substring(6)] = data[el].value;
		}
	}

	var request = JSON.stringify({query: query});
	$( "#" + id + "-tab-2").find(".json-view")[0].innerHTML = request;

	var targetUrl = url + "post/" + model + "/";

  printJson();

	ajax(id, targetUrl, "POST", request);
}

function PUT(id, model, url)
{
	var element = $( "#" + id + "-form");
	element.submit(false);

	var data = element.serializeArray();
	var query = {};
	var update = {};
	for(var el in data)
	{
		if(startsWith(data[el].name, "query.") && data[el].value)
		{
			query[data[el].name.substring(6)] = data[el].value;
		}
		else if(startsWith(data[el].name, "data.") && data[el].value)
		{
			update[data[el].name.substring(5)] = data[el].value;
		}
	}

	var request = JSON.stringify({query: query, update: update});

	$( "#" + id + "-tab-2").find(".json-view")[0].innerHTML = request;

  printJson();

	var targetUrl = url + "put/" + model + "/";

	ajax(id, targetUrl, "PUT", request);
}

function DELETE(id, model, url)
{
  var element = $( "#" + id + "-form");
	element.submit(false);

	var data = element.serializeArray();
	var query = "";
	for(var el in data)
	{
		if(startsWith(data[el].name, "query.") && data[el].value)
		{
			query += data[el].name.substring(6) + ":" + data[el].value + ";";
		}
	}

	var targetUrl = url + "delete/" + model + "/" + query;
	$( "#" + id + "-tab-2").find(".json-view")[0].innerHTML = targetUrl;

  printJson();

	ajax(id, targetUrl, "DELETE", null);
}

function startsWith(haystack, needle, position)
{
      position = position || 0;
      return haystack.substr(position, needle.length) === needle;
};

function ajax(id, url, method, data)
{
  var urlparam = document.getElementById(id + "-url-param").value;

	var ajaxTime = new Date().getTime();
	$.ajax({
	  url: url + "?" + urlparam,
	  method: method,
	  data: data,
	   statusCode: {
		200: function(result) {
		  var responseTime = new Date().getTime()-ajaxTime;
		  responseTime += "ms";
		  $( "#" + id + "-tab-3").find(".json-view")[0].innerHTML = result;
		  $( "#" + id + "-tab-3").find(".response-time")[0].getElementsByClassName("time")[0].innerHTML = responseTime;
      $( "#" + id + "-header")[0].click();

      printJson();
		},
		404: function() {
		  alert( "Not found api error" );
		}
	  },
	});
}

function domGet( id , rootNode ) {
    if ( !id ) return null;

    if ( rootNode === undefined ) {

        // rel to doc base
        var o = document.getElementById( id );
        return o;

    } else {

        // rel to current node
        var nodes = [];
        nodes.push(rootNode);
        while ( nodes && nodes.length > 0 ) {
            var children = [];
            for ( var i = 0; i<nodes.length; i++ ) {
                var node = nodes[i];
                if ( node && node['id'] !== undefined ) {
                    if ( node.id == id ) {
                        return node; // found!
                    }
                }

                // else keep searching
                var childNodes = node.childNodes;
                if ( childNodes && childNodes.length > 0 ) {
                    for ( var j = 0 ; j < childNodes.length; j++ ) {
                        children.push( childNodes[j] );
                    }
                }
            }
            nodes = children;
        }

        // nothing found
        return null;
    }
}
