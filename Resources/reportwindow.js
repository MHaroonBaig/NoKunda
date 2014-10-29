var lat = 0;
var retakeTest = 0;
// For not closing the first window, and close the rest after that. It prevents the copies of windows which are being made when the retake event is triggered.
var emailTest = 0;
// The 'Incorrect Email' dialog box appears only once. Or else, the email field is overridden by 'abc@example.com'

var longi = 0;
var social = require('social');

var twitter = social.create({
	//site: 'Twitter', // <-- this example is for Twitter. I'll expand this to other sites in the future.
	consumerKey : 'FNyx2KLV6XDa6g2J4igumpoeM', // <--- you'll want to replace this
	consumerSecret : '6yrqV6d1bkqOdgl6HDRWI6wJoVkLzNhmFVtCqDHH1zRO2TB6a6' // <--- and this with your own keys!
});

var currentTime = new Date();
var gaModule = require('Ti.Google.Analytics');
var analytics = new gaModule('UA-55042156-1');

function reportwindow() {

	var rwindow = Ti.UI.createWindow({
		title : 'Report!',
		backgroundColor : '#2079b4',
		barColor : '#3498db',
		fullscreen : true,
		navBarHidden : true,
	});

	// This is the background image for the 'Capture Kunda' and 'Report Meter' view.
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
		top : '5%',
		width : '100%',
		height : 5,
		min : 0,
		max : 100,
		value : 0,
		borderWidth : 1,
		borderRadius : 1,
		borderColor : '#092436',
	});

	var btn = Ti.UI.createButton({
		title : 'Capture Kunda',
		font : {
			fontSize : 19,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		width : '80%',
		height : '15%',
		top : '55%',
		color : '#ffffff',
		backgroundColor : "#2079B4",
		borderColor : "#092436",
		borderWidth : 3,
		borderRadius : 12,
	});

	var btn2 = Ti.UI.createButton({
		title : 'Report a Meter ',
		font : {
			fontSize : 19,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		width : '80%',
		height : '15%',
		bottom : '13%',
		color : '#ffffff',
		backgroundColor : "#2079B4",
		borderColor : "#092436",
		borderWidth : 3,
		borderRadius : 12,
	});

	var about = Ti.UI.createImageView({
		height : '8%',
		left : '85%',
		bottom : "3%",
		image : 'info.jpg'
	});

	// The about page
	about.addEventListener("click", function(e) {

		// This is the tutorial window.
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
			// Opening the tabbed view
		});

		var t4 = Ti.UI.iPhone.AnimationStyle.CURL_DOWN;

		wintut.add(startbtn);
		wintut.open({
			transition : t4
		});
	});

	rwindow.add(about);

	// 'Report Meter' event. As this triggers the same event as that of 'Capture Kunda', so the 'name' argument is passed while triggering this event for 'Report Meter' which differetiates the functionality.
	btn2.addEventListener('click', function(e) {

		btn.fireEvent('click', {
			name : '2'
		});
	});

	// The original 'Capture Kunda' event.
	btn.addEventListener('click', function(e) {
		rwindow.close();
		// As the main view where the report submission takes place is opened, the main 'Capture Kunda' and 'Report Meter' view has to be closed here.
		emailTest = 0;
		// Again, the email-dialog box trigger checking
		myProgress.value = 0;

		//camwindow = createwindows(rwindow.width, rwindow.height);

		var shit;
		// This variable differentiates between Kunda and Report event. If its '2', then its Meter event. If its '1', its the Kunda event.

		var shit2;
		// This specifies the title of our report. Incase of MeterNumber, it's like 'Meter No: 1122334455'. Incase of Kunda, it's like, "Kunda at Cantt, Peshawar".

		if (e.name == '2') {
			shit = '2';
		} else {
			shit = '1';
		}

		var camwindow = createwindows();
		// The creation of the main Report Submission window

		Titanium.Media.showCamera({
			showControls : false,

			success : function(e) {
				var img = e.media.imageAsResized(300, 300);
				var imgcam = Ti.UI.createImageView({
					image : img,
					backgroundColor : 'transparent',
					width : 200,
					height : 200,
				});
				var img2 = imgcam.toImage().media;
				// Adjusting the format of the image. Just for the security because it has to be uploaded to the backend.

				var randVal = 11 + (Math.random() * (111 - 11));
				randVal = Math.round(randVal);

				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, randVal.toString() + 'temp.jpg');

				//alert(randVal.toString());
				//var f = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, currentTime.getMinutes().toString() + ".jpg");

				f.write(img);

				// Holds the path where the Captured Image is being stored.
				theimg = f.nativePath;

				//Ti.API.info('PICsize: ' + img.height + " x " + img.width);

				// This view holds the Captured Image and a Retake button.
				topview = genericview();
				topview.layout = 'horizontal';
				camwindow.add(topview);

				// The background image for the main Report Submission windows.
				var bgImage2 = Ti.UI.createImageView({
					height : '100%',
					width : '100%',
					top : "10%",
					left : 0,
					image : 'back2.png'
				});

				camwindow.add(bgImage2);

				// This view holds the image which is been captured and shows it in the top view.
				var imview = makeimview();
				imview.image = theimg;
				topview.add(imview);

				retakebtn = genericButton();
				topview.add(retakebtn);
				camwindow.add(topview);
				// All the components of the top view are now in the Main Window.

				retakebtn.addEventListener('click', function(e) {
					emailTest = 0;
					try {
						rclient.abort();
						// This aborts the uploading process if the user hits the Retake Button while the report is uploading.
					} catch (error) {
						// We don't care if any error occurs. We just simpl cancel the upload process.
					}
					camwindow.close();

					//  The previous logic of directly opening the camera instead of the tabbed view.
					// if (shit == '1') {
					// //var t2 = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
					//
					// //camwindow.close({
					// //transition : t2
					// //});
					//
					// //if (retakeTest > 0) {
					//
					// //camwindow.close();
					// //retakeTest = 0;
					// //}
					//
					// //retakeTest += 1;
					// camwindow.close();
					// //btn.fireEvent('click');
					// } else {
					// //var t3 = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
					//
					// //camwindow.close({
					// //transition : t3
					// //});
					// //if (retakeTest > 0) {
					//
					// //camwindow.close();
					// //retakeTest = 0;
					// //}
					//
					// //retakeTest += 1;
					// camwindow.close({
					// animated : true
					// });
					//
					// //btn.fireEvent('click', {
					// //name : '2'
					// //});
					//
					// }

				});
				//setupGPS();

				// This view holds 2 text fields (Description/MeterNumber and Email), Submit Button, a Progress bar and an Uploading status.
				lowerview = genericview();
				lowerview.layout = 'vertical';
				lowerview.top = '35%';
				lowerview.height = Ti.UI.SIZE;
				lowerview.width = Ti.UI.SIZE;
				camwindow.add(lowerview);

				var details = textfieldsetup();

				// This is the text field for the Description when the event was triggered for Kunda, and Meter# if the event was triggered from 'Report Meter'.
				if (shit == '2') {
					// Incase of 'Report Meter'
					details.hintText = 'Enter the Meter No ';

					// This is for giving an extra space to 'Done' button when a numeric keypad appears.
					var flexSpace = Ti.UI.createButton({
						systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
						right : 0
					});

					// This is a small button which appears at the upper right corner of the Numeric Keypad.
					var doneButton = Ti.UI.createButton({
						systemButton : Ti.UI.iPhone.SystemButton.DONE,
						right : '50%'
					});

					doneButton.activeFld = details;

					doneButton.addEventListener('click', function(e) {
						e.source.activeFld.blur();
						// Focus on the active field, which in this case is 'MeterNumber', when the Done Button is pressed.
					});

					details.keyboardToolbar = [flexSpace, doneButton];
					details.keyboardType = Ti.UI.KEYBOARD_NUMBER_PAD;
					details.width = "100%";

					var meterno = genericLabel();
					meterno.text = "Meter No: ";
					meterno.textAlign = Ti.UI.LEFT;
					meterno.backgroundColor = 'transparent';
					lowerview.add(meterno);
					// The MeterNumber label.

				} else {
					// Incase if the event is triggered for Capturing Kunda.
					details.hintText = "Please enter your location ";
					var meterno1 = genericLabel();
					meterno1.text = "Description: ";
					meterno1.textAlign = Ti.UI.LEFT;
					meterno1.backgroundColor = 'transparent';
					lowerview.add(meterno1);
					// The Description Label.
				}

				var meterno11 = genericLabel();
				meterno11.text = "\nEnter your Email for feedback: ";
				meterno11.textAlign = Ti.UI.LEFT;
				meterno11.backgroundColor = 'transparent';

				lowerview.add(details);
				// The Decription/MeterNumber field.

				lowerview.add(meterno11);
				// The E-mail field Label.

				// This is the email field.
				var details2 = textfieldsetup();
				details2.hintText = "Email: ";
				details2.top = "1%";
				lowerview.add(details2);
				// The E-mail field.

				// This is the main submit button to upload the report.
				submitbtn = genericButton();
				submitbtn.title = 'Submit Report';
				submitbtn.backgroundColor = "#4C93C3";
				submitbtn.borderColor = "#2D5875";
				submitbtn.borderWidth = 2;
				submitbtn.top = '10%';
				submitbtn.height = '14%';
				submitbtn.left = '32%';

				submitbtn.addEventListener('click', function(e) {
					var emailTest = 0;
					if (details2.value.search("@") < 0) {
						// This block is for notifying the user if he/she has entered an incorrect Email.
						if (emailTest < 3) {
							emailTest += 1;
							var emailError = Titanium.UI.createAlertDialog({
								title : 'Invalid Email',
								message : 'Please enter a valid Email address'
							});
							emailError.show();
							details2.value = "abc@example.com";
							return;
						}
						emailTest = 0;
					}

					if (lat == 0 && longi == 0) {
						// The report isn't uploaded when the location isn't fetched.
						displaydata.text = 'Fetching the location. Please wait.';
						return;
					}

					if (shit == '2' && String(details.value).length == 0) {
						//alert("Please Enter the Meter Number");
						var meterNumber = Titanium.UI.createAlertDialog({
							title : 'You missed it',
							message : 'Please Enter a valid Meter Number'
						});
						meterNumber.show();

						return;
					}

					myProgress.show();

					// Both the text fields are disabled when the report starts uploading.
					details.editable = false;
					details2.editable = false;

					submitbtn.enabled = false;
					// Disable the submit button while the report is uploading.

					if (String(details.value).length < 3) {
						details.value = 'NoDetails';
					}

					var par = getparams();
					// Getting the parameters to be sent to the POST request.

					// Preparing the Client for POST request to the server.
					rclient = Titanium.Network.createHTTPClient();
					rclient.open("POST", "http://nokunda.labandroid.com/api");
					rclient.setRequestHeader("Connection", "close");

					rclient.onload = function() {
						// This block is for when the report is finished uploading.
						//alert(this.responseText);
						var thankYou = Titanium.UI.createAlertDialog({
							title : 'Great',
							message : 'We have recieved your report thank you'
						});
						thankYou.show();

						// Preparing the Twitter View once the report has been successfully submitted.
						var vwAlert = Ti.UI.createView({
							backgroundColor : '#311919',
							width : '90%',
							height : '70%',
							layout : 'vertical',
							borderRadius : 10,
							backgroundImage : "twitter.png",
							borderColor : "#092436",
							borderWidth : 2

						});

						var lblMessage = Ti.UI.createLabel({
							text : 'Spread the word',
							top : 10,
							color : 'white',
							font : {
								fontWeight : 'bold',
								fontSize : '19',
								fontFamily : 'Helvetica Neue'
							}
						});

						var tweetField = textfieldsetup();
						tweetField.hintText = "Post your Tweet ..";
						tweetField.top = "4%";
						tweetField.maxLength = 130;
						tweetField.width = "90%";
						tweetField.height = "10%";
						tweetField.borderColor = "#092436";

						var btnSkip = Ti.UI.createButton({
							title : 'Skip',
							width : '43%',
							top : '200',
							font : {
								fontWeight : 'bold',
								fontSize : '16'
							}
						});
						btnSkip.left = '71%';

						tweetbtn = genericButton();
						tweetbtn.backgroundColor = "#1dcaff";
						tweetbtn.borderColor = "#092436";
						tweetbtn.borderWidth = 2;
						tweetbtn.title = 'Tweet it';
						tweetbtn.top = '23';
						tweetbtn.height = '12%';
						tweetbtn.left = '30%';

						tweetbtn.addEventListener('click', function(e) {
							fbbtn.fireEvent('click', {
								tweetStatus : tweetField.value
							});
						});

						btnSkip.addEventListener('click', function(e) {

							var t1 = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;

							camwindow.close({
								transition : t1
							});
						});

						vwAlert.add(lblMessage);
						vwAlert.add(tweetField);
						vwAlert.add(tweetbtn);
						vwAlert.add(btnSkip);
						camwindow.navBarHidden = true;
						camwindow.fullscreen = true;
						camwindow.add(vwAlert);

						//curlevel(1);
					};

					rclient.timeout = 18000;
					// A timeout of 18 seconds. If the report isn't submitted in the time frame of 18 seconds, it's then saved into the database.

					rclient.onsendstream = function(e) {
						// This block executes whenever the state of our client changes. We update our progress bar here.
						var ee = parseInt((100 * (parseFloat(e.progress)) ));
						displaydata.text = 'Uploading: ' + parseInt((100 * (parseFloat(e.progress)) )) + '%';
						if (ee == 100) {
							myProgress.value = 0;
						}
						myProgress.value = ee;
					};

					rclient.onerror = function(e) {
						// This block is executed whenever there is some error while uploading the report. We save that report into the database.
						Ti.Database.install('mydb1.sqllite', 'mydb');
						var db = Ti.Database.open("mydb");

						var errorUpload = Titanium.UI.createAlertDialog({
							title : 'Something went wrong',
							message : 'Its taking too long to send your report. We have saved it for you so you can upload it later'
						});
						errorUpload.show();

						db.execute('CREATE TABLE IF NOT EXISTS params(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, lat TEXT, longi TEXT, loc TEXT, pic TEXT);');
						db.execute('INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,?,?,?,?,?,?,?,?,?)', details.value, details.value, par.incident_date, par.incident_hour, par.incident_minute, par.incident_ampm, lat, longi, details.value, theimg);
						db.close();

						var t12 = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
						camwindow.close({
							transition : t12
						});
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
						person_email : details2.value,
						incident_category : shit,
					};
					rclient.send(params);
				});

				lowerview.add(submitbtn);

				fbbtn = genericButton();
				fbbtn.backgroundColor = "#1dcaff";
				fbbtn.borderColor = "#0084b4";
				fbbtn.borderWidth = 2;
				fbbtn.title = 'Tweet it';
				fbbtn.top = '4%';
				fbbtn.height = '12%';
				fbbtn.left = '32%';

				fbbtn.addEventListener('click', function(e) {
					// Sending a Tweet here.
					var status = details.value + "\n#NoKunda ";

					if (shit == '2')
						status = "Help combating power theft in Paistan, use #NoKunda";

					status = e.tweetStatus;
					status += " \n #NoKunda";
					var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'KS_nav_views.png');
					var blob = f.read();
					twitter.share({
						message : status,
						image : blob,
						success : function() {
							var tt = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
							camwindow.close({
								transition : tt
							});
						},
						error : function(error) {
							var tt1 = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
							camwindow.close({
								transition : tt1
							});
						}
					});

				});

				var displaydata = genericLabel();
				// It shows the status of the uploading report in the form of percentage, above the progress bar.
				displaydata.backgroundColor = 'transparent';
				displaydata.font = {
					fontSize : 13,
					fontFamily : 'Helvetica Neue'
				};
				displaydata.top = '8%';

				lowerview.add(displaydata);
				lowerview.add(myProgress);

				var coordss = genericLabel();
				// This shows the fetched coordinates.
				coordss.font = {
					fontSize : 11,
					fontFamily : 'Helvetica Neue'
				};
				coordss.top = '1%';
				coordss.backgroundColor = 'transparent';

				lowerview.add(coordss);

				camwindow.open({
					transition : Titanium.UI.iPhone.AnimationStyle.NONE
				});

				// if (Ti.Platform.osname == "android") {
				// var providerGps = Ti.Geolocation.Android.createLocationProvider({
				// name : Ti.Geolocation.PROVIDER_GPS,
				// minUpdateDistance : 0,
				// minUpdateTime : 0
				// });
				//
				// Ti.Geolocation.Android.addLocationProvider(providerGps);
				// Ti.Geolocation.Android.manualMode = true;
				//
				// //NEW rule
				//
				// var Rule = Ti.Geolocation.Android.createLocationRule({
				//
				// // Rule applies to GPS provider
				//
				// provider : Ti.Geolocation.PROVIDER_GPS,
				//
				// // Must be accurate to this value in meters
				//
				// accuracy : 10,
				//
				// // Location update should be no older than this value in milliseconds
				//
				// maxAge : 120,
				//
				// // Location updates should be no more frequent than this value in milliseconds
				//
				// minAge : 100
				//
				// });
				//
				// Ti.Geolocation.Android.addLocationRule(Rule);
				//
				// } else {

				Ti.Geolocation.purpose = 'Get Current Location';
				Ti.Geolocation.distanceFilter = 0;
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

				//}

				Ti.Geolocation.addEventListener('location', function(e) {

					if (!e.success || e.error) {
						coordss.text = 'Fetching the Locations. Please wait.';
						lat = 0;
						longi = 0;
						return;
					}
					coordss.text = "Location Fetched";
					lat = e.coords.latitude;
					longi = e.coords.longitude;

				});
			},
			error : function(e) {
				//alert("An error occured");
				var cameraError = Titanium.UI.createAlertDialog({
					title : 'Sorry',
					message : 'Plaease relaunch the app to report a Kunda'
				});
				cameraError.show();

			},
			cancel : function(e) {
				//alert("The event was cancelled");
			},

			saveToPhotoGallery : false,
			mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],
			showControls : true

		});

	});

	rwindow.add(btn);
	// Adding the Kunda Button.

	rwindow.add(btn2);
	// Adding the MeterNumber Button.

	// var nokundalabel = genericLabel();
	//
	// nokundalabel.text = 'NoKunda';
	//
	// nokundalabel.font = {
	//
	// fontSize : 28,
	//
	// fontFamily : 'Helvetica Neue',
	//
	// fontWeight : 'bold'
	//
	// };
	//
	// nokundalabel.top = '10%';

	////// Label //////

	//rwindow.add(nokundalabel);

	// function updatestuff() {
	//
	// var currentlabel = genericLabel();
	//
	// currentlabel.top = '25%';
	//
	// level = curlevel(2);
	//
	// currentlabel.text = "Current Level: " + level;
	//
	// rwindow.add(currentlabel);
	//
	// var pending = genericLabel();
	//
	// pending.top = '34%';
	//
	// pendingrep = getpending();
	//
	// pending.text = 'Pending Reports: ' + pendingrep;
	//
	// rwindow.add(pending);
	//
	// }

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
		titleAttributes : {
			color : '#FFF',

			font : {
				fontSize : 19,
				fontWeight : 'bold',
				fontFamily : 'STHeitiSC-Medium'
			},

		},
		backgroundColor : '#2079b4',
		barColor : "#2079b4",
	});

	if (!(Ti.Platform.osname == "android")) {

		var tab = Ti.UI.createTab({
			title : "Submitting Report",
			window : win

		});

		tabGroup.addTab(tab);

	}

	// var bannerTop = Titanium.UI.createLabel({
	//
	// text : 'Photo Preview',
	//
	// font : {
	//
	// fontSize : 10,
	//
	// fontFamily : 'Helvetica Neue'
	//
	// },
	//
	// textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	//
	// top : '0%',
	//
	// width : '100%',
	//
	// height : '5%',
	//
	// color : '#7f8c8d',
	//
	// backgroundColor : '#ecf0f1'
	//
	// });
	//win.add(bannerTop);

	if (Ti.Platform.osname == "android") {
		return win;
	} else {
		return tabGroup;
	}
}

