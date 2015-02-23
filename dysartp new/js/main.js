$(document).ready(function(){
	$("#TraditionalTonnetz").hide;

	$("#ButtonHome").click(function(){
		$("#TraditionalTonnetz").hide;
		$("#Home").fadeIn;
	});
	$("#ButtonTraditionalTonnetz").click(function(){
		$("#Home").hide;
		$("#TraditionalTonnetz").fadeIn;
	});
});