var lat = 0;

var longi = 0;
//var back = Ti.Filesystem.getFile('tutorial.jpg');
var social = require('social_plus');

//var twitter = social.create({
	//consumerSecret : Ti.App.Properties.getString('6yrqV6d1bkqOdgl6HDRWI6wJoVkLzNhmFVtCqDHH1zRO2TB6a6'),
	//consumerKey : Ti.App.Properties.getString('FNyx2KLV6XDa6g2J4igumpoeM')
//});

var twitter = social.create({
    //site: 'Twitter', // <-- this example is for Twitter. I'll expand this to other sites in the future.
    consumerKey: 'FNyx2KLV6XDa6g2J4igumpoeM', // <--- you'll want to replace this
    consumerSecret: '6yrqV6d1bkqOdgl6HDRWI6wJoVkLzNhmFVtCqDHH1zRO2TB6a6' // <--- and this with your own keys!
});

var currentTime = new Date();
var gaModule = require('Ti.Google.Analytics');
var analytics = new gaModule('UA-55042156-1');

function reportwindow() {

	var rwindow = Ti.UI.createWindow({

		title : 'Report!',

		backgroundColor : '#FFFFFF',

		barColor : '#3498db',

		fullscreen : true,
		//backgroundImage : '/Default@2x.png',
		navBarHidden : true,

		//backgroundImage : back,

	});

	var bgImage = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		top : 0,
		left : 0,
		image : 'back.png'
	});
	rwindow.add(bgImage);

	//rwindow.addEventListener('focus', updatestuff);

	rwindow.addEventListener('focus', function(e) {
		analytics.trackPageview('/win1');
	});

	//setupGPS();

	var myProgress = Ti.UI.createProgressBar({
		top : '7%',
		width : '100%',
		height : 4,
		min : 0,
		max : 100,
		value : 2,
		style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN
	});

	//rwindow.add(myProgress);

	var btn = Ti.UI.createButton({

		title : 'Capture Kunda',

		font : {

			fontSize : 17,

			fontWeight : 'bold',

			fontFamily : 'Helvetica Neue'

		},

		width : '80%',

		height : '15%',

		top : '55%',

		//bottom : '7%',

		color : '#ffffff',

		//backgroundColor : '#2079b4',
		backgroundColor: "#2079B4",
		
		
		borderColor: "#092436",
		borderWidth:3,
		
		borderRadius : 12,
		
		

	});

	////////////// Meter Report /////////////////////

	var btn2 = Ti.UI.createButton({

		title : 'Report a Meter ',

		font : {

			fontSize : 17,

			fontWeight : 'bold',

			fontFamily : 'Helvetica Neue'

		},

		width : '80%',

		height : '15%',

		//top : '60%',

		bottom : '13%',

		color : '#ffffff',

		//backgroundColor : '#2079b4',

backgroundColor: "#2079B4",
		borderColor: "#092436",
		borderWidth:3,
		
		borderRadius : 12,

	});

	/////////////////////////


	var about = Ti.UI.createImageView({
		height : '7%',
		//width : '100%',
		//top : 0,
		left : '85%',
		bottom:"1%",
		image : 'info.jpg'
	});

	rwindow.add(about); //need to add a listener and make it darker


	/////////////////////////




	btn2.addEventListener('click', function(e) {

		btn.fireEvent('click', {
			name : '2'
		});

	});

	/////////////////////////////////////////////////

	btn.addEventListener('click', function(e) {

		//camwindow = createwindows(rwindow.width, rwindow.height);
		var shit;
		var shit2;
		if (e.name == '2') {
			shit = '2';
			//shit2 = 'Meter No: ';
			//shit2 = shit2 + details.value;

		} else {
			shit = '1';
			//shit2 = details.value;
		}
		var camwindow = createwindows();

		Titanium.Media.showCamera({

			success : function(e) {

				//var img = e.media;

				var img = e.media.imageAsResized(300, 300);

				var imgcam = Ti.UI.createImageView({

					image : img,

					//backgroundImage: 'KS_nav_views.png',

					//defaultImage: e.media,

					backgroundColor : 'transparent',

					width : 200,

					height : 200,
					
					

					//transform : Ti.UI.create2DMatrix().rotate(90)

				});

				var img2 = imgcam.toImage().media;

				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'temp.jpg');

				f.write(img);

				theimg = f.nativePath;

				Ti.API.info('PICsize: ' + img.height + " x " + img.width);

				camwindow.open();

				topview = genericview();

				topview.layout = 'horizontal';

				camwindow.add(topview);
				
				
				/////////////// background //////////
				
		
				var bgImage2 = Ti.UI.createImageView({
					height : '100%',
					width : '100%',
					top : "10%",
					left : 0,
					image : 'back2.png'
				}); 

				camwindow.add(bgImage2);
				
				//////////////////////////////////

				var imview = makeimview();

				imview.image = theimg;

				topview.add(imview);

				retakebtn = genericButton();

				topview.add(retakebtn);

				camwindow.add(topview);

				//DONE TOP VIEW

				////// Retake Logic ////

				retakebtn.addEventListener('click', function(e) {

					if (shit == '1')
						btn.fireEvent('click');
					else
						btn.fireEvent('click', {
							name : '2'
						});

				});

				////////////////////////

				//setupGPS();

				lowerview = genericview();

				lowerview.layout = 'vertical';

				lowerview.top = '35%';

				lowerview.height = Ti.UI.SIZE;

				lowerview.width = Ti.UI.SIZE;

				camwindow.add(lowerview);

				var details = textfieldsetup();
				if (shit == '2') {
					details.hintText = 'Enter the Meter No ';

					var flexSpace = Ti.UI.createButton({
						systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
						right : 0
					});

					var doneButton = Ti.UI.createButton({
						systemButton : Ti.UI.iPhone.SystemButton.DONE,
						right : '50%'
					});

					doneButton.activeFld = details;

					doneButton.addEventListener('click', function(e) {
						e.source.activeFld.blur();
					});

					details.keyboardToolbar = [flexSpace, doneButton];
					details.keyboardType = Ti.UI.KEYBOARD_NUMBER_PAD;
					//details.keyboardToolbar = [Done];
					//details.left = '30%';
					details.width = "100%";
					var meterno = genericLabel();
					meterno.text = "Meter No: ";
					meterno.textAlign = Ti.UI.LEFT;
					meterno.backgroundColor = 'transparent';

					lowerview.add(meterno);
				}
				else {
					
					var meterno1 = genericLabel();
					meterno1.text = "Description: ";
					meterno1.textAlign = Ti.UI.LEFT;
					//meterno1.opacity = 0.25;
					//meterno1.color = '#000',
					meterno1.backgroundColor = 'transparent';
					lowerview.add(meterno1);
					
					
				}
				
				var meterno11 = genericLabel();
					meterno11.text = "Enter your Email for feedback: ";
					meterno11.textAlign = Ti.UI.LEFT;
					//meterno11.top = "20%";
					meterno11.backgroundColor = 'transparent';

					
				
				
				

				lowerview.add(details);
				lowerview.add(meterno11);
					
				
				
				/////////// E-mail ////////////
				var details2 = textfieldsetup();
				details2.hintText = "Email: ";
				details2.top = "1%";
				lowerview.add(details2);
				

				//////////////////////////////
				submitbtn = genericButton();

				submitbtn.title = 'Submit Report';
				submitbtn.backgroundColor = "#4C93C3";
				submitbtn.borderColor = "#2D5875";
				submitbtn.borderWidth = 2;

				submitbtn.top = '5%';

				submitbtn.height = '12%';

				submitbtn.left = '32%';

				submitbtn.addEventListener('click', function(e) {

					if (lat == 0 && longi == 0) {

						displaydata.text = 'Wait for coordinates! Cant submit yet!';

						return;

					}

					if (shit == '2' && String(details.value).length == 0) {
						alert("Please Enter the Meter Number");
						return;

					}

					submitbtn.enabled = false;

					if (String(details.value).length < 3) {

						details.value = 'NoDetails';

					}

					var par = getparams();

					rclient = Titanium.Network.createHTTPClient();

					rclient.open("POST", "http://nokunda.labandroid.com/api");

					rclient.setRequestHeader("Connection", "close");

					rclient.onload = function() {

						//alert("responseText: " + this.responseText);

						curlevel(1);

					};

					rclient.onsendstream = function(e) {
						var ee = parseInt((100 * (parseFloat(e.progress)) ));
						displaydata.text = 'Upload: ' + parseInt((100 * (parseFloat(e.progress)) )) + '%';
						if (ee == 100) {
							//alert("Thank You ! Your report has been submitted.");

							var dialog = Ti.UI.createAlertDialog({
								message : 'Thank You ! Your report has been submitted.',
								buttonNames : ['Ok'],
								//ok : 'OK',
								title : 'NoKunda',
								androidView : Ti.UI.createImageView({
									image : "/badge.png",
									width : Ti.UI.SIZE,
									height : Ti.UI.SIZE
								})
							}).show();

							setTimeout(function() {
								// request method here
								camwindow.close();
							}, 3000);
							//camwindow.close();
							myProgress.value = 0;

						}
						myProgress.value = ee;

					};

					rclient.onerror = function(e) {

						var db = Ti.Database.open("mydb");

						alert("Error Uploading. Locally saved!");

						db.execute('CREATE TABLE IF NOT EXISTS params(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, lat TEXT, longi TEXT, loc TEXT, pic TEXT);');

						db.execute('INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,?,?,?,?,?,?,?,?,?)', details.value, details.value, par.incident_date, par.incident_hour, par.incident_minute, par.incident_ampm, lat, longi, details.value, theimg);

						db.close();

						camwindow.close();

					};

					if (shit == '2') {
						shit2 = 'Meter No: ';
						shit2 = shit2 + details.value;
					} else {
						shit2 = details.value;

					}

					var params = {

						"task" : "report",

						"incident_title" : shit2,

						incident_description : details.value,

						incident_date : par.incident_date,

						incident_hour : par.incident_hour,

						incident_minute : par.incident_minute,

						incident_ampm : par.incident_ampm,

						incident_category : '1',

						latitude : lat,

						longitude : longi,

						location_name : details.value,

						"incident_photo[]" : img,
						
						person_email: details2.text,

						incident_category : shit,

					};

					rclient.send(params);

				});

				lowerview.add(submitbtn);

				fbbtn = genericButton();
				fbbtn.backgroundColor = "#1dcaff";
				fbbtn.borderColor = "#0084b4";
				//fbbtn.backgroundSelectedColor  = "#000";
				fbbtn.borderWidth = 2;

				fbbtn.title = 'Tweet it';

				fbbtn.top = '4%';

				fbbtn.height = '12%';

				fbbtn.left = '32%';

				fbbtn.addEventListener('click', function(e) {
					
					
					
					/////////////
					
					var status = details.value + " #NoKunda ";

	var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'KS_nav_views.png');
	var blob = f.read();
					twitter.share({
						message : status,
						image :blob,
						success : function() {
							alert('Tweeted!');
						},
						error : function(error) {
							alert('Oh no! ' + error);
						}
					}); 

					
			/*		/////////////


					//fbbtn.enabled = false;

					var fb = require('facebook');

					fb.appid = 516713608430736;
					
					
					var data = {

						message : 'Kunda SPOTTED  and Reported!',

						picture : img,

					};

					//fb.permissions = ['publish_stream', 'publish_actions'];

					fb.permissions = ['publish_stream'];

					fb.forceDialogAuth = true;

					fb.addEventListener('login', function(e) {

						if (e.success) {

							//	fb.reauthorize(['publish_stream'], "me", function(e){

				//	});

						} else if (e.error) {

							alert(e.error);

						} else if (e.cancelled) {

							alert("Canceled");

						}

					});
					
					
					
					fb.requestWithGraphPath('me/photos', data, 'POST', function(e) {

						if (e.success) {

							alert("Success!  From FB: " + e.result);

							//alert("Successfully posted to facebook");

						} else {

							if (e.error) {

								alert('Error:' + e.error);

							} else {

								alert("Unkown result");

							}

						}

					});

					if (!fb.loggedIn){
					fb.authorize();
					}
					//var f = Ti.Filesystem.getFile('alhamdulillah.jpg');

					//var reward = f.read();

					
					//if (fb.loggedIn) {
    

					
				
					//} */

				});

				lowerview.add(fbbtn);

				var displaydata = genericLabel();
				displaydata.backgroundColor = 'transparent';

				displaydata.font = {

					fontSize : 13,

					fontFamily : 'Helvetica Neue'

				};

				displaydata.top = '8%';

				lowerview.add(displaydata);
				lowerview.add(myProgress);
				myProgress.show();

				var coordss = genericLabel();

				coordss.font = {

					fontSize : 11,

					fontFamily : 'Helvetica Neue'

				};

				coordss.top = '4%';

				//lowerview.add(coordss);

				if (Ti.Platform.osname == "android") {

					//win.title = 'Submit Report (A)';

					var providerGps = Ti.Geolocation.Android.createLocationProvider({

						name : Ti.Geolocation.PROVIDER_GPS,

						minUpdateDistance : 0,

						minUpdateTime : 0

					});

					Ti.Geolocation.Android.addLocationProvider(providerGps);

					Ti.Geolocation.Android.manualMode = true;

					//NEW rule

					var Rule = Ti.Geolocation.Android.createLocationRule({

						// Rule applies to GPS provider

						provider : Ti.Geolocation.PROVIDER_GPS,

						// Must be accurate to this value in meters

						accuracy : 10,

						// Location update should be no older than this value in milliseconds

						maxAge : 120,

						// Location updates should be no more frequent than this value in milliseconds

						minAge : 100

					});

					Ti.Geolocation.Android.addLocationRule(Rule);

				} else {

					//win.title = 'Camera Preview iOS';

					Ti.Geolocation.purpose = 'Get Current Location';

					Ti.Geolocation.distanceFilter = 0;

					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;

					Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

					//Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;

				}

				Ti.Geolocation.addEventListener('location', function(e) {

					if (!e.success || e.error) {

						coordss.text = 'Coordinates N/A right now... wait?';

						//alert('error ' + JSON.stringify(e.error));

						lat = 0;

						longi = 0;

						return;

					}

					coordss.text = 'Lat: ' + e.coords.latitude + ' Long: ' + e.coords.longitude;

					lat = e.coords.latitude;

					longi = e.coords.longitude;

				});

			},

			error : function(e) {

				alert("There was an error");

			},

			cancel : function(e) {

				alert("The event was cancelled");

			},

			saveToPhotoGallery : false,

			mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],

			showControls : true

		});

		//camera function END

		//Ti.UI.currentTab.add(camwindow);

	});

	rwindow.add(btn);
	rwindow.add(btn2);

	var nokundalabel = genericLabel();

	nokundalabel.text = 'NoKunda';

	nokundalabel.font = {

		fontSize : 28,

		fontFamily : 'Helvetica Neue',

		fontWeight : 'bold'

	};

	nokundalabel.top = '10%';