function genericview() {

	var myview = Ti.UI.createView({
		top : '12%',
		left : '3%',
		right : '3%',
		height : '28%',
	});

	return myview;
}

// This is the view, responsible for showing the Captured Image.
function makeimview() {

	var imView = Ti.UI.createImageView({
		width : '45%',
		height : '75%',
		autorotate : true,
		borderColor : "#2D5875",
		borderWidth : 2,
		borderRadius : 12,
	});

	return imView;
}

function genericButton() {

	var btn = Ti.UI.createButton({
		title : 'Retake Photo',
		font : {
			fontSize : 15,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : '40%',
		height : '30%',
		enabled : true,
		left : '10%',
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

		font : {
			fontSize : 15,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		color : 'black',
		backgroundColor : '#FFFFFF'
	});

	return glabel;
}

function textareasetup() {

	var title = Ti.UI.createTextArea({

		height : '27%',
		width : '100%',
		paddingLeft : 2,
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

function textfieldsetup() {

	var title = Ti.UI.createTextField({

		height : '15%',
		width : '100%',
		borderColor : "#2D5875",
		borderWidth : 1,
		paddingLeft : 2,
		bubbleParent : false,
		opacity : 0.85,
		font : {
			fontSize : 15,
			fontFamily : 'Helvetica Neue'
		},
		color : 'black',
		backgroundColor : '#FFFFFF',
		borderRadius : 5,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderWidth : 3,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});

	return title;
}

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

	// Conversion to 24hr format.

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
		"incident_photo[]" : 'blah'
	};

	return para;
}

// function curlevel(check) {
//
// var db = Ti.Database.open("mydb");
//
// row = db.execute('SELECT count FROM counter');
//
// if (row.isValidRow()) {
//
// var curcount = row.fieldByName("count");
//
// } else {
//
// row.close();
//
// db.close();
//
// return 9999;
//
// }
//
// if (check == 1)//increment counter, after report uploaded
//
// {
//
// curcount++;
//
// db.execute('UPDATE counter SET count=?', curcount);
//
// row.close();
//
// db.close();
//
// return;
//
// } else if (check == 2)//get current count
//
// {
//
// row.close();
//
// db.close();
//
// return curcount;
//
// } else {
//
// row.close();
//
// db.close();
//
// return 55555;
//
// }
//
// }
//
// function getpending() {
//
// var db = Ti.Database.open("mydb");
//
// var rows = db.execute('SELECT id,title FROM params');
//
// var pendingnum = 0;
//
// while (rows.isValidRow()) {
//
// pendingnum++;
//
// rows.next();
//
// }
//
// rows.close();
//
// db.close();
//
// return pendingnum;
//
// }