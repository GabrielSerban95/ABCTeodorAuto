$(document).ready(function () {
    //////////////////////
    /// Scroll fadeIn  ///
    /// and fadeOut    ///
    //////////////////////

    $(window).scroll(function () {
        // Ajustează înălțimea minimă a header-ului în funcție de poziția de scroll
        if ($(window).width() < 768) {
            $("header").css("max-height", ($(window).scrollTop() > 50) ? 150 : 200);

            // Definirea elementelor și a condițiilor specifice pentru fiecare
            var scrollSections = [
                { selector: ".page1", start: 0, end: 18 },
                { selector: ".page2", start: 18, end: 36 },
                { selector: ".page3", start: 36, end: 54 },
                { selector: ".page4", start: 54, end: Infinity } // Infinity pentru a acoperi cazul când scroll-ul depășește 54
            ];
        }
        else {
            $("header").css("min-height", ($(window).scrollTop() > 50) ? 150 : 300);
            var scrollSections = [
                { selector: ".page1", start: 0, end: 3 },
                { selector: ".page2", start: 3, end: 6 },
                { selector: ".page3", start: 6, end: 9 },
                { selector: ".page4", start: 9, end: Infinity } // Infinity pentru a acoperi cazul când scroll-ul depășește 9
            ];
        }

        var distanceFromTop = $(window).scrollTop();
        // Iterează prin fiecare secțiune și setează opacitatea corespunzător
        for (var i = 0; i < scrollSections.length; i++) {
            var section = scrollSections[i];
            var opacity = (distanceFromTop / 100 >= section.start && distanceFromTop / 100 <= section.end) ? 1 : 0;
            var translateX = (distanceFromTop / 100 >= section.start && distanceFromTop / 100 < section.end) ? 1 : 0;
            $(section.selector).css("opacity", opacity);

            // console.log((parseInt(distanceFromTop / 72) / 4) + "%");
            if (translateX == 1) {
                $(section.selector).css("transform", "translate(" + 0 + ")");
            }
            else {
                $(section.selector).css("transform", "translate(" + -100 + "%)");
            }
        }
    })



    //////////////////////
    ///  Social Media  ///
    //////////////////////
    $('#phone').mouseenter(function () {
        $(this).addClass('fa-bounce');
    });
    $('#phone').mouseleave(function () {
        $(this).removeClass('fa-bounce');
    });


    $('#facebook').mouseenter(function () {
        $(this).addClass('fa-bounce');
    });
    $('#facebook').mouseleave(function () {
        $(this).removeClass('fa-bounce');
    });

    $('#instagram').mouseenter(function () {
        $(this).addClass('fa-bounce');
    });
    $('#instagram').mouseleave(function () {
        $(this).removeClass('fa-bounce');
    });

})