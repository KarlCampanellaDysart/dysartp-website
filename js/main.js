var allPages =["#Home","#TraditionalTonnetz","#SurfaceForm","#VolumeForms", "#WholeStepAxis", "#HyperTonnetz", "#Properties", "#PrimeScales","#PrimeModes","#DiatonicTriads", "#7Chords", "#Progression", "#VisualClues", "#TriadShapes", "#UpperLowerParts", "#WholeStepClues", "#BasicMotions", "#Summary"];
var allButtons = ["#ButtonHome","#ButtonTraditionalTonnetz","#ButtonSurfaceForm", "#ButtonVolumeForms", "#ButtonWholeStepAxis", "#ButtonHyperTonnetz", "#ButtonProperties", "#ButtonPrimeScales","#ButtonPrimeModes","#ButtonDiatonicTriads", "#Button7Chords", "#ButtonProgression", "#ButtonVisualClues", "#ButtonTriadShapes", "#ButtonUpperLowerParts", "#ButtonWholeStepClues", "#ButtonBasicMotions", "#ButtonSummary"];

var parallaxBG = document.getElementsByClassName('paralaxBg')[0];
var jumboHeight = $('.jumbotron').outerHeight();

$(document).ready(function(){
	for(var i = 0;i < allPages.length; i++){ if(allPages[i] !== "#Home"){ $(allPages[i]).hide(); }}		
	for(var k = 0;k < allButtons.length; k++){ $(allButtons[k]).click(processClick(k)); }	

	parallax();
});

function processClick(k){
	return function(){
    	for(var j = 0;j < allPages.length; j++){ if(allPages[j] !== allPages[k]){ $(allPages[j]).hide(); }}	
		$(allPages[k]).fadeIn();
	}
}

function parallax(){
    parallaxBG.style.height = (jumboHeight - $(window).scrollTop()) + 'px';
}
