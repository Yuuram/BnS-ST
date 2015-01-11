var test = [];
var new_skill;
var skill = "";
var tooltip = "";

function list(v, l) {
	for(var key in v) {
		if (v.hasOwnProperty(key)) {
			l[l.length] = key.toLowerCase();
		}
	}
}

function list2(v, w, x, l) {
	var lx = [];
	
	for(var skill in v) {
		if (v.hasOwnProperty(skill)) {
			for(var variation in v[skill]){
				for(var step in v[skill][variation]){
					lx[lx.length] = v[skill][variation][step]["skill_id"];
				}
			}
		}
	}
	
	for(var id in x) {
		if (v.hasOwnProperty(skill)) {
			lx[lx.length] = id;
		}
	}
	
	for(var key in w) {
		if (w.hasOwnProperty(key)) {
			if ($.inArray(w[key]["id"], lx) == -1) {
				l[l.length] = key.toLowerCase();
			}
		}
	}
}

function arr_diff(a1, a2)
{
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

function simplify(skill_data){
	var l1 = [];
	var l2 = [];
	var l3 = [];
	var new_data = data_skill_tooltip;
	var final_st = "";
	
	list(data_skill_tooltip, l1);
	list(skill_data, l2);
	
	l3 = arr_diff(l1, l2);
	
	for (var t in new_data){
		if (new_data.hasOwnProperty(t)) {
			if ($.inArray(t.toLowerCase(), l3) > -1){
				delete new_data[t]
			}
			else {
				for (var group in new_data[t]) {
					for (var n in new_data[t][group]){
						delete new_data[t][group][n]["default-text-refine"];
						delete new_data[t][group][n]["is_public"];
						delete new_data[t][group][n]["skill-modify-diff-repeat-count"];
						delete new_data[t][group][n]["after-stance-attribute"];
						delete new_data[t][group][n]["before-stance-attribute"];
					}
				}
			}
		}
	}
	
	final_st =  "var data_skill_tooltip = " + JSON.stringify(new_data);
	return final_st;
}

function simplify2(skill_data, slot_data, category_data){
	var l1 = [];
	var new_data = skill_data;
	var final_st = "";
	
	list2(slot_data, skill_data, category_data, l1);
	
	for (var t in new_data){
		if (new_data.hasOwnProperty(t)) {
			if ($.inArray(t.toLowerCase(), l1) > -1){
				delete new_data[t]
			}
		}
	}
	
	return new_data;
}

function simplify_all(skill, slot, category){	
	new_skill = simplify2(skill, slot, category);
	tooltip = simplify(new_skill);
	skill = JSON.stringify(new_skill);
}

function generate(){
	var t = tooltip;
	var s = JSON.stringify(new_skill);
	document.getElementById("t").value = t;
	document.getElementById("s").value = s;
}