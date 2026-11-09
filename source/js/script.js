function init_menu() {
  const $js_header_menu_toggle = $('.js_header_menu_toggle'),
    $main_nav = $('.main-nav'),
    $dropdown = $main_nav.find('.js_header_dropdown');

  $dropdown.css('top', $main_nav.outerHeight());

  $js_header_menu_toggle.on('click', function () {
    $('.bar').toggleClass('animate');

    if ($dropdown.is(':visible')) {
      $dropdown.slideUp(300, function () {
        $main_nav.removeClass('open');
      });
    } else {
      $dropdown.slideDown(300);
      $main_nav.addClass('open');
      $dropdown.css('display', 'flex');
    }
    $('.header, body').toggleClass('modal-open');
    $(document).on('click', function document_click_handler(evt) {
      if (
        !$(evt.target).is('.main-nav') &&
        !$(evt.target).closest('.js_header_menu_toggle').length &&
        !$(evt.target).is('.js_header_menu_toggle')
      ) {
        $main_nav.removeClass('open');
        $dropdown.slideUp(300);
        $('.bar').removeClass('animate');
        $('.header, body').removeClass('modal-open');
        $(document).off('click', document_click_handler);
      }
    });
  });
}

function init_contact_form() {
  const $callback_form = $('.js_contact_form');

  $('input[name="phone"]').on('keydown', function (evt) {
    $(this).mask('+7 (000) 000-00-00');
  });

  $callback_form.each(function () {
    const $form = $(this);
    $form.validate({
      errorPlacement: function (error, element) {},
    });
  });

  /*  for dev */
  $('.contact-form .js_contact_form').on('submit', function () {
    $('.contact-form .js_contact_form_success').addClass('open');
  });

  $('.js_contact_form_success .modal__btn').on('click', function (evt) {
    $('.contact-form .js_contact_form_success').removeClass('open');
  });

  $('.modal .js_contact_form').on('submit', function () {
    const $form = $(this),
      $modal = $form.closest('.modal');

    $modal.removeClass('open');

    $('#success').addClass('open');
  });
}

function init_modals() {
  const $modal_open = $('.js_modal_open'),
    $modal_close = $('.js_modal_close');

  $modal_open.on('click', function (evt) {
    evt.preventDefault();

    const $btn = $(this),
      $modal = $(`${$btn.attr('href')}`);

    if ($modal.data('side')) {
      $('#success .modal__window')
        .removeClass()
        .addClass(`modal__window modal__window--${$modal.data('side')}`);
    }

    $modal.addClass('open');
  });

  $modal_close.on('click', function (evt) {
    evt.preventDefault();

    const $btn = $(this),
      $modal = $btn.closest('.modal');

    $modal.removeClass('open');
  });

  $('.modal').on('click', function (evt) {
    if (!$(evt.target).closest('.modal__window').length && !$(evt.target).is('.modal__window')) {
      $(this).removeClass('open');
    }
  });
}

function init_custom_select() {
  const $select = $('.custom-select'),
    $selected = $select.find('.custom-select__selected'),
    $options = $select.find('.custom-select__options'),
    $option = $options.find('.custom-select__option'),
    $hiddenInput = $select.find('input[type="hidden"]');

  $selected.on('click', function () {
    if ($options.is(':visible')) {
      $options.slideUp(300);
      $select.removeClass('open');
    } else {
      $options.slideDown(300);
      $select.addClass('open');

      $(document).on('click', function doc_click_handler(e) {
        if (!$(e.target).closest($select).length) {
          $options.slideUp(300);
          $select.removeClass('open');
          $(document).off(doc_click_handler);
        }
      });
    }
  });

  $option.on('click', function () {
    $selected.find('span').text($(this).text());
    $hiddenInput.val($(this).data('value'));
    $options.slideUp(300);
    $select.removeClass('open');
  });
}

/* function init_cookie() {
  const $cookie = $('.cookie'),
    $close = $cookie.find('.js_cookie_close');

  $close.on('click', function (evt) {
    evt.preventDefault();

    $cookie.hide();
  });
} */

function init_map() {
  if (!$('#map').length) {
    return false;
  }

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.754579, 37.624345],
      zoom: 16,
      controls: [],
    });
    var myPlacemark = new ymaps.Placemark(
      [55.754579, 37.624345],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: './img/map_marker.svg',
        iconImageSize: [36, 63],
        iconImageOffset: [-23, -63],
      }
    );
    myMap.geoObjects.add(myPlacemark);
  }
}

function init_telegram_popup() {
  const $popup = $('.js_telegram_popup'),
    $toggle = $('.js_telegram_popup_toggle');

  if (!$popup.length || !$toggle.length) {
    return false;
  }

  $toggle.on('click', function (evt) {
    evt.preventDefault();

    if ($popup.is('.open')) {
      close_popup();
    } else {
      $popup.addClass('open');
      $popup.slideDown(300, function () {
        $popup.css('display', 'flex');
      });
      $toggle.addClass('open');
    }
    $(document).on('click', function telegram_doc_click_handler(evt) {
      if (
        !$(evt.target).is($popup) &&
        !$(evt.target).closest($popup).length &&
        !$(evt.target).is($toggle) &&
        !$(evt.target).closest($toggle).length
      ) {
        close_popup();
        $(document).off('click', telegram_doc_click_handler);
      }
    });
  });

  function close_popup() {
    $popup.slideUp(300, function () {
      $popup.removeClass('open');
      $popup.css('display', 'none');
    });
    $toggle.removeClass('open');
  }
}

function init_slider() {
  const $slider = $('.slider');

  if (!$slider.length) {
    return false;
  }

  $slider.slick({
    dots: false,
    infinite: true,
    prevArrow: $('.js_slider_btn_prev'),
    nextArrow: $('.js_slider_btn_next'),
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
}

function init_gallery() {
  const $gallery = $('.gallery'),
    $status = $('.js_gallery_count');

  if (!$gallery.length) {
    return false;
  }

  $gallery.on('init reInit afterChange', function (event, slick, currentSlide) {
    // currentSlide undefined при init — ставим 0
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.slideCount);
  });

  $gallery.slick({
    dots: false,
    infinite: true,
    prevArrow: $('.js_gallery_btn_prev'),
    nextArrow: $('.js_gallery_btn_next'),
    slidesToScroll: 1,
    slidesToShow: 1,
    swipeToSlide: true,
  });
}

$(document).ready(function () {
  init_menu();
  init_contact_form();
  init_modals();
  init_custom_select();
  init_map();
  init_telegram_popup();
  init_slider();
  init_gallery();
  // init_cookie();
});
