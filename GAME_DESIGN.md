# Phrase Hero - 설계서 v2.0

## 1. 게임 개요

### 1.1 목표
일상·필수 영어 표현(구동사, 숙어) 300개를 퀴즈로 학습하는 클릭 기반 게임 (한·일·중·영 다국어 지원)

### 1.2 타겟 사용자
- 영어 학습자 (비영어권: 한·일·중 등)
- 영어 숙어/관용구를 학습하고자 하는 학습자
- 컴퓨터로 작업하며 틈틈이 학습하고 싶은 직장인/학생

### 1.3 플랫폼
- Chrome Extension Side Panel
- 오프라인 동작 (AI/DB 연동 없음)
- 클릭 기반 인터랙션

### 1.4 핵심 가치
- **빠른 세션**: 10분 = 2-3개 월드 클리어
- **즉시 피드백**: 클릭 = 즉시 정답 확인
- **친숙한 UI**: 웹/IDE 사용자 친화적
- **정복감**: 월드 맵, 보스전, 업적

---

## 2. 게임 구조

### 2.1 전체 구조도

```
┌─────────────────────────────────────────────────────┐
│                   🦸 Phrase Hero                    │
├─────────────────────────────────────────────────────┤
│            [게임] [설정] [About]                     │ ← 탭
├─────────────────────────────────────────────────────┤
│                                                      │
│                    월드 맵                           │
│     ┌─────────┬─────────┬─────────┬─────────┐     │
│     │ 비즈니스│커뮤니케이션│일상생활│ 학습  │     │
│     │  ✅    │  ⏳   │  🔒   │  🔒  │     │
│     │ 30/30  │ 15/30  │  0/30  │ 0/30  │     │
│     └─────────┴─────────┴─────────┴─────────┘     │
│                                                      │
│   👹 경력/이력   🔒                                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 2.2 월드 구성 (5개 월드 × 60개 = 300개)

| 월드 | 테마 | Level 1 | Level 2 | 합계 |
|------|------|---------|---------|------|
| 🏢 비즈니스 | Business | 30개 | 30개 | 60개 |
| 💬 커뮤니케이션 | Communication | 30개 | 30개 | 60개 |
| 🏠 일상생활 | Daily Life | 30개 | 30개 | 60개 |
| 📚 학습/연구 | Learning | 30개 | 30개 | 60개 |
| ⚡ 경력/이력 | Career | 30개 | 30개 | 60개 |
| **합계** | | **150개** | **150개** | **300개** |

### 2.3 레벨 구조

| 레벨 | 빈칸 | 클릭 방식 | 점수 배율 |
|------|------|----------|----------|
| **Level 1** | 1개 | 4개 선택지 중 1개 클릭 | ×1 |
| **Level 2** | 2개 | 단어들을 순서대로 2개 클릭 | ×2 |
| **보스전** | 혼합 | Level 1+2 혼합 | ×3 |

---

## 3. 게임 플레이

### 3.1 플레이 흐름

```
시작
  ↓
월드 선택 (5개 중)
  ↓
레벨 선택 (Level 1 / Level 2)
  ↓
문제 출제 (10개 랜덤)
  ↓
클릭 → 정답 체크 → 즉시 피드백
  ↓
10문제 완료
  ↓
보스전 (3문제)
  ↓
