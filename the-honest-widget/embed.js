// embed.js - The Honest Widget
// Dieses Skript fügt ein Bewertungs-Badge von The Honest Experience in Seiten ein.
// Voraussetzung: Im HTML muss ein Element mit dem Attribut data-widget-id vorhanden sein,
// welches die Widget-UUID enthält. 
// Einbindung: <script src="https://thehonestexperience.com/embed.js" defer></script>
// Das Skript lädt automatisch die benötigten Daten und Styles und zeigt das Widget an.

(function() {
    "use strict";
    
    // Alle Widget-Container auf der Seite suchen (Elemente mit data-widget-id)
    var widgetElements = document.querySelectorAll("[data-widget-id]");
    if (!widgetElements.length) return; // Abbrechen, falls kein Widget-Element vorhanden
    
    // CSS für das Widget dynamisch laden
    var currentScript = document.currentScript || (function() {
        // Fallback, falls document.currentScript nicht unterstützt wird
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
    })();
    // Basis-URL des aktuellen Skripts ermitteln, um darauf basierend die CSS-Datei zu laden
    var scriptSrc = currentScript.src || "";
    var scriptBase = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = scriptBase + "the-honest-badge.css";  // Pfad zur externen CSS-Datei
    // CSS-Link in den Dokument-Head einfügen, damit Styles angewendet werden
    document.head.appendChild(cssLink);
    
    // Hilfsfunktion: Rendert das Widget-HTML in ein gegebenes Element
    function renderWidget(element, data) {
        // Erwartet Daten mit Feldern "score" (Zahl) und "total_reviews" (Anzahl)
        var score = data.score;
        var totalReviews = data.total_reviews;
        if (typeof score !== "number" || typeof totalReviews !== "number") {
            return; // Daten ungültig – breche ab, Widget bleibt unsichtbar
        }
        // Score auf eine Nachkommastelle formatieren (z.B. 4.7 statt 4.666)
        var scoreOneDecimal = Math.round(score * 10) / 10;
        // Falls ganze Zahl, ohne Nachkommastelle anzeigen, sonst mit einer Stelle
        var scoreText = (scoreOneDecimal % 1 === 0) ? scoreOneDecimal.toFixed(0) : scoreOneDecimal.toFixed(1);
        // HTML für das Badge zusammenstellen (mit entsprechenden CSS-Klassen)
        element.innerHTML = 
            '<div class="the-honest-badge">' +
                '<span class="the-honest-score">' + scoreText + '</span>' +
                '<span class="the-honest-max">/5</span>' +
                '<span class="the-honest-reviews">(' + totalReviews + ' Bewertungen)</span>' +
            '</div>';
        // Hinweis: Die CSS-Klassen werden in der geladenen CSS-Datei gestaltet.
    }
    
    // Hilfsfunktion: Holt die Daten vom API-Endpoint und rendert das Widget
    function loadWidget(element) {
        var widgetId = element.getAttribute("data-widget-id");
        if (!widgetId) return;
        var apiUrl = "https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=" + encodeURIComponent(widgetId);
        
        // Erfolgs-Callback für beide Methoden (Fetch oder XHR)
        function handleDataResponse(json) {
            if (!json || json.status !== "success" || !json.response) return; // ungültige Antwort
            renderWidget(element, json.response);
        }
        // Fehler-Callback: Bei Fehler nichts tun (Widget bleibt leer/unsichtbar)
        function handleDataError() {
            // Fehler werden stillschweigend ignoriert, um das Einbinden der Seite nicht zu stören.
            // Optional könnte man element.style.display = "none"; setzen, um den Platzhalter zu entfernen.
        }
        
        // Datendownload via Fetch API (moderne Browser)
        if (window.fetch) {
            fetch(apiUrl)
                .then(function(response) {
                    if (!response.ok) throw new Error("Netzwerk-Antwort war nicht OK");
                    return response.json();
                })
                .then(handleDataResponse)
                .catch(handleDataError);
        } else {
            // Fallback: XMLHttpRequest für ältere Browser ohne fetch
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {  // Anfrage abgeschlossen
                    if (xhr.status === 200) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            handleDataResponse(data);
                        } catch (e) {
                            handleDataError();
                        }
                    } else {
                        handleDataError();
                    }
                }
            };
            xhr.open("GET", apiUrl, true);
            xhr.send();
        }
    }
    
    // Hauptfunktion: lädt Widgets für alle gefundenen Elemente
    function initWidgets() {
        for (var i = 0; i < widgetElements.length; i++) {
            loadWidget(widgetElements[i]);
        }
    }
    
    // Falls das Skript vor dem DOM-Ende ausgeführt wird, sicherstellen, dass DOM geladen ist.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWidgets);
    } else {
        // Wenn DOM bereits bereit (bei Nutzung von defer/Script am Ende), direkt ausführen
        initWidgets();
    }
})();
