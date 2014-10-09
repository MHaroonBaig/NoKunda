//var wintabs = Ti.UI.currentWindow;

function tabs()
{
	
	var tabs = Ti.UI.createTabGroup();
	tabs.navBarHidden = true;   //This also hides the tab ICONS!! & hiding isn't required on iOS
	//tabs.tabBarHidden = true  //hides tabs

	var winreport = require('reportwindow')(); 
	var winsavedreports = require('savedwindow')();
	var winmap = require('mapwindow')();
	
	var tabreport = Ti.UI.createTab(
		{ 
			title: 'Report', 
			icon: 'KS_nav_ui.png', 
			window: winreport 
		});
	var tabsavedreports = Ti.UI.createTab(
		{ 
			title: 'Pending Reports', 
			icon: 'KS_nav_views.png', 
			window: winsavedreports 
		});
	var tabmap = Ti.UI.createTab(
		{ 
			title: 'Public Map', 
			icon: 'KS_nav_views.png', 
			window: winmap 
		});
	
	tabs.addTab(tabreport);
	tabs.addTab(tabsavedreports);
	tabs.addTab(tabmap);
	
	tabs.open();
	return tabs;

};

module.exports = tabs;
