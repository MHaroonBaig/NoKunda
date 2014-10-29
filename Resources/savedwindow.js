function savedwindow() {

	var test = 1;
	var test2 = 1;
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
		//fullscreen: true,
		//navBarHidden: true
	});
	swindow.addEventListener('focus', listreports);

	var myTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView', // Use an image view
			bindId : 'photo', // Bind ID for this image view
			properties : {// Sets the ImageView.image property
				image : 'KS_nav_ui.png',
				left : '6dp',
				height : '40dp',
				width : '50dp'
			},
			events : {
				click : upload
			} // Binds a callback to the button's click event
		}, {
			type : 'Ti.UI.Label',
			bindId : 'rowtitle',
			properties : {
				color : 'black',
				font : {
					fontSize : 16,
					fontWeight : 'bold',
					fontFamily : 'Helvetica Neue'//left: '10dp'
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
			} // Binds a callback to the button's click event
		}]
	};

	function upload(e) {
		//Ti.API.info('Upload clicked: ' + e.type);
		//alert("Your report will be uploaded shortly");
		if (test > 1) {
			var uploaded = Titanium.UI.createAlertDialog({
				title : 'Sending Report',
				message : 'Your report would be received shortly'
			});
			uploaded.show();
		}

		test += 1;
		var item = e.section.getItemAt(e.itemIndex);
		//alert('Report ID clicked: ' + item.id);

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

		var fpic = Ti.Filesystem.getFile(j);
		var photo = fpic.read();

		rclient = Titanium.Network.createHTTPClient();
		rclient.open("POST", "http://nokunda.labandroid.com/api");
		rclient.setRequestHeader("Connection", "close");

		rclient.onload = function() {
			var db = Ti.Database.open("mydb");
			db.execute('DELETE FROM params WHERE id=?', item.id);
			listreports();
			//alert("responseText: " + this.responseText);
			response = JSON.parse(this.responseText);
			row = db.execute('SELECT count FROM counter');
			var currcount = row.fieldByName("count");
			currcount++;
			db.execute('UPDATE counter SET count=?', currcount);
			row.close();
			db.close();
			if (test2 > 1) {
			var done = Titanium.UI.createAlertDialog({
				title : 'Great',
				message : 'We have recieved your report, thank you'
			});
			done.show();
			}
			test2 += 1;
		};

		rclient.onsendstream = function(e) {
			//alert("Uploading. Check progress");
			//Ti.API.info('PROGRESS: ' + e.progress);
		};

		rclient.onerror = function(e) {
			alert('Failed to Upload');
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

	};

	var lview = Ti.UI.createListView({
		separatorColor : '#092436',
		separatorStyle : Titanium.UI.iPhone.ListViewSeparatorStyle.SINGLE_LINE,
		templates : {
			'myTemplate' : myTemplate
		}, // Mapping myTemplate object to the 'myTemplate' style name
		defaultItemTemplate : 'myTemplate', // Making it default list template for all rows/dataitems
		backgroundColor : '#FFFFFF',
		top : '1%',
		//   headerTitle: "Reports to Upload",     //causes dexer fail
	});

	function listreports() {
		var db = Ti.Database.open("mydb");
		var rows = db.execute('SELECT id, title, description, date, hour, minute, ampm, lat, longi, loc, pic FROM params');
		//var rows = db.execute('SELECT * FROM params');

		data = [];

		while (rows.isValidRow()) {
			//alert(data);
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
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}

			});

			rows.next();
		};
		rows.close();
		db.close();

		//after filling up data[], now displaying the list
		var section = Ti.UI.createListSection({
			items : data
		});
		lview.sections = [section];

		//list.setData(data);

		lview.addEventListener('itemclick', function(e) {

			if (e.bindId == 'button' || e.bindId == 'photo') {
				var item = e.section.getItemAt(e.itemIndex);
				//alert('Report ID clicked: ' + item.id);
			}
		});
		swindow.add(lview);
	}

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
