$(function(){
	
	/* FECHA FOOTER */
	var fecha = new Date();
	var year =fecha.getFullYear();
	$('#id_year').text(year);

	/* HOVER NAV */
	$('.nav-list .nav-item').hover(function(){
		var ubicacion = $(this).offset();
		var widthitem = $(this).width()+'px';
		var equis = ubicacion.left+'px';
		var colortexto = $(this).css('color');
		// var positionMachine = (equis+widthyear-34)+'px';
		$('.nav-item-hover').css({
			opacity: '1',
			transform: 'translateX('+equis+')',
			width: widthitem,
			backgroundColor: colortexto
		});
	});
	$('.nav-list .w-nav-item').hover(function() {
		$('.nav-item-hover').css('opacity', '1');
	}, function() {
		$('.nav-item-hover').css('opacity', '0');
	});
	
	/* MENU RESPONSIVE */
	//se clona el navlist para poder tener mas flexibilidad y control
	$('.nav-list').clone().appendTo('body').insertAfter('footer').addClass('menu-responsive').removeClass('nav-list');


	$('.menu-mobile').click(function(event){
		event.preventDefault();
		$(this).addClass('active-menu-mobile');
		$('.menu-mobile-close').addClass('active-menu-mobile-close');
		$('.menu-responsive').addClass('active-menu');
		$('.r-overlay').addClass('active-overlay');
		$('.cnt-wrapper').addClass('active-cnt-wrapper');
		$('.footer').addClass('active-footer');
	}); 

		// js submenu 2do nivel
		function cerrar_submenu(){
			$('.menu-responsive .u-submenu').stop(false).slideUp();
		}
		$('.menu-responsive .abre-submenu').click(function(e) {
			e.preventDefault();
	  		$('.menu-responsive .abre-submenu').removeClass('active');
	  		$(this).addClass('active');
	  		cerrar_submenu();
	  		$(this).parent().find('.u-submenu').stop(false).slideToggle();
		});
		// fin js submenu 2do nivel


	// funcion  para cerrar menu responsive	
	function cerrar_nav() {
		$('.menu-responsive').removeClass('active-menu');
		$('.r-overlay').removeClass('active-overlay');
		$('.menu-mobile-close').removeClass('active-menu-mobile-close');
		$('.menu-mobile').removeClass('active-menu-mobile');
		$('.cnt-wrapper').removeClass('active-cnt-wrapper');
		$('.footer').removeClass('active-footer');
	};

	//click en boton cerrar y overlay
	$('.w-nav').on('click', '.menu-mobile-close', function(event) {
		event.preventDefault();
		cerrar_nav();
		cerrar_submenu();
	});
	$('.r-overlay').click(function() {
		cerrar_nav();
		cerrar_submenu();
	});

    $('#fullpage').fullpage({
        sectionsColor: [''],
        anchors: ['welcome', 'products', 'services', 'contact'],
        lockAnchors: false,
        menu: '#menu',
        slidesNavigation: true,
        loopHorizontal: false,
        css3: true,
        easing: 'easeInOutCubic',
        scrollingSpeed: 650,
        easingcss3: 'ease',
        responsiveHeight: 600,
        responsiveWidth: 768,
        afterLoad: function(anchorLink, index){
            if(index == 1){
                console.dir(index+ " " + anchorLink);
                $('#section0').find('img').delay(500).animate({
                    left: '0%'
                }, 1500, 'easeOutExpo');

                $('#section0').find('p').first().fadeIn(1800, function(){
                    $('#section0').find('p').last().fadeIn(1800);
                });;
            }
            if(index == 2){
                console.dir(index+ " " + anchorLink);
                $('#section1').find('.intro').delay(500).animate({
                    left: '0%'
                }, 1500, 'easeOutExpo');
            }
            if(index == 3){
                console.dir(index+ " " + anchorLink);
                $('#section2').find('.intro').delay(500).animate({
                    left: '0%'
                }, 1500, 'easeOutExpo');
            }
            if(index == 4){
                console.dir(index+ " " + anchorLink);
                $('#section3').find('.intro').delay(500).animate({
                    left: '0%'
                }, 1500, 'easeOutExpo');
            }
        }
    });

	$('#slider').carouFredSel({
        responsive: true,
        scroll: 1,
        height: 'auto',
        auto: false,
        items: {
            width: 520,
            visible: {
                min: 1,
                max: 4
            }
        },
        pagination: '#pagination',
        prev: {
            button:  '#prev_slide',
            key: "left"
        },
        next: {
            button: '#next_slide',
            key: "right"
        }

	});

	//para cerrar el menu responsive en caso hagan resize, o giren la tablet o celular con el menu responsive abierto
	//detectando moviendo de ipad y tablet
	function readDeviceOrientation() {
	    switch (window.orientation) {  
	    case 0:  
	        break; 
	    case 180:  
	        break; 
	    case -90:  
	        break;  
	    case 90:  
	        break;
	    }
	}
	//detectando tablet, celular o ipad
	dispositivo_movil = $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))

	if ( dispositivo_movil ) {
			function readDeviceOrientation() {
			    if (Math.abs(window.orientation) === 90) {
			        // Landscape
			      	cerrar_nav();
			      	cerrar_submenu();
			    } else {
			    	// Portrait
			    	cerrar_nav();
			    	cerrar_submenu();
			    }
			}
			window.onorientationchange = readDeviceOrientation;
	}else{
		$(window).resize(function(event) {
			var estadomenu = $('.menu-responsive').width();
			if(estadomenu != 0){
				cerrar_nav();
			}
			cerrar_submenu();
		});
	};


	// Ancla scroll - AGREGAR CLASE DEL ENLACE
	$('a[href*=#]').click(function() {
	if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')&& location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
			var targetOffset = $target.offset().top;
			$('html,body').animate({scrollTop: targetOffset}, 1000);
			return false;
			}
		}
	});
/* --- FIN BASE --- */
	/*MAPA*/
	function initMaplima() {
	    var $map = $('#google-maplima');
        if (! $map.length) return;
        var myLatlng = new google.maps.LatLng(-12.0753692,-77.0482882);
        var styles  = [  {"featureType": "water","stylers": [{"color": "#eee"},{"visibility": "on"}]},
        				{"featureType": "landscape","stylers": [{"color": "#f2f2f2"}]},
        				{"featureType": "road","stylers": [{"saturation": - 100},{"lightness": 45}]},
        				{"featureType": "road.highway","stylers": [{"visibility": "simplified"}]},
        				{"featureType": "road.arterial","elementType": "labels.icon","stylers": [{"visibility": "on"}]},
        				{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#444444"}]},
        				{"featureType": "transit","stylers": [{"visibility": "on"}]},{"featureType": "poi","stylers": [{"visibility": "on"}]}
        			]
        var mapOptions = {
        		zoom             : 18,
                center           : myLatlng,
                mapTypeControl   : true,
                disableDefaultUI : true,
                zoomControl      : true,
                scrollwheel      : false,
                styles           : styles,
                draggable        : true
        }
		var map = new google.maps.Map(document.getElementById('google-maplima'), mapOptions);
        var marker = new google.maps.Marker({ position: myLatlng, map: map, icon:'images/icon.png' });
    }
	google.maps.event.addDomListener(window, 'load', initMaplima);

});