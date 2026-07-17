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
    },
    // === 학습/경력 월드 (자동 생성 + 4개국어 검증) ===
    {
      id: 201,
      phrase: "figure out",
      verb: "figure",
      sentence: "I couldn't ___ out the answer.",
      world: "learning",
      distractors: [
        "think",
        "guess",
        "read"
      ],
      meaning: {
        ko: { translation: "나는 그 답을 알아낼 수 없었어.", hint: "알아내다" },
        ja: { translation: "その答えが分からなかった。", hint: "理解する・解き明かす" },
        zh: { translation: "我想不出答案。", hint: "弄明白；想出" },
        en: { translation: "I couldn't figure out the answer.", hint: "to understand or solve" }
      }
    },
    {
      id: 202,
      phrase: "hand in",
      verb: "hand",
      sentence: "Please ___ in your homework.",
      world: "learning",
      distractors: [
        "give",
        "bring",
        "send"
      ],
      meaning: {
        ko: { translation: "숙제를 제출해 주세요.", hint: "제출하다" },
        ja: { translation: "宿題を提出してください。", hint: "提出する" },
        zh: { translation: "请交上你的作业。", hint: "上交；提交" },
        en: { translation: "Please hand in your homework.", hint: "to submit" }
      }
    },
    {
      id: 203,
      phrase: "look up",
      verb: "look",
      sentence: "I'll ___ up the word in the dictionary.",
      world: "learning",
      distractors: [
        "search",
        "find",
        "check"
      ],
      meaning: {
        ko: { translation: "사전에서 그 단어를 찾아볼게.", hint: "찾아보다" },
        ja: { translation: "辞書でその単語を調べるよ。", hint: "調べる" },
        zh: { translation: "我会在词典里查这个词。", hint: "查找；查阅" },
        en: { translation: "I'll look up the word in the dictionary.", hint: "to search for information" }
      }
    },
    {
      id: 204,
      phrase: "go over",
      verb: "go",
      sentence: "Let's ___ over the lesson again.",
      world: "learning",
      distractors: [
        "run",
        "walk",
        "pass"
      ],
      meaning: {
        ko: { translation: "그 수업 내용을 다시 살펴보자.", hint: "복습하다" },
        ja: { translation: "もう一度そのレッスンを見直そう。", hint: "復習する・見直す" },
        zh: { translation: "我们再复习一遍这节课吧。", hint: "复习；仔细检查" },
        en: { translation: "Let's go over the lesson again.", hint: "to review carefully" }
      }
    },
    {
      id: 205,
      phrase: "point out",
      verb: "point",
      sentence: "The teacher will ___ out my mistake.",
      world: "learning",
      distractors: [
        "show",
        "mark",
        "tell"
      ],
      meaning: {
        ko: { translation: "선생님이 내 실수를 지적할 거야.", hint: "지적하다" },
        ja: { translation: "先生が私の間違いを指摘するだろう。", hint: "指摘する" },
        zh: { translation: "老师会指出我的错误。", hint: "指出" },
        en: { translation: "The teacher will point out my mistake.", hint: "to indicate or show" }
      }
    },
    {
      id: 206,
      phrase: "write down",
      verb: "write",
      sentence: "___ down the new words.",
      world: "learning",
      distractors: [
        "spell",
        "type",
        "read"
      ],
      meaning: {
        ko: { translation: "새 단어들을 적어라.", hint: "적다" },
        ja: { translation: "新しい単語を書き留めなさい。", hint: "書き留める" },
        zh: { translation: "把新单词写下来。", hint: "写下；记下" },
        en: { translation: "Write down the new words.", hint: "to record in writing" }
      }
    },
    {
      id: 207,
      phrase: "sum up",
      verb: "sum",
      sentence: "Let me ___ up the main ideas.",
      world: "learning",
      distractors: [
        "add",
        "count",
        "wrap"
      ],
      meaning: {
        ko: { translation: "요점을 요약해 볼게.", hint: "요약하다" },
        ja: { translation: "要点をまとめてみるよ。", hint: "要約する" },
        zh: { translation: "让我总结一下主要观点。", hint: "总结；概括" },
        en: { translation: "Let me sum up the main ideas.", hint: "to summarize briefly" }
      }
    },
    {
      id: 208,
      phrase: "catch on",
      verb: "catch",
      sentence: "She'll ___ on quickly in class.",
      world: "learning",
      distractors: [
        "learn",
        "get",
        "pick"
      ],
      meaning: {
        ko: { translation: "그녀는 수업에서 빨리 이해할 거야.", hint: "이해하다" },
        ja: { translation: "彼女は授業ですぐに理解するだろう。", hint: "理解する・のみ込む" },
        zh: { translation: "她在课上会很快学会。", hint: "领会；学会" },
        en: { translation: "She'll catch on quickly in class.", hint: "to understand or learn" }
      }
    },
    {
      id: 209,
      phrase: "hand out",
      verb: "hand",
      sentence: "The teacher will ___ out the test papers.",
      world: "learning",
      distractors: [
        "throw",
        "take",
        "cross"
      ],
      meaning: {
        ko: { translation: "선생님이 시험지를 나눠줄 거야.", hint: "나눠주다" },
        ja: { translation: "先生が試験用紙を配るだろう。", hint: "配る" },
        zh: { translation: "老师会分发试卷。", hint: "分发" },
        en: { translation: "The teacher will hand out the test papers.", hint: "to distribute" }
      }
    },
    {
      id: 210,
      phrase: "think over",
      verb: "think",
      sentence: "___ over the question before answering.",
      world: "learning",
      distractors: [
        "look",
        "read",
        "talk"
      ],
      meaning: {
        ko: { translation: "답하기 전에 그 질문을 곰곰이 생각해 봐.", hint: "곰곰이 생각하다" },
        ja: { translation: "答える前にその質問をよく考えて。", hint: "よく考える" },
        zh: { translation: "回答前仔细考虑这个问题。", hint: "仔细考虑" },
        en: { translation: "Think over the question before answering.", hint: "to consider carefully" }
      }
    },
    {
      id: 211,
      phrase: "give up",
      verb: "give",
      sentence: "Don't ___ up so easily at work.",
      world: "career",
      distractors: [
        "let",
        "throw",
        "hold"
      ],
      meaning: {
        ko: { translation: "직장에서 그렇게 쉽게 포기하지 마.", hint: "포기하다" },
        ja: { translation: "仕事でそんなに簡単にあきらめないで。", hint: "あきらめる" },
        zh: { translation: "别在工作上那么轻易放弃。", hint: "放弃" },
        en: { translation: "Don't give up so easily at work.", hint: "to stop trying" }
      }
    },
    {
      id: 212,
      phrase: "turn down",
      verb: "turn",
      sentence: "She had to ___ down the job offer.",
      world: "career",
      distractors: [
        "put",
        "take",
        "cut"
      ],
      meaning: {
        ko: { translation: "그녀는 그 일자리 제안을 거절해야 했다.", hint: "거절하다" },
        ja: { translation: "彼女はその仕事のオファーを断らなければならなかった。", hint: "断る" },
        zh: { translation: "她不得不拒绝那份工作邀请。", hint: "拒绝" },
        en: { translation: "She had to turn down the job offer.", hint: "to reject an offer" }
      }
    },
    {
      id: 213,
      phrase: "work on",
      verb: "work",
      sentence: "I need to ___ on my resume.",
      world: "career",
      distractors: [
        "do",
        "make",
        "run"
      ],
      meaning: {
        ko: { translation: "나는 이력서를 손봐야 해.", hint: "공들여 작업하다" },
        ja: { translation: "履歴書に取り組む必要がある。", hint: "取り組む" },
        zh: { translation: "我得好好改改我的简历。", hint: "着手改进" },
        en: { translation: "I need to work on my resume.", hint: "to spend effort improving" }
      }
    },
    {
      id: 214,
      phrase: "take over",
      verb: "take",
      sentence: "He will ___ over the project soon.",
      world: "career",
      distractors: [
        "get",
        "hold",
        "bring"
      ],
      meaning: {
        ko: { translation: "그가 곧 그 프로젝트를 넘겨받을 거야.", hint: "인수하다, 넘겨받다" },
        ja: { translation: "彼はまもなくそのプロジェクトを引き継ぐ。", hint: "引き継ぐ" },
        zh: { translation: "他很快就会接手这个项目。", hint: "接管；接手" },
        en: { translation: "He will take over the project soon.", hint: "to take control of" }
      }
    },
    {
      id: 215,
      phrase: "fill in",
      verb: "fill",
      sentence: "Can you ___ in for me today?",
      world: "career",
      distractors: [
        "cover",
        "help",
        "work"
      ],
      meaning: {
        ko: { translation: "오늘 나 대신 일해 줄 수 있어?", hint: "대신하다" },
        ja: { translation: "今日、私の代わりをしてくれる?", hint: "代わりを務める" },
        zh: { translation: "今天你能替我顶班吗?", hint: "代替；顶替" },
        en: { translation: "Can you fill in for me today?", hint: "to substitute for someone" }
      }
    },
    {
      id: 216,
      phrase: "move up",
      verb: "move",
      sentence: "She hopes to ___ up in the company.",
      world: "career",
      distractors: [
        "go",
        "step",
        "get"
      ],
      meaning: {
        ko: { translation: "그녀는 회사에서 승진하기를 바란다.", hint: "승진하다, 올라가다" },
        ja: { translation: "彼女は会社で昇進したいと思っている。", hint: "昇進する" },
        zh: { translation: "她希望在公司里得到晋升。", hint: "晋升；上升" },
        en: { translation: "She hopes to move up in the company.", hint: "to advance in rank" }
      }
    },
    {
      id: 217,
      phrase: "step down",
      verb: "step",
      sentence: "The CEO will ___ down next month.",
      world: "career",
      distractors: [
        "get",
        "back",
        "move"
      ],
      meaning: {
        ko: { translation: "그 CEO는 다음 달에 물러날 것이다.", hint: "사임하다, 물러나다" },
        ja: { translation: "そのCEOは来月退任する。", hint: "退任する" },
        zh: { translation: "这位首席执行官下个月将卸任。", hint: "辞职；卸任" },
        en: { translation: "The CEO will step down next month.", hint: "to resign from a position" }
      }
    },
    {
      id: 218,
      phrase: "sign up",
      verb: "sign",
      sentence: "I want to ___ up for the training.",
      world: "career",
      distractors: [
        "set",
        "join",
        "put"
      ],
      meaning: {
        ko: { translation: "나는 그 교육에 등록하고 싶어.", hint: "등록하다, 신청하다" },
        ja: { translation: "その研修に申し込みたい。", hint: "申し込む" },
        zh: { translation: "我想报名参加这个培训。", hint: "报名；注册" },
        en: { translation: "I want to sign up for the training.", hint: "to enroll or register" }
      }
    },
    {
      id: 219,
      phrase: "back up",
      verb: "back",
      sentence: "Please ___ up your files before you leave.",
      world: "career",
      distractors: [
        "save",
        "copy",
        "keep"
      ],
      meaning: {
        ko: { translation: "퇴근하기 전에 파일을 백업해 주세요.", hint: "백업하다" },
        ja: { translation: "帰る前にファイルをバックアップしてください。", hint: "バックアップする" },
        zh: { translation: "下班前请备份好你的文件。", hint: "备份" },
        en: { translation: "Please back up your files before you leave.", hint: "to make a copy for safety" }
      }
    },
    {
      id: 220,
      phrase: "follow up",
      verb: "follow",
      sentence: "I'll ___ up on the interview.",
      world: "career",
      distractors: [
        "check",
        "catch",
        "keep"
      ],
      meaning: {
        ko: { translation: "면접 건에 대해 후속 조치를 할게요.", hint: "후속 조치를 하다" },
        ja: { translation: "面接の件についてフォローアップします。", hint: "追って対応する" },
        zh: { translation: "我会跟进面试的事。", hint: "跟进；后续处理" },
        en: { translation: "I'll follow up on the interview.", hint: "to take further action" }
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
    },
    // === 학습/경력 월드 (자동 생성 + 4개국어 검증) ===
    {
      id: 301,
      phrase: "read up on",
      verb: "read",
      preposition: "up on",
      sentence: "Before the exam, I should ___ ___ ancient history.",
      world: "learning",
      distractors: [
        "on",
        "for",
        "at"
      ],
      meaning: {
        ko: { translation: "시험 전에 고대사를 공부해 두어야 한다.", hint: "~에 대해 미리 공부하다" },
        ja: { translation: "試験の前に古代史を勉強しておくべきだ。", hint: "詳しく調べて学ぶ" },
        zh: { translation: "考试前我应该研读一下古代史。", hint: "钻研；仔细阅读" },
        en: { translation: "Before the exam, I should read up on ancient history.", hint: "to study a subject" }
      }
    },
    {
      id: 302,
      phrase: "move on to",
      verb: "move",
      preposition: "on to",
      sentence: "Once you finish this chapter, ___ ___ the next one.",
      world: "learning",
      distractors: [
        "over",
        "into",
        "onto"
      ],
      meaning: {
        ko: { translation: "이 장을 끝내면 다음 장으로 넘어가라.", hint: "다음 것으로 넘어가다" },
        ja: { translation: "この章を終えたら次の章に進みなさい。", hint: "次へ進む" },
        zh: { translation: "读完这一章后，就接着看下一章。", hint: "转到下一个" },
        en: { translation: "Once you finish this chapter, move on to the next one.", hint: "to start the next thing" }
      }
    },
    {
      id: 303,
      phrase: "break down into",
      verb: "break",
      preposition: "down into",
      sentence: "This theory can ___ ___ three main ideas.",
      world: "learning",
      distractors: [
        "up into",
        "off into",
        "out into"
      ],
      meaning: {
        ko: { translation: "이 이론은 세 가지 핵심 개념으로 나눌 수 있다.", hint: "~으로 나누다/분해하다" },
        ja: { translation: "この理論は三つの主要な考えに分けられる。", hint: "細かく分ける" },
        zh: { translation: "这个理论可以分解成三个主要观点。", hint: "分解为；细分成" },
        en: { translation: "This theory can break down into three main ideas.", hint: "to divide into parts" }
      }
    },
    {
      id: 304,
      phrase: "catch up on",
      verb: "catch",
      preposition: "up on",
      sentence: "I have to ___ ___ my reading this weekend.",
      world: "learning",
      distractors: [
        "to",
        "with",
        "for"
      ],
      meaning: {
        ko: { translation: "이번 주말에 밀린 독서를 따라잡아야 한다.", hint: "밀린 것을 만회하다" },
        ja: { translation: "今週末に遅れている読書に追いつかなければならない。", hint: "遅れを取り戻す" },
        zh: { translation: "这个周末我得补上落下的阅读。", hint: "补上；赶上进度" },
        en: { translation: "I have to catch up on my reading this weekend.", hint: "to do something you missed" }
      }
    },
    {
      id: 305,
      phrase: "look back on",
      verb: "look",
      preposition: "back on",
      sentence: "Someday you'll ___ ___ your school years fondly.",
      world: "learning",
      distractors: [
        "at",
        "to",
        "upon"
      ],
      meaning: {
        ko: { translation: "언젠가 학창 시절을 흐뭇하게 돌아보게 될 것이다.", hint: "과거를 회상하다" },
        ja: { translation: "いつか学生時代を懐かしく振り返るだろう。", hint: "過去を振り返る" },
        zh: { translation: "有一天你会满怀深情地回顾学生时代。", hint: "回顾；回想过去" },
        en: { translation: "Someday you'll look back on your school years fondly.", hint: "to remember the past" }
      }
    },
    {
      id: 306,
      phrase: "zero in on",
      verb: "zero",
      preposition: "in on",
      sentence: "The researcher tried to ___ ___ the key cause.",
      world: "learning",
      distractors: [
        "at",
        "to",
        "into"
      ],
      meaning: {
        ko: { translation: "연구자는 핵심 원인에 집중하려 했다.", hint: "~에 초점을 맞추다" },
        ja: { translation: "研究者は主な原因に的を絞ろうとした。", hint: "焦点を絞る" },
        zh: { translation: "研究者试图锁定关键原因。", hint: "聚焦；锁定" },
        en: { translation: "The researcher tried to zero in on the key cause.", hint: "to focus on something" }
      }
    },
    {
      id: 307,
      phrase: "sign up for",
      verb: "sign",
      preposition: "up for",
      sentence: "Many students ___ ___ the online course.",
      world: "learning",
      distractors: [
        "to",
        "on",
        "with"
      ],
      meaning: {
        ko: { translation: "많은 학생들이 그 온라인 강좌에 등록한다.", hint: "~에 신청/등록하다" },
        ja: { translation: "多くの学生がそのオンライン講座に申し込む。", hint: "申し込む；登録する" },
        zh: { translation: "许多学生报名参加了这门网课。", hint: "报名；注册" },
        en: { translation: "Many students sign up for the online course.", hint: "to enroll in something" }
      }
    },
    {
      id: 308,
      phrase: "come up with",
      verb: "come",
      preposition: "up with",
      sentence: "She managed to ___ ___ a clever answer.",
      world: "learning",
      distractors: [
        "to",
        "for",
        "on"
      ],
      meaning: {
        ko: { translation: "그녀는 기발한 답을 생각해 냈다.", hint: "아이디어를 생각해 내다" },
        ja: { translation: "彼女は巧妙な答えを思いついた。", hint: "考え出す；思いつく" },
        zh: { translation: "她想出了一个巧妙的答案。", hint: "想出；提出" },
        en: { translation: "She managed to come up with a clever answer.", hint: "to think of an idea" }
      }
    },
    {
      id: 309,
      phrase: "get around to",
      verb: "get",
      preposition: "around to",
      sentence: "I still need to ___ ___ reading that textbook.",
      world: "learning",
      distractors: [
        "at",
        "for",
        "with"
      ],
      meaning: {
        ko: { translation: "나는 아직 그 교과서를 읽는 일에 손을 대야 한다.", hint: "미루던 일을 마침내 하다" },
        ja: { translation: "私はまだあの教科書を読むことに取りかからなければならない。", hint: "やっと取りかかる" },
        zh: { translation: "我还得抽空去读那本教科书。", hint: "抽空去做；终于着手" },
        en: { translation: "I still need to get around to reading that textbook.", hint: "to finally do something" }
      }
    },
    {
      id: 311,
      phrase: "carry over to",
      verb: "carry",
      preposition: "over to",
      sentence: "Unused vacation days ___ ___ the next year.",
      world: "career",
      distractors: [
        "on",
        "off",
        "into"
      ],
      meaning: {
        ko: { translation: "쓰지 않은 휴가는 다음 해로 이월된다.", hint: "다음으로 이월되다" },
        ja: { translation: "使わなかった有給は翌年に繰り越される。", hint: "繰り越す" },
        zh: { translation: "没用完的假期会顺延到下一年。", hint: "结转；顺延" },
        en: { translation: "Unused vacation days carry over to the next year.", hint: "to transfer to a later period" }
      }
    },
    {
      id: 312,
      phrase: "fall behind in",
      verb: "fall",
      preposition: "behind in",
      sentence: "He started to ___ ___ his work after the merger.",
      world: "career",
      distractors: [
        "back on",
        "short of",
        "in with"
      ],
      meaning: {
        ko: { translation: "합병 후 그는 업무가 밀리기 시작했다.", hint: "뒤처지다" },
        ja: { translation: "合併後、彼は仕事が遅れ始めた。", hint: "遅れをとる" },
        zh: { translation: "合并后他的工作开始落后了。", hint: "落后；跟不上" },
        en: { translation: "He started to fall behind in his work after the merger.", hint: "to fail to keep pace" }
      }
    },
    {
      id: 313,
      phrase: "live up to",
      verb: "live",
      preposition: "up to",
      sentence: "The new manager failed to ___ ___ our expectations.",
      world: "career",
      distractors: [
        "on",
        "for",
        "with"
      ],
      meaning: {
        ko: { translation: "새 매니저는 우리의 기대에 부응하지 못했다.", hint: "기대에 부응하다" },
        ja: { translation: "新しいマネージャーは私たちの期待に応えられなかった。", hint: "期待に応える" },
        zh: { translation: "新经理没能达到我们的期望。", hint: "不负所望；达到标准" },
        en: { translation: "The new manager failed to live up to our expectations.", hint: "to meet expectations" }
      }
    },
    {
      id: 314,
      phrase: "miss out on",
      verb: "miss",
      preposition: "out on",
      sentence: "Don't ___ ___ the chance for promotion.",
      world: "career",
      distractors: [
        "on",
        "of",
        "for"
      ],
      meaning: {
        ko: { translation: "승진 기회를 놓치지 마라.", hint: "기회를 놓치다" },
        ja: { translation: "昇進のチャンスを逃さないで。", hint: "逃す" },
        zh: { translation: "别错过升职的机会。", hint: "错过（机会）" },
        en: { translation: "Don't miss out on the chance for promotion.", hint: "to lose an opportunity" }
      }
    },
    {
      id: 315,
      phrase: "hand over to",
      verb: "hand",
      preposition: "over to",
      sentence: "Before retiring, she will ___ ___ her successor.",
      world: "career",
      distractors: [
        "on",
        "off",
        "up"
      ],
      meaning: {
        ko: { translation: "은퇴하기 전에 그녀는 후임자에게 인계할 것이다.", hint: "(일을) 넘겨주다" },
        ja: { translation: "退職前に彼女は後任に引き継ぐ。", hint: "引き継ぐ" },
        zh: { translation: "退休前她会把工作移交给继任者。", hint: "移交；交接" },
        en: { translation: "Before retiring, she will hand over to her successor.", hint: "to transfer responsibility" }
      }
    },
    {
      id: 316,
      phrase: "look forward to",
      verb: "look",
      preposition: "forward to",
      sentence: "We ___ ___ working with you.",
      world: "career",
      distractors: [
        "on",
        "for",
        "at"
      ],
      meaning: {
        ko: { translation: "함께 일하기를 고대합니다.", hint: "기대하다; 고대하다" },
        ja: { translation: "一緒に働けるのを楽しみにしています。", hint: "楽しみにする" },
        zh: { translation: "我们期待与您合作。", hint: "期待；盼望" },
        en: { translation: "We look forward to working with you.", hint: "to anticipate eagerly" }
      }
    },
    {
      id: 317,
      phrase: "get ahead of",
      verb: "get",
      preposition: "ahead of",
      sentence: "Working late helps me ___ ___ the competition.",
      world: "career",
      distractors: [
        "on",
        "in",
        "with"
      ],
      meaning: {
        ko: { translation: "야근은 경쟁자들보다 앞서 나가는 데 도움이 된다.", hint: "~보다 앞서다" },
        ja: { translation: "残業は競合より先んじるのに役立つ。", hint: "先んじる" },
        zh: { translation: "加班有助于我领先于竞争对手。", hint: "领先；抢先" },
        en: { translation: "Working late helps me get ahead of the competition.", hint: "to move in front of" }
      }
    },
    {
      id: 318,
      phrase: "fill in for",
      verb: "fill",
      preposition: "in for",
      sentence: "Can you ___ ___ me while I'm on leave?",
      world: "career",
      distractors: [
        "on",
        "out",
        "with"
      ],
      meaning: {
        ko: { translation: "내가 휴가 간 동안 나 대신 일해줄 수 있어?", hint: "~를 대신하다" },
        ja: { translation: "休暇の間、私の代わりをしてくれる？", hint: "代役を務める" },
        zh: { translation: "我休假时你能替我顶班吗？", hint: "顶替；代班" },
        en: { translation: "Can you fill in for me while I'm on leave?", hint: "to substitute for someone" }
      }
    },
    {
      id: 319,
      phrase: "stand up for",
      verb: "stand",
      preposition: "up for",
      sentence: "A good boss will ___ ___ their team.",
      world: "career",
      distractors: [
        "on",
        "to",
        "with"
      ],
      meaning: {
        ko: { translation: "좋은 상사는 자기 팀을 옹호한다.", hint: "옹호하다; 편들다" },
        ja: { translation: "良い上司は自分のチームをかばう。", hint: "擁護する" },
        zh: { translation: "好的上司会为自己的团队挺身而出。", hint: "支持；维护" },
        en: { translation: "A good boss will stand up for their team.", hint: "to defend or support" }
      }
    },
    {
      id: 320,
      phrase: "follow up on",
      verb: "follow",
      preposition: "up on",
      sentence: "Please ___ ___ the client's request today.",
      world: "career",
      distractors: [
        "on",
        "with",
        "for"
      ],
      meaning: {
        ko: { translation: "오늘 고객의 요청을 후속 처리해 주세요.", hint: "후속 조치를 하다" },
        ja: { translation: "今日、顧客の要望にフォローアップしてください。", hint: "追って対応する" },
        zh: { translation: "请今天跟进客户的请求。", hint: "跟进；后续处理" },
        en: { translation: "Please follow up on the client's request today.", hint: "to take further action" }
      }
    },
    {
      id: 310,
      phrase: "sit in on",
      verb: "sit",
      preposition: "in on",
      sentence: "Before enrolling, I asked whether I could ___ ___ one of the professor's lectures.",
      world: "learning",
      distractors: [
        "up to",
        "over to",
        "out of"
      ],
      meaning: {
        ko: { translation: "정식 등록을 하기 전에, 저는 교수님의 강의 중 하나를 청강해도 되는지 여쭤봤어요.", hint: "수업이나 회의에 참관하다, 청강하다" },
        ja: { translation: "正式に履修登録する前に、教授の講義の一つを聴講してもいいか尋ねました。", hint: "授業や会議に参加して見学・聴講する" },
        zh: { translation: "在正式注册之前，我问了是否可以旁听教授的一节课。", hint: "旁听（课程或会议）" },
        en: { translation: "Before enrolling, I asked whether I could sit in on one of the professor's lectures.", hint: "to attend a class or meeting as an observer" }
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
