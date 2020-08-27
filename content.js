
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      if (tab.url.indexOf("meet.google.com") != -1 ) {
        alert("Time is now ticking");
        main();
      }
      else{ console.log("There is a problem with your page")}
    }
  });



chrome.browserAction.setBadgeBackgroundColor({ color: [77, 165, 223, 0] });

let seconds = 0,
	minutes = 0,
	hours = 0,
	timeString = "",
	timeTotal = "";


// Main function
function main(){
   
	setTimeout(function(){
		seconds += 1;
		while(seconds > 60){
			seconds -= 60;
			minutes += 1;
		}
		while(minutes > 60){
			minutes -= 60;
			hours += 1;
		}
		if((seconds & 1)==0){
			chrome.browserAction.setIcon({path:"https://apps.sibusiso.web.za/tick.png"});
		}else {
			chrome.browserAction.setIcon({path:"https://apps.sibusiso.web.za/tock.png"});
	}
		timeString = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
		timeAbv = hours.toString() + ":" + minutes.toString();
		chrome.browserAction.setBadgeText({text: timeAbv});
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
		}
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
