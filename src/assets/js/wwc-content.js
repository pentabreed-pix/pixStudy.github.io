$(function(){

    var SLIDER_WIDTH = 1920;
    var SLIDER_HEIGHT = 1080;

    var contentLoaded = false;
    var contentStarted = false;
    var pageID = '';
    var windowWidth = $(window).innerWidth();
    var windowHeight = $(window).innerHeight();
    var $window = $(window);
    var $wwcMain = $('#wwcMain');
    var scrollArea = $wwcMain;
    var scrollbar;
    var scrollTop = 0;
    var isAjaxLoading = false;
    var isAutoScrolling = false;

    // els
    var $html = $('html');
    var $wwcContent = $('#wwcContent');

    var $wwcTopVideo;
    var $wwcContentTop;
    var $wwcContentTopInner;
    var $wwcIntro;
    var $wwcVideoContainer;
    var $wwcContentTopLogoImg;
    var $wwcIntroVideo;
    var $wwcIntroVideoArea;
    var $wwcIntroVideoAreaInner;
    var $wwcSections;
    var $wwcAnimGroups;
    var $wwcSectionBgFronts;
    var $wwcSectionHistory;
    var $wwcHistory;
    var $wwcHistoryBlocks;
    var $wwcHistoryViewer;
    var $wwcSectionNext;
    var $wwcNextBg;
    var $wwcBtnAll;

    $window.on('wwcLoadContent', function(e, url){
        loadContent(url);
    });

    $window.on('popstate', function(e) {
        window.location.reload(true);
    });

    function loadContent(url) {

        contentStarted = contentLoaded = false;

        $wwcContent.html('');

        $html.removeClass('wwc-loading-next').removeClass('wwc-active-next').addClass('wwc-loading');

        isAjaxLoading = true;

        $wwcContent.load(url + ' .wwc-content', function () {

            pageID = $('.wwc-content').attr('data-page-id');

            history.pushState({ page_type: 'sub' }, pageID, url);

            $('.wrapper').attr('class', 'wrap subNavi_whatWeCreate_' + pageID + ' wrapper');


            $('video').each(function(){
                var video = $('<video playsinline muted autoplay loop></video>').attr('src', $(this).attr('src')).attr('poster', $(this).attr('poster'));
                video.insertBefore(this);
                $(this).remove();
                video.attr('id', $(this).attr('id'));
            });


            $(window).trigger('wwcContentLoaded');
            showContent();
        });
    };



    function showContent() {

        contentLoaded = true;

        $wwcTopVideo = $('#wwcTopVideo');
        $wwcIntroVideo = $('#wwcIntroVideo');
        $wwcContentTop =  $('.wwc-section-top');
        $wwcContentTopInner =  $('.wwc-section-top-inner');
        $wwcContentTopLogoImg = $('.wwc-logo img', $wwcContentTopInner);
        $wwcIntro = $('.wwc-intro');
        $wwcVideoContainer = $('.wwc-video-container');
        $wwcSections = $('.wwc-section');
        $wwcAnimGroups = $('.wwc-anim-group');
        $wwcSectionBgFronts = $('.wwc-section-bg-front');

        $wwcIntroVideoArea = $('.wwc-intro-video-area');
        $wwcIntroVideoAreaInner = $('.wwc-intro-video-area-inner');

        $wwcSectionHistory = $('.wwc-section-history');
        $wwcHistory = $('.wwc-history');
        $wwcHistoryBlocks = $('.wwc-history-block', $wwcHistory);
        $wwcHistoryViewer = $('.wwc-history-viewer');

        $wwcSectionNext = $('.wwc-section.wwc-next');
        $wwcNextBg = $('.wwc-next-bg', $wwcSectionNext);

        $wwcBtnAll = $('.wwc-btn-all');

        scrollArea.scrollTop(0);

        $('.wwc-content').addClass('active');

        $(window).trigger('resize');

        initContent();
    };

    function initContent() {

        $wwcTopVideo.on('playing', function(){
            $wwcTopVideo.addClass('active');
            $('.wwc-loading-bg').fadeOut(600, function(){
                $('.wwc-loading-bg').remove();
            });
        });
        $wwcTopVideo[0].play();

        $wwcContent.removeClass('wwc-from-index');
        $('.wwc-loading-bg').appendTo('.wwc-section-top-inner');

        if (isAjaxLoading) {
            scrollArea.scrollTop(0);
        }

        setTimeout(function(){
            startContent();
        }, 1200);
    }

    function startContent() {
        if ( window.isDesktop() || true ) { // 무조건 smooth scrollbar 실행되게 수정
            scrollbar = Scrollbar.init(scrollArea[0],{
                damping:0.05,
                speed:1.8,
                syncCallbacks: true,

            });
            scrollbar.addListener(scrollbarScrolled);

        } else {
            scrollArea.css({
                'overflow': 'auto',
                '-webkit-overflow-scrolling': 'touch',
            });
        }

        gsap.to($wwcBtnAll, 1, {alpha:1, x:0});

        $html.removeClass('wwc-first-content-loading wwc-loading');

        $window.trigger('resize').trigger('scroll');
        contentStarted = true;

        initHistory();

    }

    $window.on('resize', function(){

        windowWidth = $(window).innerWidth();
        windowHeight = $(window).innerHeight();

        var scale = getScale();

        if($('.wwc-section-top-inner')[0]) {
            $('.wwc-section-top-inner').height(scale.height);
            $('.wwc-next-bg-inner').height(scale.height);
        }


        if($('.wwc-video-container')[0]) {
            $('.wwc-video-container').css({
                'transform': 'translate(-50%,-50%) scale(' + scale.max + ')'
            });
        }


        if($wwcIntroVideo) $wwcIntroVideo.width(1920 * scale.max).height(1080 * scale.max);

        parallax();
    }).trigger('resize');


    scrollArea.on('scroll', function(e){

        if ( isAutoScrolling ) e.preventDefault();
        if ( contentLoaded == false) return;
        scrollTop = scrollArea.scrollTop();


        parallax();

    });

    function scrollbarScrolled(status) {
        if ( contentLoaded == false) return;
        scrollTop = status.offset.y;
        parallax();

    }


    function parallax() {
        if ( contentLoaded == false || contentStarted == false) return;

        if ( scrollTop > 40) {
            gsap.to($wwcBtnAll, .5, {autoAlpha:0});
        } else {
            gsap.to($wwcBtnAll, .5, {autoAlpha:1});
        }

        checkAnimGroup(scrollTop);
        checkSectionBg(scrollTop);

        checkContentTop(scrollTop);
        checkIntroVideo(scrollTop);
        checkHistory(scrollTop);

        $window.trigger('wwcContentScrolled', [scrollTop]);

    }

    function checkContentTop(scrollTop) {
        var ty = scrollTop * .5;
        if ( scrollTop <  windowHeight * 1.5 ) {
            if ($wwcTopVideo[0].paused) $wwcTopVideo[0].play();
            $wwcContentTopInner.css('transform', 'translateY(' + ty + 'px)');
            $wwcContentTopLogoImg.css('transform', 'translateY(' + ty * -.25 + 'px)');
            $wwcContentTop.addClass('active');
        } else {
            if (!$wwcTopVideo[0].paused) $wwcTopVideo[0].pause();
            $wwcContentTop.removeClass('active');

        }
    }

    function checkAnimGroup(scrollTop) {

        $wwcAnimGroups.each(function(){
            var offsetY =  $(this).offset().top;
            var height =  $(this).height();
            if ( windowHeight > offsetY ) {
                $(this).addClass('active');
            }
        });
    }

    function checkSectionBg(scrollTop) {

        $wwcSections.each(function(){

            var offsetY =  $(this).offset().top;
            var height =  $(this).height();
            var sectionBg = $('.wwc-section-bg', this);
            var sectionBgHeight = $(sectionBg).height();

            if ( sectionBg[0]) {

                var diffHeight = windowHeight + windowHeight - height;
                if ( windowHeight > offsetY ) {
                    var tY =  (offsetY - diffHeight);
                    tY *= -.35;
                    tY += -windowHeight * .35 ;
                    $('.wwc-section-bg-inner', sectionBg).css({'transform': 'translateY(' + tY + 'px)'});

                    var tY =  (offsetY - diffHeight);
                    tY *= -.2;
                    tY += -windowHeight * .2 ;

                    if ($('.wwc-cha', this).hasClass('wwc-cha-long')) {
                        tY *= 2;
                    }
                    $('.wwc-cha', this).css({'transform': 'translateX(-50%) translateY(' + tY + 'px)'});

                }

                if ( 0 > offsetY ) {
                    $('.wwc-cha', this).addClass('active');
                } else {
                    $('.wwc-cha', this).removeClass('active');
                }

                $('.wwc-section-bg-front', sectionBg).each(function(){
                    if (  windowHeight * .5 > offsetY ) {
                        $(this).addClass('active');
                    }
                });
            }
        });



        var tY = scrollbar.limit.y - scrollTop;
        tY *= -.5;
        $wwcNextBg.css('transform', 'translateY(' + tY + 'px)');
    }

    scrollArea.on('mousemove', function(e){

        if ( contentLoaded == false || contentStarted == false) return;

        var posX = e.clientX;
        var posY = e.clientY;

        var perX = -(posX - windowWidth / 2) / windowWidth * 100;
        var perY = -(posY - windowHeight / 2) / windowHeight * 100;

        $wwcSectionBgFronts.each(function(){
            var bgCount = $('.wwc-bg', this).length;
            $('.wwc-bg', this).each(function(index){
                var posX = (index * index + 1) * perX * .03 / bgCount;
                var posY = (index + 1) * perY * .045 / bgCount;
                posX = Math.min(3,posX);
                posY = Math.min(3,posY);
                posX = Math.max(-3,posX);
                posY = Math.max(-3,posY);
                gsap.to($('.wwc-back', this), 1.25, {x:posX + '%', y:posY + '%'});
            });

            if ($(this).closest('.wwc-section-bg').hasClass('wwc-section-bg-has-front')) {

            }
        });


        $('.wwc-cha-move-on-mousemove').each(function(index){
            var posX = (index * index + 1) * perX * .02;
            var posY = (index + 1) * perY * .02;
            posX = Math.min(3,posX);
            posY = Math.min(3,posY);
            posX = Math.max(-3,posX);
            posY = Math.max(-3,posY);
            gsap.to($('img', this), 1.5, {x:-posX + '%', y:posY + '%'});
        });

    });

    function checkIntroVideo(scrollTop) {

        var offsetY =  $wwcIntroVideoArea.offset().top;
        var height =  $wwcIntroVideoArea.height();

        if (  0  > offsetY ) {
            $wwcIntroVideoArea.addClass('sticky-video');
            $wwcIntroVideoAreaInner.addClass('active');
            $wwcIntroVideoAreaInner.css({'top':  -offsetY });

        } else {
            $wwcIntroVideoArea.removeClass('sticky-video');
            $wwcIntroVideoAreaInner.removeClass('active');
            $wwcIntroVideoAreaInner.css({'top':  0 });

        }

        if ( windowHeight - height > offsetY ) {
            var tY = (offsetY + height - windowHeight);
            tY *= .65;
            $wwcIntroVideo.css({'top':  tY });
        } else {
            $wwcIntroVideo.css({'top':  0 });
        }

        if ( windowHeight > offsetY && -(height*1.2) < offsetY ) {
            if ( $wwcIntroVideo[0].paused) {
                $wwcIntroVideo[0].play();
                $wwcIntroVideo[0].currentTime = 0;
            }
        } else {
            if ( !$wwcIntroVideo[0].paused) $wwcIntroVideo[0].pause();
        }

    }

    function checkHistory(scrollTop) {

        var offsetY = $wwcSectionHistory.offset().top;
        var height = $wwcSectionHistory.height();

        if ( offsetY < 0 ) {
            var top = offsetY * -1;
            top = Math.min(top, height - windowHeight);

            if ( scrollbar) {
                $wwcHistoryViewer.css('top', top);
            } else {
                $wwcHistoryViewer.css({
                    'position' : 'fixed',
                    'top' : 0
                });

                if (offsetY < -height + windowHeight ) {
                    $wwcHistoryViewer.css({
                        'position' : 'absolute',
                        'top' : 'auto',
                        'bottom' : 0,
                    });
                }
            }

        } else {
            if ( scrollbar) {
                $wwcHistoryViewer.css('top', 0);
            } else {
                $wwcHistoryViewer.css({
                    'position' : 'absolute',
                    'top' : 0
                });
            }
        }


        if ( offsetY < windowHeight ) {
            $wwcHistoryBlocks.each(function(index) {
                var offsetY = $(this).offset().top;
                if ( offsetY <= windowHeight  * .5 && offsetY > - windowHeight * .5) {
                    if ($(this).hasClass('active') == false) {
                        $(this).addClass('active').siblings().removeClass('active');
                        setHistory(this);
                    }

                }
            });
        }

    }

    function initHistory() {
        $wwcHistory.css({
            'opacity': 0,
            'visibility': 'hidden'
        });

        $wwcHistoryBlocks.each(function(index){
            var bg = $('.wwc-history-bg-inner', this);
            var item = $('<div class="wwc-history-bg-item" data-status="next"></div>').appendTo('.wwc-history-bgs');
            bg.clone().appendTo(item);
            item.attr('data-index', index);
            $(this).attr('data-index', index);
        });

        // add progress
        if ( $wwcHistoryBlocks.length > 1) {
            $('<div class="wwc-history-progress"><span class="wwc-history-progress-bar"></span></div>').appendTo('.wwc-history-txt');
        }

    }

    function setHistory(history) {
        var yearEl = $('.wwc-year', $wwcHistoryViewer)[0];
        var year = $('.wwc-year', history).html();
        var month = $('.wwc-month', history).html();
        var title = $('.wwc-history-title', history).html();
        var descriptions = $('.wwc-history-descriptions p', history).html();

        if ( !yearEl.startYYYY ) {
            yearEl.startYYYY = year;
            yearEl.yyyy = year;
            $('.wwc-year', $wwcHistoryViewer).html(year);
        }
        yearEl.toYYYY = year;

        gsap.to(yearEl, .5, {yyyy:year, onUpdate:function(){
            var yyyy = Math.round(yearEl.yyyy);
            $('.wwc-year', $wwcHistoryViewer).html(yyyy);
        }
        });
        $('.wwc-month', $wwcHistoryViewer).html('');
        $('.wwc-history-title', $wwcHistoryViewer).html('');
        $('.wwc-history-descriptions p', $wwcHistoryViewer).html('');

        gsap.fromTo($('.wwc-month', $wwcHistoryViewer), .5, {opacity:0, y:10}, {opacity:1, y:0, delay:.2, onStart:function(){ $('.wwc-month', $wwcHistoryViewer).html(month);}});
        gsap.fromTo($('.wwc-history-title', $wwcHistoryViewer), .5, {opacity:0, y:10}, {opacity:1, y:0, delay:.3, onStart:function(){ $('.wwc-history-title', $wwcHistoryViewer).html(title);}});
        gsap.fromTo($('.wwc-history-descriptions p', $wwcHistoryViewer), .5, {opacity:0, y:10}, {opacity:1, y:0, delay:.4, onStart:function(){ $('.wwc-history-descriptions p', $wwcHistoryViewer).html(descriptions);}});


        var index = $(history).attr('data-index');
        var bgItem = $('.wwc-history-bg-item[data-index="' + index + '"]');
        bgItem.attr('data-status', 'active');

        bgItem.prevAll().attr('data-status', 'prev');
        bgItem.nextAll().attr('data-status', 'next');

        // update progress

        var progressBarHeight = (parseInt(index)+1) / $wwcHistoryBlocks.length * 100;
        gsap.to($('.wwc-history-progress-bar'), .5, {height: progressBarHeight + '%'});

    }

    scrollArea.on('mousewheel', '.wwc-history-viewer', function(e) {

        var offsetY = $wwcSectionHistory.offset().top;
        var offsetTop = scrollTop + offsetY;
        var height = $wwcSectionHistory.height();

        if ( offsetY < 0  && offsetY > windowHeight - height - 2) {

            // return;
            if ( isAutoScrolling ) {
                e.preventDefault();
                return;
            }

            if ($wwcHistoryBlocks.last().hasClass('active') == false) {
                var scrollTo = (e.deltaY < 0) ? scrollTop + windowHeight : scrollTop - windowHeight;

                scrollTo = Math.max(offsetTop, scrollTo);
                scrollTo = Math.min(offsetTop + height - windowHeight, scrollTo);

                isAutoScrolling = true;

                if(scrollbar) {
                    scrollbar.scrollTo(0, scrollTo, 400);
                } else {
                    scrollArea.stop().animate({'scrollTop': scrollTo}, 400);
                }

                setTimeout(function(){
                    isAutoScrolling = false;
                }, 800);
            }
        }
    });

    function getScale() {

        var windowWidth = $window.innerWidth();
        var windowHeight = $window.innerHeight();

        var scaleX = windowWidth / SLIDER_WIDTH;
        var scaleY = windowHeight / SLIDER_HEIGHT;

        return {
            max: Math.max(scaleX, scaleY),
            min: Math.min(scaleX, scaleY),
            scaleX: windowWidth / SLIDER_WIDTH ,
            scaleY: windowHeight / SLIDER_HEIGHT,
            width: windowWidth,
            height: windowHeight
        }
    }

    $(document).on('click', '.wwc-btn-next', function(e){

        e.preventDefault();
        if ($html.hasClass('wwc-active-next')) {
            return false;
        }

        var href = $(this).attr('href');
        var contentHeight = $('.wwc-main').height() + windowHeight * 2;

        $html.addClass('wwc-active-next');

        var scale = getScale();

        $('.wwc-next-bg').height(scale.height);
        $('.wwc-next-bg-inner').height(scale.height);

        if (scrollbar) {
            scrollbar.update();
            scrollbar.scrollTo(0, scrollbar.limit.y, 1000, function (scrollbar) {

                loadNext(href);
            });
        } else {
            scrollArea.stop().animate({scrollTop: contentHeight}, 1000, function(){
                loadNext(href);

            });
        }
    });

    function loadNext(href) {
        if(scrollbar) scrollbar.destroy();
        $html.addClass('wwc-loading-next');
        $('.wwc-next-bg').addClass('wwc-loading-bg').appendTo('body');
        $('html,body').scrollTop(0);
        $wwcContent.html('');

        setTimeout(function(){
            loadContent(href);
        }, 400);
    }

    $(document).on('click', '.wwc-next', function(e){
        if ($html.hasClass('wwc-active-next')) return;
        if ( $(e.target).closest('.wwc-content-list')[0]) {
        }  else {
            $('.wwc-btn-next').trigger('click');
        }
    });



    var overMouseWheel = false;
    scrollArea.on('mousewheel', '.wwc-next', function(e) {
        if ($html.hasClass('wwc-active-next')) {
            e.preventDefault();
            return false;
        };

        if ( scrollbar ) {
            if ( scrollbar.limit.y - 1 <= scrollTop ) {
                if ( e.deltaY < 0 ) {
                    $('.wwc-btn-next').trigger('click');
                }
            }
        } else {
            if ( e.deltaY < 0 ) {
                $('.wwc-btn-next').trigger('click');
            }
        }
    });



    if ($('#wwcContent .wwc-content')[0]) {

        //$window.on('load', function(){
        //    showContent();
        //});

        setTimeout(function(){
            if ($html.hasClass('wwc-loading')) {
                showContent();
            }

        }, 2000);

    } else {
        $window.on('load', function(){
            $html.removeClass('wwc-first-content-loading wwc-loading');
        });
        setTimeout(function(){
            $html.removeClass('wwc-first-content-loading wwc-loading');
        }, 2000);
    }


    $window.on('wwcContentScrollTo', function(e, scrolldata) {
        var scrollTo = scrolldata.top || 0;
        var scrollSpeed = scrolldata.speed || 400;
        if(scrollbar) {
            scrollbar.scrollTo(0, scrollTo, scrollSpeed);
        } else {
            scrollArea.stop().animate({'scrollTop': scrollTo}, scrollSpeed);
        }

    });
});