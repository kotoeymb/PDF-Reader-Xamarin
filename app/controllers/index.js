// setting for initial app installation
// create folder for pdf file first if doesn't exist
var pdfFolder = 'pdfFolder';
var pdfFolderPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pdfFolder);
if (!pdfFolderPath.exists()) {
	pdfFolderPath.createDirectory();
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return (s4() + s4()).toUpperCase();
}

var downloadBar = Ti.UI.createTextField({
	hintText : 'http://www.test.com/test.pdf ...',
	width : Ti.UI.FILL,
	height : '30dp',
	left : '10dp',
	right : '10dp',
	top : '10dp',
	bottom : '10dp'
});
$.view1.add(downloadBar);

var downloadBtn = Ti.UI.createButton({
	title : 'Download',
	width : Ti.UI.FILL,
	height : '40dp',
	textAlign : 'center',
	backgroundColor : '#e8e8e8'
});
$.view1.add(downloadBtn);

// craete imageview
/* var imageView = Ti.UI.createImageView({
width : Ti.UI.FILL,
height : 'auto',
top : '0dp',
backgroundColor : '#ff8899'
});
$.window.add(imageView);
imageView.hide(); */

// create progress bar
var ind = Titanium.UI.createProgressBar({
	width : Ti.UI.FILL,
	height : '2dp',
	min : 0,
	max : 1,
	value : 0,
	left : '10dp',
	right : '10dp',
	style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	message : 'Downloading image',
	font : {
		fontSize : '12dp',
		fontWeight : 'bold'
	},
	color : '#888'
});
$.window.add(ind);

// establish network connection
var xhr = Ti.Network.createHTTPClient({
	ondatastream : function(e) {
		ind.value = e.progress;
	},
	timeout : 50000,
	onload : function() {
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + pdfFolder + '/', guid() + '.pdf');
		f.write(this.responseData);
		Ti.App.fireEvent('graphic_downloaded', {
			filepath : f.nativePath
		});
	}
});

Ti.App.addEventListener('graphic_downloaded', function(e) {
	// redirect to pdflistview
	ind.hide();
	$.naviBar.openWindow(Alloy.createController("pdfListView", {}).getView());
});

$.toPDFListBtn.addEventListener('click', function() {
	$.naviBar.openWindow(Alloy.createController("pdfListView", {}).getView());
});

// download button click
downloadBtn.addEventListener('click', function() {
	// get link
	var link = downloadBar.value;

	xhr.open('GET', link);
	xhr.send();

	ind.show();
});

if (OS_IOS) {
	$.naviBar.open();
}
if (OS_ANDROID) {
	$.index.open();
}