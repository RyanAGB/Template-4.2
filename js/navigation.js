(function() {
	var navList = [
		'Home',
		'About Us',
		'Contact Us'
		], //Add Pages here
		current_path = window.location.pathname.split('/').pop(),
		fileName = current_path.slice(0, -5);

	$('.navbar-placeholder').append('<div class="navbar">'+
        '<div class="collapse navbar-collapse">'+
        '<ul class="nav navbar-nav">'+
        '</ul>'+
        '</div>'+
        '</div>'
	);

	for (i=0; i<navList.length; i++) {

		var navItem = navList[i],
			navLink = navItem.replace(/\s/g, '-').toLowerCase();

		if (navLink == fileName) {
			$('.nav').append('<li class="active"><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>'
			);
		} else {
			$('.nav').append('<li><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>'
			);
		}
	}

	$('body').attr('id', fileName);

})();