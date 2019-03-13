/*****************************************************************************
variabile globale: serve per far comunicare dall'oggetto calendario 
all'oggetto studentese è stata fatta la prenotazione  di un'ora   
*****************************************************************************/ 

var pass=false;

/****************************************************************************/
//oggetto studente
/****************************************************************************/
//costruttore
function Studente () {                               
  this.nome = null;                                           
  this.cognome =null;                                            
  this.telefono=null;                                          
  this.email= null;   
}

//metodi
Studente.prototype.creaStudente= function() { 
  this.nome=document.getElementById('idNome').value;
  this.cognome=document.getElementById('idCognome').value;
  this.telefono=document.getElementById('idTelefono').value;
  this.email=document.getElementById('idEmail').value;
} 

Studente.prototype.controllaDati= function() {
   //window.alert(passaCal);
   //var passa=false;
   //passa=passaCal;
   var errore = false;
   var str = "";
   var schemaNome= /^[a-zA-Z]{2,}$/;
   var schemaCognome= /^[a-zA-Z]{2,}$/;
   var schemaTelefono=/^[0-9]{4,}$/;
   /*var schemaEmail=/^([w!#$%&&apos;*+-/=?^`{|}~]+.)*[w!#$%&&apos;*+-/=?^`{|}~]
     +@((((([a-z0-9]{1}[a-z0-9-]{0,62}[a-z0-9]{1})|[a-z]).)+
     [a-z]{2,6})|(d{1,3}.){3}d{1,3}(:d{1,5})?)$/; */ 
   var schemaEmail= /^[A-Za-z0-9]\w{2,}@[A-Za-z0-9-]{3,}\.[A-Za-z]{2,}$/;
   if(!(schemaNome.test(this.nome))){
     str += "il nome  non è esatto, correggilo \n";
     errore = true;
   }
   if(!(schemaCognome.test(this.cognome))){
     str += "il cognome non è esatto, correggilo \n";
     errore = true;
   }
   if(!(schemaTelefono.test(this.telefono))){
     str += "il telefono non è esatto, correggilo \n";
     errore = true;
   }
   if(!(schemaEmail.test(this.email))){
     str += "hai scritto un indirizzo E-mail non esatto, correggilo";
     errore = true;
   }
   if(errore){
       window.alert(str);
   }else{
       if(pass==true){        
         document.getElementById('idForm').submit(); 
       } 
       else{
         window.alert("devi prenotare il giorno e l'ora");
       }     
   }
} 

Studente.prototype.visualizza= function() {
  window.alert(this.nome + this.cognome + this.telefono + this.email);
} 
/****************************************************************************/
//oggetto calendario 
/***************************************************************************/

function Calendario(){
	/*crea un array di nome tab che conterra' il nome del colore di ogni cella
  	del calendario*/
  this.tab = new Array();
	/*crea un array di nome parola che conterra' la stringa scritta in ogni cella
  	del calendario*/
  this.parola = new Array();
  	//crea 2 matrici  formate da 6 elementi
  for (i = 0; i < 6; i++) {
    this.tab[i] = new Array();
    this.parola[i] = new Array();
	}
	/* inizializzo a verde tutte le componenti della matrice tab, e parola con le
  	ore delle lezioni */
    for(i=0;i<6;i++){
      for(j=0;j<14;j++){
        this.tab[i][j]="verde";
        var oraIn = 14-1+i;
  	    var oraOut = 14+i;
  	    this.parola[i][j]= oraIn ;
      }
    }
  /*creo gli array che contengono giorno (gio) mese (me) 
  numero del giorno (ndg)*/
  this.gio = new Array();
  this.me = new Array();
  this.ndg = new Array();
  
  /*altre variabili non di tipo array*/
  this.calendario;
  this.MESE = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set",
     "ott", "nov", "dic"];
  this.MESE_COMPL = ["gennaio", "febbraio", "marzo", "aprile", "maggio", 
  "giugno", "luglio", "agosto", "settembre","ottobre", "novembre", "dicembre"];   
  this.GIORNO = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
  this.GIORNO_COMPL = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì",
   "venerdì", "sabato"];
	//mese m,numero del giorno d,giorno g, della data di oggi (adesso)
  this.adesso = new Date();
  this.m = null;
  this.d = null;
  this.g = null;
  //inizializzazione data di oggi	                 
  this.m = this.adesso.getMonth();	  // 0 = gennaio,  1 = febbraio, ...
  this.d = this.adesso.getDate();	  // 1 = primo del mese,...
  this.g = this.adesso.getDay();
	//mese mn,numero del giorno dn,giorno gn, della data di domani(nuova data)
  this.nuovaData;	  
  this.mn = null;
  this.dn = null;
  this.gn = null;
	//altre variabili
  this.idCella=null;
  this.calendarioHTML;
	this.nomeMateria;
	this.giorno;
	this.numGiorno;
	this.mese1;
	this.ore;
	// variabile semaforo dell'oggetto Calendario  
	this.passa=false;
		//coordinate dell'elemento selezionato
	this.coord_i;
  this.coord_j;
}    
	
