# Phrase Hero - 구현 계획

## 개요
본 문서는 GAME_DESIGN.md를 바탕으로 한 단계별 구현 계획입니다.

---

## Phase 1: 데이터 준비 (1-2일)

### 1.1 영어 표현(구동사/숙어) 300개 데이터 작성
- [ ] **Level 1 데이터 (150개)**
  - [ ] 비즈니스 월드 (30개)
  - [ ] 커뮤니케이션 월드 (30개)
  - [ ] 일상생활 월드 (30개)
  - [ ] 학습/연구 월드 (30개)
  - [ ] 경력/이력 월드 (30개)

- [ ] **Level 2 데이터 (150개)**
  - [ ] 비즈니스 월드 (30개)
  - [ ] 커뮤니케이션 월드 (30개)
  - [ ] 일상생활 월드 (30개)
  - [ ] 학습/연구 월드 (30개)
  - [ ] 경력/이력 월드 (30개)

- [ ] **각 아이템 필수 필드**
  ```javascript
  {
    id: number,
    phrase: string,        // 전체 숙어
    verb: string,           // Level 1용
    preposition: string,    // Level 2용
    sentence: string,       // 빈칸 문장
    korean: string,         // 한국어 뜻
    hint: string,           // 힌트
    world: string,          // 월드 분류
    distractors: string[]   // 오답 선택지 (3-4개)
  }
  ```

### 1.2 데이터 파일 생성
- [ ] `sidepanel-data.js` 파일 생성
- [ ] `const TOEIC_PHRASES = { level1: [...], level2: [...] }` 형태
- [ ] 데이터 검증 (중복 확인, 필드 확인)

---

## Phase 2: HTML 구조 (1일)

### 2.1 기본 구조
- [ ] `sidepanel.html` 파일 생성/수정
- [ ] DOCTYPE, html, head, body 기본 구조
- [ ] viewport, charset 메타 태그
- [ ] CSS 파일 링크 (`<link rel="stylesheet" href="sidepanel.css">`)

### 2.2 탭 시스템
```html
<div class="tabs">
  <button class="tab active" data-tab="game">게임</button>
  <button class="tab" data-tab="settings">설정</button>
  <button class="tab" data-tab="about">About</button>
</div>
```
- [ ] 탭 컨테이너 div 생성
- [ ] 3개 탭 버튼 (게임, 설정, About)
- [ ] 탭 컨텐츠 영역 3개 생성

### 2.3 게임 탭

#### 2.3.1 월드 맵 화면
```html
<div id="worldMapScreen" class="screen">
  <h2>🌍 월드 선택</h2>
  <div class="world-grid">
    <!-- 5개 월드 카드 -->
  </div>
  <div class="score-board">...</div>
</div>
```
- [ ] 월드 맵 스크린 div
- [ ] 월드 그리드 (5개 카드)
- [ ] 각 월드 카드: 아이콘, 이름, 진행률, 잠금 상태
- [ ] 최고 점수 표시

#### 2.3.2 레벨 선택 화면
```html
<div id="levelSelectScreen" class="screen hidden">
  <h2>🎯 레벨 선택</h2>
  <button class="level-btn" data-level="1">Level 1</button>
  <button class="level-btn" data-level="2">Level 2</button>
  <button class="back-btn">← 뒤로</button>
</div>
```
- [ ] 레벨 선택 스크린 div
- [ ] Level 1, Level 2 버튼
- [ ] 뒤로 가기 버튼

