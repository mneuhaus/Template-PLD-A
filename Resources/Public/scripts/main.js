$(window).load(function() {
	//$('.flexslider').flexslider();

	$('.flexslider-carousel').flexslider({
		animation: "slide",
		itemWidth: 200,
		itemMargin: 5
	})
});

//aktiviere tooltips
  $(function () {
        $("[rel='tooltip']").tooltip();
    });