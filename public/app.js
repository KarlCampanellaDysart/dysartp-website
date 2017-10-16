var parallaxBG = document.getElementsByClassName('paralaxBg')[0];
var nav = document.getElementsByClassName('navbar')[0];
var jumboHeight = $('.jumbotron').outerHeight();
var navHeight = $('.navContainer').outerHeight();

var parallax = function () {
	var newHeight = jumboHeight - $(window).scrollTop();
    parallaxBG.style.height = (newHeight < 0 ? 0 : newHeight) + 'px';
};

var navChange = function () {
	var newHeight = (jumboHeight - $(window).scrollTop()) - navHeight;
	if (newHeight <= 0 && newHeight >= (-1 * navHeight)) {
		var opacity = ((-1 * newHeight) / navHeight)*0.75 + 0.25;
		nav.style.backgroundColor = 'rgba(221,221,221,'+ opacity +')';
	} 
	else if (newHeight > 0) nav.style.backgroundColor = 'rgba(221,221,221, .25)';
	else nav.style.backgroundColor = 'rgba(221,221,221, 1)';
};

// run and schedule things...
$(document).ready(function(){
	parallax();
	navChange();
});
$(window).scroll(function() {
	parallax();
	navChange();
});

// custom app code...
var jjs = require(['jjs'], function (jjs) {
	window.app = jjs.app();
	app.config({
		root: '',
		files: [
			{root: 'views', files: [
				'404','home', 'main', 'navigation'
			]},
			{root: 'routes', files: ['routes']}
		]
	});
});
