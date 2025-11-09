var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
    var instance = null;
    function init() {
        instance = {
            reset: function () {
                frontCommonResize();
                frontCommonScroll();
                //header();
                select();
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

let lenis = null;
let rafId = null;
let isRunning = false;
const lenisController = initLenis();

function initLenis() {

    function raf(time) {
        if (lenis && isRunning) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
    }

    function createLenis() {
        if (lenis) return;

        lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        isRunning = true;
        rafId = requestAnimationFrame(raf);
    }

    function destroyLenis() {
        isRunning = false;

        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        if (lenis) {
            lenis.destroy();
            lenis = null;
        }
    }

    // 초기 생성
    createLenis();

    return {
        create: createLenis,
        destroy: destroyLenis,
        getInstance: () => lenis  // ✅ lenis 인스턴스 접근 메서드 추가
    };
}

function header() {
    const pageHead = document.querySelector('.page-head');
    const gotoPageNaviBtn = document.querySelector('.goto-page-navi');
    const pageHeadSitemap = document.querySelector('.page-head-sitemap');

    // 현재 화면 사이즈 체크
    const isPc = () => window.innerWidth >= 1024;

    // 스크롤 관련 변수
    let lastScrollTop = 0;
    let ticking = false;

    // 1. PC 메뉴 호버 및 포커스 처리
    function initPcMenu() {
        const gnbNav = document.querySelector('.page-head-nav');
        if (!gnbNav) return;

        gnbNav.addEventListener('mouseenter', handlePcMenuShow, true);
        gnbNav.addEventListener('mouseleave', handlePcMenuHide, true);
        gnbNav.addEventListener('focusin', handlePcMenuShow, true);
        gnbNav.addEventListener('focusout', handlePcMenuHide, true);
    }

    function handlePcMenuShow(e) {
        if (!isPc()) return;
        const item = e.target.closest('.gnb-item.has-2depth');
        if (item) item.classList.add('show-pc-menu');
    }

    function handlePcMenuHide(e) {
        if (!isPc()) return;
        const item = e.target.closest('.gnb-item.has-2depth');
        if (item && !item.contains(e.relatedTarget)) {
            item.classList.remove('show-pc-menu');
        }
    }

    // 2. 전체메뉴 토글
    function initAllMenuToggle() {
        if (!gotoPageNaviBtn) return;

        gotoPageNaviBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const isShowAll = pageHead.classList.contains('show-all');

            if (isShowAll) {
                // show-all을 제거하고 Lenis 생성
                pageHead.classList.remove('show-all');
                document.body.style.overflow = '';
                lenisController.create();
            } else {
                // Lenis 파괴하고 show-all 추가
                lenisController.destroy();
                document.body.style.overflow = 'hidden';
                pageHead.classList.add('show-all');
            }

            setSitemapHeight();
        });
    }

    function setSitemapHeight() {
        if (!pageHead.classList.contains('show-all')) {
            pageHeadSitemap.style.height = '';
            return;
        }

        if (isPc()) {
            const sitemapInner = pageHeadSitemap.querySelector('.page-head-sitemap-inner');
            const sitemapWrap = pageHeadSitemap.querySelector('.page-head-sitemap-wrap');

            if (sitemapInner && sitemapWrap) {
                const innerHeight = sitemapInner.clientHeight;
                pageHeadSitemap.style.height = `${innerHeight}px`;
            }
        } else {
            pageHeadSitemap.style.height = '100vh';
        }
    }

    // 3. 모바일 메뉴 토글
    function initMobileMenu() {
        const sitemapGnbList = document.querySelector('.page-head-sitemap .gnb-list');
        if (!sitemapGnbList) return;

        sitemapGnbList.addEventListener('click', (e) => {
            if (isPc()) return;

            const gnbName = e.target.closest('.gnb-item.has-2depth > .gnb-name');
            if (!gnbName) return;

            e.preventDefault();
            const item = gnbName.closest('.gnb-item.has-2depth');
            const lnb = item.querySelector('.lnb');
            if (!lnb) return;

            const isCurrentlyOpen = item.classList.contains('show-mo-menu');

            // 모든 메뉴 닫기
            document.querySelectorAll('.page-head-sitemap .gnb-item.has-2depth').forEach(gnbItem => {
                gnbItem.classList.remove('show-mo-menu');
                const gnbLnb = gnbItem.querySelector('.lnb');
                if (gnbLnb) gnbLnb.style.height = '0';
            });

            // 클릭한 메뉴가 닫혀있었다면 열기
            if (!isCurrentlyOpen) {
                item.classList.add('show-mo-menu');
                lnb.style.height = `${lnb.scrollHeight}px`;
            }
        });
    }

    // 4. 스크롤 감지 기능
    function initScrollDetection() {
        // 초기 상태 설정 (페이지 로드 시)
        updateScrollState(window.scrollY);

        // 스크롤 이벤트
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        updateScrollState(scrollTop);
    }

    function updateScrollState(scrollTop) {
        // 최상단에 있을 때
        if (scrollTop === 0) {
            pageHead.classList.remove('white');
        } else {
            pageHead.classList.add('white');
        }

        // 스크롤 방향 감지
        if (scrollTop > lastScrollTop) {
            // 아래로 스크롤
            pageHead.classList.add('scroll-down');
        } else if (scrollTop < lastScrollTop) {
            // 위로 스크롤
            pageHead.classList.remove('scroll-down');
        }

        lastScrollTop = scrollTop;
    }

    // 리사이즈 처리
    function handleResize() {
        // show-all 활성화 시 높이 재계산
        if (pageHead.classList.contains('show-all')) {
            setSitemapHeight();
        }

        // 화면 크기에 따라 불필요한 클래스 및 스타일 제거
        if (isPc()) {
            // PC로 전환 시 모바일 메뉴 클래스 및 lnb 인라인 스타일 제거
            document.querySelectorAll('.page-head-sitemap .gnb-item').forEach(item => {
                item.classList.remove('show-mo-menu');
                const lnb = item.querySelector('.lnb');
                if (lnb) lnb.style.height = '';
            });
        } else {
            // 모바일로 전환 시 PC 메뉴 클래스 제거
            document.querySelectorAll('.gnb-item.show-pc-menu').forEach(item => {
                item.classList.remove('show-pc-menu');
            });
        }
    }

    // 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 초기화
    initPcMenu();
    initAllMenuToggle();
    initMobileMenu();
    initScrollDetection(); // 스크롤 감지 기능 초기화
    window.addEventListener('resize', debounce(handleResize, 250));
}

function select() {
    document.querySelectorAll('.form.select.family-site .form-elem').forEach(select => {
        const placeholderText = select.querySelector('option[disabled]')?.textContent ||
            select.querySelector('option:first-child')?.textContent;

        new TomSelect(select, {
            create: false,
            sortField: [],
            searchField: [],  // 검색 비활성화
            maxOptions: null,
            hideSelected: false,
            closeAfterSelect: true,

            onInitialize: function() {
                // disabled 옵션 제거
                for (let key in this.options) {
                    if (this.options[key].$option?.disabled) {
                        delete this.options[key];
                    }
                }
                this.refreshOptions(false);

                // ✅ input을 readonly로 설정
                if (this.control_input) {
                    this.control_input.readOnly = true;
                    this.control_input.placeholder = placeholderText;
                }
            },

            onDropdownOpen: function(dropdown) {
                dropdown.classList.add('ts-dropdown-up');
            },

            onChange: function(value) {
                if (value) {
                    window.open(value, '_blank');
                    this.clear();
                }
            }
        });
    });
}