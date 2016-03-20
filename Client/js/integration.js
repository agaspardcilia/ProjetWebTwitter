const ARG_REGEX = /\&arg\&/ig;
const ARG = "&arg&";

var regex = [
	/(#a=)(((http|ftp|file|https):\/\/)[a-zA-Z0-9._/+@#/%&?=~_-]+(\.[a-zA-Z0-9._/+@#/&%?=~_-]+))( )([^#]+)(#)/gim, //image link 
	/(((http|ftp|file|https):\/\/)[a-zA-Z0-9._/+@#/%&?=~_-]+(\.[a-zA-Z0-9._/+@#/&%?=~_-]+))/gim, //link with args
];

var replacer = [
	"<a href='" + ARG + "' target='_blank'>" + ARG + "</a>",
	"<a href='" + ARG + "' target='_blank'>" + ARG + "</a>",
];


function Intregration(regex, substitute) {
	this.regex = regex;
	this.substitute = substitute;
}

Intregration.prototype.getHtml = function(data) {
	var result = "";
	
	
	result = this.substitute;
	
	
	result = result.replace(ARG_REGEX, data);
	
	
	return result;
}

Intregration.prototype.regMatch = function(str) {
	return str.search(this.regex);
}

Youtube = function() {}

Youtube.regex = /(([^ ]+)(\byoutube\.com|youtu\.be)([^ ]+)(v=)([^ &]*)([^ ])*)/gim;

Youtube.toHtml = function(url){
	var vURI = "";
	var result = "";
	
	vURI = url.match(/((v=)([^ &]*)([^ ])*)/gim)[0];
	
	vURI = vURI.slice(2);
	
	
	result += "<iframe class='youtube' src='https://www.youtube.com/embed/";
	result += vURI;
	result += "' frameborder='0' allowfullscreen></iframe>";
	
	return result;
} 

Spotify = function() {}

Spotify.regex = /([^ ]+)(\bopen\.spotify\.com\/)([^ ]+)([^ &]*)([^ ])*/gim;

Spotify.toHtml = function(url){
	var result = "";
	
	result += "<iframe class='spotify' src='https://embed.spotify.com/?uri=";
	result += url;
	result += "' class='messageImage' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";
	
	console.log(result);	
	
	return result;
} 

Image = function() {}

Image.regex = /(((http|ftp|file|https):\/\/)[a-zA-Z0-9._/+@#/%&?=~_-]+(\.[a-zA-Z0-9._/+@#/&%?=~_-]+)(\.(jpg|jpeg|png|gif|bmp|tif|tiff)))((\?[a-zA-Z0-9._/+@#/&%?=~_-]+)*)/gim;

Image.toHtml = function(url) {
	var result = "";
	
	result += "<a href='" + ARG + "' target='_blank'><img class='image-media' src='";
	result += url;
	result += "' alt='image'/></a>";

	return result;
}

Video = function() {}

Video.regex = /(([^ ]+)(\.(webm|mp4|ogv)))/gim;

Video.toHtml = function(url) {
	return "<video controls src='" + url + "' class='video'>Votre nagivateur ne supporte pas cette fonctionnalité.</video>";
}

Audio = function() {}

Audio.regex = /(([^ ]+)(\.(mp3|wav|ogg)))/gim;

Audio.toHtml = function(url) {
	return "<audio controls src='" + url + "' class='audio'>Votre nagivateur ne supporte pas cette fonctionnalité.</audio>"; 
}





















