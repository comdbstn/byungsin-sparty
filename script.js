document.addEventListener('DOMContentLoaded', function() {
    // 축구공 애니메이션 추가
    createSoccerBallAnimation();
    
    function createSoccerBallAnimation() {
        const soccerBall = document.createElement('div');
        soccerBall.className = 'soccer-ball-animation';
        soccerBall.innerHTML = '⚽';
        document.body.appendChild(soccerBall);
        
        const ballStyle = document.createElement('style');
        ballStyle.textContent = `
            .soccer-ball-animation {
                position: fixed;
                font-size: 30px;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                animation: kick 10s infinite ease-in-out;
                z-index: 999;
                pointer-events: none;
            }
            
            @keyframes kick {
                0% { bottom: -30px; left: 10%; transform: rotate(0deg); }
                20% { bottom: 80vh; left: 30%; transform: rotate(180deg); }
                40% { bottom: 20vh; left: 70%; transform: rotate(360deg); }
                60% { bottom: 60vh; left: 40%; transform: rotate(540deg); }
                80% { bottom: 30vh; left: 80%; transform: rotate(720deg); }
                100% { bottom: -30px; left: 10%; transform: rotate(900deg); }
            }
        `;
        
        document.head.appendChild(ballStyle);
    }

    // 애니메이션 및 스크롤 효과
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefit-item, .price-card, .review-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 초기 스타일 설정
    const animatedElements = document.querySelectorAll('.benefit-item, .price-card, .review-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 페이지 로드 시 애니메이션 실행
    animateOnScroll();
    
    // 스크롤 시 애니메이션 실행
    window.addEventListener('scroll', animateOnScroll);

    // 홀로그램 효과 토글 (특별 효과)
    let holographicActive = false;
    const holographicOverlay = document.querySelector('.holographic-overlay');
    
    // 키보드 단축키로 홀로그램 효과 토글
    document.addEventListener('keydown', function(e) {
        // Shift + H 키를 눌렀을 때
        if (e.shiftKey && e.key.toLowerCase() === 'h') {
            holographicActive = !holographicActive;
            
            if (!holographicOverlay) {
                // 홀로그램 오버레이가 없으면 생성
                const overlay = document.createElement('div');
                overlay.className = 'holographic-overlay';
                document.body.appendChild(overlay);
                
                if (holographicActive) {
                    overlay.style.display = 'block';
                }
            } else {
                // 있으면 토글
                holographicOverlay.style.display = holographicActive ? 'block' : 'none';
            }
        }
    });
}); 