$(document).ready(function() {
    var loadingScreen = $("#loading-screen");
  
    // Simulează încărcarea de 2 secunde
    setTimeout(function() {
      // Adaugă clasa "loaded" pentru a declanșa tranzitia
      loadingScreen.addClass("loaded");
  
      // Așteaptă 1 secundă după finalizarea tranzitiei și apoi ascunde ecranul de încărcare
      setTimeout(function() {
        loadingScreen.fadeOut(800);
      }, 500);
  
    }, 1000);
  });
  