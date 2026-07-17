// Phrase Hero - 메인 로직

class TOEICGame {
  constructor() {
    // 상태
    this.currentScreen = 'worldMap';
    this.currentWorld = null;
    this.currentLevel = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctAnswers = 0;
    this.questionStartTime = 0;
    this.level2Answers = []; // Level 2의 답 저장
    this.level2CurrentBlank = 0; // 현재 채우는 빈침

    // 설정
    this.settings = this.loadSettings();

    // 저장된 데이터
    this.progress = this.loadProgress();
    this.scores = this.loadScores();

    // 요소
    this.elements = {
      // 탭
      tabs: document.querySelectorAll('.tab'),
      tabContents: document.querySelectorAll('.tab-content'),

      // 화면
      worldMapScreen: document.getElementById('worldMapScreen'),
      levelSelectScreen: document.getElementById('levelSelectScreen'),
      gameScreen: document.getElementById('gameScreen'),
      worldCompleteScreen: document.getElementById('worldCompleteScreen'),

      // 월드 맵
      worldGrid: document.getElementById('worldGrid'),
      bestScoreDisplay: document.getElementById('bestScoreValue'),

      // 레벨 선택
      levelSelectTitle: document.getElementById('levelSelectTitle'),
      levelSelectBackBtn: document.getElementById('levelSelectBackBtn'),

      // 게임
      gameWorldName: document.getElementById('gameWorldName'),
      gameLevelBadge: document.getElementById('gameLevelBadge'),
      progressFill: document.getElementById('progressFill'),
      currentQuestion: document.getElementById('currentQuestion'),
      totalQuestions: document.getElementById('totalQuestions'),
      comboDisplay: document.getElementById('comboDisplay'),
      comboCount: document.getElementById('comboCount'),
      sentenceText: document.getElementById('sentenceText'),
      hintText: document.getElementById('hintText'),
      level1Choices: document.getElementById('level1Choices'),
      level2Container: document.getElementById('level2Container'),
      blankSlots: document.getElementById('blankSlots'),
      wordTiles: document.getElementById('wordTiles'),
      hintBtn: document.getElementById('hintBtn'),
      skipBtn: document.getElementById('skipBtn'),
      currentScore: document.getElementById('currentScore'),
      currentCombo: document.getElementById('currentCombo'),
      currentBest: document.getElementById('currentBest'),
      gameExitBtn: document.getElementById('gameExitBtn'),

      // 월드 클리어
      finalScore: document.getElementById('finalScore'),
      accuracy: document.getElementById('accuracy'),
      maxComboDisplay: document.getElementById('maxCombo'),
      starsDisplay: document.getElementById('starsDisplay'),
      rankDisplay: document.getElementById('rankDisplay'),
      nextWorldBtn: document.getElementById('nextWorldBtn'),
      worldMapBtn: document.getElementById('worldMapBtn'),
      reviewMistakesBtn: document.getElementById('reviewMistakesBtn'),

      // 설정
      startLevelRadios: document.querySelectorAll('input[name="startLevel"]'),
      resetProgressBtn: document.getElementById('resetProgressBtn'),
      themeSelector: document.getElementById('themeSelector'),
      langSelector: document.getElementById('langSelector'),
      aboutWorldList: document.getElementById('aboutWorldList'),
      aboutVersion: document.getElementById('aboutVersion'),
      aboutStatPhrases: document.getElementById('aboutStatPhrases'),
      aboutStatWorlds: document.getElementById('aboutStatWorlds'),
      aboutStatLevels: document.getElementById('aboutStatLevels')
    };

    this.init();
  }

