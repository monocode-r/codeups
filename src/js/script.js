"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  var mySwiper = new Swiper('.js-mv-swiper', {
    // 以下にオプションを設定
    effect: 'fade',
    loop: true,
    //最後に達したら先頭に戻る
    autoplay: {
      delay: 3000
    },
    speed: 1500
  });
  var mySwiper2 = new Swiper('.js-campaign-swiper', {
    loop: true,
    slidesPerView: '1.2',
    spaceBetween: 24,
    width: 345,
    navigation: {
      nextEl: '.swiper-button-next',
      //「次へボタン」要素の指定
      prevEl: '.swiper-button-prev' //「前へボタン」要素の指定
    },

    breakpoints: {
      // ブレークポイント
      768: {
        // 画面幅600px以上で適用
        slidesPerView: '3.5',
        spaceBetween: 40,
        width: 1270
      }
    }
  });

  // ページトップボタン
  $(document).ready(function () {
    $(".js-pagetop").hide();
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $(".js-pagetop").fadeIn("fast");
      } else {
        $(".js-pagetop").fadeOut("fast");
      }
      let scrollHeight = $(document).height(); //ドキュメントの高さ
      let scrollPosition = $(window).height() + $(window).scrollTop(); //現在地
      let footHeight = $(".footer").innerHeight(); //footerの高さ（＝止めたい位置）
      if (scrollHeight - scrollPosition <= footHeight) {
        //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
        $(".page-top").css({
          "position": "absolute",
          //pisitionをabsolute（親：wrapperからの絶対値）に変更
          "bottom": footHeight + 20 //下からfooterの高さ + 20px上げた位置に配置
        });
      } else {
        //それ以外の場合は
        $(".page-top").css({
          "position": "fixed",
          //固定表示
          "bottom": "20px" //下から20px上げた位置に
        });
      }
    });

    $('.js-pagetop').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on('click', 'a[href*="#"]', function () {
    var time = 400;
    var header = $('header').innerHeight();
    var target = $(this.hash);
    if (!target.length) return;
    var targetY = target.offset().top - header;
    $('html,body').animate({
      scrollTop: targetY
    }, time, 'swing');
    return false;
  });

  // ヘッダー追従：背景色変更
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        // スクロール位置が100pxを超えたら
        $('.header').addClass('is-scroll'); // "scrolled"クラスを追加
      } else {
        $('.header').removeClass('is-scroll'); // "scrolled"クラスを削除
      }
    });
  });

  $(document).ready(function() {
    let $toggleBtn = $('.js-hamburger');
    let $toggleMenu = $('.nav');

    $toggleBtn.click(function(){
      $toggleBtn.toggleClass('is-open');
      $toggleMenu.toggleClass('is-open');
      if($toggleMenu.hasClass('is-open')) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').css('overflow', '');
      }
    });
    $toggleMenu.on('click', 'a', function(event){
      event.preventDefault();
    });
  });

  // 画像アニメーション
  var box = $('.js-img-animation'),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="is-img-scroll"></div>');
    var color = $(this).find($('.is-img-scroll')),
      image = $(this).find('img');
    var counter = 0;
    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          'width': '100%'
        }, speed, function () {
          image.css('opacity', '1');
          $(this).css({
            'left': 'auto',
            'right': '0'
          });
          $(this).animate({
            'width': '0%'
          }, speed);
        });
        counter = 1;
      }
    });
  });
});
