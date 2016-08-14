/**
 * Created by provasks on 3/23/2016.
 */
 
 
$('.carousel').carousel({
    interval: 5000
})



$('#bar').scrollFix();
// When the document is ready
$(document).ready(function () {
    $('#wrapper').hide();
    $('#loading').hide();

    $('#txtDeparture').datepicker({
        format: "dd/mm/yyyy"
    });

    $('#txtReturning').datepicker({
        format: "dd/mm/yyyy"
    });

    var owl = $("#features-places");


    owl.owlCarousel({
        items: 4, //10 items above 1000px browser width
        autoPlay: false,
        navigation: true,
        pagination: false,
        paginationNumbers: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [1024, 3],
        itemsTablet: [768, 2],
        itemsMobile: [479, 1],

        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });

    var owl = $("#discover");
    owl.owlCarousel({
        items: 2, //10 items above 1000px browser width
        autoPlay: true,
        navigation: true,
        pagination: false,
        paginationNumbers: false,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [1024, 2],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],

        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]


    });

    var owl = $("#testimonials");


    owl.owlCarousel({
        items: 1, //10 items above 1000px browser width
        autoPlay: true,
        navigation: false,
        pagination: true,
        paginationNumbers: false,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [1024, 1],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1]


    });

    var owl = $("#clients");
    owl.owlCarousel({
        items: 5, //10 items above 1000px browser width
        autoPlay: false,
        navigation: true,
        pagination: false,
        paginationNumbers: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [1024, 4],
        itemsTablet: [768, 3],
        itemsMobile: [479, 2],

        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });
});
$(function () {
    $("#price").slider({
        range: true,
        min: 100,
        max: 1000,
        values: [0, 1000],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " -$ " + ui.values[1]);
        }
    });
});
$(".various").fancybox({
    maxWidth: 800,
    maxHeight: 600,
    fitToView: false,
    width: '70%',
    height: '50%',
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none'
});

$(".fancybox").fancybox({
    openEffect: 'none',
    closeEffect: 'none'
});