  init() {
    // 탭 이벤트
    this.elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // 월드 카드 생성
    this.renderWorldMap();

    // 레벨 선택 이벤트
    document.querySelectorAll('.level-btn').forEach(btn => {
      btn.addEventListener('click', () => this.startGame(parseInt(btn.dataset.level)));
    });

    // 레벨 선택 뒤로 버튼
    this.elements.levelSelectBackBtn.addEventListener('click', () => this.showScreen('worldMap'));

    // 게임 버튼
    this.elements.hintBtn.addEventListener('click', () => this.showHint());
    this.elements.skipBtn.addEventListener('click', () => this.skipQuestion());
    this.elements.gameExitBtn.addEventListener('click', () => this.exitGame());

    // 월드 클리어 버튼
    this.elements.nextWorldBtn.addEventListener('click', () => this.goToNextWorld());
    this.elements.worldMapBtn.addEventListener('click', () => this.showScreen('worldMap'));
    this.elements.reviewMistakesBtn.addEventListener('click', () => this.startReview());

    // 설정
    this.elements.resetProgressBtn.addEventListener('click', () => this.resetProgress());

    // 설정 로드
    this.loadSettingsToUI();

    // 언어 선택 UI 및 텍스트 적용
    this.renderLangSelector();
    this.applyI18n();

    // About 탭 메타(버전/통계) 표시
    this.renderAboutMeta();

    // 최고 점수 표시
    this.updateBestScoreDisplay();

    // 테마 적용
    this.applyTheme(this.settings.theme || 'purple');

    // 콘텐츠 로드: 캐시 반영 → 화면 갱신 → 서버 최신본 백그라운드 확인
    this.initContent();
  }

  // 서버/캐시 콘텐츠 연동 (시드는 이미 즉시 로드됨)
  async initContent() {
    const applyContent = () => {
      this._contentWorlds = null; // 월드 캐시 무효화 (새 콘텐츠 반영)
      this.renderWorldMap();
      this.renderAboutMeta();
    };
    // 1) 캐시된 팩 반영
    await ContentStore.init();
    applyContent();
    // 2) 서버가 더 최신이면 받아온 뒤 다시 반영
    ContentStore.onChange(applyContent);
    ContentStore.refresh();
  }

  // === 콘텐츠/월드 헬퍼 ===

  // 문제 데이터가 있는 월드만 플레이 가능
  worldHasContent(worldKey) {
    if (!this._contentWorlds) {
      this._contentWorlds = new Set();
      ['level1', 'level2'].forEach(lv => {
        ContentStore.phrases[lv].forEach(q => this._contentWorlds.add(q.world));
      });
    }
    return this._contentWorlds.has(worldKey);
  }

  // 플레이 가능한 월드 순서 목록 (잠금 해제/다음 월드 계산에 사용)
  playableWorlds() {
    return Object.keys(WORLDS).filter(k => this.worldHasContent(k));
  }

