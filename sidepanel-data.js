// Phrase Hero - 학습 데이터 (다국어 지원)
// 학습 대상인 영어(phrase / sentence / distractors)는 모든 언어 공통.
// 뜻 풀이(meaning)만 언어별로 분리: ko(한국어) / ja(日本語) / zh(中文) / en(English)

// 지원 언어 목록 (설정의 언어 선택에 사용)
const LANGUAGES = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "en", label: "English", flag: "🇺🇸" }
];

const DEFAULT_LANG = "ko";

const TOEIC_PHRASES = {
  // Level 1: 동사만 입력 (선택지 4개 중 1개 클릭)
  level1: [
    // 비즈니스 월드
    {
      id: 1,
      phrase: "account for",
      verb: "account",
      sentence: "This ___ for the delay.",
      world: "business",
      distractors: ["explain", "describe", "clarify"],
      meaning: {
        ko: { translation: "이것이 지체의 원인이다", hint: "설명하다" },
        ja: { translation: "これが遅延の原因だ", hint: "説明する" },
        zh: { translation: "这就是延误的原因", hint: "解释；说明原因" },
        en: { translation: "This explains the delay.", hint: "to be the reason for" }
      }
    },
    {
      id: 2,
      phrase: "apply for",
      verb: "apply",
      sentence: "She ___ for the job.",
      world: "business",
      distractors: ["register", "enroll", "subscribe"],
      meaning: {
        ko: { translation: "그녀는 그 일자리에 지원했다", hint: "지원하다" },
        ja: { translation: "彼女はその仕事に応募した", hint: "応募する" },
        zh: { translation: "她申请了那份工作", hint: "申请" },
        en: { translation: "She applied for the job.", hint: "to formally request" }
      }
    },
    {
      id: 3,
      phrase: "approve of",
      verb: "approve",
      sentence: "They ___ of the plan.",
      world: "business",
      distractors: ["agree", "support", "accept"],
      meaning: {
        ko: { translation: "그들은 계획에 찬성했다", hint: "찬성하다" },
        ja: { translation: "彼らはその計画に賛成した", hint: "賛成する" },
        zh: { translation: "他们赞成这个计划", hint: "赞成；同意" },
        en: { translation: "They approve of the plan.", hint: "to agree with" }
      }
    },
    {
      id: 4,
      phrase: "call off",
      verb: "call",
      sentence: "They ___ off the meeting.",
      world: "business",
      distractors: ["cancel", "stop", "end"],
      meaning: {
        ko: { translation: "그들은 회의를 취소했다", hint: "취소하다" },
        ja: { translation: "彼らは会議を中止した", hint: "中止する" },
        zh: { translation: "他们取消了会议", hint: "取消" },
        en: { translation: "They called off the meeting.", hint: "to cancel" }
      }
    },
    {
      id: 5,
      phrase: "carry out",
      verb: "carry",
      sentence: "We must ___ out the plan.",
      world: "business",
      distractors: ["execute", "implement", "perform"],
      meaning: {
        ko: { translation: "우리는 계획을 실행해야 한다", hint: "수행하다" },
        ja: { translation: "私たちは計画を実行しなければならない", hint: "実行する" },
        zh: { translation: "我们必须执行这个计划", hint: "执行；实施" },
        en: { translation: "We must carry out the plan.", hint: "to perform or complete" }
      }
    },
    {
      id: 6,
      phrase: "deal with",
      verb: "deal",
      sentence: "He can't ___ with stress.",
      world: "business",
      distractors: ["handle", "manage", "cope"],
      meaning: {
        ko: { translation: "그는 스트레스를 감당할 수 없다", hint: "다루다/감당하다" },
        ja: { translation: "彼はストレスに対処できない", hint: "対処する" },
        zh: { translation: "他无法应对压力", hint: "处理；应对" },
        en: { translation: "He can't deal with stress.", hint: "to handle or manage" }
      }
    },
    {
      id: 7,
      phrase: "look into",
      verb: "look",
      sentence: "We'll ___ the problem.",
      world: "business",
      distractors: ["investigate", "examine", "check"],
      meaning: {
        ko: { translation: "우리는 문제를 조사할 것이다", hint: "조사하다" },
        ja: { translation: "私たちはその問題を調査する", hint: "調査する" },
        zh: { translation: "我们会调查这个问题", hint: "调查；研究" },
        en: { translation: "We'll look into the problem.", hint: "to investigate" }
      }
    },
    {
      id: 8,
      phrase: "put off",
      verb: "put",
      sentence: "Don't ___ it off.",
      world: "business",
      distractors: ["delay", "postpone", "defer"],
      meaning: {
        ko: { translation: "그것을 미루지 마라", hint: "미루다" },
        ja: { translation: "それを先延ばしにするな", hint: "延期する" },
        zh: { translation: "别把它拖延了", hint: "推迟；拖延" },
        en: { translation: "Don't put it off.", hint: "to postpone" }
      }
    },
    {
      id: 9,
      phrase: "set up",
      verb: "set",
      sentence: "They ___ a company.",
      world: "business",
      distractors: ["establish", "found", "create"],
      meaning: {
        ko: { translation: "그들은 회사를 설립했다", hint: "설립하다/세우다" },
        ja: { translation: "彼らは会社を設立した", hint: "設立する" },
        zh: { translation: "他们创办了一家公司", hint: "设立；创办" },
        en: { translation: "They set up a company.", hint: "to establish" }
      }
    },
    {
      id: 10,
      phrase: "stand for",
      verb: "stand",
      sentence: "What does it ___ for?",
      world: "business",
      distractors: ["represent", "mean", "symbolize"],
      meaning: {
        ko: { translation: "그것은 무엇을 의미하는가?", hint: "대표하다/의미하다" },
        ja: { translation: "それは何を意味するのか？", hint: "表す；意味する" },
        zh: { translation: "它代表什么意思？", hint: "代表；表示" },
        en: { translation: "What does it stand for?", hint: "to represent" }
      }
    },
    // 커뮤니케이션 월드
    {
      id: 11,
      phrase: "agree with",
      verb: "agree",
      sentence: "I ___ with your opinion.",
      world: "communication",
      distractors: ["concur", "accept", "approve"],
      meaning: {
        ko: { translation: "나는 당신 의견에 동의한다", hint: "동의하다" },
        ja: { translation: "私はあなたの意見に同意する", hint: "同意する" },
        zh: { translation: "我同意你的意见", hint: "同意" },
        en: { translation: "I agree with your opinion.", hint: "to have the same view" }
      }
    },
    {
      id: 12,
      phrase: "argue with",
      verb: "argue",
      sentence: "Don't ___ with him.",
      world: "communication",
      distractors: ["fight", "quarrel", "dispute"],
      meaning: {
        ko: { translation: "그와 논쟁하지 마라", hint: "논쟁하다" },
        ja: { translation: "彼と言い争うな", hint: "口論する" },
        zh: { translation: "别跟他争论", hint: "争论；争吵" },
        en: { translation: "Don't argue with him.", hint: "to disagree in words" }
      }
    },
    {
      id: 13,
      phrase: "ask for",
      verb: "ask",
      sentence: "He ___ for a raise.",
      world: "communication",
      distractors: ["request", "demand", "seek"],
      meaning: {
        ko: { translation: "그는 임금 인상을 요청했다", hint: "요청하다" },
        ja: { translation: "彼は昇給を求めた", hint: "求める" },
        zh: { translation: "他要求加薪", hint: "请求；要求" },
        en: { translation: "He asked for a raise.", hint: "to request" }
      }
    },
    {
      id: 14,
      phrase: "end up",
      verb: "end",
      sentence: "We ___ up being friends.",
      world: "communication",
      distractors: ["become", "finish", "conclude"],
      meaning: {
        ko: { translation: "우리는 결국 친구가 되었다", hint: "결국 ~이 되다" },
        ja: { translation: "私たちは結局友達になった", hint: "結局～になる" },
        zh: { translation: "我们最终成了朋友", hint: "最终变成；结果" },
        en: { translation: "We ended up being friends.", hint: "to finally become" }
      }
    },
    {
      id: 15,
      phrase: "get along",
      verb: "get",
      sentence: "They ___ well together.",
      world: "communication",
      distractors: ["cooperate", "relate", "bond"],
      meaning: {
        ko: { translation: "그들은 잘 지낸다", hint: "사이좋게 지내다" },
        ja: { translation: "彼らは仲良くやっている", hint: "仲良くする" },
        zh: { translation: "他们相处得很好", hint: "相处融洽" },
        en: { translation: "They get along well together.", hint: "to have a good relationship" }
      }
    },
    {
      id: 16,
      phrase: "hang up",
      verb: "hang",
      sentence: "She ___ up on me.",
      world: "communication",
      distractors: ["disconnect", "cut", "terminate"],
      meaning: {
        ko: { translation: "그녀는 나에게 전화를 끊었다", hint: "전화를 끊다" },
        ja: { translation: "彼女は私との電話を切った", hint: "電話を切る" },
        zh: { translation: "她挂断了我的电话", hint: "挂断电话" },
        en: { translation: "She hung up on me.", hint: "to end a phone call" }
      }
    },
    {
      id: 17,
      phrase: "keep on",
      verb: "keep",
      sentence: "He ___ on working.",
      world: "communication",
      distractors: ["continue", "persist", "maintain"],
      meaning: {
        ko: { translation: "그는 계속 일한다", hint: "계속하다" },
        ja: { translation: "彼は働き続ける", hint: "～し続ける" },
        zh: { translation: "他继续工作", hint: "继续" },
        en: { translation: "He keeps on working.", hint: "to continue" }
      }
    },
    {
      id: 18,
      phrase: "laugh at",
      verb: "laugh",
      sentence: "Don't ___ at him.",
      world: "communication",
      distractors: ["mock", "ridicule", "tease"],
      meaning: {
        ko: { translation: "그를 비웃지 마라", hint: "비웃다" },
        ja: { translation: "彼を笑うな", hint: "あざ笑う" },
        zh: { translation: "别嘲笑他", hint: "嘲笑" },
        en: { translation: "Don't laugh at him.", hint: "to mock" }
      }
    },
    {
      id: 19,
      phrase: "make up",
      verb: "make",
      sentence: "They ___ up quickly.",
      world: "communication",
      distractors: ["reconcile", "resolve", "settle"],
      meaning: {
        ko: { translation: "그들은 금방 화해했다", hint: "화해하다" },
        ja: { translation: "彼らはすぐに仲直りした", hint: "仲直りする" },
        zh: { translation: "他们很快就和好了", hint: "和解；和好" },
        en: { translation: "They made up quickly.", hint: "to reconcile" }
      }
    },
    {
      id: 20,
      phrase: "show up",
      verb: "show",
      sentence: "He didn't ___ to the party.",
      world: "communication",
      distractors: ["appear", "arrive", "attend"],
      meaning: {
        ko: { translation: "그는 파티에 나타나지 않았다", hint: "나타나다" },
        ja: { translation: "彼はパーティーに現れなかった", hint: "現れる" },
        zh: { translation: "他没有来参加派对", hint: "出现；露面" },
        en: { translation: "He didn't show up to the party.", hint: "to appear" }
      }
    },
    // 일상생활 월드
    {
      id: 21,
      phrase: "believe in",
      verb: "believe",
      sentence: "We ___ in democracy.",
      world: "daily",
      distractors: ["trust", "faith", "confidence"],
      meaning: {
        ko: { translation: "우리는 민주주의를 믿는다", hint: "믿다/신뢰하다" },
        ja: { translation: "私たちは民主主義を信じている", hint: "信じる" },
        zh: { translation: "我们信仰民主", hint: "信仰；相信" },
        en: { translation: "We believe in democracy.", hint: "to have faith in" }
      }
    },
    {
      id: 22,
      phrase: "break down",
      verb: "break",
      sentence: "The car ___ down.",
      world: "daily",
      distractors: ["fail", "stop", "crash"],
      meaning: {
        ko: { translation: "차가 고장 났다", hint: "고장 나다" },
        ja: { translation: "車が故障した", hint: "故障する" },
        zh: { translation: "汽车抛锚了", hint: "（机器）出故障" },
        en: { translation: "The car broke down.", hint: "to stop working" }
      }
    },
    {
      id: 23,
      phrase: "come across",
      verb: "come",
      sentence: "I ___ across an old friend.",
      world: "daily",
      distractors: ["encounter", "meet", "find"],
      meaning: {
        ko: { translation: "우연히 옛 친구를 만났다", hint: "우연히 만나다" },
        ja: { translation: "偶然、昔の友人に出会った", hint: "偶然出会う" },
        zh: { translation: "我偶然遇到了一位老朋友", hint: "偶然遇见" },
        en: { translation: "I came across an old friend.", hint: "to meet by chance" }
      }
    },
    {
      id: 24,
      phrase: "depend on",
      verb: "depend",
      sentence: "It ___ on the weather.",
      world: "daily",
      distractors: ["rely", "count", "rest"],
      meaning: {
        ko: { translation: "그것은 날씨에 달렸다", hint: "의존하다/달려있다" },
        ja: { translation: "それは天気次第だ", hint: "～次第である" },
        zh: { translation: "这取决于天气", hint: "取决于；依赖" },
        en: { translation: "It depends on the weather.", hint: "to rely on" }
      }
    },
    {
      id: 25,
      phrase: "dream of",
      verb: "dream",
      sentence: "I ___ of traveling.",
      world: "daily",
      distractors: ["imagine", "envision", "aspire"],
      meaning: {
        ko: { translation: "나는 여행을 꿈꾼다", hint: "꿈꾸다" },
        ja: { translation: "私は旅行することを夢見ている", hint: "夢見る" },
        zh: { translation: "我梦想去旅行", hint: "梦想；向往" },
        en: { translation: "I dream of traveling.", hint: "to wish for" }
      }
    },
    {
      id: 26,
      phrase: "feel like",
      verb: "feel",
      sentence: "I don't ___ like eating.",
      world: "daily",
      distractors: ["want", "desire", "crave"],
      meaning: {
        ko: { translation: "나는 먹고 싶지 않다", hint: "~하고 싶다" },
        ja: { translation: "私は食べたい気分ではない", hint: "～したい気がする" },
        zh: { translation: "我不想吃东西", hint: "想要（做）" },
        en: { translation: "I don't feel like eating.", hint: "to want to" }
      }
    },
    {
      id: 27,
      phrase: "look after",
      verb: "look",
      sentence: "She ___ her mother.",
      world: "daily",
      distractors: ["care", "watch", "attend"],
      meaning: {
        ko: { translation: "그녀는 어머니를 돌본다", hint: "돌보다" },
        ja: { translation: "彼女は母親の世話をする", hint: "世話をする" },
        zh: { translation: "她照顾她的母亲", hint: "照顾" },
        en: { translation: "She looks after her mother.", hint: "to take care of" }
      }
    },
    {
      id: 28,
      phrase: "look for",
      verb: "look",
      sentence: "I'm ___ my keys.",
      world: "daily",
      distractors: ["search", "seek", "hunt"],
      meaning: {
        ko: { translation: "나는 열쇠를 찾고 있다", hint: "찾다" },
        ja: { translation: "私は鍵を探している", hint: "探す" },
        zh: { translation: "我在找我的钥匙", hint: "寻找" },
        en: { translation: "I'm looking for my keys.", hint: "to search for" }
      }
    },
    {
      id: 29,
      phrase: "pay for",
      verb: "pay",
      sentence: "He ___ for dinner.",
      world: "daily",
      distractors: ["cover", "settle", "bear"],
      meaning: {
        ko: { translation: "그는 저녁을 샀다", hint: "비용을 지불하다" },
        ja: { translation: "彼が夕食代を払った", hint: "代金を払う" },
        zh: { translation: "他付了晚餐的钱", hint: "付款；买单" },
        en: { translation: "He paid for dinner.", hint: "to give money for" }
      }
    },
    {
      id: 30,
      phrase: "put on",
      verb: "put",
      sentence: "She ___ her coat.",
      world: "daily",
      distractors: ["wear", "don", "dress"],
      meaning: {
        ko: { translation: "그녀는 코트를 입었다", hint: "입다/착용하다" },
        ja: { translation: "彼女はコートを着た", hint: "身につける" },
        zh: { translation: "她穿上了外套", hint: "穿上；戴上" },
        en: { translation: "She put on her coat.", hint: "to dress in" }
      }
    }
  ],

  // Level 2: 동사 + 전치사 (순서대로 2개 클릭)
  level2: [
    // 비즈니스 월드
    {
      id: 101,
      phrase: "add up to",
      verb: "add",
      preposition: "up to",
      sentence: "The costs ___ ___ $500.",
      world: "business",
      distractors: ["to", "for", "with"],
      meaning: {
        ko: { translation: "비용이 합쳐서 500달러가 된다", hint: "합계가 ~이 되다" },
        ja: { translation: "費用は合計で500ドルになる", hint: "合計～になる" },
        zh: { translation: "费用加起来是500美元", hint: "合计达到" },
        en: { translation: "The costs add up to $500.", hint: "to total" }
      }
    },
    {
      id: 102,
      phrase: "boil down to",
      verb: "boil",
      preposition: "down to",
      sentence: "It ___ ___ money.",
      world: "business",
      distractors: ["to", "for", "about"],
      meaning: {
        ko: { translation: "결국 돈 문제다", hint: "결국 ~으로 귀결되다" },
        ja: { translation: "結局はお金の問題だ", hint: "結局～に帰着する" },
        zh: { translation: "归根结底是钱的问题", hint: "归结为" },
        en: { translation: "It boils down to money.", hint: "to come down to" }
      }
    },
    {
      id: 103,
      phrase: "brush up on",
      verb: "brush",
      preposition: "up on",
      sentence: "I need to ___ ___ my French.",
      world: "business",
      distractors: ["on", "for", "about"],
      meaning: {
        ko: { translation: "프랑스어를 다시 복습해야 한다", hint: "(지식을) 복습하다" },
        ja: { translation: "フランス語を復習する必要がある", hint: "復習する" },
        zh: { translation: "我需要复习一下法语", hint: "温习；重新学习" },
        en: { translation: "I need to brush up on my French.", hint: "to review" }
      }
    },
    {
      id: 104,
      phrase: "buy into",
      verb: "buy",
      preposition: "into",
      sentence: "I didn't ___ ___ the idea.",
      world: "business",
      distractors: ["to", "for", "on"],
      meaning: {
        ko: { translation: "나는 그 생각에 동의하지 않았다", hint: "~에 투자하다/믿다" },
        ja: { translation: "私はその考えに賛同しなかった", hint: "信じ込む；賛同する" },
        zh: { translation: "我不认同这个想法", hint: "认同；接受（想法）" },
        en: { translation: "I didn't buy into the idea.", hint: "to accept as true" }
      }
    },
    {
      id: 105,
      phrase: "catch up with",
      verb: "catch",
      preposition: "up with",
      sentence: "I'll ___ ___ you later.",
      world: "business",
      distractors: ["to", "for", "on"],
      meaning: {
        ko: { translation: "나중에 따라잡겠다", hint: "따라잡다" },
        ja: { translation: "後で追いつくよ", hint: "追いつく" },
        zh: { translation: "我稍后赶上你", hint: "赶上；跟上" },
        en: { translation: "I'll catch up with you later.", hint: "to reach the same point" }
      }
    },
    {
      id: 106,
      phrase: "check up on",
      verb: "check",
      preposition: "up on",
      sentence: "He'll ___ ___ the patient.",
      world: "business",
      distractors: ["on", "for", "to"],
      meaning: {
        ko: { translation: "그는 환자를 점검할 것이다", hint: "점검하다/확인하다" },
        ja: { translation: "彼は患者の様子を確認する", hint: "確認する" },
        zh: { translation: "他会去查看病人的情况", hint: "查看；核查" },
        en: { translation: "He'll check up on the patient.", hint: "to inspect" }
      }
    },
    {
      id: 107,
      phrase: "come down to",
      verb: "come",
      preposition: "down to",
      sentence: "It ___ ___ one thing.",
      world: "business",
      distractors: ["to", "for", "about"],
      meaning: {
        ko: { translation: "결국 한 가지 문제다", hint: "결국 ~이 되다" },
        ja: { translation: "結局は一つのことに尽きる", hint: "結局～に帰着する" },
        zh: { translation: "最终归结为一件事", hint: "归结为" },
        en: { translation: "It comes down to one thing.", hint: "to be ultimately about" }
      }
    },
    {
      id: 108,
      phrase: "come out with",
      verb: "come",
      preposition: "out with",
      sentence: "They ___ ___ a new product.",
      world: "business",
      distractors: ["with", "to", "for"],
      meaning: {
        ko: { translation: "그들은 신제품을 출시했다", hint: "(제품을) 내놓다/발표하다" },
        ja: { translation: "彼らは新製品を発表した", hint: "発表する；売り出す" },
        zh: { translation: "他们推出了一款新产品", hint: "推出；发布" },
        en: { translation: "They came out with a new product.", hint: "to release" }
      }
    },
    {
      id: 109,
      phrase: "cut back on",
      verb: "cut",
      preposition: "back on",
      sentence: "We need to ___ ___ spending.",
      world: "business",
      distractors: ["on", "for", "to"],
      meaning: {
        ko: { translation: "지출을 줄여야 한다", hint: "줄이다/삭감하다" },
        ja: { translation: "支出を減らす必要がある", hint: "削減する" },
        zh: { translation: "我们需要削减开支", hint: "削减；减少" },
        en: { translation: "We need to cut back on spending.", hint: "to reduce" }
      }
    },
    {
      id: 110,
      phrase: "do away with",
      verb: "do",
      preposition: "away with",
      sentence: "They ___ ___ the old rule.",
      world: "business",
      distractors: ["with", "for", "to"],
      meaning: {
        ko: { translation: "그들은 오래된 규칙을 폐지했다", hint: "폐지하다/없애다" },
        ja: { translation: "彼らは古い規則を廃止した", hint: "廃止する" },
        zh: { translation: "他们废除了旧规定", hint: "废除；取消" },
        en: { translation: "They did away with the old rule.", hint: "to abolish" }
      }
    },
    // 커뮤니케이션 월드
    {
      id: 111,
      phrase: "fall back on",
      verb: "fall",
      preposition: "back on",
      sentence: "I can ___ ___ my friends.",
      world: "communication",
      distractors: ["on", "for", "to"],
      meaning: {
        ko: { translation: "친구들에게 의지할 수 있다", hint: "의지하다" },
        ja: { translation: "友人に頼ることができる", hint: "頼る；当てにする" },
        zh: { translation: "我可以依靠我的朋友", hint: "依靠；求助于" },
        en: { translation: "I can fall back on my friends.", hint: "to rely on" }
      }
    },
    {
      id: 112,
      phrase: "get along with",
      verb: "get",
      preposition: "along with",
      sentence: "I ___ ___ my coworkers.",
      world: "communication",
      distractors: ["with", "to", "for"],
      meaning: {
        ko: { translation: "동료들과 잘 지낸다", hint: "사이좋게 지내다" },
        ja: { translation: "同僚とうまくやっている", hint: "仲良くやる" },
        zh: { translation: "我和同事相处融洽", hint: "相处融洽" },
        en: { translation: "I get along with my coworkers.", hint: "to have a good relationship with" }
      }
    },
    {
      id: 113,
      phrase: "get back to",
      verb: "get",
      preposition: "back to",
      sentence: "I'll ___ ___ you soon.",
      world: "communication",
      distractors: ["to", "for", "with"],
      meaning: {
        ko: { translation: "곧 연락드리겠습니다", hint: "답신하다/회신하다" },
        ja: { translation: "すぐに折り返しご連絡します", hint: "折り返し連絡する" },
        zh: { translation: "我很快回复你", hint: "回复；再联系" },
        en: { translation: "I'll get back to you soon.", hint: "to reply later" }
      }
    },
    {
      id: 114,
      phrase: "get rid of",
      verb: "get",
      preposition: "rid of",
      sentence: "We must ___ ___ this problem.",
      world: "communication",
      distractors: ["of", "for", "from"],
      meaning: {
        ko: { translation: "이 문제를 없애야 한다", hint: "제거하다/없애다" },
        ja: { translation: "この問題を取り除かねばならない", hint: "取り除く" },
        zh: { translation: "我们必须解决这个问题", hint: "摆脱；除掉" },
        en: { translation: "We must get rid of this problem.", hint: "to remove" }
      }
    },
    {
      id: 115,
      phrase: "get through with",
      verb: "get",
      preposition: "through with",
      sentence: "I ___ ___ the report.",
      world: "communication",
      distractors: ["with", "for", "to"],
      meaning: {
        ko: { translation: "보고서를 완료했다", hint: "완료하다/끝내다" },
        ja: { translation: "レポートを終わらせた", hint: "終える；済ませる" },
        zh: { translation: "我完成了报告", hint: "完成；结束" },
        en: { translation: "I got through with the report.", hint: "to finish" }
      }
    },
    {
      id: 116,
      phrase: "give up on",
      verb: "give",
      preposition: "up on",
      sentence: "Don't ___ ___ him.",
      world: "communication",
      distractors: ["on", "for", "to"],
      meaning: {
        ko: { translation: "그를 포기하지 마라", hint: "포기하다" },
        ja: { translation: "彼を見放すな", hint: "見切りをつける" },
        zh: { translation: "别放弃他", hint: "放弃（对…的期望）" },
        en: { translation: "Don't give up on him.", hint: "to stop hoping for" }
      }
    },
    {
      id: 117,
      phrase: "go back on",
      verb: "go",
      preposition: "back on",
      sentence: "He ___ ___ his word.",
      world: "communication",
      distractors: ["on", "for", "to"],
      meaning: {
        ko: { translation: "그는 약속을 어겼다", hint: "약속을 어기다" },
        ja: { translation: "彼は約束を破った", hint: "約束を破る" },
        zh: { translation: "他违背了自己的诺言", hint: "违背；反悔" },
        en: { translation: "He went back on his word.", hint: "to break a promise" }
      }
    },
    {
      id: 118,
      phrase: "go on with",
      verb: "go",
      preposition: "on with",
      sentence: "Please ___ ___ your work.",
      world: "communication",
      distractors: ["with", "for", "to"],
      meaning: {
        ko: { translation: "계속 일하세요", hint: "계속하다" },
        ja: { translation: "仕事を続けてください", hint: "続ける" },
        zh: { translation: "请继续你的工作", hint: "继续" },
        en: { translation: "Please go on with your work.", hint: "to continue" }
      }
    },
    {
      id: 119,
      phrase: "hold on to",
      verb: "hold",
      preposition: "on to",
      sentence: "___ ___ the rail.",
      world: "communication",
      distractors: ["to", "for", "with"],
      meaning: {
        ko: { translation: "난간을 잡으세요", hint: "잡고 있다/놓지 않다" },
        ja: { translation: "手すりにつかまってください", hint: "しっかりつかむ" },
        zh: { translation: "抓住扶手", hint: "抓紧；不放开" },
        en: { translation: "Hold on to the rail.", hint: "to grip firmly" }
      }
    },
    {
      id: 120,
      phrase: "keep up with",
      verb: "keep",
      preposition: "up with",
      sentence: "Can you ___ ___ technology?",
      world: "communication",
      distractors: ["with", "for", "to"],
      meaning: {
        ko: { translation: "기술 발전을 따라갈 수 있나?", hint: "따라가다/쫓아가다" },
        ja: { translation: "技術の進歩についていけるか？", hint: "ついていく" },
        zh: { translation: "你能跟上技术发展吗？", hint: "跟上；紧跟" },
        en: { translation: "Can you keep up with technology?", hint: "to stay level with" }
      }
    },
    // 일상생활 월드
    {
      id: 121,
      phrase: "break away from",
      verb: "break",
      preposition: "away from",
      sentence: "The dog ___ ___ its owner.",
      world: "daily",
      distractors: ["from", "to", "with"],
      meaning: {
        ko: { translation: "개가 주인에게서 떨어져 나왔다", hint: "떨어져 나오다/탈출하다" },
        ja: { translation: "犬が飼い主から離れて逃げた", hint: "離脱する；逃れる" },
        zh: { translation: "狗从主人身边挣脱跑开了", hint: "挣脱；脱离" },
        en: { translation: "The dog broke away from its owner.", hint: "to escape from" }
      }
    },
    {
      id: 122,
      phrase: "burn down to",
      verb: "burn",
      preposition: "down to",
      sentence: "The house ___ ___ ashes.",
      world: "daily",
      distractors: ["to", "for", "about"],
      meaning: {
        ko: { translation: "집이 타서 재가 되었다", hint: "타서 없어지다" },
        ja: { translation: "家が焼けて灰になった", hint: "焼け落ちる" },
        zh: { translation: "房子被烧成了灰烬", hint: "烧毁；烧成" },
        en: { translation: "The house burned down to ashes.", hint: "to be destroyed by fire" }
      }
    },
    {
      id: 123,
      phrase: "clean up after",
      verb: "clean",
      preposition: "up after",
      sentence: "Mom ___ ___ the kids.",
      world: "daily",
      distractors: ["after", "for", "with"],
      meaning: {
        ko: { translation: "엄마는 아이들 뒤를 치운다", hint: "뒤를 치우다" },
        ja: { translation: "母は子供たちの後片付けをする", hint: "後始末をする" },
        zh: { translation: "妈妈收拾孩子们弄乱的东西", hint: "收拾…留下的脏乱" },
        en: { translation: "Mom cleans up after the kids.", hint: "to tidy the mess someone made" }
      }
    },
    {
      id: 124,
      phrase: "come across as",
      verb: "come",
      preposition: "across as",
      sentence: "She ___ ___ shy.",
      world: "daily",
      distractors: ["as", "to", "for"],
      meaning: {
        ko: { translation: "그녀는 수줍어 보인다", hint: "~로 보이다" },
        ja: { translation: "彼女は内気そうに見える", hint: "～という印象を与える" },
        zh: { translation: "她给人害羞的印象", hint: "给人…的印象" },
        en: { translation: "She comes across as shy.", hint: "to give an impression of" }
      }
    },
    {
      id: 125,
      phrase: "come down with",
      verb: "come",
      preposition: "down with",
      sentence: "He ___ ___ the flu.",
      world: "daily",
      distractors: ["with", "for", "to"],
      meaning: {
        ko: { translation: "그는 독감에 걸렸다", hint: "(병에) 걸리다" },
        ja: { translation: "彼はインフルエンザにかかった", hint: "（病気に）かかる" },
        zh: { translation: "他得了流感", hint: "染上（疾病）" },
        en: { translation: "He came down with the flu.", hint: "to catch an illness" }
      }
    },
    {
      id: 126,
      phrase: "drop out of",
      verb: "drop",
      preposition: "out of",
      sentence: "He ___ ___ school.",
      world: "daily",
      distractors: ["of", "from", "to"],
      meaning: {
        ko: { translation: "그는 학교를 중퇴했다", hint: "중도에 그만두다" },
        ja: { translation: "彼は学校を中退した", hint: "中退する；脱落する" },
        zh: { translation: "他从学校退学了", hint: "退出；辍学" },
        en: { translation: "He dropped out of school.", hint: "to quit before finishing" }
      }
    },
    {
      id: 127,
      phrase: "fit in with",
      verb: "fit",
      preposition: "in with",
      sentence: "He doesn't ___ ___ the team.",
      world: "daily",
      distractors: ["with", "to", "for"],
      meaning: {
        ko: { translation: "그는 팀에 맞지 않는다", hint: "어울리다/적응하다" },
        ja: { translation: "彼はチームになじめない", hint: "溶け込む；なじむ" },
        zh: { translation: "他融入不了这个团队", hint: "融入；合得来" },
        en: { translation: "He doesn't fit in with the team.", hint: "to belong in a group" }
      }
    },
    {
      id: 128,
      phrase: "grow out of",
      verb: "grow",
      preposition: "out of",
      sentence: "Kids ___ ___ their clothes.",
      world: "daily",
      distractors: ["of", "from", "to"],
      meaning: {
        ko: { translation: "아이들이 자라서 옷이 작아졌다", hint: "자라서 안 맞게 되다" },
        ja: { translation: "子供は成長して服が着られなくなる", hint: "成長して合わなくなる" },
        zh: { translation: "孩子们长大后衣服就穿不下了", hint: "长大后不再适合" },
        en: { translation: "Kids grow out of their clothes.", hint: "to become too big for" }
      }
    },
    {
      id: 129,
      phrase: "hang out with",
      verb: "hang",
      preposition: "out with",
      sentence: "I ___ ___ my friends.",
      world: "daily",
      distractors: ["with", "to", "for"],
      meaning: {
        ko: { translation: "친구들과 어울린다", hint: "함께 시간을 보내다" },
        ja: { translation: "友達と一緒に過ごす", hint: "一緒に遊ぶ・過ごす" },
        zh: { translation: "我和朋友们一起玩", hint: "一起消磨时间" },
        en: { translation: "I hang out with my friends.", hint: "to spend time with" }
      }
    },
    {
      id: 130,
      phrase: "let go of",
      verb: "let",
      preposition: "go of",
      sentence: "___ ___ my hand.",
      world: "daily",
      distractors: ["of", "for", "from"],
      meaning: {
        ko: { translation: "내 손을 놔줘", hint: "놓다/해방하다" },
        ja: { translation: "私の手を離して", hint: "手放す；離す" },
        zh: { translation: "放开我的手", hint: "放开；松手" },
        en: { translation: "Let go of my hand.", hint: "to release" }
      }
    }
  ]
};

