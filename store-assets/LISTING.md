# Chrome Web Store — Listing Kit (Phrase Hero)

Copy-paste content for the Developer Console. I can't fill the console for you (it's your
authenticated Google account), so paste each field below and upload the images in this folder.

---

## 1. Store listing

**Product name**
```
Phrase Hero
```

**Summary / short description** (max 132 chars)

- English:
```
Learn everyday English phrases through quizzes — meanings shown in Korean, Japanese, Chinese, or English.
```
- 한국어:
```
퀴즈로 배우는 필수 영어 표현 — 뜻은 한국어·일본어·중국어·영어로. 비영어권 학습자를 위한 어휘 게임.
```

**Category**
```
Education
```

**Language (primary)**: English  (optionally add localized listings: 한국어 / 日本語 / 中文)

**Detailed description** (English):
```
Phrase Hero helps you master common English phrases — phrasal verbs and everyday
expressions — through quick, click-based quizzes.

Most people learning English are NOT native speakers, so Phrase Hero shows the meaning
in YOUR language while the phrase itself stays in English. Pick your language and play.

■ Supported meaning languages
🇰🇷 한국어 · 🇯🇵 日本語 · 🇨🇳 中文 · 🇺🇸 English

■ How it works
• Level 1 — read the sentence and choose the correct verb from four tiles.
• Level 2 — build the full phrase (verb + preposition) in the right order.
• After every correct answer, the full sentence translation appears briefly to
  reinforce what you just learned.

■ Made to keep you going
• Themed worlds (Business, Communication, Daily Life, and more) that unlock as you progress.
• Combo and time bonuses, stars, and ranks.
• Calm, easy-to-read design with Indigo / Ocean / Sunset accent themes.
• Your progress, language, and theme are saved locally in your browser.

■ Privacy
Phrase Hero does not collect any personal data. Everything is stored locally on your
device. No sign-in, no tracking, no external servers.

Open it anytime from Chrome's side panel and learn a few phrases between tasks.
```

**Detailed description** (한국어):
```
Phrase Hero는 TOEIC·회화에서 자주 쓰는 영어 표현(구동사·숙어)을 빠른 클릭 퀴즈로 익히는 학습 게임입니다.

영어를 배우는 사람 대부분은 원어민이 아니기 때문에, Phrase Hero는 문제(영어)는 그대로 두고 뜻만
사용자의 모국어로 보여줍니다. 언어를 고르고 바로 시작하세요.

■ 지원 언어(뜻 표시)
🇰🇷 한국어 · 🇯🇵 日本語 · 🇨🇳 中文 · 🇺🇸 English

■ 플레이 방법
• Level 1 — 문장을 읽고 4개 중 알맞은 동사를 고릅니다.
• Level 2 — 동사 + 전치사 순서대로 눌러 표현을 완성합니다.
• 정답을 맞히면 예문 전체 번역이 잠깐 나타나 방금 배운 표현을 각인시켜 줍니다.

■ 계속하게 만드는 요소
• 진행하면 열리는 테마 월드(비즈니스·커뮤니케이션·일상생활 등)
• 콤보·시간 보너스, 별점, 등급
• 눈이 편한 차분한 디자인, 인디고/바다/노을 테마
• 진행 상황·언어·테마는 브라우저에 로컬 저장

■ 개인정보
Phrase Hero는 어떠한 개인정보도 수집하지 않습니다. 모든 데이터는 기기에 로컬로 저장되며,
로그인·추적·외부 서버 전송이 없습니다.

Chrome 사이드 패널에서 언제든 열어 짬짬이 표현을 익혀보세요.
```
> 참고: 위 한국어 설명 첫 줄의 "TOEIC" 단어는 검색 노출용으로 넣은 것입니다. 상표 사용이 부담되면
> "시험·회화에서 자주 쓰는 영어 표현"으로 바꾸세요.

---

## 2. Graphic assets (upload from this folder)

| Field | File | Size |
|-------|------|------|
| Store icon | `store-icon-128.png` | 128×128 |
| Screenshot 1 | `store-1-worldmap.png` | 1280×800 |
| Screenshot 2 | `store-2-quiz.png` | 1280×800 |
| Screenshot 3 | `store-3-settings.png` | 1280×800 |
| Small promo tile | `promo-tile-440x280.png` | 440×280 |

(At least one 1280×800 screenshot is required. Marquee promo 1400×560 is optional — not included.)

---

## 3. Privacy practices (required tab)

**Single purpose**
```
Phrase Hero is a vocabulary learning game. Its single purpose is to teach common English
phrases (phrasal verbs and expressions) through quizzes, showing the meaning in the
learner's native language.
```

**Permission justification**

- `sidePanel`:
```
Required to display the game's user interface inside Chrome's side panel. This is the
extension's only UI surface. No website content is read and no host permissions are used.
```

- Host permissions: **none requested**
- Remote code: **No** — all code is bundled in the package.

**Data usage / disclosures**
- Does the extension collect user data? **No.**
- Progress, selected language, and theme are stored **locally** via `localStorage`.
  Nothing is transmitted to any server; there is no analytics, sign-in, or tracking.
- Tick the certification: *"I do not sell or transfer user data to third parties, outside
  of the approved use cases"* etc. (all apply, since no data is collected).

**Privacy policy URL** (Chrome may require one) — hosted on GitHub:
```
https://github.com/swyoonlabs/phrase-hero/blob/main/store-assets/PRIVACY.md
```
This renders as a readable web page on GitHub, so it works directly as the privacy policy URL.
(The source is `store-assets/PRIVACY.md`.)

---

## 4. Distribution
- Visibility: **Public** (or Unlisted while testing)
- Regions: All regions
- Homepage URL: `https://github.com/swyoonlabs/phrase-hero`
- Support URL: `https://github.com/swyoonlabs/phrase-hero/issues`

---

## 5. Packaging (the upload .zip)
Zip the extension **files at the root** (not the parent folder). Include:
`manifest.json`, `background.js`, `sidepanel.html`, `sidepanel.css`, `sidepanel.js`,
`sidepanel-data.js`, `icons/`.
Exclude: `store-assets/`, `screenshots/`, docs, `.git`.
> A ready-made zip can be produced with the command in the project (see chat).
```
```