#### 2.3.3 게임 화면
```html
<div id="gameScreen" class="screen hidden">
  <!-- 헤더: 월드명, 진행률 -->
  <div class="game-header">
    <span class="world-name">💬 Communication</span>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <span class="progress-text">7/30</span>
  </div>

  <!-- 콤보 표시 -->
  <div class="combo-display">🔥 3연속 콤보!</div>

  <!-- 문제 영역 -->
  <div class="question-area">
    <div class="sentence">"This ___ for the delay."</div>
    <div class="hint">💡 설명하다</div>
  </div>

  <!-- Level 1: 선택지 -->
  <div class="choices-container level1-choices">
    <button class="choice-tile">account</button>
    <button class="choice-tile">explain</button>
    <button class="choice-tile">describe</button>
    <button class="choice-tile">clarify</button>
  </div>

  <!-- Level 2: 빈침 표시 + 단어 타일 -->
  <div class="level2-area">
    <div class="blank-slots">
      <div class="blank-slot" data-index="0">□</div>
      <div class="blank-slot" data-index="1">□</div>
    </div>
    <div class="word-tiles">
      <button class="word-tile" data-word="add">add</button>
      <button class="word-tile" data-word="up">up</button>
      <button class="word-tile" data-word="to">to</button>
      <button class="word-tile" data-word="for">for</button>
    </div>
  </div>

  <!-- 액션 버튼 -->
  <div class="action-buttons">
    <button class="hint-btn">💡 힌트</button>
    <button class="skip-btn">⏭ 스킵</button>
  </div>

  <!-- 스코어보드 -->
  <div class="score-board">
    <span>점수: 85</span>
    <span>콤보: 3</span>
    <span>최고: 120</span>
  </div>
</div>
```
- [ ] 게임 스크린 div
- [ ] 게임 헤더 (월드명, 진행률)
- [ ] 콤보 표시
- [ ] 문제 영역 (문장, 힌트)
- [ ] Level 1 선택지 영역
- [ ] Level 2 빈침 + 단어 타일 영역
- [ ] 액션 버튼 (힌트, 스킵)
- [ ] 스코어보드

#### 2.3.4 보스전 화면
```html
<div id="bossScreen" class="screen hidden">
  <h2>👹 BOSS BATTLE!</h2>
  <div class="lives">❤❤❤</div>
  <div class="boss-question">...</div>
  <div class="boss-choices">...</div>
</div>
```
- [ ] 보스전 스크린 div
- [ ] 목숨 표시
- [ ] 보스 문제 영역
- [ ] 보스 선택지 영역

#### 2.3.5 월드 클리어 화면
```html
<div id="worldCompleteScreen" class="screen hidden">
  <div class="completion-badge">🏆</div>
  <h2>월드 클리어!</h2>
  <div class="score-display">총점: 250점</div>
  <div class="stars-display">⭐⭐⭐</div>
  <div class="rank-display">💎 Platinum</div>
  <button class="next-world-btn">다음 월드 →</button>
  <button class="world-map-btn">월드 맵</button>
</div>
```
- [ ] 월드 클리어 스크린 div
- [ ] 완료 배지
- [ ] 점수/별점/등급 표시
- [ ] 다음 월드/월드 맵 버튼

### 2.4 설정 탭
```html
<div id="settingsScreen" class="screen hidden">
  <h2>⚙️ 설정</h2>
  <div class="setting-section">
    <h3>시작 레벨</h3>
    <label><input type="radio" name="startLevel" value="1"> Level 1</label>
    <label><input type="radio" name="startLevel" value="2"> Level 2</label>
  </div>
  <div class="setting-section">
    <h3>디버그 모드</h3>
    <label><input type="checkbox" id="debugMode"> 1문제로 완료</label>
  </div>
  <div class="setting-section">
    <h3>데이터</h3>
    <button id="resetProgressBtn">진행 초기화</button>
  </div>
</div>
```
- [ ] 설정 스크린 div
- [ ] 시작 레벨 라디오 버튼
- [ ] 디버그 모드 체크박스
- [ ] 진행 초기화 버튼

