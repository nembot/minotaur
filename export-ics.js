// ==UserScript==
// @name         Minotaur to Google Calendar
// @namespace    https://github.com/nembot/minotaur
// @version      0.1
// @description  Permet d'exporter les dates de convocations en format Google Calendar
// @author       Nembot
// @include      https://minotaur.sso.gendarmerie.interieur.gouv.fr/*
// @require      https://raw.githubusercontent.com/nwcell/ics.js/master/ics.deps.min.js
// ==/UserScript==

(function() {
    var tabTitle = document.getElementById('nbJours');
    var button = document.createElement("button");
    var dataFor;
    var cal = ics();
    var dateStart, dateEnd;
    button.innerHTML = "Generate";
    tabTitle.appendChild(button);
    button.setAttribute("id","calendar");

    document.getElementById("calendar").addEventListener("click", function(){
        var tRow = document.getElementById('miniCal').getElementsByTagName("tr");
        for(var i = 0; i < tRow.length; i++){
            if(tRow[i].id == "credInfos"){
                dataFor = tRow[i].dataset.for;
                dateStart = dataFor.split("+")[1];
                dateEnd = dataFor.split("+")[2];
                cal.addEvent('Mission', '', 'Lonjumeau',  dateStart, dateEnd);
                //date = tRow[i].children[2];
            }
        }
        cal.download('mission');
    });
})();
