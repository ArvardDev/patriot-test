$(function() {
	// === плагин - маска для телефона
	$(function () {
		$("input[type='tel']").mask('+7 (999) 999-99-99');
	});
  // === END

  var s_win_w = $(window).width();
  $(window).resize(function(){
    win_w = $(window).width();
    if (win_w >= s_win_w == 1440 || win_w <= s_win_w*0.7) {
      location.reload();
    }
  });

	// ===  mobile-menu
  if ($(window).width() > 600) {
    $('.mobile-menu-btn').on('click', function () {
      $('.header__nav').slideToggle("slow");
      $('.nav__link').removeClass("active").next('ul').slideUp();
    });
  }
  if ($(window).width() <= 600) {
    $('.mobile-menu-btn').on('click', function () {
      $('.header__actions').slideToggle("slow");
      $('.nav__link').removeClass("active").next('ul').slideUp();
    });
  }
  if ($(window).width() >= 1024) {
    $('.nav__item').on( "mouseenter mouseleave", function () {
    // $('.nav__item').hover(function () {
      $(this).children('ul').slideToggle();
    });
  }
  if ($(window).width() < 1024) {
    $('.nav__link').on('click', function () {
      $(this).next('ul').slideToggle("slow");
      $(this).toggleClass("active");
    });
  }
	// === END

	// === Скрыть мобильное меню, по клику вне блока
	let btnCategories = $(".mobile-menu-btn"); // указываем кнопку
	let categories = $(".header__actions"); // указываем список
	
	$(document).mouseup(function (e) { // событие клика по веб-документу
	if ( ! btnCategories.is(e.target) && btnCategories.has(e.target).length === 0 &&
		 // если клик был не по нашему блоку
		 ! categories.is(e.target) && categories.has(e.target).length === 0
		 // и не по его дочерним элементам
		   ) {
      categories.fadeOut(); // скрываем его
      $('.mobile-menu-btn').children('svg').removeClass('active');
      $('.nav__link').removeClass("active").next('ul').slideUp();
		}
	});
	// === END
	
	// === Слайдер на первом экране
  $('.hero__slider').owlCarousel({
    margin:100,
    items:1,
    smartSpeed:2000,
    nav:true,
    dots:false,
    mouseDrag: false,
    responsive:{
      319:{
          nav: false,
          dots: true,
      },
      600:{
          nav: false,
          dots: true,
      },
      1025:{
      }
    }
  })
	// === END
	
	// === Слайдер тарифов
  $('.tariffs__slider').owlCarousel({
    margin:30,
    stagePadding:1,
    items:4,
    smartSpeed:2000,
    nav:true,
    dots:false,
    responsive:{
      320:{
          items:1,
          margin:20,
          nav: false,
          dots: true,
      },
      600:{
          items:2,
          margin:20,
          nav: false,
          dots: true,
      },
      1024:{
          items:3,
          margin:25,
      },
      1200:{
          items:4
      }
    }
  })
	// === END
	
	// === Плавный скролл по странице
	// $(".link-to-anchor").on("click","a", function (event) {
	// 	event.preventDefault();
	// 	var id  = $(this).attr('href'),
	// 		top = $(id).offset().top;
	// 	$('body,html').animate({scrollTop: top - 50}, 1200);
	// });
	// === END

	// === Кнопка Наверх
	// function backToTop() {
	// 	let button = $('.back-to-top');

	// 	$(window).on('scroll', () => {
	// 		if ($(this).scrollTop() >= 500) {
	// 			button.fadeIn();
	// 		} else {
	// 			button.fadeOut();
	// 		}
	// 	});

	// 	button.on('click', (e) => {
	// 		e.preventDefault();
	// 		$('html').animate({scrollTop: 0}, 1000)
	// 	})
	// };
	// backToTop();
	// === END



  // ================ JS код без JQuery ================

  // ================ Валидация формы и отправка на почту ================
  const validation = new JustValidate('.feedback-form');

  validation
    .addField('.input-name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите больше 2 символов',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'максимум 30 символов',
      },
      {
        rule: 'required',
        errorMessage: 'Введите имя!',
      },
    ])
    .addField('.input-tel', [
      {
        rule: 'required',
        errorMessage: 'Телефон обязателен',
      },
    ])
    .addField('.input-check', [
      {
        rule: 'required',
        errorMessage: 'Необходимо принять правила',
      },
    ]).onSuccess((event) => {

      // ================ отправка на почту ================
      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Форма заполнена правильно и отправлена');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });

});