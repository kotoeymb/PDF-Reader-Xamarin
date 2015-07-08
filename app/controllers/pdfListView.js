var pdfFolder = 'pdfFolder';
var dataDirectory = Ti.Filesystem.getApplicationDataDirectory();
var getFileList = Ti.Filesystem.getFile(dataDirectory + pdfFolder + '/');
var fileList = getFileList.getDirectoryListing();

var data = [];

for(var i = 0; i < fileList.length; i++) {
	var fp = Ti.Filesystem.getFile(dataDirectory + pdfFolder + '/', fileList[i]);
	var row = Ti.UI.createTableViewRow({
		title: fp.name,
		height: '50dp'
	});
	
	var fileNameSize = Ti.UI.createLabel({
		text: parseFloat(fp.size/1024).toFixed(2) + 'KB',
		top: '30dp',
		height: '20dp',
		left: '15dp',
		right: '15dp',
		color: 'gray',
		font: {
			fontSize: '12dp'
		}
	});
	row.add(fileNameSize);
	
	data.push(row);
	//data.push({title: parseFloat(fp.size/1024).toFixed(2) + 'KB'});
}

var tableView = Ti.UI.createTableView({
	data: data
});

tableView.addEventListener('click', function(e) {
	var docViewer = Ti.UI.iOS.createDocumentViewer({url: dataDirectory + pdfFolder + '/' + e.rowData.title});
	docViewer.show();
});

$.pdfListView.add(tableView);