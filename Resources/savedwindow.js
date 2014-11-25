function savedwindow() {
	// This window shows all the reports that were failed to upload. You can upload them here.
	var test = 1;

	var swindow = Ti.UI.createWindow({
		title : 'Saved Reports',
		titleAttributes : {
			color : '#FFF',

			font : {
				fontSize : 19,
				fontWeight : 'bold',
				fontFamily : 'STHeitiSC-Medium'
			},

		},
		backgroundColor : '#FFFFFF',
		barColor : '#2079b4',

	});

	swindow.addEventListener('focus', listreports);

	var bgImage = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		top : 0,
		left : 0,
		image : 'back2.png'
	});
	swindow.add(bgImage);

	// This is a template from which our ListView would be created.
	var myTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'photo',
			properties : {
				image : 'KS_nav_ui.png',
				left : '6dp',
				height : '40dp',
				width : '50dp'
			},
			events : {
				click : upload
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'rowtitle',
			properties : {
				color : 'black',
				font : {
					fontSize : 16,
					fontWeight : 'bold',
					fontFamily : 'Helvetica Neue'
				}
			}
		}, {
			type : 'Ti.UI.Button',
			bindId : 'button',
			properties : {
				borderColor : "#092436",
				borderWidth : 2,
				width : '60dp',
				height : '34dp',
				right : '6dp',
				font : {
					fontSize : 11,
					fontWeight : 'bold',
					fontFamily : 'STHeitiSC-Medium'
				},
				title : 'Upload',
				backgroundColor : '#3498db',
				borderRadius : 4,
				color : '#FFFFFF'
			},
			events : {
				click : upload
			}
		}]
	};

	// This function is called whenever the user taps on the Upload button in the List.
	function upload(e) {
		try{
			var section = e.section;
		var itenIndex = e.itemIndex;

		// if (test > 1) {
		// var uploaded = Titanium.UI.createAlertDialog({
		// title : 'Sending Report',
		// message : 'Your report would be received shortly'
		// });
		// uploaded.show();
		// }
		// test += 1;

		var item = e.section.getItemAt(e.itemIndex);
		var db = Ti.Database.open("mydb");
		var data = db.execute('SELECT title, description, date, hour, minute, ampm, lat, longi, loc, pic FROM params WHERE id=?', item.id);
		if (data.isValidRow()) {
			var a = data.fieldByName("title");
			var b = data.fieldByName("description");
			var c = data.fieldByName("date");
			var d = data.fieldByName("hour");
			var e1 = data.fieldByName("minute");
			var f = data.fieldByName("ampm");
			var g = data.fieldByName("lat");
			var h = data.fieldByName("longi");
			var i = data.fieldByName("loc");
			var j = data.fieldByName("pic");
			var task_para = 'report';
		}
		db.close();
		section.deleteItemsAt(itenIndex, 1, {
			animationStyle : Titanium.UI.iPhone.RowAnimationStyle.LEFT
		});
		var fpic = Ti.Filesystem.getFile(j);
		// Gets the picture from the Database to upload.
		var photo = fpic.read();

		rclient = Titanium.Network.createHTTPClient();
		rclient.open("POST", "http://nokunda.labandroid.com/api");
		rclient.setRequestHeader("Connection", "close");

		rclient.onload = function() {
			// When the report finishes uploading, we delete that report from the database and throw a little thank you message.
			var db = Ti.Database.open("mydb");
			db.execute('DELETE FROM params WHERE id=?', item.id);
			//listreports();
			response = JSON.parse(this.responseText);
			row = db.execute('SELECT count FROM counter');
			var currcount = row.fieldByName("count");
			currcount++;
			db.execute('UPDATE counter SET count=?', currcount);
			row.close();
			db.close();
		};

		rclient.onsendstream = function(e) {
			// We can track the progress here. But as we've used a ListView, we don't have to.
		};

		rclient.onerror = function(e) {
			// Incase some error occurs, process it here but we aren't because the report would be saved in the database again.
		};

		var params = {
			"task" : "report",
			"incident_title" : a,
			incident_description : b,
			incident_date : c,
			incident_hour : d,
			incident_minute : e1,
			incident_ampm : f,
			incident_category : '1',
			latitude : g,
			longitude : h,
			location_name : i,
			//incident_photo:e.media
			"incident_photo[]" : photo
		};

		rclient.send(params);
		} 
		catch (error)
		{
			//something here
		}
	};

	// Here we create a cool looking ListView from the template that we have previously defined.
	var lview = Ti.UI.createListView({
		separatorColor : '#092436',
		separatorStyle : Titanium.UI.iPhone.ListViewSeparatorStyle.SINGLE_LINE,
		templates : {
			'myTemplate' : myTemplate
		},
		defaultItemTemplate : 'myTemplate',
		//backgroundColor : '#FFFFFF',
		top : '1%',
		backgroundColor : 'transparent',

	});

	function listreports() {
		var db = Ti.Database.open("mydb");
		var rows = db.execute('SELECT id, title, description, date, hour, minute, ampm, lat, longi, loc, pic FROM params');
		data = [];
		while (rows.isValidRow()) {
			data.push({
				id : rows.fieldByName('id'),
				photo : {
					image : rows.fieldByName('pic')
				},
				rowtitle : {
					text : rows.fieldByName("title").toString()
				},
				properties : {
					itemId : rows.fieldByName('id'),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
					backgroundColor : 'transparent',
				}
			});

			rows.next();
		};
		rows.close();
		db.close();

		// We display the ListView here when we are done populating it.
		var section = Ti.UI.createListSection({
			items : data
		});
		lview.sections = [section];

		lview.addEventListener('itemclick', function(e) {
		try{
			upload(e);
		}
		catch (error)
		{
			//something here
		}
		});
		swindow.add(lview);
	}

	// This label is used to display the title of the report in the section of the list.
	function genericLabel() {
		var glabel = Titanium.UI.createLabel({
			text : 'N',
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

	listreports();
	return swindow;
};

module.exports = savedwindow;
