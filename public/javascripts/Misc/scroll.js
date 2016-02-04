function scrollDivDown(val) {
	$("#mapDiv").scrollTop(val);
	setCookie("downscroll", val);
}

function scrollDivRight(val) {
	$("#mapDiv").scrollLeft(val);
	setCookie("rightscroll", val);
}
