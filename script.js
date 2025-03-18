document.addEventListener('DOMContentLoaded', function() {
    // 폼 전송 처리
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(form);
            const formEntries = Object.fromEntries(formData.entries());
            
            // 간단한 유효성 검사
            if (!formEntries.nickname || !formEntries.gender || !formEntries.age || !formEntries.phone || !formEntries.team) {
                alert('모든 필수 항목을 입력해주세요!');
                return;
            }
            
            // 여기서 실제 서버로 데이터를 전송하는 코드가 들어갈 수 있습니다
            // 지금은 확인 메시지만 표시합니다
            showSuccessMessage(formEntries.team);
        });
    }

    // 참가 유형에 따라 친구 이름 필드 표시/숨김
    const participationType = document.getElementById('participationType');
    const friendNameGroup = document.getElementById('friendNameGroup');
    
    if (participationType && friendNameGroup) {
        participationType.addEventListener('change', function() {
            if (this.value === 'withFriend') {
                friendNameGroup.style.display = 'flex';
            } else {
                friendNameGroup.style.display = 'none';
            }
        });
    }

    // 성공 메시지 모달
    function showSuccessMessage(team) {
        // 모달 생성
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        
        // 팀에 따라 다른 메시지 표시
        const teamMsg = team === 'korea' ? '대한민국 화이팅! 🇰🇷' : '멋진 경기를 함께 응원해요! 🌍';
        
        // 모달 내용
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>⚽ 신청이 완료되었습니다! ⚽</h2>
                    <span class="close-btn">&times;</span>
                </div>
                <div class="modal-body">
                    <p>축하합니다! 성공적으로 신청되었습니다.</p>
                    <p>${teamMsg}</p>
                    <p>3월 20일 행사장에서 뵙겠습니다!</p>
                </div>
            </div>
        `;
        
        // 모달 스타일
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .success-modal {
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: #fff;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.5s ease;
                position: relative;
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                margin-bottom: 20px;
                position: relative;
            }
            
            .modal-header h2 {
                color: #1a7a04;
                text-align: center;
                margin: 0;
            }
            
            .close-btn {
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 28px;
                cursor: pointer;
                color: #1a7a04;
            }
            
            .modal-body {
                text-align: center;
                line-height: 1.6;
            }
            
            .modal-body p {
                margin: 10px 0;
            }
        `;
        
        // 문서에 모달과 스타일 추가
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);
        
        // 닫기 버튼 기능
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
            modalStyle.remove();
            form.reset(); // 폼 초기화
        });
        
        // 모달 외부 클릭 시 닫기
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                modalStyle.remove();
                form.reset(); // 폼 초기화
            }
        });
    }

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