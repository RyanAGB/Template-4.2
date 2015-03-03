(function() {
	var navList = [
		'Home',
		'About Us',
		'More',
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
			navLink = navItem.replace(/\s/g, '-').toLowerCase().replace('-&-', '-').replace(',', '').replace('-/-', '-').replace('/', '').replace('\'', '');

		if (navLink == current) {
			$('.navbar .nav').append('<li class="active"><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>\n\r'
			);
		} else {
			$('.navbar .nav').append('<li><a href="'+
				navLink+
				'.html">'+
				navItem+
				'</a></li>\n\r'
			);
		}
	}

	$('body').attr('id', current);

	//Add .html
	$(document).ready(function() {
		$('a').each(function() {
			var content = $(this).attr('href');
			if (content.indexOf('.') < 0 && content.indexOf('mailto') < 0 && content.indexOf('tel://') < 0 ) {
				if (content.indexOf('#') < 0) {
					var addLink = content + '.html';
					$(this).attr('href', addLink);
				} else {
					if (content.indexOf('#') > 0) {
						var setValue = content.indexOf('#'),
							length = content.length,
							startStr = content.substring(0, setValue),
							endStr = content.substring(setValue,  length),
							newHrf = startStr.concat('.html', endStr);
							$(this).attr('href', newHrf);
					};
				}
			}
		});
	});

})();