////// Label //////

	//rwindow.add(nokundalabel);

	function updatestuff() {

		var currentlabel = genericLabel();

		currentlabel.top = '25%';

		level = curlevel(2);

		currentlabel.text = "Current Level: " + level;

		rwindow.add(currentlabel);

		var pending = genericLabel();

		pending.top = '34%';

		pendingrep = getpending();

		pending.text = 'Pending Reports: ' + pendingrep;

		rwindow.add(pending);

	}

	return rwindow;

	//return camwindow;

};

module.exports = reportwindow;

function createwindows() {

	if (!(Ti.Platform.osname == "android")) {

		var tabGroup = Ti.UI.createTabGroup();

	}

	win = Ti.UI.createWindow({

		//navBarHidden: true,

		title : 'Submitting Report',

		backgroundColor : '#FFFFFF',
		barColor:"#2079b4",

		//width: rwidth,

		//height: rheight

	});

	if (!(Ti.Platform.osname == "android")) {

		var tab = Ti.UI.createTab({

			title : "Submitting Report",

			window : win

		});

		tabGroup.addTab(tab);

	}

	var bannerTop = Titanium.UI.createLabel({

		text : 'Photo Preview',

		font : {

			fontSize : 10,

			fontFamily : 'Helvetica Neue'

		},

		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,

		top : '0%',

		width : '100%',

		height : '5%',

		color : '#7f8c8d',

		backgroundColor : '#ecf0f1'

	});

	//win.add(bannerTop);

	if (Ti.Platform.osname == "android") {

		return win;

	} else {

		return tabGroup;

	}

}