### 2.5 About 탭
```html
<div id="aboutScreen" class="screen hidden">
  <h2>ℹ️ About</h2>
  <div class="about-content">
    <h3>🦸 Phrase Hero v1.0</h3>
    <p>일상·필수 영어 표현 300개를 게임으로 학습합니다.</p>
    ...
  </div>
</div>
```
- [ ] About 스크린 div
- [ ] 게임 정보 (버전, 숙어 개수, 월드)
- [ ] 설명 텍스트

---

## Phase 3: CSS 스타일 (1일)

### 3.1 기본 스타일
- [ ] Reset CSS (margin, padding, box-sizing)
- [ ] 바디 스타일 (font, background, colors)
- [ ] 컨테이너 스타일 (max-width, padding)

### 3.2 탭 스타일
```css
.tabs { display: flex; gap: 10px; }
.tab { flex: 1; padding: 12px; border-radius: 8px; }
.tab.active { background: #667eea; color: white; }
```
- [ ] 탭 컨테이너 flex 레이아웃
- [ ] 탭 버튼 스타일
- [ ] 활성 탭 하이라이트

### 3.3 월드 맵 스타일
```css
.world-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.world-card { ... }
.world-card.locked { opacity: 0.5; pointer-events: none; }
.world-card.completed { border-color: #4ade80; }
```
- [ ] 월드 그리드 레이아웃
- [ ] 월드 카드 스타일
- [ ] 잠김/완료 상태 스타일
- [ ] 진행률 바 스타일

### 3.4 게임 화면 스타일
- [ ] 게임 헤더 스타일
- [ ] 콤보 표시 스타일 (애니메이션)
- [ ] 문장/힌트 스타일
- [ ] 선택지 타일 스타일 (hover, active, 정답, 오답)
- [ ] 빈침 슬롯 스타일
- [ ] 단어 타일 스타일
- [ ] 액션 버튼 스타일
- [ ] 스코어보드 스타일

### 3.5 보스전 스타일
- [ ] 보스전 헤더 스타일
- [ ] 목숨 하트 스타일
- [ ] 보스 문제 영역

### 3.6 애니메이션
```css
@keyframes shake { ... }
@keyframes scorePopup { ... }
@keyframes fireMode { ... }
.shake { animation: shake 0.3s; }
.score-popup { animation: scorePopup 0.5s; }
```
- [ ] shake 애니메이션 (오답)
- [ ] scorePopup 애니메이션 (정답)
- [ ] fireMode 애니메이션 (콤보)

### 3.7 설정/About 스타일
- [ ] 설정 섹션 스타일
- [ ] About 컨텐츠 스타일

### 3.8 반응형
- [ ] 사이드 패널 너비에 맞춘 조정
- [ ] 폰트 사이즈 조정

---

## Phase 4: JavaScript 게임 로직 (2-3일)

### 4.1 기본 구조
```javascript
class TOEICGame {
  constructor() { ... }
  init() { ... }
}
```
- [ ] 클래스 구조 생성
- [ ] 생성자 (상태 초기화)
- [ ] init() 메서드

### 4.2 상태 관리
```javascript
this.state = {
  currentScreen: 'worldMap',
  currentWorld: null,
  currentLevel: null,
  currentQuestionIndex: 0,
  score: 0,
  combo: 0,
  lives: 3,
  isBossBattle: false,
  questions: []
};
```
- [ ] 상태 변수 정의
- [ ] screen 전환 메서드
- [ ] state 저장/로드 메서드

### 4.3 데이터 로드
- [ ] `TOEIC_PHRASES` 데이터 로드
- [ ] 월드별 데이터 필터링 메서드
- [ ] 문제 셔플 메서드

### 4.4 탭 시스템
```javascript
switchTab(tabName) {
  // 모든 스크린 숨기기
  // 선택한 탭의 스크린 보이기
}
```
- [ ] 탭 전환 메서드
- [ ] 탭 클릭 이벤트 리스너

### 4.5 월드 맵
- [ ] 월드 카드 렌더링 메서드
- [ ] 월드 잠금/해금 상태 표시
- [ ] 진행률 계산 및 표시
- [ ] 월드 클릭 이벤트

