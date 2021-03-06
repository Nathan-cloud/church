/** @format */

(isWindows = -1 < navigator.platform.indexOf('Win')),
	isWindows
		? ($('.sidebar .sidebar-wrapper, .main-panel, .main').perfectScrollbar(),
		  $('html').addClass('perfect-scrollbar-on'))
		: $('html').addClass('perfect-scrollbar-off');
var breakCards = !0,
	searchVisible = 0,
	transparent = !0,
	transparentDemo = !0,
	fixedTop = !1,
	mobile_menu_visible = 0,
	mobile_menu_initialized = !1,
	toggle_initialized = !1,
	bootstrap_nav_initialized = !1,
	seq = 0,
	delays = 80,
	durations = 500,
	seq2 = 0,
	delays2 = 80,
	durations2 = 500;
function debounce(t, n, i) {
	var r;
	return function () {
		var e = this,
			a = arguments;
		clearTimeout(r),
			(r = setTimeout(function () {
				(r = null), i || t.apply(e, a);
			}, n)),
			i && !r && t.apply(e, a);
	};
}
$(document).ready(function () {
	$('body').bootstrapMaterialDesign(),
		($sidebar = $('.sidebar')),
		md.initSidebarsCheck(),
		(window_width = $(window).width()),
		md.checkSidebarImage(),
		0 != $('.selectpicker').length && $('.selectpicker').selectpicker(),
		$('[rel="tooltip"]').tooltip(),
		$('.form-control')
			.on('focus', function () {
				$(this).parent('.input-group').addClass('input-group-focus');
			})
			.on('blur', function () {
				$(this).parent('.input-group').removeClass('input-group-focus');
			}),
		$(
			'input[type="checkbox"][required="true"], input[type="radio"][required="true"]'
		).on('click', function () {
			$(this).hasClass('error') &&
				$(this).closest('div').removeClass('has-error');
		});
}),
	$(document).on('click', '.navbar-toggler', function () {
		if ((($toggle = $(this)), 1 == mobile_menu_visible))
			$('html').removeClass('nav-open'),
				$('.close-layer').remove(),
				setTimeout(function () {
					$toggle.removeClass('toggled');
				}, 400),
				(mobile_menu_visible = 0);
		else {
			setTimeout(function () {
				$toggle.addClass('toggled');
			}, 430);
			var e = $('<div class="close-layer"></div>');
			0 != $('body').find('.main-panel').length
				? e.appendTo('.main-panel')
				: $('body').hasClass('off-canvas-sidebar') &&
				  e.appendTo('.wrapper-full-page'),
				setTimeout(function () {
					e.addClass('visible');
				}, 100),
				e.click(function () {
					$('html').removeClass('nav-open'),
						(mobile_menu_visible = 0),
						e.removeClass('visible'),
						setTimeout(function () {
							e.remove(), $toggle.removeClass('toggled');
						}, 400);
				}),
				$('html').addClass('nav-open'),
				(mobile_menu_visible = 1);
		}
	}),
	(md = {
		misc: {
			navbar_menu_visible: 0,
			active_collapse: !0,
			disabled_collapse_init: 0,
		},
		checkSidebarImage: function () {
			($sidebar = $('.sidebar')),
				(image_src = $sidebar.data('image')),
				void 0 !== image_src &&
					((sidebar_container =
						'<div class="sidebar-background" style="background-image: url(' +
						image_src +
						') "/>'),
					$sidebar.append(sidebar_container));
		},

		initSliders: function () {
			var e = document.getElementById('sliderRegular');
			noUiSlider.create(e, {
				start: 40,
				connect: [!0, !1],
				range: { min: 0, max: 100 },
			});
			var a = document.getElementById('sliderDouble');
			noUiSlider.create(a, {
				start: [20, 60],
				connect: !0,
				range: { min: 0, max: 100 },
			});
		},
		initSidebarsCheck: function () {
			$(window).width() <= 991 && 0 != $sidebar.length && md.initRightMenu();
		},

		initMinimizeSidebar: function () {
			$('#minimizeSidebar').click(function () {
				$(this);
				1 == md.misc.sidebar_mini_active
					? ($('body').removeClass('sidebar-mini'),
					  (md.misc.sidebar_mini_active = !1))
					: ($('body').addClass('sidebar-mini'),
					  (md.misc.sidebar_mini_active = !0));
				var e = setInterval(function () {
					window.dispatchEvent(new Event('resize'));
				}, 180);
				setTimeout(function () {
					clearInterval(e);
				}, 1e3);
			});
		},
		checkScrollForTransparentNavbar: debounce(function () {
			260 < $(document).scrollTop()
				? transparent &&
				  ((transparent = !1),
				  $('.navbar-color-on-scroll').removeClass('navbar-transparent'))
				: transparent ||
				  ((transparent = !0),
				  $('.navbar-color-on-scroll').addClass('navbar-transparent'));
		}, 17),
		initRightMenu: debounce(function () {
			($sidebar_wrapper = $('.sidebar-wrapper')),
				mobile_menu_initialized
					? 991 < $(window).width() &&
					  ($sidebar_wrapper.find('.navbar-form').remove(),
					  $sidebar_wrapper.find('.nav-mobile-menu').remove(),
					  (mobile_menu_initialized = !1))
					: (($navbar = $('nav')
							.find('.navbar-collapse')
							.children('.navbar-nav')),
					  (mobile_menu_content = ''),
					  (nav_content = $navbar.html()),
					  (nav_content =
							'<ul class="nav navbar-nav nav-mobile-menu">' +
							nav_content +
							'</ul>'),
					  (navbar_form = $('nav').find('.navbar-form').get(0)),
					  ($sidebar_nav = $sidebar_wrapper.find(' > .nav')),
					  ($nav_content = $(nav_content)),
					  ($navbar_form = $(navbar_form)),
					  $nav_content.insertBefore($sidebar_nav),
					  $navbar_form.insertBefore($nav_content),
					  $('.sidebar-wrapper .dropdown .dropdown-menu > li > a').click(
							function (e) {
								e.stopPropagation();
							}
					  ),
					  window.dispatchEvent(new Event('resize')),
					  (mobile_menu_initialized = !0));
		}, 200),
	});
