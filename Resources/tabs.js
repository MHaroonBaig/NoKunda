//var wintabs = Ti.UI.currentWindow;
Ti.include('overrideTabs.js');
function tabs() {

	var tabs = Ti.UI.createTabGroup();
	tabs.navBarHidden = true;

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
		// View parameters for the background
		backgroundColor : '#092436',
		borderColor : "#092436",
		borderWidth:1,
	}, 
	{
		// View parameters for selected tabs
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
	}, 
	
	{
		// View parameters for deselected tabs
		backgroundColor : '#3498db',
		color : '#f7f7f7',
		style : 0,
		font : {
			fontSize : 17,
			fontWeight : 'bold',
			fontFamily : 'STHeitiSC-Light'
		},
		opacity:0.9,
	});
	
	tabs.open({
		transition : Titanium.UI.iPhone.AnimationStyle.CURL_UP
	});
	return tabs;

};

module.exports = tabs;