function genericview() {

	var myview = Ti.UI.createView({

		//layout: 'vertical',

		top : '12%',

		//bottom:'1%',

		left : '3%',

		right : '3%',

		height : '28%',

	});

	return myview;

}

function makeimview() {

	var imView = Ti.UI.createImageView({

		//image:theimg,

		//transform : Ti.UI.create2DMatrix().rotate(90),

		width : '35%',

		height : '90%',

		//bottom:'10%',

		autorotate : true,

		//top:'%',

		borderRadius : 8,

		//top:'7%'

	});

	return imView;

}

function genericButton() {

	var btn = Ti.UI.createButton({

		title : 'Retake Photo',

		font : {

			fontSize : 14,

			fontWeight : 'bold',

			fontFamily : 'Helvetica Neue'

		},

		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,

		width : '40%',

		height : '25%',

		enabled : true,

		//top : '10%',

		//right : '3%',

		left : '10%',

		//paddingLeft : 7,

		//paddingRight : 7,

		//paddingTop : 7,

		//paddingBottom : 7,
		
		
		

		color : '#ffffff',

		backgroundColor : '#4C93C3',
		borderColor : "#2D5875",
		borderWidth : 2,

		borderRadius : 6,

	});

	return btn;

}

function genericLabel() {

	var glabel = Titanium.UI.createLabel({

		//text:'N',

		font : {

			fontSize : 14,

			fontFamily : 'Helvetica Neue',

			fontWeight : 'bold'

		},

		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,

		//top: '10%',

		width : Ti.UI.SIZE,

		height : Ti.UI.SIZE,

		color : 'black',

		backgroundColor : '#FFFFFF'

	});

	return glabel;

}

