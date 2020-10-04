$(function () {
	'use strict';

	$.ajax({
		url: 'data/filesystem.json',
		data: {},
		dataType: 'json'
	}).done(function (result) {
		var linksContainer = $('#links');

		$.each(result.data.children, function (i, val) {
			$.each(val.children, function (i, val) {
				var el = $('<a/>');
				el.attr('href', val.path)
				// .attr('loading', 'lazy')
				.attr('title', val.name
				.replace(/-/g, ' ')
				.replace(/\.[^/.]+$/, ''))
				.attr('data-gallery', '');

				if (val.mime_type === 'video/mp4' || val.mime_type === 'video/webm') {
					el.attr('style', 'display: inline-block; width: 200px; height: 200px; background: #000;')
					.attr('data-type', 'video')
					.attr('data-sources', "{\"type\": \"" + val.mime_type +"\", \"src\": \"" + val.path + "\"}");

					var v =  $('<video width="200" height="200" autoplay="autoplay" muted="muted"><source src="' + val.path + '" type="' + val.mime_type + '" /></video>');

					el.append(v);
				} else {
					el.attr('style', 'display: inline-block; width: 200px; height: 200px; background-image: url(' + val.path + '); background-repeat: no-repeat; background-position: center; background-size: cover;');
				}

				el.appendTo(linksContainer);
			});
		});
	});
});