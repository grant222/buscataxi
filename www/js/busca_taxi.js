$(document).ready(function () {

    (function ($) {
        "use strict"; // Start of use strict

        // Smooth scrolling using jQuery easing
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 48)
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });

        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').click(function () {
            $('.navbar-collapse').collapse('hide');
        });

        // Activate scrollspy to add active class to navbar items on scroll
        $('body').scrollspy({
            target: '#mainNav',
            offset: 54
        });

        // Collapse Navbar
        var navbarCollapse = function () {
            if ($("#mainNav").offset().top > 100) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        };
        // Collapse now if page is not at top
        navbarCollapse();
        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);

        $(".login-bg, #busca, #map, #table_result , .masthead").height($(window).height());

        $("body").delegate("#comparar", "click", function () {
            $('html, body').animate({
                scrollTop: ($('#table_result').first().offset().top)
            }, 500);
        });




        $("body").delegate("#uber", "click", function () {

            // Uber API Constants
            // Security note: these are visible to whomever views the source code!
            var uberClientId = "itlWaKFlgfyB8PEtYSQG4fSIareEaBoi",
                uberServerToken = "S5sBRjGNDVOq4MQt6KYET5XGcTvUT39AZtMkl37s";

            // Create variables to store latitude and longitude
            var userLatitude, userLongitude, partyLatitude = 40.7283405,
                partyLongitude = -73.994567;

            // Create variable to store timer
            var timer;


            // Redirect to Uber API via deep-linking to the mobile web-app
            var uberURL = "https://m.uber.com/sign-up?";

            // Add parameters
            uberURL += "client_id=" + uberClientId;
            if (typeof userLatitude != typeof undefined) uberURL += "&" + "pickup_latitude=" + userLatitude;
            if (typeof userLongitude != typeof undefined) uberURL += "&" + "pickup_longitude=" + userLongitude;
            uberURL += "&" + "dropoff_latitude=" + partyLatitude;
            uberURL += "&" + "dropoff_longitude=" + partyLongitude;
            uberURL += "&" + "dropoff_nickname=" + "Thinkful";


            window.location.href = uberURL;
        });





    })(jQuery); // End of use strict





});
