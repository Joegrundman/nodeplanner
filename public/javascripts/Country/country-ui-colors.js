
WP.Country.UI.Colors = {

	setColors: function (country) {
		switch (country.name.toUpperCase()) {
			case "ARABIA":
				country.backColor = new WP.Color(216, 203, 159);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(255, 255, 255);
				break;
			case "AUSTRALIA":
				country.backColor = new WP.Color(209, 188, 140);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(230, 222, 80);
				break;
			case "BELGIUM":
			case "LUXEMBOURG":
				country.backColor = new WP.Color(153, 205, 232);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(238, 233, 3);
				break;
			case "BRITAIN":
				country.backColor = new WP.Color(209, 188, 140);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(230, 220, 168);
				break;
			case "BULGARIA":
				country.backColor = new WP.Color(167, 169, 168);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(238, 88, 67);
				break;
			case "CANADA":
				country.backColor = new WP.Color(209, 188, 140);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(168, 211, 226);
				break;
			case "COMCHINA":
			case "COMMUNIST CHINA":
				country.backColor = new WP.Color(234, 81, 43);
				country.foreColor = new WP.Color(241, 246, 0);
				country.innerColor = new WP.Color(234, 81, 43);
				break;
			case "DENMARK":
				country.backColor = new WP.Color(199, 240, 254);
				country.foreColor = new WP.Color(255, 0, 0);
				break;
			case "FINLAND":
				country.backColor = new WP.Color(137, 171, 206);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(246, 250, 255);
				break;
			case "FINBORDER":
				country.backColor = new WP.Color(147, 191, 216);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(246, 250, 255);
				break;
			case "FRANCE":
				country.backColor = new WP.Color(118, 178, 218); //Fr Blue
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(181, 216, 239);
				break;
			case "FREE FRENCH":
				country.backColor = new WP.Color(118, 178, 218)//(118, 178, 218); brit tan//Fr Blue
				country.foreColor = new WP.Color(0, 0, 0); //Black
				country.innerColor = new WP.Color(209, 188, 140)//(216, 203, 159); //french blue// Brit tan
				break;
			case "VICHY":
				country.backColor = new WP.Color(83, 161, 217);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(120, 120, 120)//(190, 190, 190); // please leave this as 190, 190, 190
				break;
			case "GERMANY":
				country.backColor = new WP.Color(73, 73, 73); //(53, 53, 53);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(120, 120, 120);
				break;
			case "GREECE":
				country.backColor = new WP.Color(0, 124, 177);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(0, 124, 177);
				break;
			case "HUNGARY":
				country.backColor = new WP.Color(167, 169, 168);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(70, 160, 40);
				break;
			case "INDIAN NAT. ARMY":
				country.backColor = new WP.Color(165, 125, 24);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(156, 121, 33);
				break;
			case "INDIA":
				country.backColor = new WP.Color(209, 188, 140);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(155, 120, 22);
				break;
			case "IRA":
			case "IRELAND":
				country.backColor = new WP.Color(23, 153, 50);
				country.foreColor = new WP.Color(219, 231, 9);
				country.innerColor = new WP.Color(0, 0, 0);
				break;
			case "IRAQ":
				country.backColor = new WP.Color(247, 219, 115);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(0, 178, 57);
				break;
			case "ITALY":
				country.backColor = new WP.Color(188, 221, 185);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(233, 245, 219);
				break;
			case "ITALIAN SOCIALIST":
				country.backColor = new WP.Color(188, 221, 185);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(234, 81, 43); //
				break;
			case "ITALIAN BELIGERANTE":
				country.backColor = new WP.Color(188, 221, 185);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(151, 172, 108); //
				break;
			case "JAPAN":
			case "FORMOSA":
			case "KOREA":
				country.backColor = new WP.Color(73, 73, 73);
				country.foreColor = new WP.Color(250, 236, 70);
				country.innerColor = new WP.Color(120, 120, 120);
				break;
			case "NATCHINA":
			case "NATIONALIST CHINA":
				country.backColor = new WP.Color(250, 250, 250);
				country.foreColor = new WP.Color(228, 0, 32);
				country.innerColor = new WP.Color(250, 250, 250);
				break;
			case "NETHERLANDS":
			case "DUTCH E. INDIES":
				country.backColor = new WP.Color(153, 205, 232);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(228, 115, 0);
				break;
			case "NORWAY":
				country.backColor = new WP.Color(250, 250, 255);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(42, 168, 218);
				break;
			case "PERSIA":
				country.backColor = new WP.Color(216, 203, 159); //tan
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(0, 178, 57);
				break;
			case "PHILIPINES":
				country.backColor = new WP.Color(151, 172, 108);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(88, 200, 220);
				break;
			case "EASTPOLAND":
			case "POLAND":
				country.backColor = new WP.Color(0, 120, 108);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(0, 120, 108);
				break;
			case "BESSARABIA":
			case "RUMANIA":
				country.backColor = new WP.Color(167, 169, 168);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(3, 140, 205);
				break;
			case "RUSSIA":
				country.backColor = new WP.Color(234, 81, 43);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(235, 202, 75);
				break;
			case "SPAIN":
				country.backColor = new WP.Color(250, 236, 87);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(235, 86, 69);
				break;
			case "SOUTH AFRICA":
				country.backColor = new WP.Color(209, 188, 140);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(225, 158, 0);
				break;
			case "SWEDEN":
				country.backColor = new WP.Color(250, 250, 255);
				country.foreColor = new WP.Color(0, 93, 157);
				country.innerColor = new WP.Color(206, 231, 255);
				break;
			case "THAILAND":
				country.backColor = new WP.Color(146, 6, 104);
				country.foreColor = new WP.Color(235, 241, 145);
				country.innerColor = new WP.Color(146, 6, 104);
				break;
			case "TURKEY":
				country.backColor = new WP.Color(238, 210, 94);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(240, 235, 190);
				break;
			case "UKRAINE":
				country.backColor = new WP.Color(0, 124, 197);
				country.foreColor = new WP.Color(245, 238, 6);
				country.innerColor = new WP.Color(0, 124, 197);
				break;
			case "US":
			case "UNITED STATES":
			case "UNITEDSTATES":
			case "AMERICA":
				country.backColor = new WP.Color(151, 172, 108);
				country.foreColor = new WP.Color(0, 0, 0);
				country.innerColor = new WP.Color(202, 221, 166);
				break;
			case "VLASOV":
			case "VLASLOV":
				country.backColor = new WP.Color(244, 81, 43);
				country.foreColor = new WP.Color(255, 255, 255);
				country.innerColor = new WP.Color(148, 146, 148);
				break;
			case "WAFDIST":
				country.backColor = new WP.Color(241, 219, 114);
				country.foreColor = new WP.Color(0, 0, 0); //black
				country.innerColor = new WP.Color(0, 175, 60);
				break;
			case "WANG":
				country.backColor = new WP.Color(244, 81, 43);
				country.foreColor = new WP.Color(255, 255, 0);
				country.innerColor = new WP.Color(255, 89, 66);
				break;
			case "YUGOSLAVIA":
				country.backColor = new WP.Color(167, 169, 168);
				country.foreColor = new WP.Color(0, 0, 0);
				country.lineColor = new WP.Color(250, 250, 250);
				country.innerColor = new WP.Color(3, 140, 205);
				break;
			default:
				country.backColor = new WP.Color(20, 20, 20);
				country.foreColor = new WP.Color(140, 140, 140);
				country.innerColor = new WP.Color(90, 90, 90);
				break;
		}
		if (country.lineColor == null) { country.lineColor = country.foreColor }

		var shadowRed, shadowGreen, shadowBlue;
		if (country.backColor.red > 40)
			shadowRed = country.backColor.red - 40;
		else
			shadowRed = 0;

		if (country.backColor.green > 40)
			shadowGreen = country.backColor.green - 40;
		else
			shadowGreen = 0;

		if (country.backColor.blue > 40)
			shadowBlue = country.backColor.blue - 40;
		else
			shadowBlue = 0;

		country.shadow = new WP.Color(shadowRed, shadowGreen, shadowBlue);
	}
}
