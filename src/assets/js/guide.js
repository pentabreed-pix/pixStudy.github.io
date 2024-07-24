
// 가이드(pc,mo) 헤더 - menu 열었을 때 스크롤에 의한 백그라운드 변경
function headerBackChange() {
    const head = document.getElementById("head");
    const aside = document.getElementById("guide-list")

    aside.addEventListener("scroll",() => {
        aside.scrollTop > 0 ?
        head.classList.add('back-white'):
        head.classList.remove('back-white')
    });
}

// 가이드(pc,mo) - 헤더 메뉴 활성화/비활성화 기능
function asideToggleActive() {
    const layoutGuideList = document.getElementById("guide-list");
    layoutGuideList.classList.toggle("open-aside");
}

function Tab() {

    const tabDisplay = document.querySelectorAll(".tab-display")
    tabDisplay.forEach(tab => {
        const firstTab = tab.querySelector(".tab-item:first-child")
        firstTab.classList.add("active")
        firstTab.querySelector(".tab-text").setAttribute("aria-selected", "true")

        const tabList = tab.querySelector(".tab-list")
        tabList.addEventListener("keydown", function(e) {
            e = event || window.event;
            let keycode = e.keyCode || e.which;

            if(!e.shiftKey && keycode === 9) {
                let tabItem = this.querySelectorAll(".tab-item");
                tabItem.forEach(item => {
                    if(item.classList.contains("active")) {
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "0");
                        button.setAttribute("aria-selected", "true")
                    } else {    
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "-1");
                        button.setAttribute("aria-selected", "false");
                    }
                });

                let siblingTabPanels = document.querySelectorAll(".panel-item.hidden");
                siblingTabPanels.forEach(panel => {
                    panel.tabIndex = "-1";
                });
            }
        }) 
        const tabButton = tab.querySelectorAll(".tab-text")
        tabButton.forEach(button => {
            button.addEventListener("keydown", function(e) {
                e = event || window.event;
                let keycode = e.keyCode || e.which;
    
                switch(keycode) {
                    case 37:
                        if(this.closest('.tab-item').previousElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 39:
                        if(this.closest('.tab-item').nextElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 32:
                    case 13:
                        if(this) {
                            tabButton.forEach(button => {
                                button.setAttribute("aria-selected", "false");
                            });
                            this.setAttribute("aria-selected", "true");
                        }
                        break;
                }
            })
        });
    });

    const panelDisplay = document.querySelectorAll(".panel-display")
    panelDisplay.forEach(panel => {
        const panelItems = panel.querySelectorAll(".panel-item")
        panelItems.forEach((item, i) => {
            i != 0 ? item.classList.add("hidden") : ""
        });
    });
    tabDisplay.forEach((tab, tabDisplayIndex) => {
        const tabItems = tab.querySelectorAll(".tab-item")
        tabItems.forEach((item, tabIndex) => {
            const button = item.querySelector(".tab-text")
            button.addEventListener("click", () => {
                const curTab = button.closest(".tab-item")
                tabItems.forEach(item => {
                    item.classList.remove("active")
                    item.querySelector('.tab-text').setAttribute("tabindex", "-1")
                    item.querySelector('.tab-text').setAttribute("aria-selected", "false")
                });
                curTab.classList.add("active")
                button.setAttribute("tabindex", "0")
                button.setAttribute("aria-selected", "true")

                panelDisplay.forEach((panelDisplay, panelDisplayIndex) => {
                    if(tabDisplayIndex == panelDisplayIndex) {
                        const panelItems = panelDisplay.querySelectorAll(".panel-item")
                        panelItems.forEach((item, panelIndex) => {
                            item.classList.add("hidden")
                            tabIndex == panelIndex ? item.classList.remove("hidden") : ""
                        });
                    }
                });
            })
        });
    });

    

    new Swiper(".tab-wrap", {
        slidesPerView: "auto",
        freeMode: true,
    });
}

