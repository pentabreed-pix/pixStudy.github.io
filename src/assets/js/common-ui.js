var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
  var instance = null;
  function init() {
    instance = {
      reset: function () {
        frontCommonResize();
        //frontCommonScroll();
        header();
        localAnimations();
        lenis();
      },

    };
    return instance;
  }
  if (instance) {
    return instance;
  } else {
    return init();
  }
})();

function frontCommonResize() {
  window.addEventListener("resize", () => {

  });
}

function frontCommonScroll() {
  window.addEventListener("scroll", () => {

  });
}
function lenis() {
    let lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}
function localAnimations() {
    $header = $('header');
    $breadcrumb = $('.data-list.breadcrumb');

    $('[data-local-animation="case-1"]').each(function(){
        $this = $(this);
        $this.addClass('active');

        // $header.removeClass('light').addClass('transparent');
        $breadcrumb.removeClass('case1').addClass('case2');
    });
}

