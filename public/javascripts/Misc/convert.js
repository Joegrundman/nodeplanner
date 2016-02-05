
var Convert = {
	ascii: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	chars: " !\"#$%&amp;'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
	hex: '0123456789ABCDEF', bin: ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'],
	decToHex: function (d) {
		return (this.hex.charAt((d - d % 16) / 16) + this.hex.charAt(d % 16));
	},
	toBin: function (ch) {
		var d = this.toDec(ch);
		var l = this.hex.charAt(d % 16);
		var h = this.hex.charAt((d - d % 16) / 16);
		var hhex = "ABCDEF";
		var lown = l < 10 ? l : (10 + hhex.indexOf(l));
		var highn = h < 10 ? h : (10 + hhex.indexOf(h));
		return this.bin[highn] + ' ' + this.bin[lown];
	},
	toHex: function (ch) {
		return this.decToHex(this.toDec(ch));
	},
	toDec: function (ch) {
		var p = this.chars.indexOf(ch);
		return (p <= -1) ? 0 : (p + 32);
	},
	toAscii: function (index) {
		if (index > 25) {
			return this.ascii[index - 26] + this.ascii[index - 26];
		}

		return this.ascii[index];
	},

	toIntArray: function (csv) {
		var ret = new Array();
		var split = csv.split(',');

		for (var i = 0; i < split.length; i++) {
			try { ret[ret.length] = parseInt(split[i]); } catch (e) { }
		}
		return ret;
	}
};
