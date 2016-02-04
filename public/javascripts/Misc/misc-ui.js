WP.Misc = {  };

WP.Misc.Ui = {
	closeAllDialogs: function () {
		if ($('#attrition').dialog('isOpen') == true)
			$("#attrition").dialog('close');
		if ($('#codebreaking').dialog('isOpen') == true)
			$("#codebreaking").dialog('close');
		if ($('#forcepool').dialog('isOpen') == true)
			$("#forcepool").dialog('close');
		if ($('#gameSettings').dialog('isOpen') == true)
			$("#gameSettings").dialog('close');
		if ($('#hexControl').dialog('isOpen') == true)
			$("#hexControl").dialog('close');
		if ($('#researchDisplay').dialog('isOpen') == true)
			$("#researchDisplay").dialog('close');
		if ($('#newUnit').dialog('isOpen') == true)
			$("#newUnit").dialog('close');
		if ($('#recordHandler').dialog('isOpen') == true)
			$("#recordHandler").dialog('close');
		if ($('#shipsAtSea').dialog('isOpen') == true)
			$("#shipsAtSea").dialog('close');
		if ($('#shipyard').dialog('isOpen') == true)
			$("#shipyard").dialog('close');
		if ($('#taskforce').dialog('isOpen') == true)
			$("#taskforce").dialog('close');
		if ($('#unitCounter').dialog('isOpen') == true)
			$("#unitCounter").dialog('close');

	},

	isiPad: function () {
		var isIpad = false;
		if (navigator.platform.indexOf("iPad") != -1) isIpad = true;
		return isIpad;
	},

	isiPod: function () {
		var isIpod = false;
		if (navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPad") != -1) isIpod = true;
		return isIpod;
	},

	trKeyVal: function (key, val) {
		return "<tr valign='middle'><td>" + key + "</td><td style='white-space: nowrap'>" + val + "</td></tr>";
	},

	trKeyValWidth100: function (key, val) {
		return "<tr valign='middle'><td style='white-space: nowrap'>" + key + "</td><td style='width: 100%'>" + val + "</td></tr>";
	},

	createAnchorWithId: function (id, text) {
		return "<a id='" + id + "'>" + text + "</a>";
	}
};

WP.Color = function(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;

	this.toRgb = function() {
		return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
	};
};