function textareasetup() {

	var title = Ti.UI.createTextArea({//renamed TextField to TextArea for multi row field, may cause error on submission - test

		height : '27%',

		width : '100%',

		//left : '3%',

		//right : '2%',

		//top : '5%',

		paddingLeft : 2, //pad text from borders..

		paddingRight : 2,

		paddingTop : 2,

		paddingBottom : 2,

		hintText : 'Enter name of location / details....',

		bubbleParent : false,

		opacity : 0.85,

		font : {

			fontSize : 13,

			fontFamily : 'Helvetica Neue'

		},

		color : 'black',

		backgroundColor : '#FFFFFF',

		borderRadius : 5,

		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,

		borderWidth : 3,

		borderColor : '#ecf0f1',

		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,

		returnKeyType : Titanium.UI.RETURNKEY_DONE

	});

	return title;

}

///// TextField /////

function textfieldsetup() {

	var title = Ti.UI.createTextField({//renamed TextField to TextArea for multi row field, may cause error on submission - test

		height : '15%',

		width : '100%',

		//left : '3%',

		//right : '2%',

		//top : '5%',

		paddingLeft : 2, //pad text from borders..

		//paddingRight : 2,

		//paddingTop : 2,

		//paddingBottom : 2,

		bubbleParent : false,

		opacity : 0.85,

		font : {

			fontSize : 13,

			fontFamily : 'Helvetica Neue'

		},

		color : 'black',

		backgroundColor : '#FFFFFF',

		borderRadius : 5,

		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,

		borderWidth : 3,

		borderColor : '#ecf0f1',

		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,

		returnKeyType : Titanium.UI.RETURNKEY_DONE

	});

	return title;

}