// 월드 정보 (이름은 언어별)
const WORLDS = {
  business: {
    emoji: "🏢",
    color: "#4F46E5",
    name: { ko: "비즈니스", ja: "ビジネス", zh: "商务", en: "Business" }
  },
  communication: {
    emoji: "💬",
    color: "#7C3AED",
    name: { ko: "커뮤니케이션", ja: "コミュニケーション", zh: "沟通交流", en: "Communication" }
  },
  daily: {
    emoji: "🏠",
    color: "#059669",
    name: { ko: "일상생활", ja: "日常生活", zh: "日常生活", en: "Daily Life" }
  },
  learning: {
    emoji: "📚",
    color: "#D97706",
    name: { ko: "학습/연구", ja: "学習・研究", zh: "学习研究", en: "Learning" }
  },
  career: {
    emoji: "⚡",
    color: "#DC2626",
    name: { ko: "경력/이력", ja: "キャリア", zh: "职业发展", en: "Career" }
  }
};

// 레벨 정보 (설명은 언어별)
const LEVELS = {
  1: {
    name: "Level 1",
    description: { ko: "동사 입력", ja: "動詞を選ぶ", zh: "选择动词", en: "Choose the verb" },
    questionsPerGame: 5
  },
  2: {
    name: "Level 2",
    description: { ko: "숙어 완성", ja: "熟語を完成", zh: "补全短语", en: "Complete the phrase" },
    questionsPerGame: 5
  }
};