  // About 탭 버전/통계 (데이터 기반, manifest 버전 사용)
  renderAboutMeta() {
    if (this.elements.aboutVersion) {
      let version = '1.0.0';
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest) {
          version = chrome.runtime.getManifest().version;
        }
      } catch (e) { /* 확장 컨텍스트가 아니면 기본값 */ }
      this.elements.aboutVersion.textContent = `v${version}`;
    }
    const phrases = ContentStore.phrases.level1.length + ContentStore.phrases.level2.length;
    if (this.elements.aboutStatPhrases) this.elements.aboutStatPhrases.textContent = phrases;
    if (this.elements.aboutStatWorlds) this.elements.aboutStatWorlds.textContent = this.playableWorlds().length;
    if (this.elements.aboutStatLevels) this.elements.aboutStatLevels.textContent = Object.keys(LEVELS).length;
  }

  // === 다국어(i18n) 헬퍼 ===

  // 현재 언어
  get lang() {
    return this.settings.lang || DEFAULT_LANG;
  }

  // UI 문자열 조회 (+ {n}, {c}, {w} 치환)
  t(key, vars) {
    const table = I18N[this.lang] || I18N[DEFAULT_LANG];
    let str = table[key];
    if (str === undefined) str = (I18N[DEFAULT_LANG][key] ?? key);
    if (vars) {
      Object.keys(vars).forEach(k => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
      });
    }
    return str;
  }

  // 문제의 현재 언어 뜻 조회 (없으면 기본 언어로 대체)
  meaningOf(question) {
    return question.meaning[this.lang] || question.meaning[DEFAULT_LANG];
  }

  // 월드 이름 (현재 언어)
  worldName(worldKey) {
    const name = WORLDS[worldKey].name;
    return name[this.lang] || name[DEFAULT_LANG];
  }

  // data-i18n 속성이 있는 모든 정적 텍스트 적용
  applyI18n() {
    document.documentElement.lang = this.lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
    // 화면에 표시 중인 동적 텍스트도 갱신
    this.renderAboutWorldList();
    if (this.currentScreen === 'worldMap') this.renderWorldMap();
  }

  // 언어 선택 버튼 렌더링
  renderLangSelector() {
    this.elements.langSelector.innerHTML = '';
    LANGUAGES.forEach(({ code, label, flag }) => {
      const btn = document.createElement('button');
      btn.className = `lang-option ${code === this.lang ? 'active' : ''}`;
      btn.dataset.lang = code;
      btn.innerHTML = `<span class="lang-flag">${flag}</span><span>${label}</span>`;
      btn.addEventListener('click', () => this.changeLanguage(code));
      this.elements.langSelector.appendChild(btn);
    });
  }

  // 언어 변경
  changeLanguage(code) {
    this.settings.lang = code;
    this.persistSettings();

    // 활성 표시 업데이트
    this.elements.langSelector.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === code);
    });

    // 모든 텍스트 다시 적용
    this.applyI18n();

    // 진행 중인 화면들 텍스트 갱신
    if (this.currentScreen === 'levelSelect' && this.currentWorld) {
      const world = WORLDS[this.currentWorld];
      this.elements.levelSelectTitle.textContent = `${world.emoji} ${this.worldName(this.currentWorld)}`;
    }
    if (this.currentScreen === 'game') {
      const world = WORLDS[this.currentWorld];
      this.elements.gameWorldName.textContent = `${world.emoji} ${this.worldName(this.currentWorld)}`;
      // 현재 문제의 힌트/정답 노출 갱신
      const question = this.questions[this.currentQuestionIndex];
      if (question) {
        if (this.elements.hintText.classList.contains('revealed')) {
          this.elements.hintText.innerHTML =
            `✅ <span class="reveal-phrase">${question.phrase}</span> — ${this.meaningOf(question).translation}`;
        } else {
          this.elements.hintText.textContent = `💡 ${this.meaningOf(question).hint}`;
        }
      }
    }
  }

  // About 탭 월드 목록 렌더링
  renderAboutWorldList() {
    if (!this.elements.aboutWorldList) return;
    this.elements.aboutWorldList.innerHTML = '';
    this.playableWorlds().forEach(key => {
      const world = WORLDS[key];
      const li = document.createElement('li');
      li.textContent = `${world.emoji} ${this.worldName(key)}`;
      this.elements.aboutWorldList.appendChild(li);
    });
  }

  // 탭 전환
  switchTab(tabName) {
    this.elements.tabs.forEach(tab => tab.classList.remove('active'));
    this.elements.tabContents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
  }

  // 화면 전환
  showScreen(screenName) {
    const screens = ['worldMap', 'levelSelect', 'game', 'worldComplete'];
    screens.forEach(screen => {
      const element = this.elements[`${screen}Screen`];
      if (element) {
        element.classList.add('hidden');
      }
    });

    const targetElement = this.elements[`${screenName}Screen`];
    if (targetElement) {
      targetElement.classList.remove('hidden');
    }

    this.currentScreen = screenName;

    // 월드 맵으로 돌아갈 때 월드 카드 다시 렌더링
    if (screenName === 'worldMap') {
      this.renderWorldMap();
    }
  }

  // 월드 맵 렌더링
  renderWorldMap() {
    const worldKeys = Object.keys(WORLDS);

    this.elements.worldGrid.innerHTML = '';

    worldKeys.forEach((worldKey, index) => {
      const world = WORLDS[worldKey];
      const hasContent = this.worldHasContent(worldKey);
      // 콘텐츠가 없는 월드는 '준비 중'으로 표시 (클릭 불가)
      if (!hasContent) {
        const card = document.createElement('div');
        card.className = 'world-card coming-soon';
        card.innerHTML = `
          <div class="world-status">🚧</div>
          <div class="world-emoji">${world.emoji}</div>
          <div class="world-name">${this.worldName(worldKey)}</div>
          <div class="world-progress">${this.t('comingSoon')}</div>
        `;
        this.elements.worldGrid.appendChild(card);
        return;
      }

      // 모든 월드 자유 접근: 콘텐츠가 있는 월드는 항상 열림 (잠금 없음)
      const isUnlocked = true;
      const worldProgress = this.progress.worlds[worldKey] || { level1: 0, level2: 0, completed: false };
      const totalProgress = worldProgress.level1 + worldProgress.level2;
      const isCompleted = worldProgress.completed;

      const card = document.createElement('div');
      card.className = `world-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="world-status">${isCompleted ? '✅' : (!isUnlocked ? '🔒' : '')}</div>
        <div class="world-emoji">${world.emoji}</div>
        <div class="world-name">${this.worldName(worldKey)}</div>
        <div class="world-progress">${isUnlocked ? `${totalProgress}/60` : this.t('locked')}</div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => this.selectWorld(worldKey));
      }

      this.elements.worldGrid.appendChild(card);
    });
  }

  // 월드 선택
  selectWorld(worldKey) {
    this.currentWorld = worldKey;
    const world = WORLDS[worldKey];

    this.elements.levelSelectTitle.textContent = `${world.emoji} ${this.worldName(worldKey)}`;
    this.showScreen('levelSelect');
  }

  // 게임 시작 (월드/레벨 기준으로 문제 구성)
  startGame(level) {
    const allQuestions = ContentStore.phrases[`level${level}`].filter(q => q.world === this.currentWorld);
    const questionCount = this.settings.debugMode ? 1 : LEVELS[level].questionsPerGame;
    const questions = this.shuffleArray(allQuestions).slice(0, questionCount);
    this.beginRound(level, questions, false);
  }

  // 오답 복습 시작 (직전 라운드에서 틀린 문제만)
  startReview() {
    if (!this.reviewQueue || this.reviewQueue.length === 0) return;
    this.beginRound(this.currentLevel, this.shuffleArray(this.reviewQueue), true);
  }

  // 한 라운드 시작 (일반/복습 공통)
  beginRound(level, questions, isReview) {
    this.currentLevel = level;
    this.isReview = !!isReview;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctAnswers = 0;
    this.level2Answers = [];
    this.level2CurrentBlank = 0;
    this.roundMistakeIds = new Set(); // 이번 라운드에서 틀리거나 건너뛴 문제

    this.questions = questions;

    // UI 초기화
    const world = WORLDS[this.currentWorld];
    this.elements.gameWorldName.textContent =
      `${world.emoji} ${this.worldName(this.currentWorld)}${isReview ? ` · ${this.t('reviewMistakes')}` : ''}`;
    this.elements.gameLevelBadge.textContent = `Level ${level}`;
    this.elements.totalQuestions.textContent = this.questions.length;
    this.elements.currentBest.textContent = this.scores[`level${level}`]?.bestScore || 0;

    // 레벨별 UI 표시
    if (level === 1) {
      this.elements.level1Choices.classList.remove('hidden');
      this.elements.level2Container.classList.add('hidden');
    } else {
      this.elements.level1Choices.classList.add('hidden');
      this.elements.level2Container.classList.remove('hidden');
    }

    this.showScreen('game');
    this.showQuestion();
    this.updateScoreBoard();
  }

  // 현재 문제를 오답으로 기록
  markCurrentMistake() {
    const q = this.questions[this.currentQuestionIndex];
    if (q) this.roundMistakeIds.add(q.id);
  }

  // 문제 표시
  showQuestion() {
    const question = this.questions[this.currentQuestionIndex];

    // 진행률
    const progress = (this.currentQuestionIndex / this.questions.length) * 100;
    this.elements.progressFill.style.width = `${progress}%`;
    this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;

    // 문장과 힌트 (이전 정답 노출 상태 초기화)
    this.elements.hintText.classList.remove('revealed');
    this.elements.sentenceText.textContent = `"${question.sentence}"`;
    this.elements.hintText.textContent = `💡 ${this.meaningOf(question).hint}`;

    // 힌트 버튼 활성화
    this.elements.hintBtn.disabled = false;
    this.elements.hintBtn.textContent = this.t('hintBtn');

    // 시작 시간
    this.questionStartTime = Date.now();

    if (this.currentLevel === 1) {
      this.showLevel1Question(question);
    } else {
      this.showLevel2Question(question);
    }
  }

  // Level 1 문제 표시
  showLevel1Question(question) {
    // 선택지 생성
    const choices = [question.verb, ...question.distractors.slice(0, 3)];
    const shuffled = this.shuffleArray(choices);

    this.elements.level1Choices.innerHTML = '';
    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-tile';
      btn.textContent = choice;
      btn.addEventListener('click', () => this.handleLevel1Answer(choice, question.verb, btn));
      this.elements.level1Choices.appendChild(btn);
    });
  }

  // Level 2 문제 표시
  showLevel2Question(question) {
    this.level2Answers = [];
    this.level2CurrentBlank = 0;

    // 빈침 초기화
    this.elements.blankSlots.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const slot = document.createElement('div');
      slot.className = 'blank-slot';
      slot.dataset.index = i;
      slot.textContent = `□ ${this.t('blankWord', { n: i + 1 })}`;
      this.elements.blankSlots.appendChild(slot);
    }
    this.updateBlankSlots();

    // 단어 타일 생성
    const words = [question.verb, question.preposition, ...question.distractors.slice(0, 2)];
    const shuffled = this.shuffleArray(words);

    this.elements.wordTiles.innerHTML = '';
    shuffled.forEach(word => {
      const tile = document.createElement('button');
      tile.className = 'word-tile';
      tile.dataset.word = word;
      tile.textContent = word;
      tile.addEventListener('click', () => this.handleLevel2WordClick(word, tile));
      this.elements.wordTiles.appendChild(tile);
    });
  }

  // 빈침 업데이트 (Level 2)
  updateBlankSlots() {
    const slots = this.elements.blankSlots.querySelectorAll('.blank-slot');
    slots.forEach((slot, index) => {
      if (this.level2Answers[index]) {
        slot.classList.add('filled');
        slot.textContent = this.level2Answers[index];
        slot.classList.remove('current');
      } else if (index === this.level2CurrentBlank) {
        slot.classList.add('current');
        slot.classList.remove('filled');
      }
    });
  }

  // Level 1 정답 처리
  handleLevel1Answer(choice, correctAnswer, btn) {
    if (choice === correctAnswer) {
      btn.classList.add('correct');
      const earnedScore = this.calculateScore();
      this.handleCorrect(earnedScore, btn);
    } else {
      btn.classList.add('incorrect');
      setTimeout(() => btn.classList.remove('incorrect'), 300);
      this.handleIncorrect();
    }
  }

  // Level 2 단어 클릭 처리
  handleLevel2WordClick(word, tile) {
    if (tile.classList.contains('disabled')) return;

    const question = this.questions[this.currentQuestionIndex];
    const expectedWord = this.level2CurrentBlank === 0 ? question.verb : question.preposition;

    // 타일 전체 텍스트를 정답과 그대로 비교 ("up to" 같은 복수 단어 전치사 포함)
    const isCorrect = word === expectedWord;

    if (isCorrect) {
      // 정답
      this.level2Answers[this.level2CurrentBlank] = expectedWord;
      tile.classList.add('disabled', 'selected');

      // 첫 번째 빈침이면 두 번째로
      if (this.level2CurrentBlank === 0) {
        this.level2CurrentBlank = 1;
        this.updateBlankSlots();
      } else {
        // 두 빈침 다 채움
        const earnedScore = this.calculateScore();
        this.handleCorrect(earnedScore, null);
      }
    } else {
      // 오답
      tile.classList.add('incorrect');
      setTimeout(() => tile.classList.remove('incorrect'), 300);
      this.handleIncorrect();
    }
  }

  // 점수 계산
  calculateScore() {
    const baseScore = this.currentLevel === 1 ? 10 : 20;
    const comboBonus = this.combo * 2;

    // 시간 보너스
    const timeElapsed = Date.now() - this.questionStartTime;
    let timeBonus = 0;
    if (timeElapsed < 1000) timeBonus = 5;
    else if (timeElapsed < 2000) timeBonus = 3;
    else if (timeElapsed < 3000) timeBonus = 1;

    return baseScore + comboBonus + timeBonus;
  }

  // 정답 처리
  handleCorrect(score, element) {
    this.score += score;
    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.correctAnswers++;

    // 콤보 표시
    if (this.combo >= 2) {
      this.elements.comboDisplay.classList.remove('hidden');
      this.elements.comboCount.textContent = this.combo;
    }

    // 점수 팝업
    if (element) {
      this.showScorePopup(element, score);
    }

    this.updateScoreBoard();

    // 정답 후 숙어 + 예문 전체 번역 노출 (학습 강화)
    const question = this.questions[this.currentQuestionIndex];
    this.elements.hintText.innerHTML =
      `✅ <span class="reveal-phrase">${question.phrase}</span> — ${this.meaningOf(question).translation}`;
    this.elements.hintText.classList.add('revealed');

    // 다음 문제 (번역을 읽을 시간을 준 뒤 이동)
    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.questions.length) {
        this.completeGame();
      } else {
        this.showQuestion();
      }
    }, 1400);
  }

  // 오답 처리
  handleIncorrect() {
    this.markCurrentMistake();
    this.combo = 0;
    this.elements.comboDisplay.classList.add('hidden');
    this.updateScoreBoard();
  }

  // 점수 팝업
  showScorePopup(element, score) {
    const rect = element.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${score}`;
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top}px`;
    document.getElementById('scorePopupContainer').appendChild(popup);

    setTimeout(() => popup.remove(), 800);
  }

  // 힌트
  showHint() {
    const question = this.questions[this.currentQuestionIndex];

    this.combo = Math.max(0, this.combo - 3);
    this.elements.comboDisplay.classList.add('hidden');

    if (this.currentLevel === 1) {
      this.elements.hintText.textContent = this.t('hintFirstLetter', { c: question.verb.charAt(0) });
    } else {
      const firstWords = question.verb.split(' ')[0];
      this.elements.hintText.textContent = this.t('hintFirstWord', { w: firstWords });
    }

    this.elements.hintBtn.disabled = true;
    this.elements.hintBtn.textContent = this.t('hintDone');
    this.updateScoreBoard();
  }

  // 스킵
  skipQuestion() {
    this.markCurrentMistake();
    this.combo = 0;
    this.elements.comboDisplay.classList.add('hidden');
    this.updateScoreBoard();

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.completeGame();
    } else {
      this.showQuestion();
    }
  }

  // 점수보드 업데이트
  updateScoreBoard() {
    this.elements.currentScore.textContent = this.score;
    this.elements.currentCombo.textContent = this.combo;
  }

  // 게임 완료
  completeGame() {
    const totalQuestions = this.questions.length;
    const accuracy = totalQuestions ? Math.round((this.correctAnswers / totalQuestions) * 100) : 0;

    // 복습 라운드는 점수/진행/해금에 반영하지 않음
    if (!this.isReview) {
      const levelKey = `level${this.currentLevel}`;
      if (!this.scores[levelKey]) {
        this.scores[levelKey] = { bestScore: 0, totalGames: 0, perfectGames: 0 };
      }
      this.scores[levelKey].bestScore = Math.max(this.scores[levelKey].bestScore, this.score);
      this.scores[levelKey].totalGames++;
      if (accuracy === 100) this.scores[levelKey].perfectGames++;
      this.saveScores();

      // 진행 저장
      if (!this.progress.worlds[this.currentWorld]) {
        this.progress.worlds[this.currentWorld] = { level1: 0, level2: 0, completed: false };
      }
      this.progress.worlds[this.currentWorld][`level${this.currentLevel}`] = totalQuestions;
      this.saveProgress();
    }

    // 클리어 화면
    this.elements.finalScore.textContent = this.score;
    this.elements.accuracy.textContent = `${accuracy}%`;
    this.elements.maxComboDisplay.textContent = this.maxCombo;

    // 별점
    const stars = this.calculateStars(this.score, totalQuestions);
    this.elements.starsDisplay.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    // 등급
    const rank = this.calculateRank(this.score);
    this.elements.rankDisplay.textContent = rank;

    // 오답 복습 버튼: 이번 라운드에서 틀리거나 건너뛴 문제
    this.reviewQueue = this.questions.filter(q => this.roundMistakeIds.has(q.id));
    if (this.reviewQueue.length > 0) {
      this.elements.reviewMistakesBtn.style.display = 'block';
      this.elements.reviewMistakesBtn.textContent = `🔁 ${this.t('reviewMistakes')} (${this.reviewQueue.length})`;
    } else {
      this.elements.reviewMistakesBtn.style.display = 'none';
    }

    // 다음 월드 버튼 (복습 라운드에서는 숨김, 플레이 가능한 월드 기준)
    const playable = this.playableWorlds();
    const currentIndex = playable.indexOf(this.currentWorld);
    if (!this.isReview && currentIndex >= 0 && currentIndex < playable.length - 1) {
      this.elements.nextWorldBtn.style.display = 'block';
      this.nextWorldKey = playable[currentIndex + 1];

      // 다음 월드 해금
      if (!this.progress.unlockedWorlds.includes(this.nextWorldKey)) {
        this.progress.unlockedWorlds.push(this.nextWorldKey);
        this.saveProgress();
      }
    } else {
      this.elements.nextWorldBtn.style.display = 'none';
      this.nextWorldKey = null;
    }

    this.showScreen('worldComplete');
  }

  // 별점 계산
  calculateStars(score, totalQuestions) {
    const maxPossible = totalQuestions * (this.currentLevel === 1 ? 10 : 20);
    const ratio = score / maxPossible;
    if (ratio >= 0.8) return 3;
    if (ratio >= 0.6) return 2;
    if (ratio >= 0.4) return 1;
    return 0;
  }

  // 등급 계산
  calculateRank(score) {
    if (score >= 150) return '👑 Master';
    if (score >= 120) return '💎 Platinum';
    if (score >= 90) return '🥇 Gold';
    if (score >= 60) return '🥈 Silver';
    if (score >= 30) return '🥉 Bronze';
    return '⭐ Apprentice';
  }

  // 다음 월드로
  goToNextWorld() {
    if (this.nextWorldKey) {
      this.selectWorld(this.nextWorldKey);
    }
  }

  // 게임 나가기
  exitGame() {
    this.showScreen('worldMap');
  }

  // 최고 점수 업데이트
  updateBestScoreDisplay() {
    const best1 = this.scores.level1?.bestScore || 0;
    const best2 = this.scores.level2?.bestScore || 0;
    this.elements.bestScoreDisplay.textContent = Math.max(best1, best2);
  }

  // 셔플
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // 저장/로드
  loadProgress() {
    const saved = localStorage.getItem('toeicGameProgress');
    if (saved) return JSON.parse(saved);
    return {
      worlds: {},
      unlockedWorlds: ['business']
    };
  }

  saveProgress() {
    localStorage.setItem('toeicGameProgress', JSON.stringify(this.progress));
  }

  loadScores() {
    const saved = localStorage.getItem('toeicGameScores');
    if (saved) return JSON.parse(saved);
    return {};
  }

  saveScores() {
    localStorage.setItem('toeicGameScores', JSON.stringify(this.scores));
    this.updateBestScoreDisplay();
  }

  loadSettings() {
    const saved = localStorage.getItem('toeicGameSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.lang) parsed.lang = DEFAULT_LANG;
      return parsed;
    }
    return {
      startLevel: 1,
      debugMode: false,
      lang: DEFAULT_LANG
    };
  }

  // 설정 객체를 그대로 저장 (DOM 읽지 않음)
  persistSettings() {
    localStorage.setItem('toeicGameSettings', JSON.stringify(this.settings));
  }

  saveSettings() {
    const startLevel = parseInt(document.querySelector('input[name="startLevel"]:checked').value);
    this.settings.startLevel = startLevel;
    // debugMode는 UI에서 제거됨(개발자 전용). 기존 this.settings.debugMode 값을 그대로 보존.
    this.persistSettings();
  }

  loadSettingsToUI() {
    this.elements.startLevelRadios.forEach(radio => {
      radio.checked = parseInt(radio.value) === this.settings.startLevel;
    });

    // 테마 선택
    const themeOptions = this.elements.themeSelector.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === (this.settings.theme || 'purple')) {
        option.classList.add('active');
      }
    });

    // 설정 변경 시 저장
    this.elements.startLevelRadios.forEach(radio => {
      radio.addEventListener('change', () => this.saveSettings());
    });

    // 테마 선택 이벤트
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.applyTheme(theme);
        this.settings.theme = theme;
        this.saveSettings();

        // 활성 상태 업데이트
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
  }

  // 테마 적용
  applyTheme(theme) {
    document.body.classList.remove('theme-purple', 'theme-ocean', 'theme-sunset');
    if (theme !== 'purple') {
      document.body.classList.add(`theme-${theme}`);
    }
  }

  resetProgress() {
    if (confirm(this.t('resetConfirm'))) {
      localStorage.removeItem('toeicGameProgress');
      localStorage.removeItem('toeicGameScores');
      this.progress = {
        worlds: {},
        unlockedWorlds: ['business']
      };
      this.scores = {};
      this.renderWorldMap();
      this.updateBestScoreDisplay();
      alert(this.t('resetDone'));
    }
  }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
  new TOEICGame();
});