### 4.6 레벨 선택
- [ ] 레벨 선택 화면으로 전환
- [ ] Level 1/2 버튼 클릭 이벤트

### 4.7 게임 시작
```javascript
startGame(world, level) {
  // 해당 월드+레벨의 문제 10개 선택
  // 게임 화면으로 전환
  // 첫 문제 표시
}
```
- [ ] 게임 시작 메서드
- [ ] 문제 10개 랜덤 선택
- [ ] 게임 화면 초기화

### 4.8 문제 표시
```javascript
showQuestion() {
  // 현재 문제 데이터로 UI 업데이트
  // 문장, 힌트, 선택지 표시
}
```
- [ ] Level 1 문제 표시 (선택지 4개)
- [ ] Level 2 문제 표시 (빈침 2개 + 단어 타일)
- [ ] 진행률 업데이트

### 4.9 클릭 처리 (Level 1)
```javascript
handleChoiceClick(choice) {
  if (choice === correctAnswer) {
    // 정답 처리
  } else {
    // 오답 처리
  }
}
```
- [ ] 선택지 클릭 이벤트
- [ ] 정답 확인
- [ ] 정답 애니메이션

### 4.10 클릭 처리 (Level 2)
```javascript
handleWordTileClick(word) {
  // 빈침 1 → 빈칸 2 순서대로 클릭 확인
  // 두 빈침 모두 채워지면 정답 확인
}
```
- [ ] 단어 타일 클릭 이벤트
- [ ] 빈침 순서 확인
- [ ] 두 단어 모두 입력 시 정답 확인

### 4.11 정답 처리
```javascript
handleCorrect() {
  // 점수 계산
  // 콤보 증가
  // 애니메이션
  // 다음 문제 (0.3초 후)
}
```
- [ ] 점수 계산 (기본 + 콤보 + 시간 보너스)
- [ ] 콤보 증가
- [ ] 정답 애니메이션 (초록색, 점수 팝업)
- [ ] 다음 문제로 이동

### 4.12 오답 처리
```javascript
handleIncorrect() {
  // 콤보 리셋
  // shake 애니메이션
  // 다시 클릭 가능
}
```
- [ ] 콤보 리셋
- [ ] shake 애니메이션
- [ ] 입력 리셋

### 4.13 시간 보너스
- [ ] 클릭 시간 측정
- [ ] 1~3초 내 클릭 시 보너스 계산

### 4.14 힌트 시스템
```javascript
showHint() {
  // 정답의 첫 글자 표시
  // -3점 페널티
  // 콤보 리셋
}
```
- [ ] 힌트 버튼 클릭 이벤트
- [ ] 첫 글자 힌트 표시
- [ ] 페널티 적용

### 4.15 스킵
```javascript
skipQuestion() {
  // 콤보 리셋
  // 다음 문제로
}
```
- [ ] 스킵 버튼 이벤트
- [ ] 콤보 리셋
- [ ] 다음 문제 이동

### 4.16 보스전
- [ ] 보스전 시작 메서드
- [ ] 목숨 시스템
- [ ] 보스전 클리어/실패 처리

### 4.17 월드 클리어
```javascript
handleWorldComplete() {
  // 총점 계산
  // 등급 결정
  // 별점 계산
  // 클리어 화면 표시
  // 다음 월드 해금
}
```
- [ ] 총점 계산
- [ ] 등급 결정 (Master → Beginner)
- [ ] 별점 계산 (0~3개)
- [ ] 클리어 화면 표시
- [ ] 다음 월드 해금 로직

### 4.18 설정
- [ ] 시작 레벨 설정 로드/저장
- [ ] 디버그 모드 설정
- [ ] 진행 초기화

---

## Phase 5: 저장 시스템 (1일)