Calendario.prototype.creaCalendario= function() {  
  var content = '<table name="tabella" id="idTabella" >\n';
  for(i=0;i<6;i++) {
    		// inizializza la 1° riga del calendario con le date
    if(i==0){ 		  
      content += '<tr>';
    	for(j=0;j<14;j++){ 
    	  this.tab [i][j]="bianco";  
    		/*crea una nuova data che vale 1 oppure
    		2 oppure 3 ecc giorni in più della data attuale (adesso)*/
    	  this.nuovaData = new Date();    	
    	  var nuovoGiorno = (j + this.d + 1);
    	  this.nuovaData.setDate(nuovoGiorno);				
    	  this.gn = this.nuovaData.getDay();
    	  this.dn = this.nuovaData.getDate();
    	  this.mn = this.nuovaData.getMonth();    	  
    	  var data = this.GIORNO[this.gn] +  '<br>' + this.dn +  '<br>' + 
        this.MESE[this.mn];
        this.parola[i][j] = data; 				
    	  content += '<th class="' + this.tab[i][j] + '"><div class=\"divTitolo\">' + this.parola[i][j]
        + '</div></th>' + '\n';
        this.gio[j] = this.gn;
        this.me[j] = this.mn;
        this.ndg[j] = this.dn;
    	}
    	content += '</tr>'; 
    }else{
      content += '<tr>';
	  	 //crea le altre righe della tabella
      for(j=0;j<14;j++){	      
	      idCella = i + "," + j;            			  
    		/* pongo ROSSE le domeniche e i sabati*/
    	  this.nuovaData = new Date();
    	  var nuovoGiorno = j + this.d + 1;
    	  this.nuovaData.setDate(nuovoGiorno);		
    	  this.gn = this.nuovaData.getDay();
    	  if (this.GIORNO[this.gn]=="dom"||this.GIORNO[this.gn]=="sab"){
    	    this.tab[i][j]="rosso";              //rosso
    	  }  					
    	  /*singola cella della tabella:la classe dellacella mi è data da tab
    	  il contenuto della cella da parola   */ 				
    	  content += '<th class="'  + this.tab[i][j] +  '" id="' + idCella +
             '" onClick="c.prenota(this)"><div class=\"divInternoCella\">' + this.parola[i][j]+ '</div></th>'  +'\n';
      }
      content += '</tr>'; 
    } 		
  }	
  content += '</table>\n';
  this.calendarioHTML = content; 	
}

Calendario.prototype.visualizza = function () {
  document.getElementById('idCalendario').innerHTML=this.calendarioHTML;
  //innerDOM(document.getElementById('idCalendario'),this.calendarioHTML,true);  
}

Calendario.prototype.prenota = function (elemento) {
/*devo ricavare l'ID dell'elemento della tabella con cui faccio click 
con il mouse */   
  for(i=0;i<6;i++){
    for(j=0;j<14;j++){
      var stringa= i + "," + j;
      if(elemento.id==stringa){
        /*memorizza i valori i e j dell'elemento selezionato*/
        this.coord_i=i;
        this.coord_j=j;
        /*seleziono l'elemento della tabella solo se è verde*/
        if(c.tab[i][j] == "verde"){          
          c.tab[i][j]="rosso";
          /* giorno, mese, num del giorno, dell'ora selezionata */
          this.giorno = this.GIORNO_COMPL[this.gio[j]];
          this.numGiorno = this.ndg[j];
          this.mese1 = this.MESE_COMPL[this.me[j]];
          this.ore = this.parola[i][j];
                /* memorizza in parola [i][j] il nome della materia scelta */ 
          var indiceMateria=document.getElementById("idMateria").selectedIndex;
          this.nomeMateria= 
             document.getElementById("idMateria").options[indiceMateria].value;
          c.parola [i][j]=this.nomeMateria;
        
          /*creo la nuova tabella con l'elemento selezionato*/
          var content1 = '<table name="tabella" id="idTabella" >\n';
          for(i=0;i<6;i++) {
            content1 += '<tr>';        	     
            if(i==0){ 		  
              content1 += '<tr>';
            	for(j=0;j<14;j++){              		
            	  content1 += '<th class="' + this.tab[i][j] + '"><div class=\"divTitolo\">' 
                + this.parola[i][j] + '\n</div>';            
             	}
            }else{
              content1 += '<tr>';
        		     //crea le altre righe della tabella
            	for(j=0;j<14;j++){
            		//singola cella della tabella 				
            	  content1 += '<th class="'  + this.tab[i][j] +  '"><div class=\"divInternoCella\">' 
                  + this.parola[i][j] + '\n </div>';
            	}
            } 		
          }
          
          
          /*scrivi la data della prenotazione sopra il bottone conferma */
          content1 += '</table>\n';
          document.getElementById('idCalendario').innerHTML=content1;
          var messaggio='ciao ' + document.getElementById('idNome').value 
            + ', hai prenotato un\'ora di ' + this.nomeMateria + '  '
            + this.giorno + '  ' + this.numGiorno + '  ' + this.mese1 
            + ' alle ore ' + this.ore;
          var str = '<label for="idSubmit">'+ messaggio + ' </label>'  
          document.getElementById('idBottoni').innerHTML=str;
          this.passa=true;/*ponendo passa= true si abilita il metodo
          cambia nome che permette di correggere il nome se è scritto male*/
       } 
     } 
   }
 }
 pass=true;	
}


