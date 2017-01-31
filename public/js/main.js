var allPages =["#Home", "#WholeStepAxis", "#PrimeScales","#DiatonicTriads", "#VisualClues", "#Summary"];
var allButtons = ["#ButtonHome", "#ButtonWholeStepAxis", "#ButtonPrimeScales","#ButtonDiatonicTriads", "#ButtonVisualClues", "#ButtonSummary"];

var parallaxBG = document.getElementsByClassName('paralaxBg')[0];
var nav = document.getElementsByClassName('navbar')[0];
var jumboHeight = $('.jumbotron').outerHeight();
var navHeight = $('.navContainer').outerHeight();

var processClick = function (k){
	return function(){
    	for(var j = 0;j < allPages.length; j++){ if(allPages[j] !== allPages[k]){ $(allPages[j]).hide(); }}	
		$(allPages[k]).fadeIn();
	}
};

var parallax = function () {
	var newHeight = jumboHeight - $(window).scrollTop();
    parallaxBG.style.height = (newHeight < 0 ? 0 : newHeight) + 'px';
};

var navChange = function () {
	var newHeight = (jumboHeight - $(window).scrollTop()) - navHeight;
	if (newHeight <= 0 && newHeight >= (-1 * navHeight)) {
		var opacity = ((-1 * newHeight) / navHeight)*0.75 + 0.25;
		nav.style.backgroundColor = 'rgba(221,221,221,'+ opacity +')';
	} else if (newHeight > 0) {
		nav.style.backgroundColor = 'rgba(221,221,221, .25)';
	} else {
		nav.style.backgroundColor = 'rgba(221,221,221, 1)';
	}
};

// run and schedule things...
$(document).ready(function(){
	for(var i = 0;i < allPages.length; i++){ if(allPages[i] !== "#Home"){ $(allPages[i]).hide(); }}		
	for(var k = 0;k < allButtons.length; k++){ $(allButtons[k]).click(processClick(k)); }	
	parallax();
	navChange();
});

$(window).scroll(function() {
	parallax();
	navChange();
});