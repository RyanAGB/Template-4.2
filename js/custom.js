//Javascripts

//Navigation
// $('.navbar .nav').addClass('nav-justified');

//Content insert
$('#view_section_1').appendTo('#main-content');

//Error insert
$('#error').appendTo('#main-content');

//Footer Map
//Main Map

$(document).ready(function(){ 
	$.favicon('favicon','favicon');
	
	menu.contactDetails({
		
		phone: '', //optional, can have multiple values[array] 
		mobile: null, //optional, can have multiple values[array]
		email: '', //optional, can have multiple values[array] 
		address: '', //optional, single value
		hours: [
            ['','']
        ] //optional
		
	});

	//Slider
    jQuery('.camera_wrap').camera({
        random: true,
        playPause: false,
        pagination: false,
        loader: 'none',
        navigation: false,
        portrait: true,
        height: '26.07692307692308%'
    });

    //Gallery
    // if(Modernizr.touch && $(".fancybox").length > 0 )
    // { 
    //    var myPhotoSwipe = $(".fancybox").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
    // }
    // else
    // {
    //     $("a.fancybox[rel='gallery_group']").fancybox({
    //         'transitionIn'    :    'elastic',
    //         'transitionOut'    :    'elastic',
    //         'speedIn'        :    600, 
    //         'speedOut'        :    200 
    //     });
    // }

    //FAQ
    // $('.faq-list').goFaq ();

    //Validation
    $('#custom_form').smartCaptcha({ 
        validateText: ["name", "message", "phone"],
        validateEmail: ["email"],
        redirectLink: "http://api.jquery.com/jquery.fn.extend/",
        validateStyle: "default"
    }); 

    if ($('body#home').is('*')) {
        
    }
     
});  // end declaration

$(window).load(function(){

    //Main Map
    mapcanvas();
});
