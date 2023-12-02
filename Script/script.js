$(document).ready(function() {
   
    







                //////////////////////
                /// Scroll fadeIn  ///
                /// and fadeOut at ///
                ///     100px      ///
                //////////////////////

                var lastVisiblePage = 0; // Adaugă această variabilă globală
var isScrollingUp = false; // Adaugă o variabilă care să țină evidența direcției de scroll

var timer;

$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(window).height();

    // Definește marginile pentru fiecare page (25% în sus și 25% în jos)
    var marginPercentage = 0.25;
    var pageLimits = [];

    // Calculează limitele pentru fiecare page
    for (var i = 0; i <= 5; i++) {
        var topLimit = i * (windowHeight * (1 - marginPercentage));
        var bottomLimit = (i + 1) * (windowHeight * (1 - marginPercentage));

        pageLimits.push({ top: topLimit, bottom: bottomLimit });
    }

    // Anulează timer-ul anterior pentru a evita executarea acțiunii multiple ori de câte ori utilizatorul face scroll
    clearTimeout(timer);

    // Setează un nou timer pentru a evalua pagina corespunzătoare după 100ms de la ultimul eveniment de scroll
    timer = setTimeout(function() {
        // Iterează prin limitele paginilor
        for (var i = 0; i <= 5; i++) {
            var currentPageLimit = pageLimits[i];
            var nextPageLimit = pageLimits[i + 1];

            // Află dacă scrollTop este între limitele curente ale paginii
            if (scrollTop >= currentPageLimit.top && scrollTop < nextPageLimit.top) {
                // Verifică dacă pagina curentă este diferită de ultima pagină vizibilă
                if (i + 1 !== lastVisiblePage) {
                    // Ascunde toate slide-urile
                    $('.slide').addClass('hidden');

                    // Afișează slide-urile pentru pagina curentă
                    $('.page' + (i + 1) + ' .slide').removeClass('hidden');

                    // Actualizează ultima pagină vizibilă
                    lastVisiblePage = i + 1;
                }

                // Verifică direcția de scroll
                if (isScrollingUp) {
                    // Dacă se face scroll în sus, actualizează ultima pagină vizibilă
                    lastVisiblePage = i + 1;
                }

                // Ieși din buclă după găsirea paginii corespunzătoare
                break;
            }
        }
    }, 100);
});

// Adaugă un event listener pentru a detecta direcția de scroll
var lastScrollTop = 0;

$(window).on('scroll', function() {
    var currentScrollTop = $(this).scrollTop();
    isScrollingUp = currentScrollTop < lastScrollTop;
    lastScrollTop = currentScrollTop;
});


              
              
              
              






                //////////////////////
                ///  Social Media  ///
                //////////////////////
    $('#phone').mouseenter(function() {
        $(this).addClass('fa-bounce');
    });
    $('#phone').mouseleave(function() {
        $(this).removeClass('fa-bounce');
    });
    
    
    $('#facebook').mouseenter(function() {
        $(this).addClass('fa-bounce');
    });
    $('#facebook').mouseleave(function() {
        $(this).removeClass('fa-bounce');
    });

    $('#instagram').mouseenter(function() {
        $(this).addClass('fa-bounce');
    });
    $('#instagram').mouseleave(function() {
        $(this).removeClass('fa-bounce');
    });







})