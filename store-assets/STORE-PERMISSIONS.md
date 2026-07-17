# Chrome Web Store — 권한 사유 / Permission Justifications

_v1.2 (서버 콘텐츠 도입) 심사 제출용. 대시보드의 "Privacy practices" 탭에 붙여넣으세요._

---

## Single purpose (단일 목적)

**EN**
Phrase Hero is a vocabulary-learning game that teaches everyday English phrases
(phrasal verbs and idioms) through short click-based quizzes in the side panel.

**KO**
Phrase Hero는 사이드 패널에서 짧은 클릭 퀴즈로 일상 영어 표현(구동사·숙어)을
학습하는 어휘 게임입니다.

---

## `storage` justification

**EN**
Used to save the player's progress and settings locally, and to cache downloaded
lesson content on the device so the game works offline. No data is transmitted.

**KO**
플레이어의 진행 상황과 설정을 기기에 로컬 저장하고, 내려받은 학습 콘텐츠를
캐시하여 오프라인에서도 동작하게 하는 용도입니다. 어떤 데이터도 전송하지 않습니다.

---

## Host permission justification — `https://swyoonlabs.github.io/*`

**EN**
The learning content (English phrases, example sentences, and their translations)
is hosted as static JSON files on our GitHub Pages site. This host permission lets
the extension download and update lessons without requiring a new extension release.
Only our own content files are requested; no third-party or user-browsed sites are
accessed, and no personal data is sent.

**KO**
학습 콘텐츠(영어 표현·예문·번역)를 자사 GitHub Pages에 정적 JSON 파일로 호스팅합니다.
이 호스트 권한은 확장앱을 새로 배포하지 않고도 레슨을 내려받아 갱신하기 위한 것입니다.
자사 콘텐츠 파일만 요청하며, 제3자 사이트나 사용자가 방문하는 페이지에는 접근하지
않고, 개인정보도 전송하지 않습니다.

---

## Remote code (원격 코드 사용 여부)

**Answer: No / 아니요.**

**EN**
The extension does not use remote code. It only fetches static JSON *data* from our
GitHub Pages host and parses it with `JSON.parse`. No scripts are downloaded,
evaluated, or injected.

**KO**
원격 코드를 사용하지 않습니다. GitHub Pages에서 정적 JSON "데이터"만 받아
`JSON.parse`로 처리하며, 어떤 스크립트도 내려받거나 실행·주입하지 않습니다.

---

## Data usage disclosures (데이터 사용 공개)

Check **none** of the "collected/used" data-type boxes. / 데이터 유형 수집 항목은
모두 **선택하지 않음**.

- Does NOT collect or transmit personally identifiable information — 개인 식별 정보
  수집·전송 안 함
- No web history, no analytics, no ads, no account sign-in — 웹 기록·분석·광고·로그인
  없음
- Progress, settings, and cached content stay on the device — 진행 상황·설정·캐시
  콘텐츠는 기기에만 저장

Certify all three: (1) not selling/transferring data to third parties, (2) not using
data for unrelated purposes, (3) not using data to determine creditworthiness/lending.
→ 세 가지 인증 항목 모두 해당(위반 없음).

Privacy policy URL: (게시된 PRIVACY.md 링크를 입력)
