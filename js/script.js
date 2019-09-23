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


// OWL CAROUSEL

    $("#owl-portfolio").owlCarousel({
   
        nav : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 1, 
        loop: false,
        rewind: true,
        itemsDesktop : false,
        itemsDesktopSmall : false,
        itemsTablet: false,
        itemsMobile : false,
        lazyLoad: true
   
    });
 

 // Thank you message

  var thisPath = window.location.pathname;
  var thanks = document.getElementById("thanks");

  if (thisPath == "/index.html") {
  
    thanks.classList.remove("d-none");
  
  }

  setTimeout(function(){ 

    thanks.classList.add("d-none");

  }, 30000);


});



