const carousel = document.querySelector('.carousel');
const container = document.querySelector('.container');
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');

// container 너비 동적 계산 함수
const countingItems = () => {
    return container.childElementCount;
}

const counts = countingItems();

// container 너비 동적 계산 즉시실행함수
(function () {
    container.style.width = `${counts * 600}px`;
})();

// 보여지고 있는 캐러셀 item 위치 값 
let carouselIndex = 0

// 캐러셀 item 위치 값 계산
const calculateIndex = (direction) => {
    if (direction === 'right') {
        carouselIndex++;
    } else if (direction === 'left') {
        carouselIndex--;
    } else {
        console.log('알 수 없는 direction 오류 발생');
    }
}

// 왼쪽 이동 버튼
const translateLeftContainer = () => {
    if (carouselIndex > 0) {
        calculateIndex('left');
        container.style.transition = 'all 0.3s ease';
        container.style.transform = `translateX(${-100 / counts * carouselIndex}%)`;

    }
}

// 오른쪽 이동 버튼
const translateRightContainer = () => {
    if (carouselIndex < counts - 1) {
        calculateIndex('right');
        container.style.transition = 'all 0.3s ease';
        container.style.transform = `translateX(${-100 / counts * carouselIndex}%)`;

    }
}


const translateIndexContainer = () => {
    container.style.transition = 'all 0.3s ease';
    container.style.transform = `translateX(${-100 / counts * indexBtn}%)`;
}

leftBtn.addEventListener('click', translateLeftContainer);
rightBtn.addEventListener('click', translateRightContainer);