var data = {};

var element_dict = {
	'Z': 'Země',
	'L': 'Lokace',
	'F': 'Frakce',
	'O': 'Osoby',
	'U': 'Úkoly',
	'P': 'Podmínky',
	'D': 'Dialogy',
	'I': 'Informace',
	'H': 'Hráči',
	'S': 'Sezení'
};

var popup_refresh_dict = {}; // popup_id: [refresh_function, data]

var value_attributes = { // what attribute of element should be changed in specific case
	'Z': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'regime': 'textContent',
		'geography': 'textContent',
		'environment': 'textContent',
		'history': 'textContent',
		'note': 'textContent',
		'politics': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'informations': 'value',
		'players': 'value',
		'sessions': 'value',
	},
	'L': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'type': 'value',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'informations': 'value',
		'players': 'value',
		'sessions': 'value',
	},
	'F': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'type': 'value',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'informations': 'value',
		'players': 'value',
		'sessions': 'value',
	},
	'O': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'personal_info': 'value',
		'appearance': 'textContent',
		'personality': 'textContent',
		'skills': 'textContent',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'dialogues': 'value',
		'informations': 'value',
		'players': 'value',
		'sessions': 'value',
	},
	'U': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'state': 'value',
		'reward': 'textContent',
		'detail': 'textContent',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'conditions': 'value',
		'dialogues': 'value',
		'informations': 'value',
		'sessions': 'value',
	},
	'D': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'text': 'textContent',
		'note': 'textContent',
		'persons': 'value',
		'quests': 'value',
		'conditions': 'value',
		'informations': 'value',
		'sessions': 'value',
	},
	'P': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'state': 'value',
		'note': 'textContent',
		'quests': 'value',
		'dialogues': 'value',
	},
	'I': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'truth': 'value',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'quests': 'value',
		'dialogues': 'value',
		'informations': 'value',
		'players': 'value',
		'sessions': 'value',
	},
	'H': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'personal_info': 'value',
		'class': 'value',
		'attributes': 'textContent',
		'weapons': 'textContent',
		'items': 'textContent',
		'skills': 'textContent',
		'languages': 'textContent',
		'effects': 'textContent',
		'history': 'textContent',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'fractions': 'value',
		'persons': 'value',
		'informations': 'value',
	},
	'S': {
		'code': 'textContent',
		'name': 'value',
		'color': 'value',
		'gameplay': 'textContent',
		'experience': 'textContent',
		'note': 'textContent',
		'nations': 'value',
		'locations': 'value',
		'persons': 'value',
		'quests': 'value',
		'dialogues': 'value',
		'informations': 'value',
	},
}

function new_campaign(noprompt=false){
	if (!noprompt)
		if (confirm('Chceš před založením nové kampaně uložit tu aktuální?'))
			export_json(data);
	data = {};
	for(var element_type in element_dict)
		data[element_type] = {};
	data['campaign'] = '';
	document.getElementById('campaign_name').value = '';
	save(data);
}


function import_campaign(noprompt=false){
	import_json();
}

function campaign_name_change()
{
	data['campaign'] = document.getElementById('campaign_name').value;
}

function reset_color(element){
	element.parentElement.querySelector('input').value = '';
	element.parentElement.classList.remove('colored');
}