월드 클리어 → 점수/별점 → 다음 월드 해금
```

### 3.2 10분 세션 구성

```
0:00  월드 선택 (클릭)
0:30  문제 1-10 (각 5-10초)
2:00  보스전 (3문제)
2:30  월드 클리어 화면 (30초)
3:00  다음 월드 자동 시작
5:30  2번째 월드 완료
8:00  3번째 월드 완료
10:00 세션 완료
```

### 3.3 일시정지/저장
- 언제든지 일시정지 가능
- 진행 상태 자동 저장 (LocalStorage)
- 다시 시작 시 이어서

---

## 4. UI/UX 설계

### 4.1 메인 화면 (월드 맵)

```
┌─────────────────────────────────────────┐
│   🦸 Phrase Hero                         │
├─────────────────────────────────────────┤
│   🌍 월드 선택                          │
│                                          │
│   ┌─────────────────────────────────┐   │
│   │  🏢 비즈니스       ✅ 완료       │   │
│   │  30/30  ⭐⭐⭐                 │   │
│   └─────────────────────────────────┘   │
│                                          │
│   ┌─────────────────────────────────┐   │
│   │  💬 커뮤니케이션   ⏳ 진행중     │   │
│   │  15/30  ⭐☆☆                   │   │
│   └─────────────────────────────────┘   │
│                                          │
│   ┌─────────────────────────────────┐   │
│   │  🏠 일상생활      🔒 잠김       │   │
│   │  (비즈니스 클리어 시 해금)      │   │
│   └─────────────────────────────────┘   │
│                                          │
│   🏆 최고 점수: 450                      │
└─────────────────────────────────────────┘
```

### 4.2 게임 화면 (Level 1)

```
┌─────────────────────────────────────────┐
│  💬 Communication   7/30                │ ← 진행률
├─────────────────────────────────────────┤
│                                          │
│  🔥 3연속 콤보!                         │ ← 콤보 표시
│                                          │
│  "This ___ for the delay."               │ ← 문제
│                                          │
│  💡 설명하다                             │ ← 힌트
│                                          │
│  ┌───────────────────────────────────┐ │
│  │  [account]  [explain]  [describe]  │ │ ← 선택지
│  └───────────────────────────────────┘ │
│                                          │
│  🖱️ 클릭하여 정답 선택                  │
│                                          │
├─────────────────────────────────────────┤
│  점수: 85   콤보: 3   최고: 120         │ ← 스코어보드
└─────────────────────────────────────────┘
```

### 4.3 게임 화면 (Level 2)

```
┌─────────────────────────────────────────┐
│  💬 Communication   7/30                │
├─────────────────────────────────────────┤
│                                          │
│  "The costs ___ ___ $500."               │ ← 문제 (빈칸 2개)
│                                          │
│  💡 합계가 ~이 되다                      │ ← 힌트
│                                          │
│  빈칸 1 □  빈칸 2 □                      │ ← 빈침 표시
│                                          │
│  ┌───────────────────────────────────┐ │
│  │  [add]  [up]  [to]  [for]          │ │ ← 단어 타일
│  └───────────────────────────────────┘ │
│                                          │
│  🖱️ 순서대로 클릭: add → up             │
│                                          │
├─────────────────────────────────────────┤
│  점수: 120  콤보: 5  최고: 250          │
└─────────────────────────────────────────┘
```

### 4.4 보스전 화면

```
┌─────────────────────────────────────────┐
│  👹 BOSS BATTLE!                        │
├─────────────────────────────────────────┤
│                                          │
│  ⚠️ 3문제 연속 정답으로 보스 처치!      │
│                                          │
│  문제 1/3                                │
│                                          │
│  [문제 표시]                             │
│                                          │
│  [선택지]                                │
│                                          │
├─────────────────────────────────────────┤
│  목숨: ❤❤❤                            │ ← 목숨 시스템
└─────────────────────────────────────────┘
```

### 4.5 설정 화면

```
┌─────────────────────────────────────────┐
│  ⚙️ 설정                                │
├─────────────────────────────────────────┤
│                                          │
│  🎮 게임 설정                            │
│  ┌─────────────────────────────────┐   │
│  │ 시작 레벨: ○ Level 1  ● Level 2 │   │
│  └─────────────────────────────────┘   │
│                                          │
│  🔧 개발자 설정                          │
│  ┌─────────────────────────────────┐   │
│  │ 디버그 모드: [ ] 1문제로 완료    │   │
│  │ 사운드:     [●] 켜기             │   │
│  └─────────────────────────────────┘   │
│                                          │
│  💾 데이터                                │
│  [진행 초기화] [설정 저장]               │
│                                          │
└─────────────────────────────────────────┘
```

### 4.6 About 화면

```
┌─────────────────────────────────────────┐
│  ℹ️ About                                │
├─────────────────────────────────────────┤
│                                          │
│  🦸 Phrase Hero v1.0                     │
│                                          │
│  📚 표현 개수: 300개                     │
│     - Level 1: 150개                    │
│     - Level 2: 150개                    │
│                                          │
│  🌍 월드: 5개                            │
│     비즈니스, 커뮤니케이션, 일상생활,    │
│     학습, 경력                           │
│                                          │
│  📝 설명                                 │
│  일상·필수 영어 표현을                   │
│  게임 형식으로 학습합니다.               │
│  클릭 기반으로 빠르고 재미있게!         │
│                                          │
│  © 2026 Phrase Hero                      │
└─────────────────────────────────────────┘
```

---

## 5. 데이터 구조

### 5.1 숙어 데이터 형식

```javascript
const TOEIC_PHRASES = {
  level1: [
    {
      id: 1,
      phrase: "account for",
      verb: "account",
      sentence: "This ___ for the delay.",
      korean: "이것이 지체의 원인이다",
      hint: "설명하다",
      world: "business",
      distractors: ["explain", "describe", "clarify"]
    },
    // ... 149개
  ],

  level2: [
    {
      id: 101,
      phrase: "add up to",
      verb: "add",
      preposition: "up to",
      sentence: "The costs ___ ___ $500.",
      korean: "비용이 합쳐서 500달러가 된다",
      hint: "합계가 ~이 되다",
      world: "business",
      distractors: ["to", "for", "with"]
    },
    // ... 149개
  ]
};
```

### 5.2 월드별 숙어 분류

| 월드 | Level 1 예시 | Level 2 예시 |
|------|-------------|-------------|
| 🏢 비즈니스 | account for, apply for | add up to, back away from |
| 💬 커뮤니케이션 | agree with, ask for | boil down to, break away from |
| 🏠 일상생활 | believe in, break down | break down into, brush up on |
| 📚 학습/연구 | call off, carry out | burn down to, catch up with |
| ⚡ 경력/이력 | deal with, depend on | chip in for, clean up after |

### 5.3 저장 데이터

```javascript
// LocalStorage
{
  "toeicGameProgress": {
    "worlds": {
      "business": { level1: 30, level2: 30, completed: true },
      "communication": { level1: 15, level2: 0, completed: false },
      "daily": { level1: 0, level2: 0, completed: false },
      "learning": { level1: 0, level2: 0, completed: false },
      "career": { level1: 0, level2: 0, completed: false }
    },
    "unlockedWorlds": ["business", "communication"]
  },

  "toeicGameScores": {
    "level1": { bestScore: 320, totalGames: 15, perfectGames: 2 },
    "level2": { bestScore: 450, totalGames: 10, perfectGames: 1 }
  },

  "toeicGameSettings": {
    "startLevel": 1,
    "debugMode": false,
    "soundEnabled": true
  },

  "toeicAchievements": {
    "lightning": false,
    "firestorm": false,
    "sharpshooter": false,
    "perfect": false
  }
}
```

---

## 6. 스코어 시스템

### 6.1 점수 계산

```
총점 = 기본 점수 × 레벨 배율 + 콤보 보너스 + 시간 보너스 - 페널티
```

| 요소 | 점수 | 설명 |
|------|------|------|
| 기본 점수 | 10점 | 1문제 정답 |
| 레벨 차등 | ×1~×3 | Level 1=×1, Level 2=×2, 보스=×3 |
| 콤보 보너스 | +n×2 | n연속 시 (최대 +20) |
| 시간 보너스 | +1~5점 | 1~3초 내 클릭 시 |
| 힌트 페널티 | -3점 | 힌트 사용 시 |
| 오답 페널티 | 콤보 리셋 | 오답 시 |

### 6.2 콤보 시스템

```
연속 정답에 따른 보너스:

1연속: +0점   (기본만)
2연속: +4점
3연속: +6점
4연속: +8점
5연속: +10점
6-7연속: +12점
8-9연속: +15점
10연속+: +20점 (파이어 모드!)
```

### 6.3 시간 보너스

```
클릭 속도에 따른 보너스:

⚡ 1초 이내:    +5점  (Godlike!)
⚡ 2초 이내:    +3점  (Perfect!)
⚡ 3초 이내:    +1점  (Good)
⚡ 3초 초과:    +0점  (Normal)
```

### 6.4 등급 시스템

```
점수별 등급 (한 세션 기준):

👑 Master      : 300+점  (최고 등급)
💎 Platinum    : 250-299점
🥇 Gold        : 200-249점
🥈 Silver      : 150-199점
🥉 Bronze      : 100-149점
⭐ Apprentice  : 50-99점
🌱 Beginner    : 0-49점
```

### 6.5 업적 시스템

```
🏅 업적 리스트:

[스피드]
- ⚡ Lightning: 1초 안에 5문제 정답
- 🔥 Firestorm: 10연속 콤보

[정확도]
- 🎯 Sharpshooter: 90% 이상 정답률
- 💯 Perfect: 퍼펙트 세션 (0실수)

[누적]
- 📚 Scholar: 100문제 정답
- 🎓 Learned: 200문제 정답
- 👑 Master: 300개 숙어 습득