function input() {
    const form = document.querySelectorAll(".form")

    form.forEach(input => {
        if(input.classList.contains("input") || input.classList.contains("search")) {
            const inputRemove = input.querySelector(".remove")
            if(inputRemove) {
                input.addEventListener("keyup", () => {
                    const inputValue = input.querySelector(".input-elem").value;
                    inputValue ? inputRemove.style.display = "block" : inputRemove.style.display = "none";
                })
                inputRemove.addEventListener("click", () => {
                    let inputElem = input.querySelector(".input-elem");
                    inputElem.value = null;
                    inputRemove.style.display = "none";
                })
            }
            input.classList.contains("disabled") ? input.querySelector(".input-elem").setAttribute("disabled", "") : ""
        }
    });
}

function select() {
    const selects = document.querySelectorAll(".form.select.design1")
  
    for(const select of selects) {
        if(select) {
            const selectElement = select.querySelector("select");
            const arrowElement = select.querySelector(".arrow .blind")

            selectElement.addEventListener("keydown", function(e) {
                if(e.keyCode === 13 || (e.keyCode == 32 && !select.classList.contains("open"))) {
                    if(document.activeElement === selectElement) {
                        select.classList.toggle("open")
                    }
                }
                if(select.classList.contains("open")) {
                    arrowElement.innerHTML = "열림"
                } else {
                    arrowElement.innerHTML = "닫힘"
                }
            })
            select.addEventListener("click", () => {
                select.classList.toggle("open")
                if(select.classList.contains("open")) {
                    arrowElement.innerHTML = "열림"
                } else {
                    arrowElement.innerHTML = "닫힘"
                }
            })
            document.addEventListener("click", (e) => {
                const _target = e.target
                if(!_target.closest(".form.select")) {
                for(const select of selects) {
                    select.classList.remove("open")
                    }
                } else if(_target.closest(".form.select.open")) {
                    for(const select of selects) {
                        select.classList.remove("open")
                    }
                    _target.closest(".form.select").classList.add("open")
                }
                if(select.classList.contains("open")) {
                    arrowElement.innerHTML = "열림"
                } else {
                    arrowElement.innerHTML = "닫힘"
                }
            })
        }
    }
}

function swiperDesign1() {
    var sync1 = new Swiper(".sync1", {
        slidesPerView: 1,
        loopAdditionalSlides: 1,
        effect: "fade",
        loop: true,
        controller: {
            control: sync2
        }
    });
    var sync2 = new Swiper(".sync2", {
        slidesPerView: 1,
        loopAdditionalSlides: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        controller: {
            control: sync1
        }
    });

    sync1.controller.control = sync2;
    sync2.controller.control = sync1;
}

/* 아코디언 */
function Accordion() {
    const accordionDisplays = document.querySelectorAll(".accordion-display");

    accordionDisplays.forEach(function(accordionDisplay) {
        const accordionItems = accordionDisplay.querySelectorAll(".accordion-item");

        accordionItems.forEach(function(accordionItem) {
            const button = accordionItem.querySelector(".btn");

            // aria-label 값 토글
            function toggleAccordion() {
                this.setAttribute(
                    "aria-label",
                    this.getAttribute("aria-label") === "열림" ? "닫힘" : "열림"
                );
                // console.log(this.getAttribute("aria-label"));
            }

            button.addEventListener("click", toggleAccordion.bind(button));

            const accordionHeads = accordionItem.querySelectorAll(".accordion-head");
            accordionHeads.forEach(accordionHead => {
                accordionHead.addEventListener("click", function() {
                    // 수정된 부분
                    accordionItem.classList.toggle("active");
                    const panel = this.nextElementSibling;
                    if (panel.style.height) {
                        panel.style.height = null;
                    } else {
                        panel.style.height = panel.scrollHeight + "px";
                    }
                });
            });
        });

        // 초기 상태 설정 : collapse 클래스가 .accordion-display에 있으면 열림 상태의 아코디언이 됩니다.
        if (accordionDisplay.classList.contains("collapse")) {
            openAllAccordions(accordionItems);
        } else {
            closeAllAccordions(accordionItems);
        }

        function openAllAccordions(items) {
            items.forEach(item => togglePanels(item, true));
        }

        function closeAllAccordions(items) {
            items.forEach(item => togglePanels(item, false));
        }

        function togglePanels(accordionItem, isOpen) {
            const panels = accordionItem.querySelectorAll(".accordion-head + *");
            panels.forEach(panel => {
                panel.style.height = isOpen ? panel.scrollHeight + "px" : null;
            });
        }
    });
}