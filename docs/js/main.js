$(function () {
	'use strict';

	$.ajax({
		url: 'https://api.github.com/repos/Emupedia/emupedia-emuos-wallpapers/contents/docs/images/wallpapers/abstract?ref=master',
		data: {},
		dataType: 'json'
	}).done(function (result) {
		var carouselLinks = [];
		var linksContainer = $('#links');
		var baseUrl;

		// noinspection JSUnresolvedVariable
		$.each(result, function (i, val) {
			// noinspection HtmlRequiredAltAttribute,RequiredAttributes
			$('<a/>').prop('style', 'display: inline-block; width: 75px; height: 75px; background-image: url(' + val['download_url'] + '); background-repeat: no-repeat; background-position: center; background-size: cover;').prop('href', val['download_url']).prop('title', val['download_url'].replace('-', ' ').replace(/\.[^/.]+$/, '')).attr('data-gallery', '').appendTo(linksContainer);

			carouselLinks.push({
				href: val['download_url'],
				title: val['download_url'].replace('-', ' ').replace(/\.[^/.]+$/, '')
			})
		});

		blueimp.Gallery(carouselLinks, {
			container: '#blueimp-image-carousel',
			carousel: true
		})
	})
});