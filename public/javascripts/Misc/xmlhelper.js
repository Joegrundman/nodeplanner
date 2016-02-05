WP.XmlHelper = function () {
	this.XML = [];
	this.Nodes = [];
	this.State = "";
	this.FormatXML = function (str) {
		if (str && str.replace) {
			str = str.replace(">", "&gt;");
			str = str.replace("<", "&lt;");
			str = str.replace("\"", "&quot;");
			str = str.replace("&", "&amp;");
			return str;
		}
		return "";
	};

	this.BeginNode = function (name) {
		if (!name) return;
		if (this.State == "beg") this.XML.push(">");
		this.State = "beg";
		this.Nodes.push(name);
		this.XML.push("<" + name);
	};

	this.EndNode = function () {
		if (this.State == "beg") {
			this.XML.push("/>");
			this.Nodes.pop();
		}
		else if (this.Nodes.length > 0)
			this.XML.push("</" + this.Nodes.pop() + ">");
		this.State = "";
	};

	this.Attrib = function (name, value) {
		if (this.State != "beg" || !name) return;
		this.XML.push(" " + name + "=\"" + this.FormatXML(value) + "\"");
	};

	this.WriteString = function (value) {
		if (this.State == "beg") this.XML.push(">");
		this.XML.push(this.FormatXML(value));
		this.State = "";
	};

	this.Node = function (name, value) {
		if (!name) return;
		if (this.State == "beg") this.XML.push(">");
		this.XML.push((value == "" || !value) ? "<" + name + "/>" : "<" + name + ">" + this.FormatXML(value) + "</" + name + ">");
		this.State = "";
	};

	this.Close = function () {
		while (this.Nodes.length > 0)
			this.EndNode();
		this.State = "closed";
	};

	this.ToString = function () {
		var result = this.XML.join("");
		return result;
	};
};
