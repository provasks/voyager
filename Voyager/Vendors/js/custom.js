jQuery(document).ready(function ($) {
    jQuery('ul.sf-menu').superfish();

    /* prepend menu icon */
    jQuery('#nav-wrap').prepend('<div id="menu-icon"></div>');
    //alert ('test');
    /* toggle nav */
    $("#menu-icon").on("click", function () {
        jQuery(".sf-menu").slideToggle();
        jQuery(this).toggleClass("active");
    });
});
		


			