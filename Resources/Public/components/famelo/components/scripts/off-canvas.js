$("[data-canvas-toggle]").click(function(){
	$(".off-canvas").toggleClass("off-canvas-active");
	return false;
});

$("[role='main']").click(function(){
	$(".off-canvas").removeClass("off-canvas-active");
});