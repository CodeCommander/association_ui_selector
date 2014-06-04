(function($, Symphony) {
	'use strict';

	Symphony.Language.add({
		'Remove': false,
		'Search and select': false
	});

	Symphony.Extensions.AssociationUISelector = function() {
		var fields;

		var init = function() {
			fields = Symphony.Elements.contents.find('.field-selectbox_link').attr('data-ui', 'aui-selector');
			fields.each(buildInterface);
		};

		var buildInterface = function() {
			var select = $(this).find('select'),
				selectize;

			// Apply Selectize
			select.selectize({
				plugins: {
					'remove_button': {
						label : Symphony.Language.get('Remove'),
						title : Symphony.Language.get('Remove'),
						className : 'destructor'
					}
				},
				hideSelected: true,
				render: {
					item: function(data, escape) {
						return '<div class="item"><span>' + escape(data.text) + '</span></div>';
					}
				},
			});

			// Set placeholder text
			selectize = select[0].selectize
			selectize.$control_input.attr('placeholder', 'Search and select' + ' …');

			// Make sortable
			selectize.$control.symphonyOrderable({
				items: '.item',
				handles: 'span',
				ignore: 'input, textarea, select, a',
				delay: 250
			}).on('orderstart.orderable', function() {
				selectize.close();
			});
		};

		// API
		return {
			init: init
		};
	}();

	$(document).on('ready.orderentries', function() {
		Symphony.Extensions.AssociationUISelector.init();
	});

})(window.jQuery, window.Symphony);