### 5.1 LocalStorage 구조
```javascript
const STORAGE_KEYS = {
  PROGRESS: 'toeicGameProgress',
  SCORES: 'toeicGameScores',
  SETTINGS: 'toeicGameSettings',
  ACHIEVEMENTS: 'toeicAchievements'
};
```
- [ ] 저장소 키 정의
- [ ] 저장/로드 헬퍼 함수

### 5.2 진행 저장
```javascript
{
  worlds: {
    business: { level1: 30, level2: 30, completed: true },
    communication: { level1: 15, level2: 0, completed: false },
    ...
  },
  unlockedWorlds: ['business', 'communication']
}
```
- [ ] 진행 데이터 저장
- [ ] 진행 데이터 로드
- [ ] 월드별 진행률 계산

### 5.3 점수 저장
```javascript
{
  level1: { bestScore: 320, totalGames: 15, perfectGames: 2 },
  level2: { bestScore: 450, totalGames: 10, perfectGames: 1 }
}
```
- [ ] 점수 저장
- [ ] 최고 점수 갱신
- [ ] 통계 기록

### 5.4 업적 저장
```javascript
{
  lightning: false,
  firestorm: false,
  sharpshooter: false,
  perfect: false,
  worldConqueror: false
}
```
- [ ] 업적 달성 확인
- [ ] 업적 저장/로드

### 5.5 설정 저장
- [ ] 설정 저장
- [ ] 설정 로드
- [ ] 초기화 기능

---

## Phase 6: 테스트 & 수정 (1-2일)

### 6.1 기능 테스트
- [ ] 탭 전환 동작 확인
- [ ] 월드 선택 동작 확인
- [ ] 레벨 선택 동작 확인
- [ ] Level 1 게임 플레이 테스트
- [ ] Level 2 게임 플레이 테스트
- [ ] 보스전 동작 확인
- [ ] 월드 클리어 동작 확인
- [ ] 설정 저장/로드 확인

### 6.2 스코어 테스트
- [ ] 점수 계산 정확성 확인
- [ ] 콤보 시스템 확인
- [ ] 시간 보너스 확인
- [ ] 등급 계산 확인

### 6.3 저장 테스트
- [ ] 진행 저장 확인
- [ ] 새로고침 후 데이터 유지 확인
- [ ] 초기화 기능 확인

### 6.4 UI/UX 테스트
- [ ] 모든 화면 레이아웃 확인
- [ ] 애니메이션 동작 확인
- [ ] 반응형 확인
- [ ] 다크 모드 (선택사항)

### 6.5 버그 수정
- [ ] 발견한 버그 수정
- [ ] 재테스트
- [ ] 코드 정리

---

## Phase 7: 배포 준비 (반나절)

### 7.1 Chrome Extension
- [ ] `manifest.json` 확인
- [ ] 아이콘 파일 확인
- [ ] `background.js` 확인

### 7.2 최종 확인
- [ ] 모든 파일 로드 확인
- [ ] 로컬 테스트 완료
- [ ] 배포 버전 빌드

---

## 일정 요약

| Phase | 작업 | 예상 소요 시간 |
|-------|------|----------------|
| 1 | 데이터 준비 | 1-2일 |
| 2 | HTML 구조 | 1일 |
| 3 | CSS 스타일 | 1일 |
| 4 | JS 게임 로직 | 2-3일 |
| 5 | 저장 시스템 | 1일 |
| 6 | 테스트 & 수정 | 1-2일 |
| 7 | 배포 준비 | 반나절 |
| **합계** | | **7-10일** |

---

## 우선순위

### Must Have (필수)
1. Phase 1-5: 기본 게임 기능
2. Phase 6: 기본 테스트

### Should Have (중요)
1. 콤보 시스템
2. 보스전
3. 월드 해금 시스템

### Nice to Have (선택)
1. 다크 모드
2. 사운드 효과
3. 다양한 애니메이션

---

*작성일: 2026-06-27*
*버전: 1.0*
*예상 완료: 7-10일*
