;(function($){
    'use strict';
    
    // counter up
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });

    // preoader
    $(window).on('load', function() { // makes sure the whole site is loaded 
        $('#status').fadeOut(); // will first fade out the loading animation 
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
        $('body').delay(350).css({'overflow':'visible'});
    })

    $('.navbar-custom').click(function(){
    	$('.navbar-custom').toggleClass('bkg-black');
    });

    function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    

    /* Team slider - mobile */

    if ($('.team-slider').length > 0) {      
        teamSlider();
        
        $(window).resize(function(e){
          teamSlider();
        });              
    }

    function teamSlider() {
      $('.team-slider').each(function() {
        if(window.innerWidth < 577) {
            if(!$('.team-slider').hasClass('slick-initialized')){
                mobileOnlySlider();
            }
        } else {
            if($('.team-slider').hasClass('slick-initialized')){
                $('.team-slider').slick('unslick');
            }
        }
      });
    }

    function mobileOnlySlider() {
      $('.team-slider').slick();
    }

})(jQuery); 

(function () {
       $(document).on("scroll", onScroll);
 
        $('.menu li a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
 
            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
 
            var target = this.hash;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top+2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
 
    function onScroll(event){
        var scrollPosition = $(document).scrollTop();
        $('.menu li a[href^="#"]').each(function () {
            var currentLink = $(this);
            var refElement = $(currentLink.attr("href"));
            if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
               	$('.menu li a').removeClass("active");
               	currentLink.addClass("active");
            } else {
               	currentLink.removeClass("active");
            }
        });
    }
}());

$(document).ready(function(){
	$('.panel-title a').click(function(){
		var idHeading = $(this).parents('.panel-heading').attr('id');
		idHeading = '#' + idHeading;
		console.log(idHeading);
		$('.panel-heading i').removeClass('fa-minus').addClass('fa-plus');
		if(!$(idHeading).hasClass('activeCollapse')){
			$('.panel-heading').removeClass('activeCollapse');
			$(idHeading).addClass('activeCollapse');
			//$('.activeCollapse i').removeClass('fa-plus').addClass('fa-minus');
			$(idHeading).children('i').addClass('fa-minus').removeClass('fa-plus');
		} else {
			$('.panel-heading').removeClass('activeCollapse');
			//$(idHeading).children('.panel-title').children('i').addClass('fa-plus').removeClass('fa-minus');
			$(idHeading).children('i').addClass('fa-plus').removeClass('fa-minus');
		}
	});

	$('#trial_button').click(function(){
		window.open('https://admin.agreemarket.com/#!/registration', '_blank');
	});

  $('#login_button').click(function(){
      window.open('https://admin.agreemarket.com/', '_blank');
  });
  
	if($(window).width() < 1024){
		$('#playVideo').click(function(){
			window.open('https://youtu.be/xidHxJkk5IY', '_blank');
		});
	}
  
	/*$('#videoAgree').attr('src', 'https://www.youtube.com/embed/xidHxJkk5IY');*/
	$('.close').click(function(){
		$('#videoAgree').attr('src', '');
		$('#videoAgree').attr('src', 'https://www.youtube.com/embed/xidHxJkk5IY');
	});
	
	var mensaje = $("#mensaje").val();
	var nombre = $("#name").val();
	var mail = $("#mail").val();
	
	/*if(nombre != "" && mensaje != "" && mail != ""){
		var data = {
    		name: nombre,
    		email: mail,
    		message: mensaje
		};
	}*/
	
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