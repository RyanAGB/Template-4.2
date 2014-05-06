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

    //Footer Map
    //Main Map

    //Validation
    $('#custom_form').formValidation({ 
		validateText: ["name"],
		validateEmail: ["email"],
		validateSpam: true
	}); 

    if ($('body#').is('*')) {
        
    }
     
});  // end declaration

$(window).load(function(){
    
});