/////////////////////

function getparams() {

	var amPM = '';

	var hour = currentTime.getHours();

	var min = currentTime.getMinutes();

	var year = currentTime.getFullYear();

	var twomonth = ((currentTime.getMonth() + 1) >= 10) ? (currentTime.getMonth() + 1) : '0' + (currentTime.getMonth() + 1);

	var twoday = ((currentTime.getDate()) >= 10) ? (currentTime.getDate()) : '0' + (currentTime.getDate());

	var title = "abc";

	var dateform = twomonth + "/" + twoday + "/" + year;

	if (hour < 12) {

		amPM = 'am';

	} else {

		amPM = 'pm';

	}

	//Converting 24hr format to 12 hr for Ushahidi

	if (hour == 0) {

		hour = 12;

	}

	if (hour > 12) {

		hour = hour - 12;

	}

	var para = {

		"task" : "report",

		"incident_title" : title,

		incident_description : title,

		incident_date : dateform,

		incident_hour : hour,

		incident_minute : min,

		incident_ampm : amPM,

		incident_category : '1',

		latitude : lat,

		longitude : longi,

		location_name : title,

		//incident_photo:e.media

		"incident_photo[]" : 'blah'

	};

	return para;

}

function curlevel(check) {

	var db = Ti.Database.open("mydb");

	row = db.execute('SELECT count FROM counter');

	if (row.isValidRow()) {

		var curcount = row.fieldByName("count");

	} else {

		row.close();

		db.close();

		return 9999;

	}

	if (check == 1)//increment counter, after report uploaded

	{

		curcount++;

		db.execute('UPDATE counter SET count=?', curcount);

		row.close();

		db.close();

		return;

	} else if (check == 2)//get current count

	{

		row.close();

		db.close();

		return curcount;

	} else {

		row.close();

		db.close();

		return 55555;

	}

}

