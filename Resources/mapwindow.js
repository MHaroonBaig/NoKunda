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
		//fullscreen : true,
		//backgroundImage : '/Default@2x.png',
		//navBarHidden : true,

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
		//userLocation:true,
		//annotations: fillAnnotations()
	});

	function fillMap() {
		var annotationss = [];

		var apiurl = "http://nokunda.labandroid.com/api?task=incidents&limit=20";
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				//Ti.API.info("Received Report: " + this.responseText);
				var obj = JSON.parse(this.responseText);
				var x = obj.payload.incidents;
				//lats = x[i].incident.locationlatitude;
				//longis = x[i].incident.locationlongitude;

				for (var i = 0; i < x.length; i++) {
					var annon = Map.createAnnotation({
						latitude : parseFloat(x[i].incident.locationlatitude),
						longitude : parseFloat(x[i].incident.locationlongitude),
						title : x[i].incident.incidenttitle,
						subtitle : 'Pekhawar',
						pincolor : Map.ANNOTATION_RED,
						myid : i
					});

					annotationss.push(annon);
				}

				Ti.API.info("PUSHED Reports: " + annotationss);

				mapview.annotations = annotationss;
				self.add(mapview);
			},

			onerror : function(e) {
				Ti.API.debug(e.error);
				//alert('error');

				var annon = Map.createAnnotation({
					latitude : 31.0167,
					longitude : 71.5833,
					title : "Error Fetching Reports",
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

	//rc = Map.isGooglePlayServicesAvailable();
	//if ( rc == Map.SUCCESS )
	//{
	//Ti.API.info('GooG Play Services INSTALLED on Phone!!');
	//}
	//else
	//{
	//	Ti.API.info('Google Play services NOT INSTALLED!');
	//}

	return self;
};
module.exports = mapwindow;

/*
 function fillAnnotations()
 {
 var annotationss = [];

 var apiurl = "http://nokunda.labandroid.com/api?task=incidents&limit=10";
 var client = Ti.Network.createHTTPClient(
 {
 onload : function(e)
 {
 //Ti.API.info("Received Report: " + this.responseText);
 var obj = JSON.parse(this.responseText);
 var x = obj.payload.incidents;
 lats = x[0].incident.locationlatitude;
 longis = x[0].incident.locationlongitude;

 //for (var i=0; i< x.length;i++)
 //{
 var annon = Map.createAnnotation(
 {
 latitude: parseFloat(lats),
 longitude: parseFloat(longis),
 title:"FETCHED REPORT",
 subtitle:'Peshawar',
 pincolor:Map.ANNOTATION_RED,
 myid:1
 });

 annotationss.push(annon);
 //}

 Ti.API.info("PUSHED Reports: " + annotationss[0]);
 return annotationss;
 },

 onerror : function(e)
 {
 Ti.API.debug(e.error);
 //alert('error');

 var annon = Map.createAnnotation(
 {
 latitude: 0,
 longitude: 0,
 title:"Error Fetching Reports",
 subtitle:'Error',
 pincolor:Map.ANNOTATION_RED,
 myid:1
 });
 annotationss.push(annon);
 //return annotationss;
 },

 timeout : 5000
 });

 client.open("GET", apiurl);
 client.send();
 //return annotationss;
 }
 */
