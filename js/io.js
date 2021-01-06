function save(data)
{
	window.localStorage.setItem('campagne_last', data["campaign"]);
	
	window.localStorage.setItem('campagne_'+data["campaign"], JSON.stringify(data));
}

function load(show_loaded=true)
{
	last = window.localStorage.getItem('campagne_last');
	data = JSON.parse(window.localStorage.getItem('campagne_'+last));
	
	if(show_loaded)
		refresh(close_popups=true);
}

function export_json(data)
{
	var file = new Blob([JSON.stringify(data)], {type: 'application/octet-stream'});
	var filelink = document.createElement('a');
	filelink.download = data['campaign']+ '.json';
	filelink.href = URL.createObjectURL(file);
	filelink.click();
	//window.open(URL.createObjectURL(file));

}

function import_json()
{
	var input = document.createElement('input');
	input.type = 'file';
	input.onchange = e => {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = readerEvent => {
			data = JSON.parse(readerEvent.target.result);
			save(data);
			refresh(close_popups=true);
		}
	}
	input.click();
}
