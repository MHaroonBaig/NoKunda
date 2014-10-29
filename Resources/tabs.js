//var wintabs = Ti.UI.currentWindow;
Ti.include('overrideTabs.js');
function tabs() {

	var tabs = Ti.UI.createTabGroup();
	tabs.navBarHidden = true;
	//This also hides the tab ICONS!! & hiding isn't required on iOS
	//tabs.tabBarHidden = true  //hides tabs

	var winreport = require('reportwindow')();
	var winsavedreports = require('savedwindow')();
	var winmap = require('mapwindow')();

	var tabreport = Ti.UI.createTab({
		title : 'Report',
		//icon : 'KS_nav_ui.png',
		window : winreport
	});
	var tabsavedreports = Ti.UI.createTab({
		title : 'Pending',
		//icon : 'KS_nav_views.png',
		window : winsavedreports
	});
	var tabmap = Ti.UI.createTab({
		title : 'Map',
		//icon : 'KS_nav_views.png',
		window : winmap
	});

	tabs.addTab(tabreport);
	tabs.addTab(tabsavedreports);
	tabs.addTab(tabmap);
	overrideTabs(tabs, // The tab group
	{
		backgroundColor : '#092436',
		borderColor : "#092436",
		borderWidth:2,
		
		
	}, // View parameters for the background
	{
		
		
		backgroundColor : '#2079B4',
		color : '#FFF',
		style : 0,
		borderColor : "#092436",
		font : {
			fontSize : 15,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		borderWidth:2,
	//borderRadius:15,
	//opacity:0.5,
	
	
	
	}, // View parameters for selected tabs
	
	{
		//backgroundColor : '#2079B4',
		backgroundColor : '#3498db',
		color : '#f7f7f7',
		style : 0,
		font : {
			fontSize : 17,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Medium'
		},
		//borderRadius:4,
		opacity:0.9,
	} // View parameters for deselected tabs
	);
	tabs.open({
		transition : Titanium.UI.iPhone.AnimationStyle.CURL_UP
	});
	return tabs;

};

module.exports = tabs;
