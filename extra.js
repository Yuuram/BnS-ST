function blank(){
	(function($) {
		$("#buildlist").animate({height:"100%"});
		var api = jQuery("ul.tabs").data("tabs");
		api.click(0);
	})(jQuery);
}

function expand(){
	(function($) {
		$("#buildlist").animate({height:"0px"});
	})(jQuery);
}

function expand2(){
	(function($) {
		$("#savearea").animate({right:"0px"});
	})(jQuery);
}

function closesave(){
	(function($) {
		$("#savearea").animate({right:"-320px"});
	})(jQuery);
}

$(function() {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    $("ul.tabs").tabs("div.panes > div");
});

function custom_alert(message) {
		alert(message);
	}
function custom_confirm(message, action_after_confirm) {
		if(confirm(message)) {
			eval(action_after_confirm);
			if(action_after_confirm == '_training.resetAllSkill()'){
				var api = jQuery("ul.tabs").data("tabs");
				blank();
				api.click(0);
			}
		}
	}
	
function reset() {
	custom_confirm('Reset current skill?', '_training.resetSelectedSkill()'); return false;
}

function reset_all() {
	custom_confirm('Reset all skills?', '_training.resetAllSkill()'); return false;
}

//document.getElementById("mytextarea").readOnly = true;
function generateBuild() {
	
	var obj = objToJSONString(_training.getSendDataObj());
	
	document.getElementById('codearea').value = obj;
}

function objToJSONString(obj) {
	var isArray = (obj && obj.join && obj.pop && obj.push && obj.reverse && obj.shift && obj.slice && obj.splice);
	var results = [];
	
	for(var i in obj) {
		var value = obj[i];
		
		if(typeof value == "object")
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + objToJSONString(value));
		else if(value)
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value == "string" ? "\"" + value + "\"" : value));
		else
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value == "string" ? "\"\"" : 0));
	}
	
	return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}")
}

function trim(st) {
	while(st) {
		if (st.indexOf(" ")==0) st = st.substring(1);
		else break;
	}
	while(st){
		if (st.lastIndexOf(" ")==st.length-1) st = st.substring(0, st.length-1);
		else break;
	}
	return st;
}

var tempScrollTop;
$(window).scroll(function () { 
    tempScrollTop = $("div.categoryBody").scrollTop();
});
