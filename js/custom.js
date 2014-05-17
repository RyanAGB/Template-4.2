//Javascripts
$(document).ready(function(){ 
	$.favicon('favicon.ico','favicon.ico');
	
	menu.contactDetails({
		
		phone: '', //optional, can have multiple values[array] 
		mobile: null, //optional, can have multiple values[array]
		email: '', //optional, can have multiple values[array] 
		address: '', //optional, single value
		hours: [
            ['','']
        ] //optional
		
	});

    //Content insert
    $('#view_section_1').appendTo('#main-content');

    //Error insert
    $('#error').appendTo('#main-content');

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
    if(Modernizr.touch && $(".fancybox").length > 0 )
    // { 
    //    var myPhotoSwipe = $(".fancybox").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
    // }
    // else
    // {
    //     /* Apply to single image */
    //     $("a.fancybox").fancybox();

    //     /* Apply fancybox to multiple items */
    //     $("a.fancybox[rel='gallery_group']").fancybox({
    //         'transitionIn'    :    'elastic',
    //         'transitionOut'    :    'elastic',
    //         'speedIn'        :    600, 
    //         'speedOut'        :    200 
    //     });
    // }

    //FAQ
    // $('.faq-list').goFaq ();

    //Footer Map
    //Main Map

    //Validation
    $('#custom_form').formValidation({ 
		validateText: ["name"],
		validateEmail: ["email"],
		validateSpam: true
	}); 

    if ($('body#home').is('*')) {
        
    }
     
});  // end declaration

$(window).load(function(){
    
});
