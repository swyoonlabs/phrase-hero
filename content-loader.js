// content-loader.js
// 학습 콘텐츠(TOEIC_PHRASES)를 서버에서 내려받아 갱신하는 하이브리드 로더.
//
//   시드(번들) → 캐시(chrome.storage.local) → 서버 최신본
//
// MV3 규정: 원격 "코드"는 금지, 원격 "데이터(JSON)"는 허용.
//  → 서버는 순수 JSON만 제공하고, 여기서는 fetch → JSON.parse 만 한다. (eval/script 주입 금지)
//
// sidepanel-data.js 다음, sidepanel.js 전에 로드된다.

// 콘텐츠 배포 위치 (GitHub Pages, 이 저장소의 content/ 폴더). 끝에 / 포함.
//   저장소 Settings → Pages 에서 main 브랜치 root 로 Pages를 켜야 동작합니다.
//   커스텀 도메인을 붙이면 이 값만 바꾸면 됩니다.
const CONTENT_SERVER_BASE = "https://swyoonlabs.github.io/phrase-hero/content/";

// 이 로더가 이해하는 content manifest 스키마 버전 (build-content-packs.js와 일치)
const CONTENT_SCHEMA_VERSION = 1;

// 캐시 키
const CACHE_KEY = "phrasehero_content_packs"; // world -> pack
const CACHE_META_KEY = "phrasehero_content_meta"; // { lastSync }

const ContentStore = {
  // 게임이 읽는 라이브 콘텐츠. 항상 최신 병합 결과를 담는다.
  phrases: { level1: [], level2: [] },

  _seedByWorld: null, // 번들 시드 (world -> {level1, level2})
  _packs: {}, // 서버/캐시 팩 (world -> {world, version, level1, level2})
  _listeners: [],

  // --- 초기 부팅: 시드로 즉시 채움 (동기, 오프라인·첫 실행 보장) ---
  bootstrapSeed() {
    const seed =
      typeof TOEIC_PHRASES !== "undefined"
        ? TOEIC_PHRASES
        : { level1: [], level2: [] };
    this._seedByWorld = {};
    ["level1", "level2"].forEach((lv) => {
      (seed[lv] || []).forEach((q) => {
        if (!this._seedByWorld[q.world])
          this._seedByWorld[q.world] = { level1: [], level2: [] };
        this._seedByWorld[q.world][lv].push(q);
      });
    });
    this._rebuild();
  },

  // --- 캐시에서 팩 로드 후 병합 (앱 시작 시 호출) ---
  async init() {
    const cached = await this._storageGet(CACHE_KEY);
    if (cached && typeof cached === "object") {
      Object.values(cached).forEach((pack) => {
        if (this._validPack(pack)) this._packs[pack.world] = pack;
      });
      this._rebuild();
    }
  },

  // --- 서버에서 최신 콘텐츠 확인·다운로드 (온라인일 때, fire-and-forget) ---
  async refresh() {
    if (!this._online()) return { updated: [], reason: "offline" };
    let manifest;
    try {
      manifest = await this._fetchJson(CONTENT_SERVER_BASE + "manifest.json");
    } catch (e) {
      return { updated: [], reason: "manifest-fetch-failed" };
    }
    if (!manifest || manifest.schemaVersion !== CONTENT_SCHEMA_VERSION) {
      // 스키마가 다르면 무시하고 캐시/시드 유지 (구버전 앱 보호)
      return { updated: [], reason: "schema-mismatch" };
    }

    const updated = [];
    for (const entry of manifest.packs || []) {
      const have = this._packs[entry.world];
      if (have && have.version >= entry.version) continue; // 최신이면 건너뜀
      try {
        const url = /^https?:\/\//.test(entry.url)
          ? entry.url
          : CONTENT_SERVER_BASE + entry.url;
        const pack = await this._fetchJson(url);
        if (this._validPack(pack)) {
          this._packs[pack.world] = pack;
          updated.push(pack.world);
        }
      } catch (e) {
        // 개별 팩 실패는 조용히 건너뜀 (나머지는 계속 받음)
      }
    }

    if (updated.length) {
      await this._storageSet(CACHE_KEY, this._packs);
      await this._storageSet(CACHE_META_KEY, { lastSync: Date.now() });
      this._rebuild();
      this._emit();
    }
    return { updated };
  },

  onChange(cb) {
    this._listeners.push(cb);
  },

  // ---------- 내부 ----------

  _emit() {
    this._listeners.forEach((cb) => {
      try {
        cb();
      } catch (_) {}
    });
  },

  // 시드 + 팩 병합 → phrases 재구성 (팩이 있으면 해당 월드 전체를 덮어씀)
  _rebuild() {
    const worlds = {};
    Object.entries(this._seedByWorld || {}).forEach(([w, d]) => {
      worlds[w] = { level1: d.level1.slice(), level2: d.level2.slice() };
    });
    Object.entries(this._packs).forEach(([w, pack]) => {
      worlds[w] = {
        level1: (pack.level1 || []).slice(),
        level2: (pack.level2 || []).slice(),
      };
    });

    // WORLDS 정의 순서를 유지 (없으면 등장 순서)
    const order =
      typeof WORLDS !== "undefined" ? Object.keys(WORLDS) : Object.keys(worlds);
    const seen = new Set();
    const out = { level1: [], level2: [] };
    const push = (w) => {
      if (!worlds[w] || seen.has(w)) return;
      seen.add(w);
      out.level1.push(...worlds[w].level1);
      out.level2.push(...worlds[w].level2);
    };
    order.forEach(push);
    Object.keys(worlds).forEach(push); // order에 없는 월드도 포함

    this.phrases.level1 = out.level1;
    this.phrases.level2 = out.level2;
  },

  _validPack(pack) {
    return (
      pack &&
      typeof pack.world === "string" &&
      typeof pack.version === "number" &&
      Array.isArray(pack.level1) &&
      Array.isArray(pack.level2)
    );
  },

  _online() {
    return typeof navigator === "undefined" ? true : navigator.onLine !== false;
  },

  async _fetchJson(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json(); // JSON.parse만 수행 — 코드 실행 아님
  },

  _hasStorage() {
    return (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    );
  },

  _storageGet(key) {
    if (!this._hasStorage()) return Promise.resolve(null);
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (r) => resolve(r ? r[key] : null));
    });
  },

  _storageSet(key, value) {
    if (!this._hasStorage()) return Promise.resolve();
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    });
  },
};

// 로드 즉시 시드로 채워 phrases를 사용 가능 상태로 만든다.
ContentStore.bootstrapSeed();
