WP.Diplomacy = function () {

}

WP.DiplomaticResult = function () {

	var id = null;
	var dipText = null;
	var proAllied = null;
	var proAxis = null;
	var trigger = null;
}

WP.DiplomaticResult.Util = {

	dipResultBuilder: function (id, dipText, trigger, proclivity) {

		var dipResult = new WP.DiplomaticResult();
		dipResult.id = id;
		dipResult.trigger = trigger;
		dipResult.dipText = dipText;
		if (proclivity == "proAxis") {
			dipResult.proAxis = 1;
			dipResult.proAllied = null;
		}
		else if (proclivity == "proAllied") {
			dipResult.proAllied = 1;
			dipResult.proAxis = null;
		}
		else {
			dipResult.proAllied = null;
			dipResult.proAxis = null;
		}
		return dipResult;
	}
}