// UI 텍스트 (언어별). {n} 등은 JS에서 치환.
const I18N = {
  ko: {
    appTitle: "Phrase Hero",
    appTagline: "퀴즈로 배우는 영어 표현",
    tabGame: "게임",
    tabSettings: "설정",
    tabAbout: "소개",
    worldSelect: "월드 선택",
    bestScore: "최고 점수",
    locked: "잠김",
    selectLevel: "레벨을 선택하세요",
    level1Desc: "동사 입력",
    level2Desc: "숙어 완성",
    backToWorldMap: "← 월드 맵",
    hintBtn: "💡 힌트",
    skipBtn: "⏭ 스킵",
    exitBtn: "← 나가기",
    scoreLabel: "점수",
    comboLabel: "콤보",
    bestLabel: "최고",
    comboSuffix: "연속 콤보!",
    blankWord: "{n}번째 단어",
    hintDone: "✓",
    hintFirstLetter: "💡 힌트: 첫 글자는 \"{c}\"",
    hintFirstWord: "💡 힌트: 첫 단어는 \"{w}\"",
    worldClear: "월드 클리어!",
    totalScore: "총점",
    accuracy: "정답률",
    maxCombo: "최대 콤보",
    nextWorld: "다음 월드 →",
    worldMap: "월드 맵",
    settings: "설정",
    langSection: "언어",
    langLabel: "뜻 표시 언어",
    gameSettings: "게임 설정",
    startLevel: "시작 레벨",
    startLevel1: "Level 1 (동사 입력)",
    startLevel2: "Level 2 (숙어 완성)",
    themeSection: "테마",
    themeLabel: "테마 선택",
    themePurple: "인디고",
    themeOcean: "바다",
    themeSunset: "노을",
    devSection: "개발자 설정",
    debugMode: "디버그 모드 (1문제로 완료)",
    dataSection: "데이터",
    resetProgress: "진행 초기화",
    about: "소개",
    aboutTitle: "Phrase Hero",
    statPhrases: "숙어 개수",
    statWorlds: "월드",
    statLevels: "레벨",
    aboutDesc1: "실생활에서 자주 쓰는 영어 표현을 퀴즈로 학습합니다.",
    aboutDesc2: "영어가 모국어가 아닌 학습자를 위해 여러 언어로 뜻을 제공합니다.",
    aboutWorldsTitle: "월드 목록",
    linksTitle: "링크",
    linkBlog: "블로그",
    comingSoon: "준비 중",
    reviewMistakes: "오답 복습",
    resetConfirm: "모든 진행 데이터가 초기화됩니다. 계속하시겠습니까?",
    resetDone: "초기화되었습니다."
  },
  ja: {
    appTitle: "Phrase Hero",
    appTagline: "クイズで学ぶ英語表現",
    tabGame: "ゲーム",
    tabSettings: "設定",
    tabAbout: "情報",
    worldSelect: "ワールド選択",
    bestScore: "ベストスコア",
    locked: "ロック中",
    selectLevel: "レベルを選択してください",
    level1Desc: "動詞を選ぶ",
    level2Desc: "熟語を完成",
    backToWorldMap: "← ワールドマップ",
    hintBtn: "💡 ヒント",
    skipBtn: "⏭ スキップ",
    exitBtn: "← 戻る",
    scoreLabel: "スコア",
    comboLabel: "コンボ",
    bestLabel: "ベスト",
    comboSuffix: "連続コンボ！",
    blankWord: "{n}番目の単語",
    hintDone: "✓",
    hintFirstLetter: "💡 ヒント: 最初の文字は \"{c}\"",
    hintFirstWord: "💡 ヒント: 最初の単語は \"{w}\"",
    worldClear: "ワールドクリア！",
    totalScore: "合計スコア",
    accuracy: "正答率",
    maxCombo: "最大コンボ",
    nextWorld: "次のワールド →",
    worldMap: "ワールドマップ",
    settings: "設定",
    langSection: "言語",
    langLabel: "意味の表示言語",
    gameSettings: "ゲーム設定",
    startLevel: "開始レベル",
    startLevel1: "Level 1 (動詞を選ぶ)",
    startLevel2: "Level 2 (熟語を完成)",
    themeSection: "テーマ",
    themeLabel: "テーマ選択",
    themePurple: "インディゴ",
    themeOcean: "オーシャン",
    themeSunset: "サンセット",
    devSection: "開発者設定",
    debugMode: "デバッグモード (1問で終了)",
    dataSection: "データ",
    resetProgress: "進捗をリセット",
    about: "情報",
    aboutTitle: "Phrase Hero",
    statPhrases: "熟語数",
    statWorlds: "ワールド",
    statLevels: "レベル",
    aboutDesc1: "日常でよく使う英語表現をクイズで学習します。",
    aboutDesc2: "英語が母語でない学習者のために、複数の言語で意味を表示します。",
    aboutWorldsTitle: "ワールド一覧",
    linksTitle: "リンク",
    linkBlog: "ブログ",
    comingSoon: "準備中",
    reviewMistakes: "間違いを復習",
    resetConfirm: "すべての進捗データがリセットされます。続けますか？",
    resetDone: "リセットしました。"
  },
  zh: {
    appTitle: "Phrase Hero",
    appTagline: "用测验学习英语表达",
    tabGame: "游戏",
    tabSettings: "设置",
    tabAbout: "关于",
    worldSelect: "选择世界",
    bestScore: "最高分",
    locked: "已锁定",
    selectLevel: "请选择关卡",
    level1Desc: "选择动词",
    level2Desc: "补全短语",
    backToWorldMap: "← 世界地图",
    hintBtn: "💡 提示",
    skipBtn: "⏭ 跳过",
    exitBtn: "← 退出",
    scoreLabel: "得分",
    comboLabel: "连击",
    bestLabel: "最高",
    comboSuffix: "连续连击！",
    blankWord: "第{n}个单词",
    hintDone: "✓",
    hintFirstLetter: "💡 提示: 首字母是 \"{c}\"",
    hintFirstWord: "💡 提示: 第一个词是 \"{w}\"",
    worldClear: "通关成功！",
    totalScore: "总分",
    accuracy: "正确率",
    maxCombo: "最高连击",
    nextWorld: "下一个世界 →",
    worldMap: "世界地图",
    settings: "设置",
    langSection: "语言",
    langLabel: "释义显示语言",
    gameSettings: "游戏设置",
    startLevel: "起始关卡",
    startLevel1: "Level 1 (选择动词)",
    startLevel2: "Level 2 (补全短语)",
    themeSection: "主题",
    themeLabel: "选择主题",
    themePurple: "靛蓝",
    themeOcean: "海洋",
    themeSunset: "晚霞",
    devSection: "开发者设置",
    debugMode: "调试模式 (1题即完成)",
    dataSection: "数据",
    resetProgress: "重置进度",
    about: "关于",
    aboutTitle: "Phrase Hero",
    statPhrases: "短语数量",
    statWorlds: "世界",
    statLevels: "关卡",
    aboutDesc1: "通过测验学习日常常用的英语表达。",
    aboutDesc2: "为母语非英语的学习者提供多种语言的释义。",
    aboutWorldsTitle: "世界列表",
    linksTitle: "链接",
    linkBlog: "博客",
    comingSoon: "敬请期待",
    reviewMistakes: "复习错题",
    resetConfirm: "所有进度数据将被重置。是否继续？",
    resetDone: "已重置。"
  },
  en: {
    appTitle: "Phrase Hero",
    appTagline: "Learn English phrases with quizzes",
    tabGame: "Game",
    tabSettings: "Settings",
    tabAbout: "About",
    worldSelect: "Select World",
    bestScore: "Best Score",
    locked: "Locked",
    selectLevel: "Choose a level",
    level1Desc: "Choose the verb",
    level2Desc: "Complete the phrase",
    backToWorldMap: "← World Map",
    hintBtn: "💡 Hint",
    skipBtn: "⏭ Skip",
    exitBtn: "← Exit",
    scoreLabel: "Score",
    comboLabel: "Combo",
    bestLabel: "Best",
    comboSuffix: "combo streak!",
    blankWord: "Word {n}",
    hintDone: "✓",
    hintFirstLetter: "💡 Hint: first letter is \"{c}\"",
    hintFirstWord: "💡 Hint: first word is \"{w}\"",
    worldClear: "World Clear!",
    totalScore: "Total Score",
    accuracy: "Accuracy",
    maxCombo: "Max Combo",
    nextWorld: "Next World →",
    worldMap: "World Map",
    settings: "Settings",
    langSection: "Language",
    langLabel: "Meaning language",
    gameSettings: "Game Settings",
    startLevel: "Start level",
    startLevel1: "Level 1 (Choose the verb)",
    startLevel2: "Level 2 (Complete the phrase)",
    themeSection: "Theme",
    themeLabel: "Choose a theme",
    themePurple: "Indigo",
    themeOcean: "Ocean",
    themeSunset: "Sunset",
    devSection: "Developer Settings",
    debugMode: "Debug mode (finish after 1 question)",
    dataSection: "Data",
    resetProgress: "Reset Progress",
    about: "About",
    aboutTitle: "Phrase Hero",
    statPhrases: "Phrases",
    statWorlds: "Worlds",
    statLevels: "Levels",
    aboutDesc1: "Learn everyday English phrases through quizzes.",
    aboutDesc2: "Meanings are shown in several languages for non-native English learners.",
    aboutWorldsTitle: "World List",
    linksTitle: "Links",
    linkBlog: "Blog",
    comingSoon: "Coming soon",
    reviewMistakes: "Review mistakes",
    resetConfirm: "All progress data will be reset. Continue?",
    resetDone: "Reset complete."
  }
};