[특별]
- 🌟 Rising Star: 최고 점수 갱신
- 🛡️ Consistent: 7일 연속 플레이
- 🌍 World Conqueror: 5개 월드 모두 클리어
```

---

## 7. 인터랙션 디자인

### 7.1 클릭 흐름

```
1. 문제 표시
   ↓
2. 선택지/단어 타일 표시
   ↓
3. 플레이어 클릭
   ↓
4. 즉시 피드백 (0.1초)
   ├─ 정답: 초록색 + ✓ + 점수 애니메이션 + 다음 문제
   └─ 오답: 빨간색 + shake + 다시 클릭
```

### 7.2 시각적 피드백

```
정답 클릭 순간:
┌─────────────────────────────────────────┐
│  [account]  ← 클릭                      │
│     ↓                                   │
│  초록색 배경 + ✓ 표시                    │
│     ↓                                   │
│  [+15] 점수가 위로 떠오름                │
│     ↓                                   │
│  0.3초 후 다음 문제로                    │
└─────────────────────────────────────────┘

오답 클릭 순간:
┌─────────────────────────────────────────┐
│  [explain]  ← 클릭 (오답)               │
│     ↓                                   │
│  빨간색 배경 + ✗ + shake 애니메이션     │
│     ↓                                   │
│  다시 선택 가능                          │
└─────────────────────────────────────────┘

파이어 모드 (5연속):
┌─────────────────────────────────────────┐
│  🔥🔥🔥 5연속 콤보! 2배 보너스!        │
└─────────────────────────────────────────┘
```

### 7.3 키보드 단축키

| 키 | 동작 |
|-----|------|
| Tab | 다음 선택지로 포커스 |
| Enter | 포커스된 선택지 선택 |
| Space | 힌트 |
| ESC | 스킵 |
| P | 일시정지 |

---

## 8. 보스전 시스템

### 8.1 보스전 구조

```
보스전 = 월드 마지막 3문제

