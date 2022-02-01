jQuery( document ).ready( function( $ ) {

	$(document).ajaxStart(function() {
  		$('.fdm-load-ajax').css('display','flex');
	});

	$(document).ajaxStop(function() {
  		$('.fdm-load-ajax').hide();
	});

	/****add product******/
	$('.fdm-add-to-cart-popup').click( function() {

		var id = $(this).attr('id');
		var check_required = [];
		
		$('#popup-' + id).find('.fdm-extra-option-title').each(function () {

			if( $(this).attr('data-obj') == 'required') {

				if( $(this).find('input[type=checkbox]:checked').length == 0 ) {
					
					alert( $('#notice-required-empty').val() );
					check_required.push('stop');
					return false;
				}
			}
		});

		if( $.inArray('stop', check_required) >= 0 ) {

			delete check_required;
			return;
		}
		
		var item_note = $('#fdm-product-note-' + id).val();
		var qty = $('.fmd-item-qty').val();
		var extra = [];
		var extra_price = [];

		$('.option_prod_exta:checked').each(function () {

			extra.push($(this).val());
			extra_price.push($(this).attr('data-price'));
		});

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'fdm_addcart_open_popup', click_id: id, item_note: item_note, qty: qty, extras: extra, extra_price: extra_price }
		}).done(function(response) {
			$(".fdm-load-ajax , .fdm-popup-product-init").hide();
			$('.my-delivery-cart-items.empty , .my-delivery-cart-items, .empty-delivery, .my-delivery-cart-totals').remove();

			if ($(window).width() <= 768) {  

             	$('.my-delivery-cart-title').after(response);
             	$('.my-delivery-cart-items.empty , .my-delivery-cart-items, .my-delivery-cart-totals').hide();

       		} else {

       			$('.my-delivery-cart-title').after(response);

       		}  
			$('.fmd-item-qty').val('1');
			$('#fdm-product-note-' + id).val('');
			delete extra;
			delete extra_price;

			$('.option_prod_exta:checked').each(function () {

				$(this).prop('checked', false);
			});

			$('.fdm-count-products').text($('.my-delivery-cart-items').length);
		});
	});

	/****remove item******/
	$('.my-delivery-cart').on('click', ".my-delivery-btn-remove", function() {

		var id = $(this).attr('id');

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'fdm_cart_remove', remove_id: id }
		}).done(function(response) {
			$(".fdm-load-ajax").hide();
			$('.my-delivery-cart-items, .my-delivery-cart-totals').remove();

			if ($(window).width() <= 768) {  

             	$('.my-delivery-cart-title').after(response);
             	$('.my-delivery-cart-items, .my-delivery-cart-totals').show();

       		} else {

       			$('.my-delivery-cart-title').after(response);
       		}

       		$('.fdm-count-products').text($('.my-delivery-cart-items').length);

			if( $('.my-delivery-cart-items').hasClass('empty') ) {

				$('.fdm-count-products').text('0');
			}  
		});

	});

	/****Select store(multi)******/
	$('#fdm-click-select-store').on('click', function() {

		var selected_store = $('#fdm-select-id-store').val();

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'fdm_select_store', selected_store: selected_store }
		}).done(function(response) {
			location.reload();
		});
	});

	/****create order******/
	$('.myd-product-item__button').click( function() {

		var id = $(this).attr('id');

		if( $('.fdm-insert-details-order').hasClass('empty-order') ) {

			$('.fdm-popup-init').css('display', 'flex');
			$('.fdm-popup-content').show();

			$('#fdm-click-create-form').click( function() {

				var name = $('#fdm-fullname').val();
				var phone = $('#fdm-phone').val();
				var shipping = $('.fdm-select-type-ship option:selected').val();
				var address = $('#address').val();
				var number = $('#number').val();
				var comp = $('#comp').val();
				var neig = $('#fdm-neig').val();
				var zipcode = $('#zipcode').val();
				var id_store = $('#fdm-id-store').val();
				var table = $('#myd-table').val();

				if( id_store == '' ) {
					alert( $('#notice-store').val() );
					return;
				}

				if( shipping == '' ) {
					alert( $('#notice-ship').val() );
					return;
				}

				if( name == '' ) {
					alert( $('#notice-name').val() );
					return;
				}

				if( phone == '' ) {
					alert( $('#notice-phone').val() );
					return;
				}

				if( shipping == 'order-in-store') {

					if( table == '' ) {
						alert( $('#notice-myd-table').val() );
						return;
					}

				}

				if( shipping == 'delivery') {

					if( zipcode == '' && !$("#zipcode").hasClass('myd-form-order__zipcode--hide') ) {
						alert( $('#notice-zip').val() );
						return;
					}

					if( neig == '' ) {
						alert( $('#notice-zip').val() );
						return;
					}

					if( address == '' ) {
						alert( $('#notice-address').val() );
						return;
					}

					if( number == '' && !$("#number").hasClass('myd-form-order__number--hide') ) {
						alert( $('#notice-number').val() );
						return;
					}
				}

				$.ajax({
					method: "post",
					url: ajax_object.ajax_url,
					data: { action: 'fdm_create_cart', name: name, phone: phone, ship: shipping, address: address, number: number, comp: comp, neig: neig, zipcode: zipcode, id_store: id_store, table: table }
				}).done(function(response) {
					var obj = JSON.parse(response);

					if( obj.order_time == 'close' ) {
						$('.fdm-popup-content').hide();
						$('.fdm-popup-content-error-time').show();
					}

					else if( obj.order_ship == 'n_entrega' ) {
						$('.fdm-popup-content').hide();
						$('.fdm-popup-content-error-ship').show();
					}

					else {
						$('.fdm-insert-details-order').remove();
						$('.fdm-cart-order-details-title-div').after(obj.order_details);
						$('.fdm-popup-init, .fdm-popup-content').hide();
						$('#popup-' + id).css('display','flex');
					}
				});
			});
		}

		else {

			$('#popup-' + id).css('display','flex');
		}
	});

	/****send order******/
	$('.my-delivery-btn-order').click( function(event) {

		event.preventDefault();

		if( $('.my-delivery-cart-items').hasClass('empty') ) {

			alert( $('#notice-cart-empty').val() );
			return;
		}

		if( $('.fdm-insert-details-order').hasClass('empty-order') ) {

			alert( $('#notice-info-empty').val() );
			return;
		}

		if( $('#fdm-selected-payment option:selected').val() == '' ) {

			alert( $('#notice-payment-empty').val() );
			return;
		}

		var payment = $('#fdm-selected-payment option:selected').val();
		var change = $('#fdm-change-back').val();

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'fdm_save_redirect', payment: payment, change: change }
		}).done(function(response) {
			window.location.replace(response);
		});
	});

	/****reload orders list******/
	$('.fdm-btn-order-action').on('click', function() {

		var id = $(this).attr('data-manage-order-id');
		var order_action = $(this).attr('data-manage-order-action');

		if( id == '' ) {
			return;
		}

		if( order_action == 'print' ) {
			var width = $(this).attr('data-print-size');
			var font_size = $(this).attr('data-print-font');
			var printer = 'print-' + id;
			var style = '@page { size:' + width + ' 200mm; margin: 0; } .order-print { font-size:' + font_size + 'px; } .order-header{ text-align: center }';

			printJS({
			  	printable: printer,
			    type: 'html',
			    style: style,
			});
			return;
		}

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'reload_orders', id: id, order_action: order_action }
		}).done(function(response) {
			var obj = JSON.parse(response);

			$('.fdm-orders-items, .fdm-orders-full-items').remove();
			$('.fdm-orders-loop').append(obj.loop);
			$('.fdm-orders-full').append(obj.full);
			$('.fdm-btn-order-action').attr('data-manage-order-id', '');

			if ($(window).width() <= 768) {

				$('.fdm-orders-full-details').hide();
			}
		});
	});

	/****Restart order******/
	$('.my-delivery-btn-edit').on('click', function() {

		$.ajax({
			method: "post",
			url: ajax_object.ajax_url,
			data: { action: 'fdm_restart' }
		}).done(function(response) {
			location.reload();
		});
	});
});