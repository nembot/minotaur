// ==UserScript==
// @name         Minotaur to .ics
// @namespace    https://github.com/nembot/minotaur
// @version      0.1
// @description  Permet d'exporter les dates en format .ics
// @author       Nembot
// @match        https://minotaur.sso.gendarmerie.interieur.gouv.fr/reserviste/convocations/recap
// @require      https://raw.githubusercontent.com/nembot/minotaur/master/ics.deps.min.js
// ==/UserScript==

(function() {
    var nbJours = document.getElementById('nbJours');
    var button = document.createElement("button");
    var cal = ics();
    var dataFor, subject, description, dateStart, dateEnd, location;

    button.innerHTML = "Export to .ics";
    nbJours.appendChild(button);

    button.style.position = "absolute";
    button.style.left = "37%";
    button.style.padding = "10px";
    button.setAttribute("id","calendar");

    nbJours.parentNode.insertBefore(button, nbJours);

    document.getElementById("calendar").addEventListener("click", function(){
        var tRow = document.getElementById('miniCal').getElementsByTagName("tr");
        for(var i = 0; i < tRow.length; i++){
            if(tRow[i].id == "credInfos"){
                dataFor = tRow[i].dataset.for;
                dateStart = dataFor.split("+")[1];
                dateEnd = dataFor.split("+")[2];
                subject = tRow[i].cells[3].getElementsByTagName("span")[0].innerHTML;
                description = tRow[i].cells[3].title;
                location = tRow[i].cells[4].getElementsByTagName("span")[0].innerHTML;
                cal.addEvent(subject, description, location,  dateStart, dateEnd);
            }
        }
        cal.download('missions');
    });
})();
