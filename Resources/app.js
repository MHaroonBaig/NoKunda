// Starting point of the app

var gaModule = require('Ti.Google.Analytics');
var analytics = new gaModule('UA-55042156-1');
var title = 'Saved rep 1';
var title2 = 'Test Report';
var listpic = 'thumbkunda.jpg';

// The analytics object functions must be called on app.js otherwise it will loose it's context
Ti.App.addEventListener('analytics_trackPageview', function(e) {
	analytics.trackPageview('/iPad' + e.pageUrl);
});

Ti.App.addEventListener('analytics_trackEvent', function(e) {
	analytics.trackEvent(e.category, e.action, e.label, e.value);
});

// Starts a new session as long as analytics.enabled = true
// Function takes an integer which is the dispatch interval in seconds
analytics.start(10, true);

var db = Ti.Database.open("mydb");
//db.file.setRemoteBackup(false);    //for iOS excess icloud backups
//db.execute('DROP TABLE IF EXISTS params');
//db.execute('DROP TABLE IF EXISTS counter');

db.execute('CREATE TABLE IF NOT EXISTS params(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, lat TEXT, longi TEXT, loc TEXT, pic TEXT);');
//db.execute("INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,'zzK','OK','NOO','Ok','aaK','lll','pok','no',?)", title2, listpic);

db.execute('CREATE TABLE IF NOT EXISTS counter(id INTEGER PRIMARY KEY AUTOINCREMENT, count INTEGER);');
row = db.execute('SELECT count FROM counter');
if (row.isValidRow()) {
	row.close();
	db.close();
	var wintabs = require('tabs')();
} else {
	db.execute('INSERT INTO counter (count) VALUES (?)', 0);
	row.close();
	db.close();

	var wintut = Titanium.UI.createWindow({
		backgroundColor : '#2079b4',
		navBarHidden : true,
		exitOnClose : true
	});

	var tut = Ti.Filesystem.getFile('tutorial.jpg');

	var imviewtutorial = Ti.UI.createImageView({
		image : tut,
		width : '100%',
		height : '85%',
		top : '0%'
	});
	wintut.add(imviewtutorial);

	var startbtn = Titanium.UI.createButton({
		title : "START REPORTING",
		width : '100%',
		height : '15%',
		top : '85%',
		font : {
			fontSize : 29,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		backgroundColor : '#3498db',
		color : "#FFFFFF"
	});

	startbtn.addEventListener("click", function(e) {
		var wintabs = require('tabs')();
	});

	wintut.add(startbtn);
	wintut.open();
}