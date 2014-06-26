(function() {
	var navList = [
		'Home',
		'About Us',
		'Services',
		'Storm & Emergency',
		'Testimonials',
		'Contact'
		], //Add Pages here
		current_path = window.location.pathname.split('/').pop(),
		current = current_path.slice(0, -5);

	$('.navbar-placeholder').append('<div class="navbar">'+
        '<div class="collapse navbar-collapse">'+
        '<ul class="nav navbar-nav">'+
        '</ul>'+
        '</div>'+
        '</div>'
	);

	for (i=0; i<navList.length; i++) {

		var navItem = navList[i],
			navLink = navItem.replace(/\s/g, '-').toLowerCase().replace('-&-', '-');

		if (navLink == current) {
			$('header .nav').append('<li class="active"><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>'
			);
		} else {
			$('header .nav').append('<li><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>'
			);
		}
	}

	$('body').attr('id', current);

})();