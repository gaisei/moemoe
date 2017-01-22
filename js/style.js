$(function() {

	/* スライダー
	****************************************************/
	$('.sliderContainer').bxSlider({
		auto: true,
		infiniteLoop: true,
		touchEnabled: true,
		captions: true
	});
	// ロードした瞬間、すべての画像が表示されてしまうので、一旦CSSで非表示にしておいて
	// bxSliderの読み込みが終わったらコンテンツを表示する
	$('.sliderContainer').css('visibility', 'visible'); 
});