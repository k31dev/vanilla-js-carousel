const carousel = document.querySelector(".carousel");
const container = document.querySelector(".container");
const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");
const indexContainer = document.querySelector(".indexContainer");

// 무한루프 생성을 위한 node clone
const firstItem = container.firstElementChild;
const lastItem = container.lastElementChild;
const cloneFirstItem = firstItem.cloneNode(true);
const cloneLastItem = lastItem.cloneNode(true);
container.insertBefore(cloneLastItem, firstItem);
container.appendChild(cloneFirstItem);

// item 개수 계산
const countingItems = () => {
    return container.childElementCount;
};
const counts = countingItems();
// 화면에 보이는 첫번째 indexBtn index
const fisrtBtnIndex = 1;
// 화면에 보이는 마지막 indexBtn index
const lastBtnIndex = counts - 2;

// 현시점 캐러셀에 보이는 container Item index
let carouselIndex = 0;

// 캐러셀 container Item index 값 계산
const calculateIndex = (direction) => {
    if (direction === "right") {
        carouselIndex++;
    } else if (direction === "left") {
        carouselIndex--;
    } else {
        console.log("알 수 없는 direction 오류 발생");
    }
};

// 인터벌
let interval = setInterval(() => {
    translateRightContainer();
}, 2000);

const mouseOverClear = () => {
    clearInterval(interval);
};
const mouseOutInterval = () => {
    interval = setInterval(() => {
        translateRightContainer();
    }, 2000);
};

// 캐러셀 container 이동
const moveCarouselWithDirection = (direction) => {
    calculateIndex(direction);
    container.style.transition = "all 0.3s ease";
    container.style.transform = `translateX(${(-100 / counts) * carouselIndex}%)`;
};

// 선택된 indexBtn 색상 할당
const assignIndexBtnColor = () => {
    indexContainer.childNodes.forEach((node, idx) => {
        idx === carouselIndex
            ? (node.style.backgroundColor = "red")
            : (node.style.backgroundColor = "black");
    });
};

// 왼쪽 이동 버튼
const translateLeftContainer = () => {
    if (carouselIndex > fisrtBtnIndex) {
        moveCarouselWithDirection("left");

        // 연속 클릭 상황 close
        leftBtn.style.pointerEvents = "none";
        // 클릭 이벤트 re-open
        setTimeout(() => {
            leftBtn.style.pointerEvents = "";
        }, 300);

        assignIndexBtnColor();
    } else if (carouselIndex === fisrtBtnIndex) {
        moveCarouselWithDirection("left");

        leftBtn.style.pointerEvents = "none";

        carouselIndex = lastBtnIndex;

        setTimeout(() => {
            container.style.transition = "";
            container.style.transform = `translateX(${(-100 / counts) * carouselIndex
                }%)`;
            leftBtn.style.pointerEvents = "";
        }, 300);

        assignIndexBtnColor();
    }
};

// 오른쪽 이동 버튼
const translateRightContainer = () => {
    if (carouselIndex < lastBtnIndex) {
        moveCarouselWithDirection("right");

        // 연속 클릭 상황 close
        rightBtn.style.pointerEvents = "none";
        // 클릭 이벤트 re-open
        setTimeout(() => {
            rightBtn.style.pointerEvents = "";
        }, 300);

        assignIndexBtnColor();
    } else if (carouselIndex == lastBtnIndex) {
        moveCarouselWithDirection("right");

        rightBtn.style.pointerEvents = "none";

        carouselIndex = fisrtBtnIndex;

        setTimeout(() => {
            container.style.transition = "";
            container.style.transform = `translateX(${(-100 / counts) * carouselIndex
                }%)`;
            rightBtn.style.pointerEvents = "";
        }, 300);

        assignIndexBtnColor();
    }
};

// 선택한 인덱스로 carousel 이동
const toIndexItem = (elem) => {
    indexContainer.childNodes.forEach((node, idx) => {
        if (node === elem.target) {
            carouselIndex = idx;
            container.style.transition = "all 0.3s ease";
            container.style.transform = `translateX(${(-100 / counts) * carouselIndex
                }%)`;
            node.style.backgroundColor = "red";
        } else {
            node.style.backgroundColor = "black";
        }
    });

    //   foreach - > for문 사용
    //   for (let i = 0; i < counts; i++) {
    //     if (indexContainer.childNodes[i] === elem.target) {
    //       carouselIndex = i;
    //       container.style.transition = "all 0.3s ease";
    //       container.style.transform = `translateX(${
    //         (-100 / counts) * carouselIndex
    //       }%)`;
    //       indexContainer.childNodes[carouselIndex].style.backgroundColor = "red";
    //     } else {
    //       indexContainer.childNodes[i].style.backgroundColor = "black";
    //     }
    //   }
};

// container 너비 동적 계산 즉시실행함수
(function () {
    //   container.style.width = `${counts * 600}px`;
    calculateIndex("right");
    container.style.transform = `translateX(${(-100 / counts) * carouselIndex}%)`;
})();

// carousel indexBtn 동적 생성
(function () {
    for (let i = 0; i < counts; i++) {
        const indexBtn = indexContainer.appendChild(document.createElement("div"));
        indexBtn.classList.add("indexBtn");
    }
})();

// 첫번째 indexBtn css 조정
(function () {
    indexContainer.childNodes[carouselIndex].style.backgroundColor = "red";
    indexContainer.firstElementChild.style.display = "none";
    indexContainer.lastElementChild.style.display = "none";
})();

leftBtn.addEventListener("click", translateLeftContainer);
rightBtn.addEventListener("click", translateRightContainer);
indexContainer.addEventListener("click", toIndexItem);

// interval 일시중지
carousel.addEventListener("mouseover", mouseOverClear);
// interval 재개
carousel.addEventListener("mouseout", mouseOutInterval);
