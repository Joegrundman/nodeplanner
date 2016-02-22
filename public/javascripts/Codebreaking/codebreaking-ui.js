WP.Codebreaking.UI = {
	fillCard: function (div, theater, country, type, flag) {
		var html = "<span style='font-size: 16px; font-weight: bold;'>" + theater + "</span><br />";
		html += "<span style='font-size: 12px; font-style: italic;'>" + country + "</span><p></p>";
		html += "<img src='Content/flags/" + flag + "-smallest.png' alt='Flag' />";
		html += "<p><span style='font-size: 16px; font-weight: bold; padding-top: 5px'>" + type + "</span></p>";
		$(div).html(html);
	},

	handleDialogClose: function () {
		game.state = 0;
	},

	handleMenuButton: function () {
		if (game.state == 2) {
			WP.Misc.Ui.closeAllDialogs();
			return;
		}
		WP.Misc.Ui.closeAllDialogs();
		$("#codebreaking").dialog('open');
		$("#codebreaking").dialog("option", "width", 510);
		game.state = 2;
		codebreaking = new WP.Codebreaking();
		codebreaking.draw();
	},

	showResultsFor: function (year, season, side) {
		WP.Codebreaking.UI.showTitle(side);

		var result = codebreaking.getResultFor(year, season, side);

		if (!result) {
			$(".codebreakingCard").hide();
			$("#cbDrawCards").show();
			return;
		}

		$(".codebreakingCard").show();
		$("#cbDrawCards").hide();
		var theater = "Ultra";
		if (result.side == 7 || result.side == 9) theater = "Magic";

		var country = "Axis";
		var flag = "germany";
		switch (side) {
			case 8: flag = "britain"; country = "Allies"; break;
			case 7: flag = "japan"; country = "Japan"; break;
			case 9: flag = "us"; country = "United States"; break;
		}

		var card = "Blank";
		for (var i = 0; i < result.cards.length; i++) {
			card = "Blank";
			switch (result.cards[i]) {
				case 1: card = "Sub"; break;
				case 2: card = "ASW"; break;
				case 3: card = "Tactical"; break;
				case 4: card = "Strategic"; break;
				case 5: card = "Wild"; break;
			}
			WP.Codebreaking.UI.fillCard("#cbCard" + (i + 1), theater, country, card, flag);
		}
	},

	showTitle: function (id) {
		var title = "European Axis";
		if (id == 8) title = "European Allies";
		else if (id == 7) title = "Japanese";
		else if (id == 9) title = "United States";
		$("#cbDetails").html(title);
	}
}



