

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

WP.Diplomacy.Util = {
    handleMenuButton: function() {
        $("#diplomacy").dialog('open');
        $("#diplomacy").dialog("option", "width", 540);

	}
}