Calendario.prototype.correggiNome = function (elemento) {
  /* il metodo è attivo solo se passa è true e pass è true, 
  passa è true quando è abilitato il metodo  cambia nome che permette di 
        correggere il nome se è scritto male   
  pass è true dopo che ho selezionato l'ora di ripetizione*/
  if((this.passa==true)&&(pass==true)){            
    /*correggi il nome sopra il bottone conferma prenotazione */          
    var messaggio='ciao ' + document.getElementById('idNome').value 
       + ', hai prenotato un\'ora di ' + this.nomeMateria + '  '
       + this.giorno + '  ' + this.numGiorno + '  ' + this.mese1 
       + ' alle ore ' + this.ore;
    var str = '<label for="idSubmit">'+ messaggio + ' </label>'  
    document.getElementById('idBottoni').innerHTML=str;
  }
} 

Calendario.prototype.cancella = function () {
   this.tab[this.coord_i][this.coord_j]="verde";
   this.parola[this.coord_i][this.coord_j]=14-1+this.coord_i;
   c.visualizza();
   var messaggio='ciao ' + document.getElementById('idNome').value 
            + ' devi scegliere il giorno e l\'ora'; 
  var str = '<label for="idSubmit">'+ messaggio + ' </label>'  
  document.getElementById('idBottoni').innerHTML=str;
  pass=false;
   
}

/************************************************************************/
function innerDOM(element, HTML, clearfirst) {
           function Load(xmlString) {  // (1)
               var xml;
               if (typeof DOMParser != "undefined") xml = (new DOMParser()).parseFromString(xmlString, "application/xml");
               else {
                    var ieDOM = ["MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];
                    for (var i = 0; i < ieDOM.length && !xml; i++) {
                        try { xml = new ActiveXObject(ieDOM[i]); xml.loadXML(xmlString); }
                        catch(e) {}
                    }
               }
               return xml;
           }
                 
           function Copy(domNode, xmlDoc, level) {       // (2)     
               if (typeof level == "undefined") level = 1;
               if (level > 1) {
                   if (xmlDoc.nodeType == 1) {  // (3)
                       var thisNode = document.createElement(xmlDoc.nodeName);
                     for (var a = 0, attr = xmlDoc.attributes.length; a < attr; a++) {  // (4)
                         var aName = xmlDoc.attributes[a].name, aValue = xmlDoc.attributes[a].value, evt = (aName.substr(0,2) == "on");
                         if (!evt) {
                             switch (aName) {
                                 case "class": thisNode.className = aValue; break;
                                 case "for": thisNode.htmlFor = aValue; break;
                                 default: thisNode.setAttribute(aName, aValue);
                             }
                         }
                     }
                     domNode = domNode.appendChild(thisNode);  // (5)
                     if (evt) domNode[aName] = function() { eval(aValue); };  // (6)
                 }
                 else if (xmlDoc.nodeType == 3) {  // (7)
                     var text = (xmlDoc.nodeValue ? xmlDoc.nodeValue : "");
                     var test = text.replace(/^\s*|\s*$/g, "");
                     if (test.length < 7 || (test.indexOf("<!--") != 0 && test.indexOf("-->") != (test.length - 3))) domNode.appendChild(document.createTextNode(text));
                 }
             }
             for (var i = 0, j = xmlDoc.childNodes.length; i < j; i++) Copy(domNode, xmlDoc.childNodes[i], level+1);  // (8)
         }
       // (9)
         HTML = "<root>"+HTML+"</root>";
         var xmlDoc = Load(HTML);
         if (element && xmlDoc) {
             if (clearfirst != false) while (element.lastChild) element.removeChild(element.lastChild);
             Copy(element, xmlDoc.documentElement);
         }
     }
/*
Notes:
(1) load the HTML as XML
(2) recursively copy the XML into the DOM
(3) element node
(4) attributes
(5) append node
(6) attach event
(7) text node
(8) do child nodes
(9) load the XML and copies to DOM
*/