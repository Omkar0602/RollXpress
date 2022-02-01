jQuery(document).ready( function($) {

	$('.fdm-count-products').text($('.my-delivery-cart-items').length);

	$('.myd-product-item__button').click( function() {

		var id = $(this).attr('id');

		if( $('.fdm-insert-details-order').hasClass('empty-order') ) {

			$('.fdm-popup-init').css('display', 'flex');
		}

		else {

			$('#popup-' + id).css('display','flex');
		}
	});


	if( $('.my-delivery-cart-items').hasClass('empty') ) {
		
		$('.fdm-count-products').text('0');
	}

	$('.fdm-select-type-ship').on('change', function() {

		if( $('.fdm-select-type-ship option:selected').val() === 'delivery')  {

			$('.fdm-option-to-delivery').show();
			$('.myd-order-in-store').hide();
			return;
		}

		if( $('.fdm-select-type-ship option:selected').val() === 'order-in-store') {

			$('.myd-order-in-store').show();
			$('.fdm-option-to-delivery').hide();
			return;
		}

		else {

			$('.fdm-option-to-delivery').hide();
			$('.myd-order-in-store').hide();
		}
	});

	$('.fdm-popup-close-btn').click( function() {
		$('.fdm-popup-product-init, .fdm-popup-init, .fdm-popup-content-edit, .fdm-popup-content').hide();
	});

	$('.fdm-click-plus').click( function() {

		var calc = parseInt($('.fmd-item-qty').val()) + 1;

		if(calc > 0) {
			$('.fmd-item-qty').val(calc);
		}
	});

	$('.fdm-click-minus').click( function() {

		var calc = parseInt($('.fmd-item-qty').val()) - 1;

		if(calc > 0) {
			$('.fmd-item-qty').val(calc);
		}
	});

	$('#fdm-selected-payment').change( function() {

			if( $('#fdm-selected-payment option:selected').val() == 'Cash') {

				$('#fdm-change-back').show();
			}
			else {

				$('#fdm-change-back').hide();
			}
	});

	if ($(window).width() <= 768) {

		$('.my-delivery-cart-title').click( function() {

		$('.my-delivery-cart-items, .my-delivery-cart-items.empty, .my-delivery-cart-totals, .my-delivery-cart-order-details, .my-delivery-create-order').toggle();
		$('.fdm-svg-cart').toggleClass('fdm-flip');
	});

	}

	$('.fdm-tel-8dig').mask('0000-0000');
	$('.fdm-tel-9dig').mask('00000-0000');
	$('.fdm-tel-8dig-ddd').mask('(00)0000-0000');
	$('.fdm-tel-9dig-ddd').mask('(00)00000-0000');
	$('.fdm-tel-us').mask('(000)000-0000');
	$('.fdm-tel-ven').mask('(0000)000-0000');
	$('#fdm-change-back').mask('000.000.000.000.000,00', {reverse: true});

	function scrollToAnchor(aid){
	    var aTag = $("#"+ aid);
	    $('html,body').animate({scrollTop: aTag.offset().top - 80},'slow');
	}

	$('.fdm-select-category').change( function() {

		scrollToAnchor( 'fdm-' + $('.fdm-select-category option:selected').val() );

	});

	$('.fdm-orders-loop').on('click', ".fdm-orders-items", function() {

		$('.fdm-orders-items').removeClass('fdm-active');
		$(this).addClass('fdm-active');
		$('.fdm-btn-order-action').attr('data-manage-order-id', $(this).attr('id'));
		$('.fdm-orders-full-items').hide();

		if ($(window).width() <= 768) {

			$('.fdm-orders-full-details').show();
		}

		$('.fdm-orders-full-items.' + $(this).attr('id')).show();
	});
	
	///limit extras
	$('.option_prod_exta').on('change', function() {

		var limit = $(this).attr('data-limit');

		if( limit != '' ) {

			var currentClass = $(this).prop('classList');
			var checks = $("input." + currentClass[0] + "." + currentClass[1] + ":checked");

			if(checks.length > limit) {
				this.checked = false;
			}
		}
	});

    $(".fdm-input-filter").on("keyup", function() {
    	var value = $(this).val().toLowerCase();
	    
	    $(".fdm-orders-items").filter(function() {
	    	$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
  	});

    $('.fdm-btn-order-action-back').on('click', function(){

    	$('.fdm-orders-full-details').hide();
    });

    ///image ligthbox
    $('.myd-product-item__img, .myd-product-popup__img').on( 'click', function(){

    	var link = $(this).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');

    	$('.fdm-lightbox-image-link img').attr('src', link);
    	$('.fdm-lightbox-image').css('display', 'flex');
    });

    $('.fdm-lightbox-image-close').on('click', function(){

    	$('.fdm-lightbox-image').hide();
    })


    $("#zipcode").keypress(function (e) {

	    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	        
	        return false;
	    }
	});

});