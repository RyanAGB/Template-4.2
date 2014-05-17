(function (window, $) {

  var Plugin = function (elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		$body = $('body');
		$html = $('html');
		$navbar = $('.navbar');
		$nav = $('.navbar-nav');
		$clone = $nav.clone();
		socialmedia = ".socialmedia";
		sitename = function () {		
						  var title = document.getElementsByTagName("title")[0].innerHTML;	
						  if(title.indexOf('-') === -1) {
							  var indexOfDash = title;
							  siteName = title;
						  }
						  else {
							  var indexOfDash = title.indexOf(' - ');
							  siteName = title.substring(0, indexOfDash);	
						  }
						  return siteName
				  }		
		_ldbranding = $('<li data-menu="menu-branding"><a href="http://www.localdirectories.com.au/" target="_blank"></a></li>');
		$exclusions = ['span', 'div', 'img', 'section', 'article', 'i', 'b', 'u', 'p'];
  };

  Plugin.prototype = {
    defaults: {
	  customwidth: 270,
	  duration: 400
    },
    init: function () {
      this.config = $.extend({}, this.defaults, this.options, this.metadata);	
	  var enablePopup = this.browserDetect(1); 
		  if (enablePopup) {
			this.browserPopup();
		  } else {
			this.dom();
			this.menuFunctions();
		  }		   
      return this;
    }, 
	dom: function () {
		var _content = $('<div id="jmm-content" ></div>'),
			_fixed = $('<div class="jmm-fixed-menu"><div><span id="site-name"><p></p></span></div></div>'),
			_menus = $('<div class="jmm-menu" id="jmm-left" ></div><div class="jmm-menu" id="jmm-right" ></div>'), 
			$sm = ['facebook', 'twitter', 'tumblr', 'youtube', 'googlep'],
			_rightcontent = '',
			$icon = '',
			$href = '',
			s = $('.socialmedia').length > 0,
			t = !1,
			d = 1,
			num = 0,
			sm_count = 0,
			$dom = {
				_all: function () {
					$navbar.prependTo('.navbar-placeholder');		
					_content.prependTo($body);
					$.each($body.children(), function (i, elem) { 
						if ($(this).get(0).tagName != 'SCRIPT' && $(this).get(0).tagName != 'STYLE' && $(this).attr('id') != 'jmm-content' )
							$(this).appendTo('#jmm-content'); 
					});	
					$body.prepend(_menus); 
					$('#jmm-content').prepend(_fixed); 						
					var styles = ["background", "background-color", "background-image", "background-repeat", "background-attachment", "background-size", "background-clip", "background-attachment", "background-origin"];	 
					for (var i = 0, len = styles.length; i < len; i++) {
						_content.css(styles[i], $body.css(styles[i])); 
					}	 
					$('.jmm-fixed-menu #site-name p').html(sitename);
				},
				_left: function () { 
					$('<i class="icon-menu left-trigger"></i>').prependTo('.jmm-fixed-menu');			
					jQuery.fn.removeAttributes = function () { 	
					  return this.each(function () {
						var attributes = $.map(this.attributes, function (item) {
						  return item.name;
						});
						var elem = $(this);
						if (elem.hasClass('dropdown')) {
							elem.attr("data-menu", "dropdown"+d);
							d++;
						}
						elem.filter(function () {
							return $.trim($(this).text()) === '';
						}).remove();
						$.each(attributes, function (i, item) {
							if (item != "href" && item != "target" && item != "data-menu")
								elem.removeAttr(item); 
							if (elem.children().length > 0) { 
								var $this = elem.children();
								$this.removeAttributes();
							}
						});
					  });
					}  	
					for (var i in $exclusions) { 	
						if ($exclusions[i] == 'img')
						  $clone.find($exclusions[i]).remove();
						else
						  $clone.find($exclusions[i]).contents().unwrap(); 
					}
					$clone.removeAttributes();
					$clone.find(".fa-caret-right").remove(); 
					$clone.find("li[data-menu*='dropdown']").each(function () {
						$(this).children('a').prepend('<span data-trigger="'+$(this).attr('data-menu')+'"><i class="icon-right"></i></span>'); 
					}); 
					$clone.append(_ldbranding);
					$clone.prependTo('#jmm-left');				
				},
				_right: function () { 
					$('<i class="icon-dots right-trigger"></i>').appendTo('.jmm-fixed-menu');	 
					_rightcontent += '<ul>';  
					for (var i in $sm ) {
							if ($body.find(".socialmedia .social-media."+$sm[i]).length > 0) {
								sm_count++;	 		
							}
						}
					if (s && sm_count > 0) {
						_rightcontent += '<li data-menu="dropdown" class="jmm-sm"><a href="javascript:void(0)"><i class="icon-social icon"></i> Social Media <span data-trigger="dropdown"><i class="icon-right" ></i></span></a><ul>';
						function smData(name) { //Social Media
							switch (name) {
								case 'facebook': $socialmedia = 'Facebook'; break;
								case 'twitter': $socialmedia = 'Twitter'; break;	
								case 'tumblr': $socialmedia = 'Tumblr'; break;	
								case 'youtube': $socialmedia = 'Youtube'; break;	
								case 'googlep': $socialmedia = 'Google Plus'; break;	
							}						 
							return '<li><a href="'+$href+'" target="_blank"> '+$socialmedia+'</a></li>';
						} 
						
						for (var i in $sm ) {
							if ($body.find(".social-media."+$sm[i]).length > 0) {
								var $href = $(".social-media."+$sm[i]).attr('href'),
									$smlink = smData($sm[i]);
								_rightcontent += $smlink;	 		
							}
						}
						
						_rightcontent += '</li></ul>';	
					}	
					if ($(".socialmedia .social-media.ld").length > 0) {
						_rightcontent += '<li><a href="'+$(".socialmedia .social-media.ld").attr('href')+'" target="_blank"><i class="icon-ld icon"></i> Profile</a></li>';
					}
					_rightcontent += '</ul>';
					$(_rightcontent).prependTo('#jmm-right'); 					
					if ($('#jmm-right > ul').children().length == 0)  { $('.right-trigger').hide() } 
					else { $('.right-trigger').show() }
				}
			}
		$dom._all(); 	
		$dom._left(); 
		$dom._right();
    },
	reset: function() {
		var d = 1;	
		$clone = $('.navbar-nav').clone();
		jQuery.fn.removeAttributes = function () { 	
		  return this.each(function () {
			var attributes = $.map(this.attributes, function (item) {
			  return item.name;
			});
			var elem = $(this);
			if (elem.hasClass('dropdown')) {
				elem.attr("data-menu", "dropdown"+d);
				d++;
			}
			elem.filter(function () {
				return $.trim($(this).text()) === '';
			}).remove();
			$.each(attributes, function (i, item) {
				if (item != "href" && item != "target" && item != "data-menu")
					elem.removeAttr(item); 
				if (elem.children().length > 0) { 
					var $this = elem.children();
					$this.removeAttributes();
				}
			});
		  });
		}  	
		for (var i in $exclusions) { 	
			if ($exclusions[i] == 'img')
			  $clone.find($exclusions[i]).remove();
			else
			  $clone.find($exclusions[i]).contents().unwrap(); 
		}
		$clone.removeAttributes();
		$clone.find(".fa-caret-right").remove(); 
		$clone.find("li[data-menu*='dropdown']").each(function () {
			$(this).children('a').prepend('<span data-trigger="'+$(this).attr('data-menu')+'"><i class="icon-right"></i></span>'); 
		}); 
		$clone.append(_ldbranding);
		$('#jmm-left > ul').html($clone.html()); 
	},
    menuFunctions: function () {
	  var $this = $.extend({}, this.defaults, this.options, this.metadata),
	  	$content = $('#jmm-content'),
	  	$menu = $('.jmm-menu'),
	  	$left = $('#jmm-left'),
	  	$leftul = $('#jmm-left > ul'),
	  	$leftScroll = document.getElementById('jmm-left'),
	  	$left_trigger = $('.left-trigger'),
	  	$right = $('#jmm-right'),
	  	$rightul = $('#jmm-right > ul'),
	  	$rightScroll = document.getElementById('jmm-right'),
	  	$right_trigger = $('.right-trigger'),
	  	$fixed = $('.jmm-fixed-menu'),
		sitename = document.querySelector('#site-name'),
		sitename_p = $('#site-name p'),
	  	$dropdown = $('.jmm-menu li[data-menu*="dropdown"] > a span[data-trigger*="dropdown"]'),
		b = $('#jmm-content > .backstretch').length > 0,
		$b = $('#jmm-content > .backstretch'),
		clear,
		locked = false,
		scrolltop = 0,
		closemenus = false,
		mobile = this.detectOS('any'),
		ipad = this.detectOS('ipad'),
		windoworientationChange = function () {
			if (!mobile || mobile && screen.width > 500) 
				closemenus = true;
			if (closemenus)
				closeMenus();						
			clearTimeout(clear);
			clear = window.setTimeout(function () { titlewrap();  }, 80);	
			window.scrollTo(0, $body.scrollTop());			
		},
		titlewrap = function () { 
				if( (sitename.offsetHeight < sitename.scrollHeight) ) {
				  sitename_p.addClass('overflow-text');
				}
				else if( (sitename.offsetHeight >= sitename.scrollHeight) ) {
				  sitename_p.removeClass('overflow-text');	
				}
		},
		l = {
			openLeft: function () {
				l.beforeOpenLeft(); 
					$body.data( "left", { menu: true} );
					$content.css('left', $this.customwidth);
					$fixed.css('left', $this.customwidth); 
					$leftul.css('left', 0); 
				l.afterOpenLeft();  
			},
			closeLeft: function () {
				l.beforeCloseLeft();
					$body.data( "left", { menu: false} );
					$content.css('left', 0);
					$fixed.css('left', 0); 
					$leftul.css('left', -$this.customwidth); 
				clearTimeout(clear);
				clear = setTimeout(function () {l.afterCloseLeft() }, $this.duration);
			},
			beforeOpenLeft: function () {  	 //BEFORE OPEN	
				$left.show();		
				$html.addClass('overflow-none');
				$leftScroll.scrollTop = 0;
			},
			afterOpenLeft: function () { 	//AFTER OPEN
				l.touchStop(); 	
				fscroll();
			},
			beforeCloseLeft: function () {		//BEFORE CLOSE
			},
			afterCloseLeft: function () {	//AFTER CLOSE	
				$html.removeClass('overflow-none');
				l.touchGo(); 	
				clearTimeout(clear);
				clear = window.setTimeout(function () { $left.hide(); }, 80);	
			},
			touchStop: function () {
					$('#jmm-content').bind('touchmove', function(e){e.preventDefault()}) 
					var stuff = {};
					$("#jmm-left").on('touchstart',stuff,function(e){
					  e.data.max = this.scrollHeight - this.offsetHeight;
					  e.data.y = e.originalEvent.pageY;
					}).on('touchmove',stuff,function(e){
					  var dy = e.data.y - e.originalEvent.pageY; 
					  if((dy < 0 && this.scrollTop < 1)||(dy > 0 && this.scrollTop >= e.data.max)){
						e.preventDefault();
					  };
					});											
			},
			touchGo: function () { 				
					$('#jmm-content').off("touchmove", null); 
			}
		},
		r = {
			openRight: function () {
				r.beforeOpenRight(); 
					$body.data( "right", { menu: true} );
					$content.css('left', -$this.customwidth);
					$fixed.css('left', -$this.customwidth); 
					$rightul.css('right', 0); 
				r.afterOpenRight();  
			},
			closeRight: function () {
				r.beforeCloseRight();
					$body.data( "right", { menu: false} );
					$content.css('left', 0);
					$fixed.css('left', 0); 
					$rightul.css('right', -$this.customwidth); 
				clearTimeout(clear);
				clear = setTimeout(function () {r.afterCloseRight() }, $this.duration);
			},
			beforeOpenRight: function () {  	 //BEFORE OPEN	
				$right.show();		
				$html.addClass('overflow-none');
				$rightScroll.scrollTop = 0;
			},
			afterOpenRight: function () { 	//AFTER OPEN
				r.touchStop(); 	
				fscroll();
			},
			beforeCloseRight: function () {		//BEFORE CLOSE
			},
			afterCloseRight: function () {	//AFTER CLOSE	
				$html.removeClass('overflow-none');
				r.touchGo(); 		
				clearTimeout(clear);
				clear = window.setTimeout(function () { $right.hide(); }, 80);	
			},
			touchStop: function () {
					$('#jmm-content').bind('touchmove', function(e){e.preventDefault()}) 
					var stuff = {};
					$("#jmm-right").on('touchstart',stuff,function(e){
					  e.data.max = this.scrollHeight - this.offsetHeight;
					  e.data.y = e.originalEvent.pageY;
					}).on('touchmove',stuff,function(e){
					  var dy = e.data.y - e.originalEvent.pageY; 
					  if((dy < 0 && this.scrollTop < 1)||(dy > 0 && this.scrollTop >= e.data.max)){
						e.preventDefault();
					  };
					});												
			},
			touchGo: function () { 				
					$('#jmm-content').off("touchmove", null); 
			}
	  	},
		closeMenus = function () {
				if( $body.data( "left" ).menu )  {
					l.closeLeft();
					l.afterCloseLeft()
				}
				if( $body.data( "right" ).menu )  {
					r.closeRight();
					r.afterCloseRight()
				}
		},
		contentHeight = function (){
			$content.css('min-height', window.innerHeight)	
		};
		  
		//DATA
		$body.data( "left", { menu: false} ); 
		$body.data( "right", { menu: false} ); 
		
		$left_trigger.on('click', function (e) {
			if( $body.data( "left" ).menu ) { 
				l.closeLeft();
			}
			else { 	
				l.openLeft();
			}
		});		
		$right_trigger.on('click', function (e) {
			if( $body.data( "right" ).menu ) { 
				r.closeRight();
			}
			else { 	
				r.openRight();
			}
		});	 
		$right_trigger.click(function(e){
			e.stopPropagation();	
		});		
		$left_trigger.click(function(e){
			e.stopPropagation();	
		});	 
		$content.click(function(){
			if( $body.data( "left" ).menu ) {
				l.closeLeft();
			}
			if( $body.data( "right" ).menu ) {
				r.closeRight();
			}
		});	 
		$dropdown.live('click', function (e) {
			$('.jmm-menu li[data-menu="'+$(this).attr('data-trigger')+'"] > ul').toggleClass('display');
			$(this).find('i').toggleClass('icon-down icon-right');
			e.stopPropagation();
			e.preventDefault();
		});	 
		fscroll();		
		function fscroll() {	
			if (!mobile) {		
					if ($leftul.height() < $menu.height()) {
						$menu.css('overflow-y', 'hidden'); 
					}
					else if ($leftul.height() > $menu.height()) {
						$menu.css('overflow-y', 'scroll');
					}	
			}
		}	
		/*Window orientation events*/
		contentHeight();
		sitename_p.removeClass('overflow-text');	
		setTimeout(function () { titlewrap() },5);
		$(window).bind('orientationchange', function() {
			windoworientationChange();			
			contentHeight();
		});
		$(window).resize(function () {
			if (!mobile)
				windoworientationChange();				
			contentHeight();
		});
		
    },
    contactDetails: function ($this) {  
		var p= null, 
			m= null, 
			e= null, 
			a= null,
			h = null,
			$href = '',
			$right_content = '',
			$right_ul = $('#jmm-right > ul');
			try {
			  if($this.phone) {
				p = $this.phone
			  }
			} catch(e) {  }	
			try {
			  if($this.mobile) {
				m = $this.mobile
			  }
			} catch(e) {  }	
			try {
			  if($this.email) {
				e = $this.email
			  }
			} catch(e) {  }	
			try {
			  if($this.address) {
				a = $this.address
			  }
			} catch(e) { }	
			try {
			  if($this.hours) {
				h = $this.hours
			  }
			} catch(e) { }
		var $dom = {
				_info: function (p, m, e, a, h) {
					var  tollreg = /^(\+?1)?([1-9](00|55|66|77|88)[2-9](\d+))$/;
					if (p) contactInfo('Phone', p)
					if (m) contactInfo('Mobile', m)
					if (e) contactInfo('Email', e)
					if (a) contactInfo('Address', a)	
					if (h) tradingHours('Trading Hours', h) 
					function contactInfo(detail, info) {  
						switch (detail) {
							case 'Phone': $icon = 'phone'; $href = 'tel'; break;
							case 'Mobile': $icon = 'mobile'; $href = 'tel'; break;
							case 'Email': $icon = 'email'; $href = 'mailto'; break;
							case 'Address': $icon = 'address'; $href = 'maps'; break;
						} 
						
						if (detail != 'Address') {
							if(info.length == 1 || info.constructor != Array)  { 
								switch (detail) {
									case 'Phone':   
													info = info.toString(); 
													var toll = info.match(tollreg); 	
													if (toll) {
														info = "//+"+info;  												
													}
													else{ 
														if (info.charAt(0) == '0') {
															info = info.substring(1); 
															info = "//+61"+info; 	
														}
														else {
															info = "//+61"+info; 
														}
													}
													 break;
									case 'Mobile':  info = info.toString(); 
													var toll = info.match(tollreg); 
													if (toll) {
														info = "//+"+info; 
													}
													else if (info.charAt(0) == '0') {
														info = info.substring(1); 
														info = "//+61"+info; 
													}
													else {
														info = "//+61"+info; 
													}
													 break;
								} 
								$right_content += '<li><a href="'+$href+':'+info+'"><i class="icon-'+$icon+' icon"></i> '+detail+'</a></li>';
							}
							if(info.length > 1 && info.constructor == Array) {
								var info_a = info, num = 0;
								$.each(info_a, function (c, _info) {
									var cdetail = detail,  info_link = info_a[c]; 
									num= c+1;
									switch(num) {
											case 1 : num = ''; break; 
											default : num = num; break;  
									} 
									if (info_a[c].constructor == Array) {  
										cdetail = info_a[c][0];   
										info_link = info_a[c][1];
										num = ''; 
									}  
									switch (detail) {
										case 'Phone':   
														info_link = info_link.toString(); 
														var toll = info_link.match(tollreg); 
														if (toll) {
															info_link = "//+"+info_link;  
														}
														else if (info_link.charAt(0) == '0') {
															info_link = info_link.substring(1); 
															info_link = "//+61"+info_link;  
														}
														else {
															info_link = "//+61"+info_link;  
														} 
														 break;
										case 'Mobile':  
														info_link = info_link.toString(); 
														var toll = info_link.match(tollreg); 
														if (toll) {
															info_link = "//+"+info_link;  
														}
														else if (info_link.charAt(0) == '0') {
															info_link = info_link.substring(1); 
															info_link = "//+61"+info_link;  
														}
														else {
															info_link = "//+61"+info_link;  
														}
														 break;
									} 
									$right_content += '<li><a href="'+$href+':'+info_link+'"><i class="icon-'+$icon+' icon"></i> '+cdetail+' '+num+'</a></li>';
								}); 
							}
						}
						else { 
							if(info.length == 1 || info.constructor != Array)  { 
								var address = info.toString(),
									ua = navigator.userAgent.toLowerCase(),
									plat = navigator.platform,
									protocol = '',
									href;
								
								$.browser.device = ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i) ? ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i)[0] : false;
								if ($.browser.device) {
									switch($.browser.device) {
										case 'iphone':
										case 'ipad':
										case 'ipod':
											function iOSversion() {
											  if (/iP(hone|od|ad)/.test(navigator.platform)) {
												var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
												return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
											  }
											}							
											var ver = iOSversion() || [0];
								
											if (ver[0] >= 6) {
											  protocol = 'http://maps.apple.com/?q='; 
											}
											else {
												protocol = 'http://maps.google.com/maps';
											}
										break;
										case 'android':
										default:
											protocol = 'http://maps.google.com/maps';
										break;
									}							
									var $maphref = protocol + encodeURIComponent( address );
									$right_content += '<li><a href="'+$maphref+'" target="_blank"><i class="icon-address icon"></i> Address</a></li>'; 
								}
								else {  
										$right_content += '<li><a href="http://maps.google.com/maps?q=' + encodeURIComponent( address ) + '" target="_blank"><i class="icon-address icon"></i> Address</a></li>';  
								} //$.browser.device
							}
							
							if(info.length > 1 && info.constructor == Array) { 
								var info_a = info, info_link = info;
								$.each(info_a, function (c, _info) {
									var cdetail = detail,  info_link = info_a[c]; 
									num= c+1;
									switch(num) {
											case 1 : num = ''; break; 
											default : num = num; break;  
									} 
									if (info_a[c].constructor == Array) {  
										cdetail = info_a[c][0];   
										info_link = info_a[c][1];
										num = ''; 	 
									} 
									var address = info_link.toString(),
										ua = navigator.userAgent.toLowerCase(),
										plat = navigator.platform,
										protocol = '',
										href;
									
									$.browser.device = ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i) ? ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i)[0] : false;
									if ($.browser.device) {
										switch($.browser.device) {
											case 'iphone':
											case 'ipad':
											case 'ipod':
												function iOSversion() {
												  if (/iP(hone|od|ad)/.test(navigator.platform)) {
													var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
													return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
												  }
												}							
												var ver = iOSversion() || [0];
									
												if (ver[0] >= 6) {
												  protocol = 'http://maps.apple.com/?q='; 
												}
												else {
													protocol = 'http://maps.google.com/maps';
												}
											break;
											case 'android':
											default:
												protocol = 'http://maps.google.com/maps';
											break;
										}							
										var $maphref = protocol + encodeURIComponent( address );
										$right_content += '<li><a href="'+$maphref+'" target="_blank"><i class="icon-address icon"></i> '+cdetail+' '+num+'</a></li>'; 
									}
									else {  
											$right_content += '<li><a href="http://maps.google.com/maps?q=' + encodeURIComponent( address ) + '" target="_blank"><i class="icon-address icon"></i> '+cdetail+' '+num+'</a></li>';  
									} //$.browser.device
									
								});
							}
						} // !Address
					}			
					function tradingHours(detail,h) {		 							
							$right_content += '<li data-menu="dropdown2" class="jmm-sm"><a href="javascript:void(0)"><i class="icon-clock icon"></i> Trading Hours <span data-trigger="dropdown2"><i class="icon-right"></i></span></a><ul class="jmm-hours">';  
							
							for (var i in h) { 
								$right_content += '<li><a> <span>'+h[i][0]+':</span> '+h[i][1]+'</a></li>';
							}
							$right_content += '</ul></li>';  
					}			
					$($right_content).prependTo($right_ul);
				}
			};
		
		p != null || m != null || e != null || a != null || h != null ?  $dom._info(p, m, e, a, h) : false;
 		if ($('#jmm-right > ul').children().length == 0)  {
     		$('.right-trigger').hide()
		}
		else {	
     		$('.right-trigger').show()
		}
		
	},
    browserPopup: function () {		
		var $this = $.extend({}, this.defaults, this.options, this.metadata),
			cur_browser = this.browserDetect(0),
			popup_con = $('<div class="popup-con"></div>'),
			popup_bar = $('<div class="popup-bar"><div class="container"><div class="popup-t">Your browser ('+cur_browser+') is out of date and <b>may not display this website properly</b> <span class="popup-expand">Click here to update!</span></div> </div>\
			<div class="popup-text"><div class="container">\
			<p>Local Directories&trade; recommends <b>Google Chrome</b>.</p>\
			<div id="popup-browsers">\
			<div class="br firefox"><a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank"><img src="http://cdn.myld.com.au/1/bootstrap/3.0.0/css/img/firefox.jpg" alt="firefox"> <span>Download <i>Mozilla Firefox</i></span></a></div>\
			<div class="br chrome"><a href="https://www.google.com/intl/en/chrome/browser/" target="_blank"><img src="http://cdn.myld.com.au/1/bootstrap/3.0.0/css/img/chrome.jpg" alt="chrome"> <span>Download <i>Google Chrome</i></span></a></div>\
			<div class="br safari"><a href="http://www.apple.com/au/safari/" target="_blank"><img src="http://cdn.myld.com.au/1/bootstrap/3.0.0/css/img/safari.jpg" alt="safari"> <span>Download <i>Apple Safari</i></span></a></div>\
			</div>\
			<p class="popup-more">Or <a>click here</a> to choose another free browser</p>\
			</div><span class="popup-collapse"></span></div>  <span class="popup-hide"></span></div>'),
			popupcss = document.createElement("link");
			popupcss.type = "text/css";
			popupcss.rel = "stylesheet";
			popupcss.href = "http://cdn.myld.com.au/1/bootstrap/3.0.0/css/popup.min.css"; 		
		
		$navbar.prependTo('.navbar-placeholder');
		document.getElementsByTagName("head")[0].appendChild(popupcss);	
		$body.addClass('popup');
		popup_con.prependTo($body);		
		$popup_con = $('.popup-con');
		$.each($body.children(), function (i, elem) { 
			if ($(this).get(0).tagName != 'SCRIPT' && $(this).get(0).tagName != 'STYLE'  && $(this).attr('class') != 'popup-con' )
				$(this).appendTo($popup_con); 
		});			
		popup_bar.prependTo($body);
		
		if($.browser.msie && parseFloat($.browser.version) < 8){ $this.duration = 0; }		
		var $bar = $('.popup-bar'), $text = $('.popup-text'), $hide = $('.popup-hide'), $expand = $('.popup-expand'), $collapse = $('.popup-collapse'), $more = $('.popup-more'),$pt = $('.popup-bar .popup-t'), bh = $pt.height();
				
		$hide.click(function(){ 		
			$text.slideUp($this.duration);
			$bar.slideUp($this.duration);
			$popup_con.animate({
				top: 0
			}, $this.duration)
		});
		
		$expand.click(function(){ 
			$text.slideDown($this.duration); 
			$bar.addClass('expanded');  
			$hide.fadeOut(0);
			$collapse.fadeIn($this.duration);  
		});
		
		$collapse.click(function(){  
			$text.slideToggle($this.duration); 
			$bar.toggleClass('expanded');  
			$collapse.fadeOut(0);
			$hide.fadeIn($this.duration*3);
		});
		
		$more.click(function(){  
			$('.br.firefox').addClass('show');
			$('.br.safari').addClass('show');
			$more.animate({
				opacity: 0
			});
		});
		
		$(window).bind('laod resize orientationchange',function(){
			if ($bar.is(':visible')) {
				$popup_con.animate({
					top: $pt.height()
				},0);
			}
		}); 
		
    },
    detectOS: function (os) {
      	var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i) ? true : false;
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
			},
			iPad: function () {
				return navigator.userAgent.match(/iPad/i) ? true : false;
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i) ? true : false;
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.iPad() || isMobile.Windows());
			}
		};		
		switch(os) {
			case 'android': return isMobile.Android(); break;	
			case 'blackberry': return isMobile.Blackberry(); break;	
			case 'ios': return isMobile.iOS(); break;	
			case 'ipad': return isMobile.iPad(); break;	
			case 'windows': return isMobile.Windows(); break;	
			case 'any': return isMobile.any(); break;		
		}		
    },
	browserDetect: function (q) {
		var BrowserDetect = {
			init: function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
			},
			searchString: function (data) {
				for (var i=0;i<data.length;i++)	{
					var dataString = data[i].string;
					var dataProp = data[i].prop;
					this.versionSearchString = data[i].versionSearch || data[i].identity;
					if (dataString) {
						if (dataString.indexOf(data[i].subString) != -1)
							return data[i].identity;
					}
					else if (dataProp)
						return data[i].identity;
				}
			},
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
			},
			dataBrowser: [
							{
								string: navigator.userAgent,
								subString: "Chrome",
								identity: "Chrome"
							},
							{ 	string: navigator.userAgent,
								subString: "OmniWeb",
								versionSearch: "OmniWeb/",
								identity: "OmniWeb"
							},
							{
								string: navigator.vendor,
								subString: "Apple",
								identity: "Safari",
								versionSearch: "Version"
							},
							{
								prop: window.opera,
								identity: "Opera",
								versionSearch: "Version"
							},
							{
								string: navigator.vendor,
								subString: "iCab",
								identity: "iCab"
							},
							{
								string: navigator.vendor,
								subString: "KDE",
								identity: "Konqueror"
							},
							{
								string: navigator.userAgent,
								subString: "Firefox",
								identity: "Firefox"
							},
							{
								string: navigator.vendor,
								subString: "Camino",
								identity: "Camino"
							},
							{		// for newer Netscapes (6+)
								string: navigator.userAgent,
								subString: "Netscape",
								identity: "Netscape"
							},
							{
								string: navigator.userAgent,
								subString: "MSIE",
								identity: "Explorer",
								versionSearch: "MSIE"
							},
							{
								string: navigator.userAgent,
								subString: "Gecko",
								identity: "Mozilla",
								versionSearch: "rv"
							},
							{ 		// for older Netscapes (4-)
								string: navigator.userAgent,
								subString: "Mozilla",
								identity: "Netscape",
								versionSearch: "Mozilla"
							}
						],
						dataOS : [
							{
								string: navigator.platform,
								subString: "Win",
								identity: "Windows"
							},
							{
								string: navigator.platform,
								subString: "Mac",
								identity: "Mac"
							},
							{
								   string: navigator.userAgent,
								   subString: "iPhone",
								   identity: "iPhone/iPod"
							},
							{
								string: navigator.platform,
								subString: "Linux",
								identity: "Linux"
							}
						]
		
		};
		BrowserDetect.init();
		
		if (BrowserDetect.browser+BrowserDetect.version == 'Mozilla11') {
			$html.addClass('ie');
			$html.addClass('ie11');
		}
		else {
			if (BrowserDetect.browser == 'Explorer') {
				$html.addClass('ie');
				$html.addClass('ie'+BrowserDetect.version);
			}
			else {
				$html.addClass(BrowserDetect.browser.toLowerCase());
				$html.addClass(BrowserDetect.browser.toLowerCase()+BrowserDetect.version);
			}
		}
		var safari5_desktop = false,  windows8 = false, enablePopup = false, cur_b = '';
		if (BrowserDetect.browser == 'Safari' && BrowserDetect.version < 6 && BrowserDetect.OS != "iPhone/iPod") {
			enablePopup = true;	 
		}		
		if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 9 ) {
			enablePopup = true;	
		}			 
		if (q == 1) {
			return enablePopup;
		} else if (q ==0) {
			if (BrowserDetect.browser == 'Explorer') {
					BrowserDetect.browser = 'Internet Explorer';
			}
			cur_b = BrowserDetect.browser+' '+BrowserDetect.version;
			return cur_b;
		}
		else if (q == 'version') {
			var Browser = BrowserDetect;
			return 	Browser;
		}
	}
  }

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.jmm = function (options) {
    return this.each(function () {
      new Plugin(this, options).init();
    });
  };
  $.jmm = function (options) {
	return new Plugin(document.body, options).init();
  };

  window.Plugin = Plugin; 
  
})(window, jQuery);

(function (window, $) {

  var Plugin = function (elem, options) {
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options; 
  };

  Plugin.prototype = {
    defaults: { 
	  ico: null
    },
    init: function () {
      this.config = $.extend({}, this.defaults, this.options, this.metadata);	    
		var fi = this.options.split(',');
		for (var i in fi)
		{ 
			fav =  fi[i].replace(/^\s+|\s+$/g,'') ;
			if (fav.toLowerCase().indexOf(".ico") >= 0) {
				$('<link rel="icon" type="image/x-icon" href="'+fav+'" />').appendTo('head'); 
				$('<link rel="shortcut icon" type="image/x-icon" href="'+fav+'" />').appendTo('head'); 
			}
			else if (fav.toLowerCase().indexOf(".png") >= 0) {
				$('<link rel="icon" type="image/png" href="'+fav+'" />').appendTo('head'); 
			}
		}
      return this;
    }
  }

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.favicon = function (options) {
    return this.each(function () {
      new Plugin(this, options).init();
    });
  };
  $.favicon = function (options) {
	return new Plugin(document.body, options).init();
  };

  window.Plugin = Plugin; 
  
})(window, jQuery);

var menu = $.jmm();