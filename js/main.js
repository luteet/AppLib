
$(function () {

    /* let scene_1 = $('.intro__scene').get(0),
        parallaxInstance_1 = new Parallax(scene_1); */


    var heightHeader, widthWindow = $(window).width();

    function mediaEvents() {
        /* if (widthWindow > 769) {
            $.each($('.section-image'), function () {
                $(this).parent().css('min-height', $(this).height() + 'px');
                console.log('active');
            });
        } */
        if (widthWindow > 992) {
            heightHeader = $('.header').height() * 1.6;
            $('.intro').css('padding', `${heightHeader}px 0`);
            $('.burger, .header__nav').removeClass(['active', 'transition-0-2s']);
            $('body').removeClass('lock');
        }
        else {
            heightHeader = $('.header').height();
            $('.intro').css('padding', `${heightHeader}px 0`);
            $('.burger, .header__nav').addClass('transition-0-2s');
            //$('.header__nav').show(0)
        }
    }
    mediaEvents();
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
                $(header).addClass(ifHeaderTopClass);
            }
            else if (scrolled > ifHeaderTopDistance) {
                $(header).removeClass(ifHeaderTopClass);
            }
        }

        ifHeaderTop();

        if (typeof settings.loaded == 'string') {
            let classLoaded = settings.loaded;
            $(header).addClass(classLoaded);
        }
        else if (settings.loaded == true && typeof settings.loaded == 'boolean') {
            $(header).addClass('loaded');
        }
        let windowSize = (widthWindow < 1920) ? widthWindow : 1920,
            marginHeaderFirst = 17 * windowSize / 1920 / 100 * 150;
        if (scrolled <= 200) {
            marginHeader = 17 * windowSize / 1920 / 100 * scrolled;
        }
        else {
            marginHeader = 17 * windowSize / 1920 / 100 * 150;
        }

        if (windowSize >= 992) {
            $('.header').css('margin', `-${marginHeader}px 0`).css('padding-top', `${marginHeaderFirst + 10}px`);
        }

        if (scrolled == 0) {

        }

        $(window).resize(function () {
            mediaEvents();
            widthWindow = $(window).width();
            if ($(this).width() < 1920) {
                windowSize = $(window).width();
            }
            else {
                windowSize = 1920;
            }
        });
        function btnToTop() {
            if (scrolled > 150) {
                $('.btn-to-top').removeClass('_none');
            }
            else {
                $('.btn-to-top').addClass('_none');
            }
        }
        btnToTop();

        $(window).scroll(function () {
            scrolled = $(window).scrollTop();
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            if (scrolled == Math.trunc($('body').height() - $(window).height())) {
                $('.btn-to-top').removeClass(settings.classToHide);
            }
            ifHeaderTop();
            btnToTop();
            if (scrolled < 150 && widthWindow > 992) {
                //console.log(15 / 100 * scrolled);
                marginHeader = 17 * windowSize / 1920 / 100 * scrolled;
                marginHeaderFirst = 17 * windowSize / 1920 / 100 * 150;
                // top
                $('.header').css('margin', `-${marginHeader}px 0`)//.css('padding-top', `${marginHeader}px`);
            }
            else if (scrolled > 150 && widthWindow > 992) {
                $('.header').css('margin', `-${marginHeaderFirst}px 0`).css('padding-top', `${marginHeaderFirst + 10}px`);

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
                //$(header).addClass(settings.classToHide);
                $('.btn-to-top').addClass(settings.classToHide);
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                //$(header).removeClass(settings.classToHide);
                $('.btn-to-top').removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
        });
        setTimeout(function () {
            $(header).fadeIn(200)
        }, 400)

    }

    hHeader({
        elemName: $('.header'),
        classToHide: 'hide',
        distanceHide: 100,
        distanceShow: 100,
        ifHeaderTop: ['top', 150],
        classAnchorForTop: true
    });

    //$('.header').height()
    //$('.intro').css('padding-top', `${}`)
    if ($(this).width() > 992) {
        heightHeader = $('.header').height() * 1.6;
        $('.intro').css('padding', `${heightHeader}px 0`);
    }
    else {
        heightHeader = $('.header').height();
        $('.intro').css('padding', `${heightHeader}px 0`);
    }

    function hoverPerspective(elem, elemBody) {
        if (widthWindow > 992) {
            var card = elemBody;
            card.on('mousemove', function (e) {
                var x = e.clientX - $(this).offset().left + $(window).scrollLeft();
                var y = e.clientY - $(this).offset().top + $(window).scrollTop();

                var rY = map(x, 0, $(this).width(), -17, 17);
                var rX = map(y, 0, $(this).height(), -17, 17);
                $(this).children(elem).css("transform", "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)");
            });

            card.on('mouseenter', function () {
                $(this).children(elem).css({
                    transition: "all " + 0.05 + "s" + " linear",
                });
            });

            card.on('mouseleave', function () {
                $(this).children(elem).css({
                    transition: "all " + 0.2 + "s" + " linear",
                });

                $(this).children(elem).css("transform", "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)");
            });

            function map(x, in_min, in_max, out_min, out_max) {
                return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
        }
    }

    hoverPerspective('.btn', $(".btn-body"));


    $('.burger').on('click', function () {
        $('.burger, .header__nav').toggleClass('active');


        $('body').toggleClass('lock');
    });


    let btnTab = $('.subscriptions__tabs--btn'), tab = $('.subscriptions__tab'), tabButtons = $('.subscriptions__tabs--buttons');



    $(btnTab).on('click', function (funcElem) {
        //$('..subscriptions__tabs--btn-bg').css()
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

            $(tab).fadeOut(200);

            setTimeout(function () {
                $($(e).attr('href')).fadeIn(200);
            }, 200)



        }
    });

    btnTab[0].click()





    /* if (widthWindow > 769) {
        $.each($('.section-image'), function () {
            //$($(this).children('[data-src]')).attr('src', $($(this).children('[data-src]')).data('src'));
            
            $($(this).find('img')).on('load', function() {
                $(this).parent().css('min-height', $(this).find('img').height() + 'px');
            });
            
        });
    } */

    /* $('.btn').hover(function(e) {
        if($(window).width() > 769) {
            $(this).css('transition', 'all 0.2s ease-in-out');
           let heightBox = $(this).height() / 2, widthBox = $(this).width() / 2;
            $('.btn').on('mousemove', function(e) {
                $(this).css("transform", "rotateY(" + (e.offsetX - widthBox) / 20 + "deg) translate3d(0, 0, 0px)")
            }); 
        }
    }, 
    function() {
        $(this).css('transition', 'all 0.2s ease-in-out').css('transform', 'rotateX(0deg) rotateY(0deg)');
    }) */
    let faqLi = $('.faq__li');
    $(faqLi).on('click', function () {
            
        if (!$(this).find('.faq__question').hasClass('active')) {
            $('.faq__question.active').removeClass('active').next('.faq__answear').slideUp(500);
            $(this).find('.faq__question').addClass('active').next('.faq__answear').slideDown(500);
        }
        else if ($(this).find('.faq__question').hasClass('active')) {
            $(this).find('.faq__question').removeClass('active').next('.faq__answear').slideUp(500);
        }

    });

    $(faqLi[0]).click();

});

