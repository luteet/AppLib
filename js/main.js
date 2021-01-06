
$(function () {

    var heightHeader, widthWindow = $(window).width(),

        body                    = $('body'),
        HtmlBody                = $('html, body'),
        header                  = $('.header'),

        burger                  = $('.burger'),
        headerNav               = $('.header__nav'),
        burgerAndHeaderNav      = $('.burger, .header__nav');


    burger.on('click', function () {
        burgerAndHeaderNav.toggleClass('active');
        HtmlBody.toggleClass('lock');
    });


    function mediaEvents() {
        if (widthWindow > 992) {
            heightHeader = header.height() * 1.6;
            $('.intro').css('padding', `${heightHeader}px 0`);
            burgerAndHeaderNav.removeClass(['active', 'transition-0-2s']);
            HtmlBody.removeClass('lock');
        }
        else {
            heightHeader = header.height();
            $('.intro').css('padding', `0px 0`);
            burgerAndHeaderNav.addClass('transition-0-2s');
          
        }
    }
    mediaEvents();


    $('.btn-to-top').on('click', function() {
        HtmlBody.animate({
            scrollTop: 0
        }, 1500);
    })

    var start_scroll = false, headerHeight = $('.header').height();

    $('.btn-scroll').on('click', function (e) {
        e.preventDefault();
        burgerAndHeaderNav.removeClass('active');
        HtmlBody.removeClass('lock').css('margin-right', '0px');
        if (start_scroll == false) {
            start_scroll = true;

        let scrollName = $(this).attr('href'), scrollElem = $(scrollName), scrollTop = scrollElem.offset().top;
            headerHeight = header.height();
    
          headerPositionTop = header.offset().top;

          if ($(this).hasClass('btn-scroll-last')) {
            scrollTop = $(document).height() - $(window).height() + headerHeight;
          }

          if(headerPositionTop <= scrollTop) {
              if((scrollTop - headerPositionTop) >= 250) {
                  HtmlBody.animate({
                    scrollTop: scrollTop
                  }, 1500);
              }
          }
          else {
            HtmlBody.animate({
                scrollTop: scrollTop - headerHeight
              }, 1500);
          }

          setTimeout(function () {
            start_scroll = false;
          }, 1500);
        }
      });

    function hHeader(settings) {

        let header = settings.elemName,
            distance = settings.distance,
            scrollPrev = 0, ifHeaderTopClass, ifHeaderTopDistance,
            scrollDown = distance,
            distanceHide = settings.distanceHide,
            distanceShow = settings.distanceShow,
            scrolled = $(window).scrollTop(),
            scrollDownCheck = false,
            scrollTop = 0,
            scrollTopCheck = false,
            scrollToTop = false,
            scrollToDown = false;


            scrollDown = distanceHide;

            ifHeaderTopClass = settings.ifHeaderTop[0];
            ifHeaderTopDistance = settings.ifHeaderTop[1];


        function ifHeaderTop() {
            if (scrolled <= ifHeaderTopDistance) {
                header.addClass(ifHeaderTopClass);
            }
            else if (scrolled > ifHeaderTopDistance) {
                header.removeClass(ifHeaderTopClass);
            }
        }

        ifHeaderTop();

        if (typeof settings.loaded == 'string') {
            let classLoaded = settings.loaded;
            header.addClass(classLoaded);
        }
        else if (settings.loaded == true && typeof settings.loaded == 'boolean') {
            header.addClass('loaded');
        }
        
        let marginHeaderFirst = 17 * widthWindow / 1920 / 100 * 150;
        if (scrolled <= 200) {
            marginHeader = 17 * widthWindow / 1920 / 100 * scrolled;
        }
        else {
            marginHeader = 17 * widthWindow / 1920 / 100 * 150;
        }

        if (widthWindow >= 992) {
            header.css('margin', `-${marginHeader}px 0`).css('padding-top', `${marginHeaderFirst + 10}px`);
        }

        $(window).resize(function () {
            mediaEvents();
            headerHeight = $(header).height();
            //widthWindow = $(window).width();
            ($(this).width() < 1920) ? widthWindow = $(window).width() : widthWindow = 1920;
        });
        function btnToTop() {
            if (scrolled < 150) {
                $('.btn-to-top').addClass('hide');
            }
        }
        btnToTop();

        $(window).scroll(function () {
            scrolled = $(window).scrollTop();
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            if (scrolled == Math.trunc(body.height() - $(window).height())) {
                $('.btn-to-top').removeClass(settings.classToHide);
            }
            ifHeaderTop();
            btnToTop();
            if (scrolled < 150 && widthWindow > 992) {
                //console.log(15 / 100 * scrolled);
                marginHeader = 17 * widthWindow / 1920 / 100 * scrolled;
                marginHeaderFirst = 17 * widthWindow / 1920 / 100 * 150;
                // top
                $(header).css('margin', `-${marginHeader}px 0`)
            }
            else if (scrolled > 150 && widthWindow > 992) {
                $(header).css('margin', `-${marginHeaderFirst}px 0`).css('padding-top', `${marginHeaderFirst + 10}px`);

            }
            if (scrolled > 100 && scrolled > scrollPrev) {
                if (scrollToDown == false) {
                    scrollToTop = false;
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    scrollToDown = true;
                }

            } else if (scrollToTop == false) {

                scrollToDown = false;
                scrollTop = scrolled - distanceShow;
                scrollTopCheck = false;
                scrollToTop = true;
            }

            scrollPrev = scrolled;
            if (scrolled >= scrollDown && scrollDownCheck == false) {
                // hide elem
                $(header).addClass(settings.classToHide);
                $('.btn-to-top').addClass(settings.classToHide);
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                $(header).removeClass(settings.classToHide);
                $('.btn-to-top').removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            
            if (scrolled >= ($('.wrapper').height() - 100 - $(window).height())) {
                $('.btn-to-top').removeClass(settings.classToHide);
            }   

            let activeHeaderOnMouse = false;
            body.on('mousemove', function(e) {
                if(e.clientY <= (headerHeight + 15) && header.hasClass('hide') && activeHeaderOnMouse == false) {
                    activeHeaderOnMouse = true;
                    $(header).removeClass(settings.classToHide);
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    
                }
            })

        });
        setTimeout(function () {
            $(header).fadeIn(200)
        }, 400)

    }

    hHeader({
        elemName: $(header),
        classToHide: 'hide',
        distanceHide: 200,
        distanceShow: 100,
        ifHeaderTop: ['top', 150],
        classAnchorForTop: true
    });

    if (widthWindow > 991) {
        heightHeader = (header.height() < 150) ? header.height() * 1.6 : 150;
        $('.intro').css('padding', `${heightHeader}px 0`);
    }
    else {
        heightHeader = (header.height() < 150) ? header.height() * 1.6 : 150;
        $('.intro').css('padding', `0px 0`);
    }

    function hoverPerspective(elem, elemBody) {
        if (widthWindow > 992) {
            var card = elemBody;
            card.on('mousemove', function (e) {

                var x = e.clientX - $(this).offset().left + $(window).scrollLeft(),
                    y = e.clientY - $(this).offset().top + $(window).scrollTop(),

                    rY = map(x, 0, $(this).width(), -17, 17),
                    rX = map(y, 0, $(this).height(), -17, 17);

                $(this).children(elem).css('transform', `rotateY(${rY}deg) rotateX(${-rX}deg)`);
            });

            card.on('mouseenter', function () {
                $(this).children(elem).css({
                    transition: `all 0.05s linear`,
                });
            });

            card.on('mouseleave', function () {
                $(this).children(elem).css({
                    transition: `all 0.2s linear`,
                });

                $(this).children(elem).css('transform', `rotateY(0deg) rotateX(0deg)`);
            });

            function map(x, in_min, in_max, out_min, out_max) {
                return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
        }
    }

    hoverPerspective('.btn', $(".btn-body"));

    let btnTab = $('.subscriptions__tabs--btn'), tab = $('.subscriptions__tab'), tabButtons = $('.subscriptions__tabs--buttons');

    $(btnTab).on('click', function (funcElem) {
        funcElem.preventDefault();
        if (!$(this).hasClass('active')) {

            $('.subscriptions__tabs--btn').removeClass('active')

            let e = $(this), x = $(e).offset().left - $(e).parent().offset().left, w = $(e).width() + 30, h = $(tabButtons).height();

            $(e).addClass('active')

            $('.subscriptions__tabs--btn-bg').css('left', `${x}px`).css('width', `${w}px`).css('height', `${h}px`);

            $(window).resize(function () {
                x = $(e).offset().left - $(e).parent().offset().left, w = $(e).width() + 30, h = $(tabButtons).height();
                $('.subscriptions__tabs--btn-bg').css('left', `${x}px`).css('width', `${w}px`).css('height', `${h}px`);
            })
            $(tab).parent().css('min-height', $(tab).parent().height() + 'px')
            $(tab).fadeOut(200);

            setTimeout(function () {
                $($(e).attr('href')).fadeIn(200);
                $(tab).parent().css('min-height', '0px')
            }, 200)

        }
    });
    $(document).ready(function() {
        btnTab[0].click()
    })
    
    


    let faqLi = $('.faq__li');
    $(faqLi).on('click', function () {
            
        if (!$(this).find('.faq__question').hasClass('active')) {
            $('.faq__question.active').removeClass('active').next('.faq__answear').slideUp(500);
            faqLi.removeClass('active')
            $(this).addClass('active').find('.faq__question').addClass('active').next('.faq__answear').slideDown(500);
        }
        else if ($(this).find('.faq__question').hasClass('active')) {
            
            $(this).removeClass('active').find('.faq__question').removeClass('active').next('.faq__answear').slideUp(500);
        }

    });

    $(faqLi[0]).click();


    new WOW().init();

});

