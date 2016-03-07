const MAIN_PAGE = "index.html";

//Alert const
const ALERT_TITLE = ".alert-title";
const ALERT_CONTENT = ".alert-content";

const CONNEXION_ALERT = "#alert-connexion";

const CONNEXION_ERROR_TITLE = "Echec de la connexion";
const CONNEXION_ERROR_BAD_LOGIN_CONTENT = "Mauvais login et/ou mot de passe.";


const CRT_USER_CK = "crtUser";

//Debug user
const DEBUG_ID = 1;
const DEBUG_LOGIN = "debug";
const DEBUG_FNAME = "Alan";
const DEBUG_LNAME = "Turing";
const DEBUG_CONTACT = false;

function init() {
	environnement = new Object();
	environnement.users = {};
	
	
	
}

function gotoIndex() {
	window.location.href = MAIN_PAGE;
}



function connexion(form) {
	var login = form.login.value;
	var password = form.password.value;
	
	
	
	if (connect(login, password)) {
		var user = new User(DEBUG_ID, DEBUG_LOGIN, DEBUG_FNAME, DEBUG_LNAME, DEBUG_CONTACT);
		$.cookie(CRT_USER_CK, user.toArray());
		
		
	} else {
		defineAlert(CONNEXION_ALERT, CONNEXION_ERROR_TITLE,
				 CONNEXION_ERROR_BAD_LOGIN_CONTENT);
	
		$(CONNEXION_ALERT).show();
	}
			
	
	
	
}

function connect(login, password) {
	//TODO	
	return true;
}


function defineAlert(alertId, alertTitle, alertContent) {
	$(alertId + " " + ALERT_TITLE).first().text(alertTitle);
	$(alertId + " " + ALERT_CONTENT).first().text(alertContent);
}


function hideAlert(element) {
	$(element).css("display", "none");
}


function User(id, fName, lName,  login, contact) {
	this.id = id;
	this.login = login;
	this.fName = fName;
	this.lName = lName;
	
	this.contact = false;
	if (contact != undefined)
		this.contact = contact;
	
	environnement.users[id] = this;
	
	return this;
}

User.prototype.modifStatus = function() {
	this.contact = !this.contact;
}

User.prototype.toArray = function() {
	var result = {"id":this.id, "login":this.login, "fName":this.fName,
					 "lName":this.lName, "contact":this.contact};
	
	return result;
}


function Comment(id, author, content, date, score) {
	this.id = id;
	this.author = author;
	this.content = content;
	this.date = date;
	this.score = 0;
	
	if(contact != undefined)
		this.score = score;
	
	
	
	
}

Comment.prototype.getHtml = function() {
	var result = "";
	
	s+= "<p>Put html here.</p>";
	//this.date.format('dd/mm/yyyy HH:MM:ss'); pour formater la date.
	
	//Faire attention à ce qu'il y est un utilisateur connecté pour afficher ce genre de chose.
	if (this.author.contact) {
		s+= "<p>Put contact related content here.</p>";
	}
	
	
	
	return result;
}


function SearchResults(results, query, contactOnly, author, date) {
	this.result = result;
	this.contactOnly = contactOnly;
	this.author = author;
	
	this.date = new Date();
	if (date != undefined)
		this.date = date;
	
	this.query = query;
	
	environnement.searchResults = this;	
}

SearchResults.prototype.getHtml = function(){
	var result = "";
	
	result += "<p>Put html here.</p>";
	
	for (var i in this.results) {
		results += "<p>Put more html here.</p>";
	}
	
	return result;
	
}


SearchResults.fromJSON = function(json) {
	var result = JSON.parse(s, SearchResults.revival);
	
	if (result.error != undefined) {
		alert(result.error);
		
		return undefined;
	}
	
	return result;
	
}


SearchResults.revival = function(key, value) {
	switch (key) {
		case "date" :
			return new Date(value);
		case "userid" :	
			return new User(value.id, value.login, value.contact);
		case "" :
			return new SearchResults(value.results, value.query, value.contactOnly, value.author, value.date);
			
		default :
			if (isNumber(key)) {
				return new Comment(value.id, value.author, value.content, value.date, value.score);
			} else {
				return value;	
			}
	}
}













	




