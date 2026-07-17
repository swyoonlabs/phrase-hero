# Phrase Hero — Privacy Policy

_Last updated: 2026-07-17_

Phrase Hero ("the extension") is a vocabulary-learning game. We respect your privacy.

## What we collect
**Nothing.** Phrase Hero does not collect, transmit, or sell any personal information.
There is no analytics, tracking, advertising, or account sign-in.

## Data stored on your device
The extension saves the following **locally in your browser**, so your progress is
remembered between sessions:

- Game progress (unlocked worlds, completion, scores) — `localStorage`
- Your chosen meaning language (Korean / Japanese / Chinese / English) — `localStorage`
- Your chosen theme — `localStorage`
- A cached copy of the learning content, so the game works offline — `chrome.storage.local`

This data never leaves your device. You can clear it at any time from the extension's
**Settings → Reset Progress**, or by removing the extension.

## Learning content downloads
To let us add and update lessons without requiring an extension update, the learning
content (English phrases, example sentences, and their meanings) is downloaded from our
static content host on **GitHub Pages** (`https://swyoonlabs.github.io/`). The extension
comes with a built-in starter set, so it works offline and on first launch even before
any download.

These are ordinary file downloads of learning content only. **No personal information is
sent** — the extension does not transmit your progress, settings, or any identifying data.
As with any web request, the content host (GitHub) may log standard technical information
such as your IP address and browser type; please refer to
[GitHub's Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).
The downloaded content is cached on your device so the game continues to work offline.

## Permissions
- `sidePanel` — to display the game's interface in Chrome's side panel.
- `storage` — to cache the learning content on your device for offline use.
- `host_permissions` (`https://swyoonlabs.github.io/*`) — to download the learning content
  described above. No other websites are accessed, and no page content you browse is read.

## Contact
Questions? Open an issue at https://github.com/swyoonlabs/phrase-hero/issues
or visit https://swyoonlabs.blogspot.com/

---

### 한국어 요약
Phrase Hero는 어떠한 개인정보도 수집·전송·판매하지 않으며 추적·광고·로그인이 없습니다. 게임 진행
상황, 선택한 언어와 테마는 브라우저에 **로컬**로 저장됩니다. 학습 콘텐츠(영어 표현·예문·뜻)는
레슨을 확장앱 업데이트 없이 추가·갱신할 수 있도록 **GitHub Pages**(`https://swyoonlabs.github.io/`)에서
내려받아 기기에 캐시하며(오프라인 사용 가능), 이 과정에서 **개인정보는 전송되지 않습니다**. 다만 모든
웹 요청과 마찬가지로 콘텐츠 호스트(GitHub)에는 IP·브라우저 종류 같은 일반적인 기술 정보가 기록될 수
있습니다. `sidePanel`은 화면 표시, `storage`는 콘텐츠 캐시, `host_permissions`는 위 콘텐츠 다운로드에만
사용됩니다.
