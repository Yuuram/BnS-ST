
var root_path = get_server_host()+'/';
var doc_path = root_path + 'bns/wiki/';
var default_doc_path = 'http://power.plaync.com/bns/wiki/';
var current_doc_path = get_server_host+'/bns/wiki/';
var src_path = root_path + 'exe/bs1/';

function get_server_host() {
	var dns;
	dns = location.href;
	dns = dns.split("//");
	dns = "http://"+dns[1].substr(0, dns[1].indexOf("/"));
	return dns;
}

var isIE = document.all ? true : false;

var keepalive_trial = 0;
function keepalive() {
           var url = src_path + 'index.php';
           pars = "";
         //   var myAjax = $.ajax(url, { method: 'post', postBody: pars, onComplete: ''});
		$.ajax({url : url+'?'+pars , success : function(data){} });
	
           keepalive_trial++;
           if(keepalive_trial < 11) {
                     setTimeout("keepalive()", 600000);  // 10분 단위 5번 반복
           }
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

function trim_all(checkform) {
	var i=0;
	while (i < checkform.length) {
		if (checkform.elements[i].type != 'file') {
			checkform.elements[i].value = trim(checkform.elements[i].value);
		}
		i++;
	}
	return true;
}

function is_null(obj, message) {
	if (obj.value.length==0) { alert(message+'\t'); obj.focus(); return true; }
	return false;
}

function layer_toggle(obj) {
	if (obj.style.display == 'none') obj.style.display = 'block';
	else if (obj.style.display == 'block') obj.style.display = 'none';
}

function is_checked(obj) {
	var flag = false;
	for(var i =0; i < obj.length ; i++) {
		flag = flag | obj[i].checked;
	}
	if (obj.length == undefined) flag = true;
	return flag;
}

function url_encode(str) {
	return str.replace(/&/g, '%26');
}


function dec_tag_value(str) {
	str = str.replace(/quot;/g, '"');
	str = str.replace(/#39;/g, '&#39;');
	str = str.replace(/lt;/g, '<');
	str = str.replace(/gt;/g, '>');
	return str;
}

function onclick_member_info(no) {
	window.open('/member_info.php?no='+no,'mi', 'width=630,height=800');
}

function onclick_mk(code, obj) {
	var mk1 = static_path + 'mk1.gif';
	var mk2 = static_path + 'mk2.gif';
	if (obj.src == mk1) {
		document.getElementById('area_'+code).style.display = 'block';
		obj.src = mk2;
	} else {
		document.getElementById('area_'+code).style.display = 'none';
		obj.src = mk1;
	}
}

function onclick_open(code_set) {
	var mk1 = static_path + 'mk1.gif';
	var mk2 = static_path + 'mk2.gif';

	for(var i=0; i < code_set.length; i++) {
		document.getElementById('area_'+code_set[i]).style.display = 'block';
		document.getElementById('img_'+code_set[i]).src = mk2;
	}

}

function onclick_close(code_set) {
	var mk1 = static_path + 'mk1.gif';
	var mk2 = static_path + 'mk2.gif';

	for(var i=0; i < code_set.length; i++) {
		document.getElementById('area_'+code_set[i]).style.display = 'none';
		document.getElementById('img_'+code_set[i]).src = mk1;
	}
}

function call_ajax_bgjob() {
	var url = src_path + 'ajax_exe.php';
	pars = 'mode=background_job';
	// var myAjax = new Ajax.Request(url, { method: 'post', postBody: pars, onComplete: call_ajax_bgjob_result });
	$.ajax({url : url+'?'+pars , success : function(data){ call_ajax_bgjob_result(data);} });

}

function call_ajax_bgjob_result(originalRequest) {
	var result = originalRequest.responseText;
	//document.title = result;
}

/* tb_history */
var onhistory = {
	load : function(){
		$('layer_history').setStyle({display:'none'});
		Event.observe($('tb_history'),'mouseover',onhistory.show);
		Event.observe($('tb_history'),'mouseout',onhistory.hide);
	},
	show : function(event){
		var doc_no, ver_no, p_x, p_y, layerLeft, layerTop;
		var el = Event.element(event);
		if( el.tagName.toUpperCase() != 'SPAN' ) return;
		var _id = el.id.split('_');
		p_x = Event.pointerX(event);
		p_y = Event.pointerY(event);
		layerLeft = p_x + 'px';
		layerTop = p_y + 15 + 'px';
		$('layer_history').setStyle({top:layerTop,left:layerLeft});
		doc_no = _id[1];
		ver_no = _id[2];

		var url = src_path+'ajax_exe_con.php';
		pars = 'mode=check_doc_history';
		pars += '&doc_no='+doc_no;
		pars += '&ver_no='+ver_no;
		// var myAjax = new Ajax.Request(url, { method: 'post', postBody: pars, onComplete: onhistory.display });
		$.ajax({url : url+'?'+pars , success : function(data){ call_ajax_bgjob_result(data);} });
	},
	display : function(originalRequest) {
		var result = originalRequest.responseText;
		$('layer_history').innerHTML = result;
		$('layer_history').setStyle({display:'block'});
	},
	hide : function(){
		$('layer_history').setStyle({display:'none'});
	}
}

/* idxlist  */
var togIndex = function(obj){
	var parent = obj.parentNode;
	if(obj.className == 'off'){
		parent.style.height="24px";
		obj.className='on';
		obj.nodeValue=obj.title='열기';
	}else{
		parent.style.height="";
		obj.className='off';
		obj.nodeValue=obj.title='접기';
	}
}

/* resize dl thumbnail */
function setDlThumb(){
	var dl_thumb = $$('div.dl_thumb')[0];
	var dl_thumb_obj = dl_thumb.select('img')[0];
	var setLeft, setTop;
	var p_w = parseInt(dl_thumb.getStyle('width'));
	var p_h = parseInt(dl_thumb.getStyle('height'));
	var w = dl_thumb_obj.getWidth();
	var h = dl_thumb_obj.getHeight();
	if( w > p_w ) 	setLeft = -(Math.ceil(Math.abs(w - p_w)/2))+'px';
	else setLeft = 0;
	if( h > p_h )	setTop =  -(Math.ceil(Math.abs(h - p_h)/2))+'px';
	else setTop = 0;
	$(dl_thumb_obj).setStyle({left:setLeft,top:setTop});
}

var oldEditorObj = "";
viewObj=function(obj){
	if (oldEditorObj != obj && oldEditorObj != "") hideObj(oldEditorObj);
	if(document.getElementById(obj).style.display == "block") hideObj(obj);
	else document.getElementById(obj).style.display = "block";
	oldEditorObj = obj;
	htmleditor.document.body.focus();
}
hideObj=function(obj){
	document.getElementById(obj).style.display="none";
}


function setCookie(cookieName,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=cookieName+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ';domain=plaync.com;';
}
function getCookie(cookieName){
if (document.cookie.length>0)  {
  c_start=document.cookie.indexOf(cookieName + "=")
  if (c_start!=-1) {
    c_start=c_start + cookieName.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    }
  }
return ""
}

function pb_urlencode(s) {
	s = encodeURIComponent(s);
	return s.replace(/~/g,'%7E').replace(/%20/g,'+');
}

function login_confirm() {
	if(confirm('로그인 하시겠습니까?')) document.location = login_url;
}

function resizeImg(imgObj){ 
	var orgImage = new Image();
	orgImage.src = imgObj.src;
	if(orgImage.width < imgObj.width && orgImage.height < imgObj.height){
		imgObj.height = orgImage.height;
		imgObj.width=orgImage.width;
		return;
	}
	var baseAxis;
	if( (orgImage.width/imgObj.width)>(orgImage.height/imgObj.height))
		baseAxis='width';
		
	else
		baseAxis='height';
	if(baseAxis=='width'){
			imgObj.height=Math.round(orgImage.height * (imgObj.width / orgImage.width));
	}else{
		imgObj.width = Math.round(orgImage.width * (imgObj.height / orgImage.height));
	}
}

function  noImage(obj){ obj.parentNode.style.display='none';}

// 파워북 인기 검색어
String.prototype.ellipsis = function(size) { // src="http://rc.search.plaync.co.kr/common/bns/js/bns.js
	var bytes = 0, limit =size;
	var text = this;
	var len = text.length;
	var contains = /([a-zA-Z])|\d/.test( text );
	if ( len <= limit ) return text;
	else {
		for ( var i = 0; i < len; i++ ) {
			if ( bytes >= limit ) {
				return text.substring( 0, bytes ) + '..';
			} else {
				if ( contains ) {
					var ch = text.charAt( i );
					bytes += ( escape( ch ).length > 4 ) ? 1 : 0.5;
				} else {
					bytes++;
				}
			}
		}
	}
};
function print_powerbookkeyword(wrap_id){
	var path = doc_path;
	var wrap = $('#'+wrap_id);
	var list = [];
	var keywordTemplate = function(url,kw,displaykw){ return '<li><a href="'+url+'" title="'+kw+'">'+displaykw+'</a></li>';}
	for(i = 0; i < 10 ; i++) {
		var _displaykw = popularkwd_arr[i].keyword.ellipsis(15);
		var _kw = popularkwd_arr[i].keyword;
		var _url = path +''+ encodeURIComponent(_kw);
		list.push( keywordTemplate(_url,_kw,_displaykw) );
	}
	wrap.html(list.join(''));
}

function new_alert(type,id,msg,action){
	var _modal= $("<div/>").attr({"id":"modal"});
	_modal.bind('show', function(){
		_modal.css({'display':'block'});
		_modal.animate({opacity:'0.9'},200);
	});
	_modal.bind('click', function(){
		_modal.css({'opacity':'0.5'});
		_modal.remove();
		$(".wrapLayer").remove();
	});
	var _wrapLayer = $("<div/>").attr({"id":id}).addClass("wrapLayer");
	var html_alert = '<section><div><p>'+msg+'</p></div><div class="button"><button class="js_close">닫기</button><button class="confirm">확인</button></div></section>';
	var html_confirm = '<section><div><p>'+msg+'</p></div><div class="button"><button class="js_close">닫기</button><button class="confirm">확인</button><button class="cancel">취소</button></div></section>';
	var html = (type=='alert') ? html_alert : html_confirm;
	_wrapLayer.html(html);
	$("body").append(_modal,_wrapLayer);
	_modal.trigger('show');
	var w = parseInt($("body").width()) - parseInt(_wrapLayer.css('width')) - 30;
	var h = parseInt($("body").height()) - parseInt(_wrapLayer.css('height')) - 30;
	_wrapLayer.css({'display':'block','left':w/2+'px','top':h/2+'px'});

	_wrapLayer.find(".confirm").bind('click', function(){ // 확인 버튼
		if(action) eval(action);
		_modal.trigger('click');
		return false;
	});
	_wrapLayer.find(".js_close , .cancel").bind('click', function(){ // 취소,닫기 버튼
		_modal.trigger('click');
	});
}

var get_slot_data = function(wrap){
	var obj = wrap.find("dt, dd");

	var saved_data={};
	$.each(obj,function(i,j){
		if($(this).find(".max_step").length==0 ) return;
		var current_step = parseInt($(this).find(".max_step").html().split("/")[0]);
		var slot_id = $(this).attr("id").split("slot_")[1];
		if(current_step != 0 ){
			saved_data[slot_id]=current_step;
		}
	});
	var data = stringify(saved_data);
	return data;
}

var get_level = function(wrap){
	return wrap.find(".level strong").html();
}

var get_mastery_level = function(wrap){
	return wrap.find(".mastery_level strong").html();
}

var stringify = function (obj){
	var str = "";
	for (var i in obj){
		str += ", \"" + i + "\" : \""+ obj[i]+"\"";
	}
	str = str.substring(1, str.length);
	return "{"+ str + "}";
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

function getJobByNick(nick) {
	if(nick == null)
		return null;
	
	var arr = {
			검사 : "BM"
			, 권사 : "KF"
			, 역사 : "DE"
			, 기공사 : "FM"
			, 암살자 : "AS"
			, 소환사 : "SU"
			, 린검사 : "SM"
	}
	
	if(arr[nick])
		return arr[nick];
	else
		return null;
}