- 목숨 3개 (❤❤❤)
- 오답 시 목숨 -1
- 목숨 0 = 보스전 실패
- 3문제 모두 정답 = 월드 클리어
```

### 8.2 보스전 보상

```
클리어 시:
- 기본 점수 × 3
- 특별 업적 "Boss Slayer"
- 다음 월드 해금
```

---

## 9. 기술 스택

| 구성요소 | 기술 |
|----------|------|
| HTML | sidepanel.html |
| CSS | sidepanel.css |
| JavaScript | sidepanel.js |
| 데이터 | sidepanel-data.js |
| 저장소 | Chrome LocalStorage |
| 배포 | Chrome Extension (Manifest V3) |

---

## 10. 파일 구조

```
chrome_sidebar_game01/
├── manifest.json              # Chrome Extension 설정
├── background.js              # 백그라운드 스크립트
├── sidepanel.html             # 메인 HTML (탭 구조)
├── sidepanel.css              # 스타일시트
├── sidepanel.js               # 게임 로직
├── sidepanel-data.js         # 영어 표현(구동사/숙어) 300개 데이터
├── icons/                     # 아이콘 파일들
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
├── GAME_DESIGN.md             # 본 설계서
└── README.md                  # 프로젝트 설명
```

---

## 11. 개발 단계

### Phase 1: 데이터 준비
- 영어 표현(구동사/숙어) 300개 데이터 작성
- 월드별 분류
- 오답 선택지 생성

### Phase 2: HTML 구조
- 탭 시스템 (게임/설정/About)
- 월드 맵 UI
- 게임 화면 UI
- 보스전 UI

### Phase 3: CSS 스타일
- 탭 디자인
- 월드 맵 스타일
- 클릭 가능한 타일/카드
- 애니메이션 (shake, fade, score popup)

### Phase 4: JS 게임 로직
- 문제 출제 시스템
- 클릭 처리 및 정답 체크
- 점수 계산
- 콤보 시스템
- 보스전 로직

### Phase 5: 저장 시스템
- LocalStorage 연동
- 진행 저장/로드
- 업적 추적

### Phase 6: 테스트 & 수정
- 동작 확인
- 버그 수정
- UI 개선

---

## 12. 영어 표현(구동사/숙어) 데이터 예시

### Level 1 (동사 입력) - 50개 예시

| # | 숙어 | 동사 | 뜻 | 문장 | 월드 |
|---|------|------|-----|------|------|
| 1 | account for | account | 설명하다 | This ___ for the delay. | business |
| 2 | agree with | agree | 동의하다 | I ___ with your opinion. | communication |
| 3 | apply for | apply | 지원하다 | She ___ for the job. | career |
| 4 | approve of | approve | 찬성하다 | They ___ of the plan. | business |
| 5 | argue with | argue | 논쟁하다 | Don't ___ with him. | communication |
| 6 | ask for | ask | 요청하다 | He ___ for a raise. | career |
| 7 | believe in | believe | 믿다 | We ___ in democracy. | daily |
| 8 | break down | break | 고장 나다 | The car ___ down. | daily |
| 9 | bring about | bring | 야기하다 | Change was ___ about. | business |
| 10 | call off | call | 취소하다 | They ___ off the meeting. | business |
| 11 | carry out | carry | 수행하다 | We must ___ out the plan. | business |
| 12 | check into | check | 조사하다 | I'll ___ into the matter. | learning |
| 13 | come across | come | 우연히 만나다 | I ___ across an old friend. | daily |
| 14 | deal with | deal | 다루다 | He can't ___ with stress. | daily |
| 15 | depend on | depend | 의존하다 | It ___ on the weather. | daily |
| 16 | dream of | dream | 꿈꾸다 | I ___ of traveling. | daily |
| 17 | end up | end | 결국 ~이 되다 | We ___ up being friends. | communication |
| 18 | face up to | face |直面하다 | ___ up to the truth. | daily |
| 19 | feel like | feel | ~하고 싶다 | I don't ___ like eating. | daily |
| 20 | figure out | figure | 알아내다 | Can you ___ it out? | learning |
| 21 | get along | get | 사이좋게 지내다 | They ___ well together. | communication |
| 22 | give up | give | 포기하다 | Don't ___ up now. | career |
| 23 | go on | go | 계속되다 | The meeting ___ on for hours. | business |
| 24 | grow up | grow | 자라다 | She ___ up in Tokyo. | daily |
| 25 | hand in | hand | 제출하다 | ___ in your homework. | learning |
| 26 | hang up | hang | 전화를 끊다 | She ___ up on me. | communication |
| 27 | hold on | hold | 기다리다 | ___ on a second. | communication |
| 28 | keep on | keep | 계속하다 | He ___ on working. | career |
| 29 | laugh at | laugh | 비웃다 | Don't ___ at him. | communication |
| 30 | look after | look | 돌보다 | She ___ her mother. | daily |
| 31 | look for | look | 찾다 | I'm ___ my keys. | daily |
| 32 | look into | look | 조사하다 | We'll ___ the problem. | business |
| 33 | make up | make | 화해하다 | They ___ up quickly. | communication |
| 34 | pay for | pay | 비용을 지불하다 | He ___ for dinner. | daily |
| 35 | put on | put | 입다 | She ___ her coat. | daily |
| 36 | put off | put | 미루다 | Don't ___ it off. | business |
| 37 | run into | run | 우연히 만나다 | I ___ him yesterday. | daily |
| 38 | run out of | run | 고갈되다 | We ___ of milk. | daily |
| 39 | set up | set | 설립하다 | They ___ a company. | career |
| 40 | show up | show | 나타나다 | He didn't ___ to the party. | communication |
| 41 | stand for | stand | 대표하다 | What does it ___ for? | business |
| 42 | take after | take | 닮다 | She ___ her mother. | daily |
| 43 | take off | take | 이륙하다/벗다 | The plane ___ off. | daily |
| 44 | talk into | talk | 설득하다 | She ___ me going. | communication |
| 45 | think over | think | 신중히 생각하다 | Let me ___ it over. | learning |
| 46 | try on | try | 입어보다 | ___ this shirt. | daily |
| 47 | turn down | turn | 거절하다 | He ___ the offer. | career |
| 48 | turn up | turn | 나타나다 | She ___ late. | communication |
| 49 | use up | use | 다 쓰다 | We ___ all the milk. | daily |
| 50 | work on | work | 작업하다 | I'm ___ a project. | career |

### Level 2 (숙어 완성) - 50개 예시

| # | 숙어 | 동사 | 전치사 | 뜻 | 문장 | 월드 |
|---|------|------|--------|-----|------|------|
| 101 | add up to | add | up to | 합계가 ~이 되다 | Costs ___ ___ $500. | business |
| 102 | back away from | back | away from | 물러나다 | He ___ from the deal. | business |
| 103 | boil down to | boil | down to | 결국 ~으로 귀결되다 | It ___ to money. | business |
| 104 | break away from | break | away from | 떨어져 나오다 | The dog ___ from its owner. | daily |
| 105 | break down into | break | down into | ~으로 분해되다 | Report ___ 3 parts. | learning |
| 106 | break up into | break | up into | ~으로 나뉘다 | Class ___ groups. | learning |
| 107 | brush up on | brush | up on | (지식을) 복습하다 | I need to ___ French. | learning |
| 108 | burn down to | burn | down to | 타서 없어지다 | House ___ to ashes. | daily |
| 109 | buy into | buy | into | 투자하다/믿다 | I didn't ___ the idea. | business |
| 110 | call on to | call | on to | 요청하다 | They ___ him to speak. | communication |
| 111 | carry over to | carry | over to | 이월되다 | Skills ___ the new job. | career |
| 112 | catch up with | catch | up with | 따라잡다 | I'll ___ you later. | communication |
| 113 | check up on | check | up on | 점검하다 | He'll ___ the patient. | daily |
| 114 | chip in for | chip | in for | 돈을 거두어 내다 | Let's ___ a gift. | communication |
| 115 | clean up after | clean | up after | 뒤를 치우다 | Mom ___ the kids. | daily |
| 116 | come across as | come | across as | ~로 보이다 | She ___ shy. | communication |
| 117 | come down to | come | down to | 결국 ~이 되다 | It ___ money. | business |
| 118 | come down with | come | down with | (병에) 걸리다 | He ___ the flu. | daily |
| 119 | come out with | come | out with | (제품을) 내놓다 | They ___ a new phone. | business |
| 120 | cut back on | cut | back on | 줄이다 | We need to ___ spending. | daily |
| 121 | do away with | do | away with | 폐지하다 | They ___ the old rule. | business |
| 122 | drop out of | drop | out of | 그만두다 | He ___ school. | learning |
| 123 | fall behind in | fall | behind in | 뒤쳐지다 | I'm ___ my work. | career |
| 124 | fit in with | fit | in with | 어울리다 | He doesn't ___ the team. | communication |
| 125 | get along with | get | along with | 사이좋게 지내다 | I ___ my coworkers. | communication |
| 126 | get away with | get | away with | 처벌받지 않다 | He won't ___ it. | business |
| 127 | get back to | get | back to | 답신하다 | I'll ___ you soon. | communication |
| 128 | get rid of | get | rid of | 제거하다 | We must ___ this problem. | daily |
| 129 | get through with | get | through with | 완료하다 | I ___ the report. | business |
| 130 | give up on | give | up on | 포기하다 | Don't ___ him. | communication |
| 131 | go back on | go | back on | 약속을 어기다 | He ___ his word. | communication |
| 132 | go on with | go | on with | 계속하다 | Please ___ your work. | career |
| 133 | grow out of | grow | out of | ~에서 벗어나다 | Kids ___ their clothes. | daily |
| 134 | hand over to | hand | over to | 인계하다 | I'll ___ you. | career |
| 135 | hang out with | hang | out with | 함께 시간보내다 | I ___ my friends. | communication |
| 136 | hold on to | hold | on to | 잡고 있다 | ___ the rail. | daily |
| 137 | keep up with | keep | up with | 따라가다 | Can you ___ technology? | learning |
| 138 | leave out of | leave | out of | 제외하다 | Don't ___ me. | communication |
| 139 | let go of | let | go of | 놓다 | ___ my hand. | daily |
| 140 | live up to | live | up to | 기대에 부응하다 | It ___ expectations. | career |
| 141 | look forward to | look | forward to | 고대하다 | I ___ the trip. | daily |
| 142 | look out for | look | out for | 주의하다 | ___ dangers. | daily |
| 143 | make up for | make | up for | 보상하다 | I'll ___ the delay. | business |
| 144 | miss out on | miss | out on | 놓치다 | Don't ___ this chance. | career |
| 145 | move on to | move | on to | 넘어가다 | Let's ___ the next topic. | learning |
| 146 | own up to | own | up to | 인정하다 | You should ___ your mistake. | communication |
| 147 | put up with | put | up with | 참다 | I can't ___ this noise. | daily |
| 148 | read up on | read | up on | 공부하다 | I need to ___ this. | learning |
| 149 | run out of | run | out of | 고갈되다 | We ___ of gas. | daily |
| 150 | settle down in | settle | down in | 정착하다 | They ___ the city. | daily |

---

*작성일: 2026-06-27*
*버전: 2.0*
*상태: 최종 설계*