function set_color(element){
	if (!element.value)
		reset_color(element);
	else
		element.parentElement.classList.add('colored');
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function get_color_by_background(background_color){
	if (!background_color)
		return '#000000';
	var parsed = hexToRgb(background_color);
	return (parsed.r*0.299 + parsed.g*0.587 + parsed.b*0.114) > 186 ? '#000000': '#ffffff';
}
function format_overview_entry(element_type, key)
{
	// returns string to show for the entry in an overview
	var value = data[element_type][key];
	switch(element_type)
	{
		/*case 'Z':
			if (value['superior']){
			    var superior = ' <em>('+format_overview_entry('Z', value['superior'])+')</em>';
				return element_type + key + ' ' + value['name'] + superior;
			}
			else
				return element_type + key + ' ' + value['name'];
			break;*/
		default:
			return element_type + key + ' ' + value['name'];
			break;
	}
	return '??';
}

function refresh(close_popups=false)
{
	// refresh campaign name
	document.getElementById('campaign_name').value = data['campaign'] || '';
	
	if (close_popups){
		popup_refresh_dict = {};
		document.getElementById('popups').innerHTML = '';
	}
	else{
		// refresh popups
		for (var id in popup_refresh_dict)
		{
			var value = popup_refresh_dict[id];
			[f, parameter] = value;
			f(parameter, id=id);
		}
	}			
}

function toggle_collapse(element){
	element.parentElement.classList.toggle('collapsed');
}

function set_child(element, classname, f, nobreak=false)
{
    var descendants = element.querySelectorAll("*");
	for(var i = 0; i < descendants.length; i++)
	{
	    var descendant = descendants[i];
		if (descendant.classList.contains(classname))
		{
			f(descendant);
			if(!nobreak)
				break;
		}
	}
}

function set_child_content(element, classname, value, overwrite=true, nobreak=false)
{
	if(overwrite)
		f = function(e){e.innerHTML = value;};
	else
		f = function(e){e.innerHTML += value;};
	set_child(element, classname, f, nobreak=nobreak);
}

function set_child_style(element, classname, key, value, nobreak=false)
{
	set_child(element, classname, function (e){e.style[key] = value;}, nobreak);
}

function set_child_event(element, classname, eventname, f, nobreak=false)
{
	set_child(element, classname, function (e){e.addEventListener(eventname, f, false)}, nobreak=nobreak);
}

function set_child_child(element, classname, child, overwrite=false, nobreak=false)
{
	if (overwrite)
		f = function(e){e.innerHTML = ''; e.appendChild(child);};
	else
		f = function(e){e.appendChild(child);};
	set_child(element, classname, f, nobreak);
}

function handleEventForX(x, f)
{
	return function(){
		f(x);
	}
}

/*
 *
 *
 * */

function get_popup(div_id, title, type, code='')
{
	// uses template to create popup
	
	// create the main element
	var t = document.querySelector('#template_popup');
	var main = document.importNode(t.content, true);
	main.children[0].id = div_id;

	// set title
	set_child_content(main, 'popup-header-title', title);
	
	// set buttons
	if (type == 'overview'){
		set_child_event(main, 'popup-header-add', 'click', handleEventForX(code, function(x){get_detail(x)}));
		set_child_style(main, 'popup-header-apply', 'display', 'none');
		set_child_style(main, 'popup-header-image', 'display', 'none');
	}
	else if(type == 'detail'){
		// set image link
		/*
		 //set_child_style(main, 'popup-header-image', 'display', 'none'); // hidden until good link is found
		var image_extensions = ['jpg', 'png', 'JPG', 'PNG'];
		var tmp_img = document.createElement('img');
		//tmp_img.onload = function(){this.classList.add('success'); console.log(Date.now()+'found working url: '+this.src)};
		tmp_img.onload = function(){var m = main; return function(){
			set_child_style(main, 'popup-header-image', 'display', 'block');
			var src = this.src;
			set_child_event(main, 'popup-header-image', 'click', handleEventForX(src, function(x){
				window.open(x);
			}))}();
		};
		for(var i=0; i<image_extensions.length; i++){
			tmp_img.src = 'images/'+code+'.'+image_extensions[i];
			if(tmp_img.classList.contains('success')){
				set_child_event(main, 'popup-header-image', 'click', handleEventForX([image_extensions[i], code], function(x){
					[extension, code] = x;
					window.open('images/'+code+'.'+extension);
				}));
				break;
		}
		*/
		main.querySelector('.popup-header-image').parentElement.href = 'images/'+code+'.png';
		// set ok button
		set_child_event(main, 'popup-header-apply', 'click', handleEventForX([div_id, code], function(x){
			[div_id, code] = x;
			[element_type, id] = code;

			// apply changes
			apply_changes(div_id, code);

			// deal with hidden elements (links)
			detail_links = document.getElementById(div_id).querySelectorAll('.detail-link');
			// go through all detail_links, get values from hidden inputs
			for(var i = 0; i<detail_links.length; i++){
				detail_link = detail_links[i];
				[link_element_type, link_attribute] = detail_link.querySelector('.detail-link-rev').value.split('_');
				codes_input = detail_link.querySelector('.detail-link-codes');
				var hidden_id_split = codes_input.id.split('_');
				var attribute = hidden_id_split[hidden_id_split.length - 1]
				
				// get dict of entries that should be linked
				link_entries = codes_input.value.split(';');
				link_dict = {}
				for(var j=0; j<link_entries.length; j++){
					link_id = link_entries[j].substring(0, link_entries[j].indexOf(' '));
					comments = link_entries[j].substring(link_entries[j].indexOf(' ')+1);
					if(!(link_id in data[link_element_type]))
						continue;
					// create structures in data if missing
					if (!data[element_type][id][attribute])
						data[element_type][id][attribute] = {};
					if (!data[link_element_type][link_id][link_attribute])
						data[link_element_type][link_id][link_attribute] = {};

					if(comments.includes('--'))
						link_dict[link_id] = comments.split('--');
					else{
							var reverse_attribute = data[link_element_type][link_id][link_attribute][id] || '';
							link_dict[link_id] = [comments, reverse_attribute];
					}
				}
				// add to elements that should be linked, remove from the others
				for (var link_id in data[link_element_type]){
					if (link_id in link_dict){
						//console.log(Date.now()+'linking '+element_type+id+':'+attribute+' -> '+link_element_type+link_id);
						data[element_type][id][attribute][link_id] = link_dict[link_id][0];
						//console.log(Date.now()+'linking '+link_element_type+link_id+':'+link_attribute+' -> '+element_type+id);
						data[link_element_type][link_id][link_attribute][id] = link_dict[link_id][1];
					}
					else{
						try{
							delete data[element_type][id][attribute][link_id];
							//console.log(Date.now()+'removing link '+element_type+id+':'+attribute+' -> '+link_element_type+link_id);
						}
						catch(err){}
						try{
							delete data[link_element_type][link_id][link_attribute][id];
							//console.log(Date.now()+'deleting '+link_element_type+link_id+':'+link_attribute+' -> '+element_type+id);
						}
						catch(err){}
					}
				}

			}
			

			save(data);
			document.getElementById('popups').removeChild(document.getElementById(div_id));
			delete popup_refresh_dict[div_id];
			refresh();
		}));
		set_child_style(main, 'popup-header-add', 'display', 'none');
	}
	else if(type == 'linker'){
		set_child_event(main, 'popup-header-apply', 'click', handleEventForX([code], function(x){
			// code is here the hidden input we want to update
			var linked = [];
			var checkboxes = document.getElementById(div_id).querySelectorAll('.linker-entry-checkbox');
			for (var i=0; i<checkboxes.length;i++){
				checkbox = checkboxes[i];
				if (checkbox.checked){
					var id_splitted = checkbox.id.split('_');
					var id = id_splitted[id_splitted.length - 1];
					var comment = document.getElementById(div_id+'_linker-comment_'+id).value;
					linked.push(id + ' ' + comment)
				}
			}
			code.value = linked.join(';');
			//console.log(Date.now()+'updating hidden input: '+code.value);
			code.onchange();

			document.getElementById('popups').removeChild(document.getElementById(div_id));
			delete popup_refresh_dict[div_id];
		}));
		set_child_style(main, 'popup-header-add', 'display', 'none');
		set_child_style(main, 'popup-header-image', 'display', 'none');
	}
	set_child_event(main, 'popup-header-close', 'click', handleEventForX(main.children[0], function(x){document.getElementById('popups').removeChild(x); delete popup_refresh_dict[div_id]}));

	// append everything
	initDragElement(main.children[0]);
	initResizeElement(main.children[0]);
	return main;
}

function get_editable(id, type, value)
{
	return '<input id="'+id+'" type="'+type+'" value="'+value+'">';
}

function get_overview(element_type, id=null)
{
	// uses template_overview to show overview of desired element
	// dynamically generates its inner content (template_overview_entry_<element_type>)
	var search_value = "";
	if (id){
		search_value = document.getElementById(id + '_search').value;
		var popup = document.getElementById('popups').removeChild(document.getElementById(id));
	}
	else{
		var id = 'popup_' + Date.now();
		
		// get popup
		var popup = get_popup(id, element_dict[element_type], 'overview', element_type);
		popup_refresh_dict[id] = [get_overview, element_type];
	}
	
	// create the main element
	var t = document.querySelector('#template_overview');
	var main = document.importNode(t.content, true);
	
	// setup search bar
	var searchbar = main.querySelector('.overview-search');
	searchbar.id = id + '_search';
	set_child_event(main, 'overview-search', 'input', handleEventForX([element_type, id], function(x){[element_type, id] = x; get_overview(element_type, id);}));
	searchbar.value = search_value;
	
	search_value = search_value.toLowerCase();
	if (search_value){
		var diacritics = {
			'ě': 'e',
			'š': 's',
			'č': 'c',
			'ř': 'r',
			'ž': 'z',
			'ý': 'y',
			'á': 'a',
			'í': 'i',
			'é': 'e',
			'ú': 'u',
			'ů': 'u',
			'ť': 't',
			'ď': 'd',
			'ň': 'n',
			'ó': 'o',
			};
		for(var dia in diacritics)
			search_value = search_value.replaceAll(dia, diacritics[dia]);
		var data_source = {};
		for (var key in data[element_type])
		{
			if ([key, element_type.toLowerCase(), element_type.toLowerCase()+key].includes(search_value)){
				data_source[key] = data[element_type][key];
				continue;
			}
				
			for (var attribute in data[element_type][key]){
				var value = data[element_type][key][attribute];
				if (typeof value != typeof '')
					continue;
				var to_compare = value.toLowerCase();
				if (to_compare)
					for(var dia in diacritics)
						to_compare = to_compare.replaceAll(dia, diacritics[dia]);
				if (to_compare.includes(search_value))
				{
					data_source[key] = data[element_type][key];
					break;
				}
			}
		}
	}
	else
		var data_source = data[element_type];
	
	// create entries
	var t_entry = document.querySelector('#template_overview_entry')
	for (var key in data_source)
	{
		var entry = document.importNode(t_entry.content, true);
		set_child_content(entry, 'overview-entry-info', format_overview_entry(element_type, key));
		set_child_style(entry, 'overview-entry', 'background-color', (data_source[key]['color'] || 'rgba(0,0,0,0)'));
		var foreground_color = get_color_by_background(data_source[key]['color'] || '');
		set_child_style(entry, 'overview-entry', 'color', foreground_color);
		if (foreground_color == '#ffffff'){
			set_child_style(entry, 'button', '-webkit-filter', 'invert(1)', nobreak=true);
			set_child_style(entry, 'button', 'filter', 'invert(1)', nobreak=true);
		}
		set_child_event(entry, 'overview-entry-detail', 'click', handleEventForX([element_type, key], function(x){get_detail(x);}));
		set_child_event(entry, 'overview-entry-delete', 'click', handleEventForX([element_type, key], function(x){
			[element_type, key] = x; 
			delete data[element_type][key]; 
			refresh();
			save(data);
			// link removal is done on access
		}));
		set_child_child(main, 'overview-content', entry);
	}
	
	// add to DOM
	set_child_child(popup, 'popup_content', main, overwrite=true);
	document.getElementById('popups').appendChild(popup);
	document.getElementById(id).style.zIndex = ++currentZIndex;
	searchbar.focus();
}

function dict_to_value(dict){
	// is is a dict?
	if(typeof(dict) == typeof '')
		return dict;
	var result = [];
	for(var key in dict)
		result.push(key+' '+dict[key]);
	return result.join(';');
}


function get_detail(code, id=null){
	var element_type = code[0];
	var key = code[1];
	if (key){
		var value = data[element_type][key];
	}
	else {
		var max = 0;
		for (var k in data[element_type])
			max = parseInt(k) > max ? parseInt(k) : max;
		key = (max + 1).toString();
		var value = {};
	}
	// uses template_overview to show overview of desired element
	// dynamically generates its inner content (template_overview_entry_<element_type>)
	if (id){
		var popup = document.getElementById('popups').removeChild(document.getElementById(id));
	}
	else{
		var id = 'popup_' + Date.now();
		
		// get popup
		var id = 'popup_' + Date.now();
		var popup = get_popup(id, element_dict[element_type] + ' - detail', 'detail', element_type + key);
		popup_refresh_dict[id] = [get_detail, code];
	}
	
	// create the main element
	var t = document.querySelector('#template_detail_'+element_type);
	var main = document.importNode(t.content, true);

	// fill info
	for (var attribute_name in value_attributes[element_type]){
		var attribute = value_attributes[element_type][attribute_name];
		if (attribute_name == 'code')
			var value = element_type + key;
		else
			if(key in data[element_type])
				var value = data[element_type][key][attribute_name] || '';
			else
				var value = '';

		set_child(main, element_type + '_' + attribute_name, function(args){
			[id, attribute_name, attribute, value] = args;
			return function(e){
			e.id = id + '_' + attribute_name;
			if(attribute_name == 'color' && value)
				e.parentElement.classList.add('colored');
			//console.log(Date.now()+'setting '+e.id+'\'s '+attribute+' to '+value);
			e[attribute] = dict_to_value(value || ''); // in case it is dict...
		}}([id, attribute_name, attribute, value]));
	}

	// setup linker stuff
	var link_divs = main.querySelectorAll('.detail-link');
	for (var i = 0; i<link_divs.length; i++){
		link_div = link_divs[i];
		var codes = link_div.querySelector('.detail-link-codes');
		var content = link_div.querySelector('.detail-link-content');
		var target_element = link_div.querySelector('.detail-link-rev').value[0];
		
		codes.onchange = function(content, target_element, codes){return function(){
			//console.log(Date.now()+'hidden input changed, showing links ('+element_type+'-'+target_element+')');
			content.innerHTML = '';
			var links = codes.value.split(';');
			for(var i=0; i<links.length; i++){
				var link_id = links[i].substring(0, links[i].indexOf(' '));
				if(!(link_id in (data[target_element])))
					continue;
				var comment = links[i].substring(links[i].indexOf(' ')).trim();
				var background_color = data[target_element][link_id]['color'] || 'rgba(0, 0, 0, 0)';
				var foreground_color = get_color_by_background(data[target_element][link_id]['color'] || '');
				if(comment)
					content.innerHTML += '<div class="detail-link-entry" onclick="get_detail(\''+target_element+link_id+'\')" style="background-color: '+ background_color + '; color: ' + foreground_color + ';">' + format_overview_entry(target_element, link_id) + ' <em>('+comment+')</em></div>';
				else
					content.innerHTML += '<div class="detail-link-entry" onclick="get_detail(\''+target_element+link_id+'\')" style="background-color: '+ background_color + '; color: ' + foreground_color + ';">' + format_overview_entry(target_element, link_id) + '</div>';
			}
		};}(content, target_element, codes);
		codes.onchange();
		var popup_title = link_div.querySelector('.detail-link-title').innerHTML.toLowerCase();
		set_child_event(link_div, 'detail-link-button', 'click', handleEventForX([element_type, key, target_element, codes, popup_title], function(x){get_linker(x);}));
	}

	// add to DOM
	set_child_child(popup, 'popup_content', main, overwrite=true);
	document.getElementById('popups').appendChild(popup);
	document.getElementById(id).style.zIndex = ++currentZIndex;
}


function get_linker(args){
	[element_type, origin_key, target_element, codes, popup_title] = args;
	//console.log(Date.now()+'doing linker for '+element_type+' '+origin_key+' '+target_element+' '+codes.id);
	
	if (id){
		var popup = document.getElementById('popups').removeChild(document.getElementById(id));
	}
	else{
		var id = 'popup_' + Date.now();
		
		// get popup
		var id = 'popup_' + Date.now();
		var popup_title_code = origin_key in data[element_type] ? format_overview_entry(element_type, origin_key): 'nový záznam';
		var popup = get_popup(id, popup_title_code + ' - ' + popup_title, 'linker', codes);
		popup_refresh_dict[id] = [get_linker, args];
	}
	
	// create the main element
	var t = document.querySelector('#template_linker');
	var main = document.importNode(t.content, true);
	
	// fill info
	var data_source = data[target_element];
	var t_entry = document.querySelector('#template_linker_entry');
	
	var codes_dict = {}
	//console.log(Date.now()+'extracting links from hidden element for checkboxes: '+codes.value);
	var code_lines = codes.value.split(';');
	for (var i=0; i<code_lines.length; i++){
		var code_line = code_lines[i];
		var key = code_line[0];
		codes_dict[key] = code_line.substring(1).trim();
	}

	for (var key in data_source){
		if (key == origin_key && element_type == target_element)
			continue
		var entry = document.importNode(t_entry.content, true);
		var checkbox = entry.querySelector('.linker-entry-checkbox');
		var entry_title = entry.querySelector('.linker-entry-title');
		var comment = entry.querySelector('.linker-entry-comment');
		set_child_style(entry, 'linker-entry', 'background-color', data_source[key]['color'] || 'rgba(0,0,0,0)');
		set_child_style(entry, 'linker-entry', 'color', get_color_by_background(data_source[key]['color'] || ''));
		
		checkbox.id = id + '_linker-checkbox_' + key;
		comment.id = id + '_linker-comment_' + key;
		if (key in codes_dict)
			checkbox.checked = true;
		entry_title.innerHTML = format_overview_entry(target_element, key);
		comment.value = codes_dict[key] || '';

		set_child_child(main, 'linker', entry);
	}
	

	// add to DOM
	set_child_child(popup, 'popup_content', main, overwrite=true);
	document.getElementById('popups').appendChild(popup);
	document.getElementById(id).style.zIndex = ++currentZIndex;
}


function apply_changes(div_id, code)
{
	//console.log(Date.now()+'parsing content of '+div_id+' to get '+code);
	var result = {};
	// get inputs
	var inputs = document.getElementById(div_id).getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++){
		var input = inputs[i];
		// ignore hidden elements, these are links and dealt after
		if (input.type == 'hidden')
			continue;
		var id = input.id.substr(div_id.length + 1);
		result[id] = input.value;
	}
	// get textareas
	var textareas = document.getElementById(div_id).getElementsByTagName('textarea');
	for (var i=0; i<textareas.length; i++){
		var textarea = textareas[i];
		var id = textarea.id.substr(div_id.length + 1);
		result[id] = textarea.value;
	}
	// nocolor
	var colordivs = document.getElementById(div_id).getElementsByClassName('colored');
	if (!colordivs.length)
		result['color'] = '';
	// save
	data[code[0]][code.substring(1)] = result;
} 