function getpending() {

	var db = Ti.Database.open("mydb");

	var rows = db.execute('SELECT id,title FROM params');

	var pendingnum = 0;

	while (rows.isValidRow()) {

		pendingnum++;

		rows.next();

	}

	rows.close();

	db.close();

	return pendingnum;

}

/*

 function setupGPS()

 {

 if (Ti.Platform.osname == "android")

 {

 //win.title = 'Submit Report (A)';

 var providerGps = Ti.Geolocation.Android.createLocationProvider(

 {

 name: Ti.Geolocation.PROVIDER_GPS,

 minUpdateDistance: 0,

 minUpdateTime: 0

 });

 Ti.Geolocation.Android.addLocationProvider(providerGps);

 Ti.Geolocation.Android.manualMode = true;

 //NEW rule

 var Rule = Ti.Geolocation.Android.createLocationRule(

 {

 // Rule applies to GPS provider

 provider : Ti.Geolocation.PROVIDER_GPS,

 // Must be accurate to this value in meters

 accuracy : 10,

 // Location update should be no older than this value in milliseconds

 maxAge : 120,

 // Location updates should be no more frequent than this value in milliseconds

 minAge : 100

 });

 Ti.Geolocation.Android.addLocationRule(Rule);

 }

 else

 {

 //win.title = 'Camera Preview iOS';

 Ti.Geolocation.purpose = 'Get Current Location';

 Ti.Geolocation.distanceFilter = 0;

 Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;

 Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

 //Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;

 }

 Ti.Geolocation.addEventListener('location', function(e)

 {

 if (!e.success || e.error)

 {

 coordss.text = 'Coordinates N/A right now... wait?';

 //alert('error ' + JSON.stringify(e.error));

 lat = 0;

 longi = 0;

 return;

 }

 coordss.text = 'Lat: ' + e.coords.latitude + ' Long: ' + e.coords.longitude + ' Accu: ' + e.coords.accuracy + '\n Heading: ' + e.coords.heading + ' Speed: ' + e.coords.speed;

 lat = e.coords.latitude;

 longi = e.coords.longitude;

 });

 }

 */
