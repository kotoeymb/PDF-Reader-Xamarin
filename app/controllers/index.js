var imageView = Ti.UI.createImageView({
	width : Ti.UI.FILL,
	height : 'auto',
	top : '0dp',
	backgroundColor : '#ff8899'
});
$.window.add(imageView);
imageView.hide();

var ind = Titanium.UI.createProgressBar({
	width : Ti.UI.FILL,
	height : '2dp',
	min : 0,
	max : 1,
	value : 0,
	left : '10dp',
	right : '10dp',
	style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	top : '30dp',
	message : 'Downloading image',
	font : {
		fontSize : '12dp',
		fontWeight : 'bold'
	},
	color : '#888'
});
$.window.add(ind);

var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		// Ti.API.info('Image download to applicationDataDirectory/fbm.jpg');
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'fbm.jpg');
		f.write(this.responseData);
		Ti.App.fireEvent('graphic_downloaded', {
			filepath : f.nativePath
		});
	},
	ondatastream : function(e) {
		ind.value = e.progress;
	},
	timeout : 50000
});
xhr.open('GET', 'http://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/INTRO_Disney_BigHero6_guide.jpg');
xhr.send();

Ti.App.addEventListener('graphic_downloaded', function(e) {
	// you don't have to fire an event like this, but perhaps multiple components will
	// want to know when the image has been downloaded and saved
	ind.hide();
	imageView.image = e.filepath;
	imageView.show();
});

ind.show();

if (OS_IOS) {
	$.naviBar.open();
}
if (OS_ANDROID) {
	$.index.open();
}