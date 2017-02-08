$(function() {

	/* スライダー
	****************************************************/
	if($('.sliderContainer').length) {
		$('.sliderContainer').bxSlider({
			auto: true,
			infiniteLoop: true,
			touchEnabled: true,
			captions: true
		});
		// ロードした瞬間、すべての画像が表示されてしまうので、一旦CSSで非表示にしておいて
		// bxSliderの読み込みが終わったらコンテンツを表示する
		$('.sliderContainer').css('visibility', 'visible');
	}

	/* ハッシュ変更時の画面遷移
	****************************************************/
	window.onhashchange = function() {
		// これでいいわけがない
		location.reload();
	}

	/* キャッシュクリア
	****************************************************/
	var date = new Date();
	var unixTimestamp = Math.floor( date.getTime() / 1000 );
	// css
	$('link').each(function() {
		var href = $(this).attr('href') + '?ver=' + unixTimestamp;
		$(this).attr('href', href);
	});
	// js
	$('script').each(function() {
		var src = $(this).attr('src') + '?ver=' + unixTimestamp;
		$(this).attr('src', src);
	});

});