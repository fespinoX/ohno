$(document).ready(function() {


// BTT

$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

$(window).on("scroll", function() {
   var wn = $(window).scrollTop();
   if (wn > 120) {
    $('#btt').fadeIn();
   } else {
    $('#btt').fadeOut('fast');
   }
});


// CAROUSEL


 
    $("#owl-portfolio").owlCarousel({
   
        nav : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 1, 
        loop: true,
        itemsDesktop : false,
        itemsDesktopSmall : false,
        itemsTablet: false,
        itemsMobile : false
   
    });
 



});