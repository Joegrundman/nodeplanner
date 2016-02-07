WP.CommonLoader = {
	readCodebreaking: function (codebreakingNode, country) {
		var codes = new WP.Codebreaking();
		WP.CommonLoader.readCodebreakingCard("asw", codebreakingNode, codes);
		WP.CommonLoader.readCodebreakingCard("sub", codebreakingNode, codes);
		WP.CommonLoader.readCodebreakingCard("strat", codebreakingNode, codes);
		WP.CommonLoader.readCodebreakingCard("tac", codebreakingNode, codes);
		WP.CommonLoader.readCodebreakingCard("blank", codebreakingNode, codes);
		WP.CommonLoader.readCodebreakingCard("wild", codebreakingNode, codes);
		country.codebreaking = codes;
	},

	readCodebreakingCard: function (type, codebreakingNode, codes) {
		var len = 0;
		try { len = parseInt(codebreakingNode.attr(type)); } catch (e) { }
		for (var i = 0; i < len; i++) { codes.addCard(type); }
	}
}