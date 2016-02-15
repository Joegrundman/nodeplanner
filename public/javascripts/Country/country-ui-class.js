WP.Country.UI = {

	getFlagUrl: function (country) {
		var name = country.name.toLowerCase();
        if (name == "germany" && !game.noSwastikas) { 
            return "/content/flags/" + name.replace(" ", "") + "-unsafe.bmp"
        }
		if (country.colonyOf)
			name = country.colonyOf.name.toLowerCase();
		if (country.partOf)
			name = country.partOf.name.toLowerCase();

		if (country.id == 28 || country.id == 29) name = "italy";
		if (country.id == 42) name = "nationalistchina";
		if (country.id == 19) name = "netherlands";
		if (country.id == 17) name = "comchina";
		if (country.id == 24) name = "freefrench";
		if (country.id == 32) name = "indiannat";
		return "/content/flags/" + name.replace(" ", "") + ".bmp";
	},

	loadFlag: function (country) {
		country.flagImage = new Image();
		country.flagImage.src = WP.Country.UI.getFlagUrl(country);
	}
}
