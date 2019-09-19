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



// Video

var videoImg    = $("#preVideo");
var video       = $("#postVideo")
var videoIframe = $("#videoIframe");
var src         = $(videoIframe).attr('src');
var newSrc      = src += "?autoplay=1";

$("#preVideo").on('click', function() {
  $(this).addClass('d-none');
  $(video).removeClass("d-none");
  console.log(newSrc);
  $(videoIframe).attr('src', newSrc);
});

// Header

$(window).on("scroll", function() {
   var wn = $(window).scrollTop();
   if (wn > 120) {
    $(".navbar").addClass("active-nav");
   } else {
    $(".navbar").removeClass("active-nav");
   }
});

// Menu
/*var sections = $('section'), nav = $('.nav ');

nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');

  $('li').removeClass('active');
  $(this).parent('li').addClass('active');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top -65
  }, 1000);
  
  return false;
});

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top -65,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('li').removeClass('active');
      nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
    }
  });
});*/

// MENU MOBILE

if ($(window).width() < 992) {
    $('nav a').on('click', function () {
        $('.navbar-collapse').removeClass('show');
    });

    $('.navbar-toggler').on('click', function () {
        if ($('.navbar-collapse').hasClass('show') || $('.navbar-collapse').hasClass('collapsing')) {
            $('nav').removeClass('nav-open');
        } else {
            $('nav').addClass('nav-open');
        }
    });
}

// SWIPE CAROUSEL ON MOBILE
$("#review-slider").carousel({
  swipe: 30  
});


//Changes arrows in collapse (FAQ)

	$('.collapse').on('shown.bs.collapse', function(){
		$(this).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	});

//Form
	
	var mensaje = $("#mensaje").val();
	var nombre = $("#name").val();
	var mail = $("#mail").val();
	
	$('#enviarContacto').on('click', function(){
        $('#loading-contacto').fadeIn();
        $('#enviarContacto').attr("disabled", "disabled");
        var data= $('#formContacto').serializeArray();
        $('.mensaje-error').hide();
        $('.mensaje-success').hide();
        enviarContacto(data);
        $('#enviarContacto').prop("disabled", false);
    });
      
	function enviarContacto(data){
      //var route= 'http://api.wymaq.enclave.com.ar/consultas/crear';
      $('#error-contacto').fadeOut(300);
      var valid= 0;
      for(var i=0; i<data.length; i++){
        if(data[i].value==""){
          //validar email
          $('#loading-contacto').hide(300);
          $('.mensaje-error p').html('Every field is required.');
          $('.mensaje-error').fadeIn(300);
          valid=1;
          break;
        }

   
        if(data[i].name=='email'){
          var email = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
          if(email.test(data[i].value)==false){
            $('#loading-contacto').hide(300);
            $('.mensaje-error p').html('The Email field is not a valid email.');
            $('#error-contacto').fadeIn(300);
            $('.mensaje-error').fadeIn(300);
            valid=1;
            break;
          }
        }
		/*if(data[i].name == 'g-recaptcha-response'){
			if($('.recaptcha-checkbox').hasClass('recaptcha-checkbox-checked') == 'false'){
				$('.mensaje-error p').html('Please verify that the captcha is filled correctly.');
			}
		}*/
      }
      
        var resCaptcha = grecaptcha.getResponse();
        
        console.log(resCaptcha);
        if(resCaptcha.length == 0) {
            $('.mensaje-error p').html('Please verify that the captcha is filled correctly.');
        }
        
      if(valid===0){
        $.ajax({
          type: "POST",
          url: 'email.php',
          data: data,
          dataType: 'json',
          success: function(response) {
          	if(response.success){
                        grecaptcha.reset();
          		$('#loading-contacto').hide(100);
          		$('.mensaje-success').fadeIn(300);
          		$("#message").val('');
          		$("#nombre").val('');
          		$("#email").val('');
          	} else {
          		$('#loading-contacto').hide(100);
          		grecaptcha.reset();
          		$('.mensaje-error').html(response.message);
	          	$('.mensaje-error').fadeIn(300);
          	}
        	}
        })
        
      }
    }	
});