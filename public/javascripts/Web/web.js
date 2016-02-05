function jQueryUIStyling() {
	$('input:button, input:submit').button();
	$('.webgrid-wrapper').addClass('ui-grid ui-widget ui-widget-content ui-corner-all');
	$('.webgrid-title').addClass('ui-grid-header ui-widget-header ui-corner-top');
	$('.webgrid').addClass('ui-grid-content ui-widget-content');
	$('.webgrid-header').addClass('ui-state-default');
}

function onAjaxBegin() {
	$("#divLoading").center();
	$("#divLoading").show();
}
function onAjaxComplete() {
	$("#divLoading").hide();
}
function onAjaxSuccess(context) {
	$("#divLoading").hide("slow");
}

function setRandomWebsiteBackground(divName) {
	var pic = Math.floor(Math.random() * 7) + 1;
	if (divName == null) divName = "main";
	$("#" + divName).attr("style", "background-image: url(/content/pictures/" + pic + ".jpg); background-position: top");
}
