function pubListUp() {
  var category = ["No", "Page ID", "Menu", "File Root", "Completion", "View"];
  var page = {
    Sliders: [
      {
        id_ko: "",
        id_en: "",
        menu: "MAIN",
        root_ko: "/page/main/MAIN.00.00.html",
        root_en: "/page/main/EN.MAIN.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "최준현",
        worker_en: "미정",
        history: "",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "MAIN",
        root_ko: "/page/main/MAIN.00.00.html",
        root_en: "/page/main/EN.MAIN.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "최준현",
        worker_en: "미정",
        history: "",
      },
    ],
    Show: [
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
    ],
    Parallax: [
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
    ],
    Scroll: [
      {
        id_ko: "",
        id_en: "",
        menu: "Scroll",
        root_ko: "/scroll/scroll1.html",
        root_en: "",
        status_ko: "미정",
        status_en: "미정",
        worker_ko: "주은소",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      }
    ],
    Mix: [
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
      {
        id_ko: "",
        id_en: "",
        menu: "기업 개요",
        root_ko: "/page/company/COMPANY.00.00.html",
        root_en: "/page/company/EN.COMPANY.00.00.html",
        status_ko: "완료",
        status_en: "미정",
        worker_ko: "주은소, 최준현",
        worker_en: "미정",
        history: "",
        // history: "- 24-03-21 ko/pc table 클래스 추가" + "<br>" + "- 24-03-20 ko/mo 폰트 사이즈 수정",
      },
    ]
  };

  document.addEventListener("DOMContentLoaded", function () {
    var listup = function (selector) {
      var directory = "./../../page/";
      var dataContainer = document.querySelector(selector);

      const searchInput = document.querySelector(".page-search .search-input");
      const pageSection = document.querySelectorAll(".pub-list .local-body .content-body .section");
      var pageName = Object.values(page).flatMap((pageAll) => pageAll.map((item) => item.name));

      Object.keys(page).forEach(function (dir) {
        var section = document.createElement("div");
        var sectionHead = document.createElement("div");
        var sectionTitle = document.createElement("h4");
        var sectionName = document.createElement("span");
        var sectionBody = document.createElement("div");
        var dataDisplay = document.createElement("div");
        var dataHead = document.createElement("div");
        var cateList = document.createElement("ul");
        var dataBody = document.createElement("div");
        var dataList = document.createElement("ul");
        var no = 1;

        section.className = "section";
        sectionHead.className = "section-head";
        sectionTitle.className = "section-subject";
        sectionName.className = "section-name";
        sectionBody.className = "section-body";

        section.id = dir;
        sectionName.textContent = dir;
        sectionTitle.appendChild(sectionName);
        sectionHead.appendChild(sectionTitle);

        dataHead.classList.add("data-head");
        cateList.classList.add("cate-list");

        dataBody.classList.add("data-body");

        category.map((category) => {
          var cateItem = document.createElement("li");

          cateItem.classList.add("cate-item");
          if (category == "No" || category == "Page ID" || category == "Completion" || category == "View") {
            cateItem.classList.add("ac");
          } else {
            cateItem.classList.add("al");
          }
          cateItem.textContent = category;

          cateList.appendChild(cateItem);
        });

        Array.prototype.forEach.call(page[dir], function (data) {
          var dataItem = document.createElement("li");
          var dataDefault = document.createElement("div");
          var dataDefaultList = document.createElement("ul");
          var dataDefaultItemNo = document.createElement("li");
          var dataDefaultItemId = document.createElement("li");
          var dataDefaultItemMenu = document.createElement("li");
          var dataDefaultItemRoot = document.createElement("li");
          var dataDefaultItemStatus = document.createElement("li");
          var dataDefaultItemView = document.createElement("li");
          var dataDefaultItemBtn = document.createElement("li");
          var dataNo = document.createElement("span");
          var dataIdKo = document.createElement("span");
          var dataIdEn = document.createElement("span");
          var dataMenu = document.createElement("span");
          var dataRootKo = document.createElement("span");
          var dataRootEn = document.createElement("span");
          var dataStatusKo = document.createElement("span");
          var dataStatusEn = document.createElement("span");
          var dataViewKo = document.createElement("div");
          var dataViewEn = document.createElement("div");
          var dataViewText = document.createElement("a");
          var dataViewTextEn = document.createElement("a");
          var detailBtnWrap = document.createElement("div");
          var detailBtn = document.createElement("button");
          var detailBtnText = document.createElement("span");

          var dataDetail = document.createElement("div");
          var dataDetailInner = document.createElement("div");
          var dataWorker = document.createElement("div");
          var dataWorkerTitle = document.createElement("span");
          var dataWorkerWrap = document.createElement("div");
          var dataWorkerNameKo = document.createElement("strong");
          var dataWorkerNameEn = document.createElement("strong");
          var dataHistory = document.createElement("div");
          var dataHistoryTitle = document.createElement("span");
          var dataHistoryContents = document.createElement("strong");

          dataDisplay.className = "data-display";
          dataList.classList.add("data-list");

          dataItem.classList.add("data-item");
          dataDefault.className = "data-area default";
          dataDefaultList.className = "default-list";
          dataDefaultItemNo.className = "default-item no";
          dataDefaultItemId.className = "default-item id";
          dataDefaultItemMenu.className = "default-item menu";
          dataDefaultItemRoot.className = "default-item root";
          dataDefaultItemStatus.className = "default-item status";
          dataDefaultItemView.className = "default-item view";
          dataDefaultItemBtn.className = "default-item btn";
          dataNo.className = "data data-no";
          dataIdKo.className = "data data-id ko";
          dataIdEn.className = "data data-id en";
          dataMenu.className = "data data-menu ";
          dataRootKo.className = "data data-root ko";
          dataRootEn.className = "data data-root en";
          dataStatusKo.className = "data data-status ko";
          dataStatusEn.className = "data data-status en";
          dataViewKo.className = "data data-view ko";
          dataViewEn.className = "data data-view en";
          dataViewText.className = "data-text";
          dataViewTextEn.className = "data-text";
          detailBtnWrap.className = "data data-btn";
          detailBtn.className = "btn open-close";
          detailBtnText.className = "blind";

          dataDetail.className = "data-area detail";
          dataDetailInner.className = "data-inner";
          dataWorker.className = "data-list worker";
          dataWorkerTitle.className = "data title";
          dataWorkerWrap.className = "data-wrap";
          dataWorkerNameKo.className = "data name ko";
          dataWorkerNameEn.className = "data name en";
          dataHistory.className = "data-list history";
          dataHistoryTitle.className = "data title";
          dataHistoryContents.className = "data contents";

          dataNo.textContent = no;
          dataIdKo.textContent = data.id_ko;
          dataIdEn.textContent = data.id_en;
          dataMenu.textContent = data.menu;
          dataRootKo.textContent = data.root_ko;
          dataRootEn.textContent = data.root_en;
          dataStatusKo.textContent = data.status_ko;
          dataStatusEn.textContent = data.status_en;
          dataViewText.textContent = "Go";
          dataViewTextEn.textContent = "Go";
          detailBtnText.textContent = "상세 보기 버튼";

          dataWorkerTitle.textContent = "Worker";
          dataWorkerNameKo.textContent = data.worker_ko;
          dataWorkerNameEn.textContent = data.worker_en;

          dataHistoryTitle.textContent = "History";
          dataHistoryContents.innerHTML = data.history;

          dataViewText.setAttribute("target", "_blank");
          dataViewText.setAttribute("href", data.root_ko);
          dataViewTextEn.setAttribute("target", "_blank");
          dataViewTextEn.setAttribute("href", data.root_en);

          dataDefaultList.appendChild(dataDefaultItemNo);
          dataDefaultList.appendChild(dataDefaultItemId);
          dataDefaultList.appendChild(dataDefaultItemMenu);
          dataDefaultList.appendChild(dataDefaultItemRoot);
          dataDefaultList.appendChild(dataDefaultItemStatus);
          dataDefaultList.appendChild(dataDefaultItemView);
          dataDefaultList.appendChild(dataDefaultItemBtn);
          dataDefaultItemNo.appendChild(dataNo);
          data.id_ko ? dataDefaultItemId.appendChild(dataIdKo) : "";
          data.id_en ? dataDefaultItemId.appendChild(dataIdEn) : "";
          dataDefaultItemMenu.appendChild(dataMenu);
          data.root_ko ? dataDefaultItemRoot.appendChild(dataRootKo) : "";
          data.root_en ? dataDefaultItemRoot.appendChild(dataRootEn) : "";
          data.status_ko ? dataDefaultItemStatus.appendChild(dataStatusKo) : "";
          data.status_en ? dataDefaultItemStatus.appendChild(dataStatusEn) : "";
          dataViewKo.appendChild(dataViewText);
          dataViewEn.appendChild(dataViewTextEn);
          data.id_ko ? dataViewKo.appendChild(dataViewText) : "";
          data.id_en ? dataViewEn.appendChild(dataViewTextEn) : "";
          data.status_ko ? dataDefaultItemView.appendChild(dataViewKo) : "";
          data.status_en ? dataDefaultItemView.appendChild(dataViewEn) : "";
          detailBtn.appendChild(detailBtnText);
          dataDefaultItemBtn.appendChild(detailBtn);
          dataDefaultList.appendChild(dataDefaultItemBtn);
          dataDefault.appendChild(dataDefaultList);
          dataItem.appendChild(dataDefault);
          dataWorker.appendChild(dataWorkerTitle);
          dataWorker.appendChild(dataWorkerWrap);
          data.worker_ko ? dataWorkerWrap.appendChild(dataWorkerNameKo) : "";
          data.worker_en ? dataWorkerWrap.appendChild(dataWorkerNameEn) : "";
          dataDetailInner.appendChild(dataWorker);
          dataHistory.appendChild(dataHistoryTitle);
          dataHistory.appendChild(dataHistoryContents);
          dataDetailInner.appendChild(dataHistory);
          dataDetail.appendChild(dataDetailInner);
          dataItem.appendChild(dataDetail);
          dataList.appendChild(dataItem);

          no += 1;
        });

        dataHead.appendChild(cateList);
        dataBody.appendChild(dataList);
        dataDisplay.appendChild(dataHead);
        dataDisplay.appendChild(dataBody);
        sectionBody.appendChild(dataDisplay);

        section.appendChild(sectionHead);
        section.appendChild(sectionBody);
        dataContainer.appendChild(section);
      });
    };

    listup(".content-body");

    // 검색 기능
    const searchInput = document.querySelector(".page-search .search-input");
    const pageSection = document.querySelectorAll(".pub-list .local-body .content-body .section");
    var pageName = Object.values(page).flatMap((pageAll) => pageAll.map((item) => item.menu));
    var workerName = Object.values(page).flatMap((pageAll) => pageAll.flatMap((item) => [item.worker_ko, item.worker_en]));
    // console.log(workerName);

    const pubListSearch = document.querySelector("#pubListSearch");
    const selectBox = pubListSearch.querySelector(".search-select");
    const choiceCate = selectBox.querySelector(".select-item");
    const noResult = document.querySelector(".pub-list .no-result");

    searchInput.addEventListener("keyup", () => {
      if (searchInput.value == "") {
        pageSection.forEach((element) => {
          element.classList.remove("hidden");
          const dataItem = element.querySelectorAll(".data-item");
          dataItem.forEach((item) => {
            item.classList.remove("hidden");
          });
        });
        noResult.classList.remove("active");
      } else {
        pageSection.forEach((element) => {
          element.classList.add("hidden");
        });
      }
      if (searchInput.value) {
        let filterPageName = pageName.filter((menu) => menu.includes(searchInput.value));
        let filterWorkerName = workerName.filter((worker) => String(worker).includes(searchInput.value));
        var idValueByAll = Object.keys(page).filter((key) => page[key].some((item) => filterPageName.includes(item.menu) || filterWorkerName.includes(item.worker_ko)));
        var idValueByMenu = Object.keys(page).filter((key) => page[key].some((item) => filterPageName.includes(item.menu)));
        var idValueByWorker = Object.keys(page).filter((key) => page[key].some((item) => filterWorkerName.includes(item.worker_ko)));
        var idValue = idValueByAll;
        console.log(idValueByAll);

        if (choiceCate.innerText == "All") {
          idValue = idValueByAll;
        } else if (choiceCate.innerText == "Menu") {
          idValue = idValueByMenu;
        } else if (choiceCate.innerText == "Worker") {
          idValue = idValueByWorker;
        }

        if (idValue.length == 0 && searchInput.value != "") {
          noResult.classList.add("active");
        } else {
          noResult.classList.remove("active");
        }

        idValue.map((id) => {
          pageSection.forEach((element) => {
            let sectionID = element.getAttribute("id");
            if (sectionID == id) {
              element.classList.remove("hidden");

              const menuName = element.querySelectorAll(".data-menu");
              const dataWorkerName = element.querySelectorAll(".data-list.worker .name");
              const pubDataList = element.querySelectorAll(".data-item");
              pubDataList.forEach((list) => {
                list.classList.add("hidden");
              });

              if (choiceCate.innerText == "All" || choiceCate.innerText == "Menu") {
                menuName.forEach((menuName) => {
                  filterPageName.forEach((filterPageName) => {
                    if (menuName.innerText == filterPageName) {
                      menuName.closest(".data-item").classList.remove("hidden");
                    }
                  });
                });
              }
              if (choiceCate.innerText == "All" || choiceCate.innerText == "Worker") {
                dataWorkerName.forEach((dataWorkerName) => {
                  filterWorkerName.forEach((filterWorkerName) => {
                    if (dataWorkerName.innerText == filterWorkerName) {
                      dataWorkerName.closest(".data-item").classList.remove("hidden");
                    }
                  });
                });
              }
            }
          });
        });
      }
    });

    // 아코디언 열기/닫기 기능
    const detailBtn = document.querySelectorAll(".data-area.default .default-item.btn .btn");
    detailBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        var dataItem = btn.closest(".data-item");
        var dataInner = dataItem.querySelector(".detail .data-inner");
        var heightValue = dataInner.offsetHeight;
        if (!dataItem.classList.contains("active")) {
          dataItem.classList.add("active");
          dataInner.closest(".detail").style.height = heightValue + "px";
        } else {
          dataItem.classList.remove("active");
          dataInner.closest(".detail").style.height = 0;
        }
      });
    });

    const menuAnchor = document.querySelector("#guide-list .menu-anchor");
    const menuAnchorTop = window.pageYOffset + menuAnchor.getBoundingClientRect().top;
    const headH = document.querySelector(".page-head").offsetHeight;

    // 앵커 Fix 구간 설정
    window.addEventListener("scroll", function () {
      if (menuAnchorTop <= window.scrollY) {
        menuAnchor.classList.add("fix");
      } else {
        menuAnchor.classList.remove("fix");
      }
    });

    // 앵커 기능
    const anchorItem = menuAnchor.querySelectorAll(".anchor-item");
    const section = document.querySelectorAll(".pub-list .section");
    var anchorTitle;
    anchorItem.forEach((item) => {
      item.addEventListener("click", function () {
        anchorTitle = item.querySelector(".anchor-btn").innerText;

        section.forEach((section) => {
          var sectionId = section.getAttribute("id");

          if (sectionId == anchorTitle) {
            var sectionTop = window.pageYOffset + section.getBoundingClientRect().top - headH;
            window.scrollTo({ top: sectionTop - 20, behavior: "smooth" });
          }
        });
      });
    });

    var i = 0;
    window.addEventListener("scroll", function () {
      const current = window.scrollY + 21;
      if (i < section.length - 1) {
        const frontLine = window.pageYOffset + section[i].getBoundingClientRect().top - headH;
        const endLine = window.pageYOffset + section[i + 1].getBoundingClientRect().top - headH;

        if (frontLine <= current && current < endLine) {
          if (!anchorItem[i].classList.contains("active")) {
            anchorItem[i].classList.add("active");
          }
        } else if (current < frontLine) {
          anchorItem[i].classList.remove("active");
          if (i == 0) {
            anchorItem[0].classList.add("active");
            i = 0;
          } else {
            anchorItem[i - 1].classList.add("active");
            i -= 1;
          }
        } else if (current > endLine) {
          anchorItem[i].classList.remove("active");
          anchorItem[i + 1].classList.add("active");

          i += 1;
        }
      } else {
        const frontLine = window.pageYOffset + section[1].getBoundingClientRect().top - headH;

        if (current > frontLine) {
          anchorItem[i - 1].classList.remove("active");
          anchorItem[i].classList.add("active");

          i -= 1;
        }
      }
      if (window.scrollY == document.documentElement.scrollHeight - window.innerHeight) {
        anchorItem.forEach((item) => {
          item.classList.remove("active");
        });
        anchorItem[anchorItem.length - 1].classList.add("active");
      } else {
        if (i != anchorItem.length - 1) {
          anchorItem[anchorItem.length - 1].classList.remove("active");
        }
      }
    });

    // 앵커 스와이퍼
    new Swiper(menuAnchor.querySelector(".swiper"), {
      slidesPerView: "auto",
      freeMode: true,
    });

    // 셀렉트 열기/닫기 기능
    selectBox.addEventListener("click", function () {
      if (selectBox.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        this.classList.add("active");
      }
    });

    // 셀렉트 선택 기능
    const categoryBox = pubListSearch.querySelector(".search-category");
    const selectCate = categoryBox.querySelectorAll(".select-item");

    selectCate.forEach((category) => {
      category.addEventListener("click", function () {
        const choiceText = category.innerText;
        choiceCate.innerText = choiceText;

        selectBox.classList.remove("active");
        searchInput.value = "";
        pageSection.forEach((element) => {
          element.classList.remove("hidden");
          const dataItem = element.querySelectorAll(".data-item");
          dataItem.forEach((item) => {
            item.classList.remove("hidden");
          });
        });
        noResult.classList.remove("active");
      });
    });

    // 페이지 상태에 따른 효과
    pageSection.forEach((element) => {
      const dataItem = element.querySelectorAll(".data-item");
      dataItem.forEach((item) => {
        const status = item.querySelectorAll(".data-status");
        status.forEach((status) => {
          if (status.classList.contains("ko")) {
            const viewBtn = item.querySelector(".data-view.ko .data-text");
            if (viewBtn && status.innerText == "완료") {
              viewBtn.classList.add("complete");
            } else if(viewBtn && status.innerText == "삭제") {
                viewBtn.classList.add("remove")
            }
          } else if (status.classList.contains("en")) {
            const viewBtn = item.querySelector(".data-view.en .data-text");
            if (viewBtn && status.innerText == "완료") {
              viewBtn.classList.add("complete");
            } else if(viewBtn && status.innerText == "삭제") {
                viewBtn.classList.add("remove")
            }
          }
        });
      });
    });
  });
}
