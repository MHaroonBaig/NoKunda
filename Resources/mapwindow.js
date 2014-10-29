/* The map showing the reports in rendered here in this Window. Right now, it fetches only 20 reports fro the database
 and displays them here on the map.
 */
var lats = 0;
var longis = 0;
var Map = require('ti.map');

function mapwindow() {
	var self = Ti.UI.createWindow({
		title : 'Crowdsourced Map',
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
	self.addEventListener('focus', fillMap);

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		region : {
			latitude : 34.0167,
			longitude : 71.5833,
			latitudeDelta : 0.5,
			longitudeDelta : 0.5
		},
		animate : true,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		regionFit : true,
	});

	// Populating the Map here
	function fillMap() {

		var annotationss = [];

		var apiurl = "http://nokunda.labandroid.com/api?task=incidents&limit=20";
		// Change the value from 20 to whatever you like. Right now, it fetches 20 reports.
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				var obj = JSON.parse(this.responseText);
				var x = obj.payload.incidents;

				for (var i = 0; i < x.length; i++) {
					var annon = Map.createAnnotation({
						latitude : parseFloat(x[i].incident.locationlatitude),
						longitude : parseFloat(x[i].incident.locationlongitude),
						title : x[i].incident.incidenttitle,
						subtitle : 'Peshawar',
						pincolor : Map.ANNOTATION_RED,
						myid : i
					});
					annotationss.push(annon);
				}
				mapview.annotations = annotationss;
				self.add(mapview);
			},

			onerror : function(e) {
				var annon = Map.createAnnotation({
					latitude : 31.0167,
					longitude : 71.5833,
					title : "Something went wrong",
					subtitle : 'Error',
					pincolor : Map.ANNOTATION_RED,
					myid : 1
				});
				annotationss.push(annon);

				mapview.annotations = annotationss;
				self.add(mapview);
			},
			timeout : 5000
		});

		client.open("GET", apiurl);
		client.send();
	}

	fillMap();
	return self;
};
module.exports = mapwindow;
