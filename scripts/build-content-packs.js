// build-content-packs.js
// 번들된 시드 데이터(sidepanel-data.js)의 TOEIC_PHRASES를 월드별 팩 JSON과
// content manifest.json으로 변환합니다. 생성된 content/ 디렉터리를 서버에 업로드하세요.
//
// 사용법:  node scripts/build-content-packs.js
//
// 주의: 이 스크립트는 로컬 빌드 도구입니다. 확장앱 런타임에는 포함되지 않습니다.

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

// 콘텐츠 내용 해시 (문제 데이터가 바뀌었는지 판별용)
function hashContent(data) {
  return crypto
    .createHash("sha1")
    .update(JSON.stringify({ level1: data.level1, level2: data.level2 }))
    .digest("hex");
}

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "sidepanel-data.js");
const OUT_DIR = path.join(ROOT, "content");
const PACKS_DIR = path.join(OUT_DIR, "packs");

// content manifest 스키마 버전 (형식이 바뀌면 올림)
const SCHEMA_VERSION = 1;

// --- 시드 데이터 로드 (sidepanel-data.js는 브라우저용 전역 선언이므로 vm으로 평가) ---
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(DATA_FILE, "utf8") +
    "\nthis.__PHRASES = TOEIC_PHRASES;\nthis.__WORLDS = WORLDS;",
  ctx
);
const PHRASES = ctx.__PHRASES;
const WORLDS = ctx.__WORLDS;

// --- 월드별로 문제 분류 ---
const byWorld = {};
["level1", "level2"].forEach((lv) => {
  (PHRASES[lv] || []).forEach((q) => {
    if (!byWorld[q.world]) byWorld[q.world] = { level1: [], level2: [] };
    byWorld[q.world][lv].push(q);
  });
});

// --- 이전 빌드 정보 로드 (버전 자동 증가 판단용) ---
const prevByWorld = {}; // world -> { version, contentHash }
const prevManifestPath = path.join(OUT_DIR, "manifest.json");
if (fs.existsSync(prevManifestPath)) {
  try {
    const prev = JSON.parse(fs.readFileSync(prevManifestPath, "utf8"));
    (prev.packs || []).forEach((p) => {
      prevByWorld[p.world] = { version: p.version, contentHash: p.contentHash };
    });
  } catch (_) {}
}

// --- 출력 디렉터리 준비 ---
fs.mkdirSync(PACKS_DIR, { recursive: true });

// --- 팩 파일 + manifest 생성 (WORLDS 정의 순서 유지) ---
const worldOrder = Object.keys(WORLDS);
const packsMeta = [];

worldOrder.forEach((world) => {
  const data = byWorld[world];
  if (!data || (data.level1.length === 0 && data.level2.length === 0)) {
    // 콘텐츠가 아직 없는 월드는 팩을 만들지 않음 (서버에 나중에 추가)
    return;
  }

  const contentHash = hashContent(data);
  const prev = prevByWorld[world];

  // 버전 자동 결정: 신규=1, 내용 동일=유지, 내용 변경=+1
  let version, status;
  if (!prev) {
    version = 1;
    status = "신규";
  } else if (!prev.contentHash) {
    // 이전 manifest에 해시가 없던 구형식 → 버전 유지하고 해시만 기록
    version = prev.version || 1;
    status = "해시 초기화";
  } else if (prev.contentHash === contentHash) {
    version = prev.version;
    status = "변경없음";
  } else {
    version = (prev.version || 1) + 1;
    status = `변경 → v${version}`;
  }

  const pack = { world, version, level1: data.level1, level2: data.level2 };
  fs.writeFileSync(
    path.join(PACKS_DIR, `${world}.json`),
    JSON.stringify(pack, null, 2) + "\n",
    "utf8"
  );
  packsMeta.push({
    world,
    version,
    url: `packs/${world}.json`,
    count: data.level1.length + data.level2.length,
    contentHash,
  });
  console.log(
    `  ✓ ${world}.json  (v${version}, level1 ${data.level1.length} / level2 ${data.level2.length})  [${status}]`
  );
});

const manifest = { schemaVersion: SCHEMA_VERSION, packs: packsMeta };
fs.writeFileSync(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8"
);

console.log(`\n생성 완료 → ${path.relative(ROOT, OUT_DIR)}/`);
console.log(`  manifest.json (팩 ${packsMeta.length}개)`);
console.log(
  "\n다음 단계: 변경분을 git commit & push 하면 GitHub Pages로 자동 배포됩니다."
);
console.log(
  "  (버전은 내용이 바뀐 팩만 자동으로 올라갑니다 — 수동 관리 불필요)"
);
