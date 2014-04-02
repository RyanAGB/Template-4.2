//Javascripts
$(document).ready(function(){ 
	$.favicon('favicon.ico');
	
	menu.contactDetails({
		
		phone: null, //optional, can have multiple values[array] 
		mobile: null, //optional, can have multiple values[array]
		email: null, //optional, can have multiple values[array] 
		address: null, //optional, single value
		hours: null //optional
		
	});

    //Content insert
    $('#view_section_1').insertAfter('#slider');

    //Error insert
    $('#error').insertAfter('#slider');

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

    //Validation
    $('#custom_form').formValidation({ 
		validateText: ["name"],
		validateEmail: ["email"],
		validateSpam: true
	}); 
     
});  // end declaration

$(window).load(function(){

    //Footer Map scrollwheel:false
    //Main Map
    
});
