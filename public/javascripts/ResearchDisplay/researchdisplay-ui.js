/* global researchDisplay */
WP.ResearchDisplay.UI = {

	handleMenuButton: function () {
		$("#researchDisplay").dialog('open');
		$("#researchDisplay").dialog("option", "width", 500);
		$("#researchDisplay").dialog("option", "resizable", false);
		researchDisplay.handleResearchCategorySelected("Air");

	}
};

// WP.ResearchDisplay.prototype.handleResearchCategorySelected = function (category) {
// 	var projectList = researchDisplay.getProjectList(category);
// 	researchDisplay.currentCategory = category;
// 	researchDisplay.createProjectTable(projectList);
// }

// WP.ResearchDisplay.prototype.getProjectList = function (category) {
// 	var projectList = [];
// 	switch (category) {
// 		case "Air": projectList = ["Air general", "Air DRM", "Air Range", "Air defense", "Bombers", "Jets", "Naval Air Training"]; break;
// 		case "Naval": projectList = ["Naval general", "Naval DRM", "Torpedoes", "ASW", "Harbor attacks"]; break;
// 		case "Military": projectList = ["Military general", "CTL", "Heavy armor", "Winter Prep", "Rockets"]; break;
// 		case "Intel": projectList = ["Intel general", "Spies used", "Covert ops", "Counter intels", "Occupation policies"]; break;
// 		case "Atomic": projectList = ["Atomic general", "Radar results", "Atom bombs"]; break;
// 	}
// 	return projectList;
// }

// WP.ResearchDisplay.prototype.createProjectTable = function (projectList) {
// 	$('.rdGroup').remove();
// 	var htmlToAppend = '';
// 	for (var i = 0; i < projectList.length; i++) {
// 		var project = projectList[i];
// 		var rdProjElem = '<tr id="rd' + i + '" class="rdGroup"><td id="rdProj' + i + '">' + project + '</td>';
// 		htmlToAppend += rdProjElem;
// 		var results = researchDisplay.getResearchResults(project);
// 		for (var j = 0; j < 7; j++) {
// 			var rdResearchElem = '<td><input id="rd~' + j + '^' + i + '" type="number" value="' + results[j] + '" onchange="researchDisplay.update(id, value)" style="width:35px"></td>';
// 			htmlToAppend += rdResearchElem;
// 		}
// 	}
// 	htmlToAppend += '</tr>';
// 	$('#rdMain tr:last').after(htmlToAppend);
// }

// WP.ResearchDisplay.prototype.update = function (id, value) {
// 	var projectList = researchDisplay.getProjectList(researchDisplay.currentCategory);
// 	var preData = id.split('~');
// 	var ctyData = preData[1].split('^');
// 	var project = projectList[ctyData[1]];
// 	var results = researchDisplay.getResearchResults(project);
// 	if (researchDisplay.validateResult(value) == false) { return; }
// 	researchDisplay.handleResearchResults(results, value, ctyData[0]); 
// }

// WP.ResearchDisplay.prototype.handleResearchResults = function (proj, value, id) {
// 	if (proj[7] == 1) {
// 		var difference = value - proj[id];
// 		if ((id == 0) || (id == 1) || (id == 2)) {
// 			proj[0] += difference;
// 			proj[1] += difference;
// 			proj[2] += difference;
// 		}
// 		else if ((id == 4) || (id == 5)) {
// 			proj[4] += difference;
// 			proj[5] += difference;
// 		}
// 		else { proj[id] = value; }
// 	}
// 	else { proj[id] = value; }

// 	researchDisplay.handleResearchCategorySelected(researchDisplay.currentCategory);
// }

// WP.ResearchDisplay.prototype.getResearchResults = function (project) {
// 	var results = [];
// 	switch (project) {
// 		case "Air general": results = researchDisplay.airGen; break;
// 		case "Air DRM": results = researchDisplay.airDrm; break;
// 		case "Air Range": results = researchDisplay.airRange; break;
// 		case "Air defense": results = researchDisplay.airDefense; break;
// 		case "Bombers": results = researchDisplay.bombers; break;
// 		case "Jets": results = researchDisplay.jets; break;
// 		case "Naval Air Training": results = researchDisplay.airTraining; break;
// 		case "Naval general": results = researchDisplay.navGen; break;
// 		case "Naval DRM": results = researchDisplay.navDrm; break;
// 		case "Torpedoes": results = researchDisplay.torps; break;
// 		case "ASW": results = researchDisplay.asw; break;
// 		case "Harbor attacks": results = researchDisplay.harborAttacks; break;
// 		case "Military general": results = researchDisplay.milGen; break;
// 		case "CTL": results = researchDisplay.ctl; break;
// 		case "Heavy armor": results = researchDisplay.armor; break;
// 		case "Winter Prep": results = researchDisplay.winterPrep; break;
// 		case "Rockets": results = researchDisplay.rockets; break;
// 		case "Intel general": results = researchDisplay.intelGen; break;
// 		case "Spies used": results = researchDisplay.spies; break;
// 		case "Covert ops": results = researchDisplay.coverts; break;
// 		case "Counter intels": results = researchDisplay.coints; break;
// 		case "Occupation policies": results = researchDisplay.occPol; break;
// 		case "Atomic general": results = researchDisplay.atoGen; break;
// 		case "Radar results": results = researchDisplay.radar; break;
// 		case "Atom bombs": results = researchDisplay.atomBombs; break;
// 	}
// 	return results;
// }

// WP.ResearchDisplay.prototype.validateResult = function (value) {
// 	// only allow 0-9
// 	var checkOK = "0123456789";
// 	var checkStr = value;
// 	var allValid = true;
// 	var decPoints = 0;
// 	var allNum = "";
// 	for (var i = 0; i < checkStr.length; i++) {
// 		var ch = checkStr.charAt(i);
// 		for (var j = 0; j < checkOK.length; j++)
// 			if (ch == checkOK.charAt(j))
// 				break;
// 		if (j == checkOK.length) {
// 			allValid = false;
// 			break;
// 		}
// 		if (ch != ",")
// 			allNum += ch;
// 	}
// 	if (!allValid) {
// 		return (false);
// 	}
// }