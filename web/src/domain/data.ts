export type Language = 'en' | 'my'

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
  'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha',
  'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
  'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada',
  'Revati',
] as const

export const NAKSHATRAS_MY = [
  'အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသီ', 'အဒြ',
  'ပုဏ္ဏဖုသျှ', 'ဖုသျှ', 'အသလိဿ', 'မာဃ', 'ပြုဗ္ဗဖလဂုဏီ',
  'ဥတ္တရဖလဂုဏီ', 'ဟဿတ', 'စိတြာ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ',
  'ဇေဋ္ဌ', 'မူလ', 'ပြုဗ္ဗာသာဠ်', 'ဥတ္တရာသာဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓိ',
  'သတ္တဘိသျှ', 'ပြုဗ္ဗဘဒြပိုဒ်', 'ဥတ္တရဘဒြပိုဒ်', 'ရေဝတီ',
] as const

export const LORDS = [
  ['Ke', 'Ketu', 'ကိတ်'], ['Ve', 'Venus', 'သောကြာ'],
  ['Su', 'Sun', 'တနင်္ဂနွေ'], ['Mo', 'Moon', 'တနင်္လာ'],
  ['Ma', 'Mars', 'အင်္ဂါ'], ['Ra', 'Rahu', 'ရာဟု'],
  ['Ju', 'Jupiter', 'ကြာသပတေး'], ['Sa', 'Saturn', 'စနေ'],
  ['Me', 'Mercury', 'ဗုဒ္ဓဟူး'],
] as const

export const TARAS = [
  { name: 'Janma', my: 'ဇနမ', score: 1 },
  { name: 'Sampat', my: 'သမ္ပတ္တိ', score: 4 },
  { name: 'Vipat', my: 'ဝိပတ္တိ', score: -2 },
  { name: 'Kshema', my: 'ခေမ', score: 3 },
  { name: 'Pratyak', my: 'ပြတ္တရ', score: -2 },
  { name: 'Sadhana', my: 'သာဓက', score: 3 },
  { name: 'Naidhana', my: 'ဘာဓ (သို့) နိဓါန', score: -4 },
  { name: 'Mitra', my: 'မိတ္တ', score: 4 },
  { name: 'Parama Mitra', my: 'အတိမိတ္တ', score: 5 },
] as const

export type TaraName = (typeof TARAS)[number]['name']

export const POSITION_COPY: Record<number, {
  title: string; titleMy: string; meaning: string; meaningMy: string
}> = {
  1: { title: 'Janma (Birth)', titleMy: 'ဇနမ (မူလစန်းစီး)', meaning: 'Inherently supportive but fragile; avoid starting major new ventures.', meaningMy: 'မူလသဘာဝအတိုင်း အကျိုးပေးသော်လည်း အားနည်းသေးသဖြင့် အရေးကြီးသော လုပ်ငန်းသစ်များ စတင်ရန် ရှောင်ကြဉ်သင့်သည်။' },
  2: { title: '2nd (Wealth / Dhana)', titleMy: '၂ လုံးမြောက် (ဓန)', meaning: 'Reflects preferred foods, persistent behaviors, and habits like yoga or traditional practices.', meaningMy: 'ဇာတာရှင် ကြိုက်နှစ်သက်သော အစားအသောက်များ၊ စွဲမြဲသော အပြုအမူများနှင့် အမူအကျင့်များကို ဖော်ပြပါသည်။ ဥပမာ - ရှေးဆန်သော အလေ့အကျင့်များ၊ ယောဂကျင့်ခြင်း စသည်တို့ ဖြစ်သည်။' },
  3: { title: '3rd', titleMy: '၃ လုံးမြောက်', meaning: 'Governs close social circles and associates. Also indicates minor obstacles and disturbances.', meaningMy: 'လူမှုပေါင်းသင်းဆက်ဆံရေးနှင့် အထူးသဖြင့် အရင်းချာဆုံး အပေါင်းအသင်းများကို ကြည့်ရပါသည်။ ထို့ပြင် ဇာတာရှင် ကြုံတွေ့ရမည့် အသေးစား အခက်အခဲ၊ အနှောင့်အယှက်လေးများကို ဖော်ပြပါသည်။' },
  4: { title: '4th (Jati)', titleMy: '၄ လုံးမြောက် (ဇာတိနက္ခတ်)', meaning: 'Indicates ancestral traits, family disposition, home environment, past-life connections, and life philosophy.', meaningMy: 'မွေးဖွားလာရာ မျိုးနွယ်စုနှင့် မျိုးရိုးစဉ်ဆက် လက်ဆင့်ကမ်းလာသော စိတ်နေစိတ်ထား၊ အမူအကျင့်များကို ဖော်ပြပါသည်။ ဇာတာရှင် နေထိုင်ရမည့် အိမ်အမျိုးအစား၊ ရပ်ကွက်၊ မြို့ရွာ၊ အတိတ်ဘဝနှင့် မျိုးဆက်သစ် အခြေအနေများကို ကြည့်နိုင်ပါသည်။ ဘဝဒဿနနှင့် ပီယအင်အားကြီးမားစေမှုကိုလည်း ဤနက္ခတ်မှ ကြည့်ရပါသည်။' },
  5: { title: '5th', titleMy: '၅ လုံးမြောက်', meaning: 'Governs disciples, children, followers, creative intelligence, major life hurdles, and the fruits of past merit such as treasure and jewelry.', meaningMy: 'မိမိရရှိမည့် တပည့်သာဝက၊ သားသမီး၊ နောက်လိုက်နောက်ပါများကို ဖော်ပြပါသည်။ တီထွင်နိုင်သော ဉာဏ်ရည်၊ ဘဝတွင် မဖြစ်မနေကြုံရမည့် ကြီးမားသော အခက်အခဲများနှင့် မိမိအလိုရှိသည်များကို ဖြည့်ဆည်းပေးတတ်သော နက္ခတ်ဖြစ်ပြီး၊ အတိတ်ကုသိုလ် အကျိုးပေးများကိုလည်း ပြသပါသည်။' },
  6: { title: '6th (Bhinna)', titleMy: '၆ လုံးမြောက် (ဘင်နက္ခတ်)', meaning: 'Shows the ability to solve problems and learn from challenges. Reflects intensity and the power to overcome rivals when used tactically.', meaningMy: 'အခက်အခဲများကို ရင်ဆိုင်ကျော်ဖြတ် ဖြေရှင်းနိုင်စွမ်းနှင့် သင်ယူနိုင်စွမ်းကို ပြသပါသည်။ ဒေါသကြီးတတ်မှုကိုလည်း ဖော်ပြပြီး၊ ဤနက္ခတ်၏ ပရိယာယ်ကို သုံးတတ်ပါက ဖြိုဖျက်လိုသော ရန်အားလုံးကို ဖြိုချနိုင်ပါသည်။' },
  7: { title: '7th (Naidhana)', titleMy: '၇ လုံးမြောက် (နိဓါနနက္ခတ်)', meaning: 'Points to mortality, intense pain, and glimpses of the next life. It is also a position of ultimate refuge and liberation.', meaningMy: 'သေခြင်း၊ အသတ်ခံရခြင်း၊ ပြင်းထန်သော ရုပ်ပိုင်းနှင့် စိတ်ပိုင်းဆိုင်ရာ ဝေဒနာများနှင့် သေပြီးနောက် ရောက်မည့်ဘဝကို အရိပ်အခြည် ပြသပါသည်။ ထို့ပြင် အချုပ်အနှောင်ဟူသမျှမှ လွတ်စေတတ်သော၊ မှီခိုအားထားရာကို ရစေတတ်သော နက္ခတ်လည်း ဖြစ်ပါသည်။' },
  8: { title: '8th', titleMy: '၈ လုံးမြောက်', meaning: 'Governs relations with the mother or maternal figures, non-intimate friends, helpers, and general lifelong health.', meaningMy: 'မိခင် သို့မဟုတ် မိခင်တန်းဝင် အမျိုးသမီးများနှင့် ဆက်ဆံရေး၊ မိခင်မေတ္တာ ရရှိမှုတို့ကို ဖော်ပြပါသည်။ သိပ်မရင်းနှီးလှသော သူငယ်ချင်းမိတ်ဆွေများ၊ မိမိအား ကူညီမည့်သူများနှင့် တစ်သက်တာ ယေဘုယျ ကျန်းမာရေးကိုလည်း ဤနက္ခတ်မှ ကြည့်ရပါသည်။' },
  9: { title: '9th (Adhana / Conception)', titleMy: '၉ လုံးမြောက် (အာဓါန သို့မဟုတ် ကိုယ်ဝန်ဆောင်)', meaning: 'The protector and sustainer. A receptive position that manifests desires and brings plans to fruition.', meaningMy: 'ဇာတာရှင်အား အကာအကွယ်ပေးသော၊ မှီခိုရာနှင့် စောင့်ရှောက်သူဖြစ်ပါသည်။ အရာရာကို လက်ခံယူတတ်ပြီး အရာရာကို ဖော်ဆောင်ပေးတတ်သောကြောင့် ဆန္ဒများကို အကောင်အထည်ဖော်ပေးသော နက္ခတ်ဖြစ်သည်။' },
  10: { title: '10th (Kamma)', titleMy: '၁၀ လုံးမြောက် (ကမ္မနက္ခတ်)', meaning: 'Indicates profession, livelihood, food sources, unfinished work from past lives, and religious duties.', meaningMy: 'ဇာတာရှင် လုပ်မည့်အလုပ်၊ အသက်မွေးဝမ်းကျောင်းနှင့် တစ်သက်တာ မှီဝဲရမည့် အစာရေစာကို ပြသပါသည်။ အတိတ်ဘဝက မပြီးပြတ်သေးသော အလုပ်များ၊ ဖြည့်ကျင့်ရမည့် ပါရမီအမျိုးအစားနှင့် ကိုးကွယ်ရာ ဘာသာတရားဆိုင်ရာ အကျင့်များကိုပါ ဖော်ပြပါသည်။' },
  11: { title: '11th (Manasa)', titleMy: '၁၁ လုံးမြောက် (မာနသနက္ခတ်)', meaning: 'Governs mental power, intuition, preferred social circles, and the conceptualization of an ideal partner.', meaningMy: 'စိတ်စွမ်းအား၊ စိတ်တန်ခိုးနှင့် စိန္တာမယဉာဏ်တို့ကို ဖော်ပြပါသည်။ တရင်းတနှီး ပေါင်းသင်းလိုသော လူတန်းစား၊ ကျင်လည်လိုသော အသိုင်းအဝိုင်းနှင့် မိမိလိုချင်သော အိမ်ထောင်ဘက်၏ စိတ်ကူးပုံဖော်မှုများကို ကြည့်ရပါသည်။' },
  12: { title: '12th (Desa)', titleMy: '၁၂ လုံးမြောက် (ဒေသနက္ခတ်)', meaning: 'Shows unbreakable bonds, personal weaknesses, dependency, and the potential to settle in foreign lands.', meaningMy: 'သွေး၊ ကတိသစ္စာတို့ဖြင့် ချည်နှောင်ထားသော ဖြတ်တောက်၍မရသည့် ဆက်ဆံရေးများကို ပြသပါသည်။ ဇာတာရှင်၏ အားနည်းချက်များ၊ မှီခိုနေထိုင်ရသော နေရာဒေသ၊ ရေခြားမြေခြား သွားရောက်အခြေချရမှုတို့ကို ဖော်ပြပါသည်။' },
  13: { title: '13th (Abhisheka / Destiny)', titleMy: '၁၃ လုံးမြောက် (အဘိသေက သို့မဟုတ် နန်းချ)', meaning: 'Reflects inescapable destiny. It can bring either coronation or downfall and governs safety and the right eye.', meaningMy: 'ရှောင်လွှဲ၍မရသော ကံကြမ္မာကို ဖော်ပြပါသည်။ ကောင်းကျိုးပေးလျှင် မင်းမြှောက်ပေးပြီး ဆိုးကျိုးပေးလျှင် နန်းချတတ်သည်။ ညာဘက်မျက်လုံး၊ သံသရာဆိုင်ရာ အတွေးအမြင်များနှင့် ဇာတာရှင်၏ ဘေးကင်းလုံခြုံမှုကိုလည်း ပြသပါသည်။' },
  14: { title: '14th', titleMy: '၁၄ လုံးမြောက်', meaning: 'Indicates worldview, worldly prestige, possessions, emotional stability, and the left eye.', meaningMy: 'လောကအမြင်၊ ပတ်ဝန်းကျင်အပေါ် ခံစားချက်နှင့် လောကီဂုဏ်၊ ပိုင်ဆိုင်မှုများအပေါ် သဘောထားကို ဖော်ပြပါသည်။ နာနေပါက စိတ်ခံစားမှု ဖောက်ပြန်ခြင်းနှင့် ပြန်မရနိုင်သော အရှုံး၊ အမှားများကို ဖြစ်စေတတ်သည်။' },
  15: { title: '15th (Shobhana)', titleMy: '၁၅ လုံးမြောက် (သောဘဏနက္ခတ်)', meaning: 'Governs social success, capability, and the potential for a smooth and prosperous life path.', meaningMy: 'သာမန် လူမှုပေါင်းသင်းဆက်ဆံရေး၊ ရလာမည့် အောင်မြင်မှုနှင့် အောင်မြင်မှု ရယူနိုင်စွမ်းတို့ကို ပြသပါသည်။ ဤနက္ခတ်ကို သုံးတတ်လျှင် ဘဝသည် ပန်းခင်းလမ်းကဲ့သို့ ချောမွေ့နိုင်ပါသည်။' },
  16: { title: '16th (Sanghatika)', titleMy: '၁၆ လုံးမြောက် (သံဃာဋိကနက္ခတ်)', meaning: 'A position of acquisition and support from partners and associates. If afflicted, it indicates betrayal, enemies, or debt.', meaningMy: 'မိမိလိုသမျှ လာဖြည့်ပေးမည့်နက္ခတ်ဖြစ်ပြီး၊ ပေးကမ်းခြင်းထက် ရယူသိမ်းပိုက်ရမည့် သဘောရှိပါသည်။ အိမ်ထောင်ဖက်၊ အကူအညီပေးသူ၊ လုပ်ဖော်ကိုင်ဖက်များကို ဖော်ပြသလို၊ နာနေပါက နောက်ကျောဓားထိုးတတ်သူ၊ ဒုက္ခပေးသူ ဖြစ်သွားတတ်ပါသည်။' },
  17: { title: '17th', titleMy: '၁၇ လုံးမြောက်', meaning: 'Governs the underlying causes of success or failure and indicates acquaintances, coworkers, and neighbors.', meaningMy: 'အောင်မြင်မှုနှင့် ဆုံးရှုံးမှု အကြောင်းရင်းများကို ဖန်တီးပေးသော နက္ခတ်ဖြစ်ပါသည်။ အပြစ်ကင်းစင်သော နက္ခတ်ဟုခေါ်ပြီး၊ မရင်းနှီးလှသော အိမ်နီးချင်း၊ လုပ်ဖော်ကိုင်ဖက်များကို ဖော်ပြပါသည်။' },
  18: { title: '18th (Samudayika / Udaya)', titleMy: '၁၈ လုံးမြောက် (သာမုဒါယိက သို့မဟုတ် ဥဒယ)', meaning: 'Reflects relatives, community, late-life outcomes, past spiritual merit, and inherent leadership qualities.', meaningMy: 'ဆွေမျိုးနှင့် အသိုင်းအဝိုင်း၊ အရာအားလုံး၏ နောက်ဆုံးအကျိုးပေးကို ဖော်ပြပါသည်။ အဖက်ဖက်က ကောင်းမွန်ပြည့်စုံ တိုးတက်စေပြီး၊ အတိတ်ဘဝမှ ဒါန၊ သီလ၊ စရဏ အကျိုးပေးများနှင့် မွေးရာပါ သိဒ္ဓိများကို ပြသပါသည်။' },
  19: { title: '19th (Adhana / Father)', titleMy: '၁၉ လုံးမြောက် (အာဓါန သို့မဟုတ် မွေးဖွားရာ)', meaning: 'Governs the father, teachers, religion, investments, promises, and sudden fame.', meaningMy: 'ဖခင်၊ ဆရာ၊ ဘာသာတရားနှင့်ပတ်သက်သော သဘောထား၊ ရရှိမည့် ဘာသာရေးလမ်းညွှန်မှုတို့ကို ကြည့်ရပါသည်။ ကံကြမ္မာကို ပုံဖော်ပေးပြီး နေရာချထားခြင်း၊ ရင်းနှီးမြှုပ်နှံခြင်း၊ ကတိသစ္စာတည်ခြင်းနှင့် နေ့ချင်းညချင်း နာမည်ထင်ရှားမှုတို့ကို ရစေတတ်ပါသည်။' },
  20: { title: '20th (Udaya)', titleMy: '၂၀ လုံးမြောက် (ဥဒယနက္ခတ်)', meaning: 'Reveals hidden weaknesses and windfall luck. It favors bulk charity, anonymous donations, and general offerings.', meaningMy: 'ဇာတာရှင်၏ အားနည်းချက်များနှင့် ကံကောင်းခြင်းများကို ပြသပါသည်။ ထင်မှတ်မထားဘဲ ငွေအစုလိုက်အပုံလိုက်ရခြင်းမျိုး ဖြစ်စေတတ်ပြီး၊ အစုလိုက်အပုံလိုက် လှူဒါန်းခြင်း၊ ပံ့သကူဒါန၊ စတုဒီသာများကို အထူးနှစ်သက်ပါသည်။' },
  21: { title: '21st', titleMy: '၂၁ လုံးမြောက်', meaning: 'Indicates mental resilience and the ability to maintain harmony with the environment.', meaningMy: 'စိတ်ဓာတ်ပိုင်းဆိုင်ရာ ကြံ့ခိုင်မှု၊ ပတ်ဝန်းကျင်နှင့် နားလည်မှုရှိအောင် ညှိယူနိုင်စွမ်းကို ဖော်ပြပါသည်။' },
  22: { title: '22nd (Vinashaka)', titleMy: '၂၂ လုံးမြောက် (ဝိနာသကနက္ခတ်)', meaning: 'A position that tests integrity and governs rivalries, karmic consequences, and spiritual worship.', meaningMy: 'ဇာတာရှင်၏ ကိုယ်ကျင့်သိက္ခာကို ပျက်စီးအောင် တိုက်တွန်းတတ်သော၊ ဒဏ်ခတ်ခံရသော နက္ခတ်ဖြစ်ပါသည်။ ရင်ဆိုင်ရမည့် စစ်တလင်း၊ ပြိုင်ပွဲ၊ အကုသိုလ်အကျိုးပေးများနှင့် ကိုးကွယ်ရမည့် ဘုရား၊ စေတီ အမျိုးအစားကို ဖော်ပြပါသည်။' },
  23: { title: '23rd', titleMy: '၂၃ လုံးမြောက်', meaning: 'Reflects life rhythm and balance. A testing position that requires continual self-audit.', meaningMy: 'ဘဝ၏ စည်းချက်ညီခြင်းကို ကြည့်ရပြီး၊ ဘဝကဏ္ဍတိုင်းတွင် စမ်းသပ်စစ်ဆေးတတ်သော နက္ခတ်ဖြစ်ပါသည်။ ဤနက္ခတ်ကိုလည်း ဝိနာသကနက္ခတ်ဟု အချို့က ခေါ်ဆိုကြပါသည်။' },
  24: { title: '24th (Physician)', titleMy: '၂၄ လုံးမြောက် (ဆေးနက္ခတ်)', meaning: 'The healer position that cures ailments, ends the spiritual search, and indicates wisdom and fulfilled paramis.', meaningMy: 'ရောဂါဝေဒနာ အလုံးစုံကို ကင်းပျောက်စေတတ်သော နက္ခတ်ဖြစ်ပါသည်။ ဇာတာရှင်၏ ရှာဖွေမှု ခရီးကို အဆုံးသတ်စေပြီး၊ အသိပညာ ဗဟုသုတ ကြွယ်ဝမှုနှင့် ပါရမီဖြည့်ဆည်းမှုများကို ပြသပါသည်။' },
  25: { title: '25th (Vinashaka / Manasa)', titleMy: '၂၅ လုံးမြောက် (ဝိနာသက သို့မဟုတ် မာနသ)', meaning: 'Reflects self-destruction through greed and governs memory, death, and renunciation of worldly ties.', meaningMy: 'မိမိ၏ စိတ်အစွမ်းဖြင့် မိမိကိုယ်မိမိ ဖျက်ဆီးတတ်သော သဘောရှိပါသည်။ သိဒ္ဓိနက္ခတ်၊ ဥပါဒ်နက္ခတ် ဟုလည်းခေါ်ပြီး မှတ်ဉာဏ်၊ သေခြင်းနှင့် လောကီကို စွန့်ခွာခြင်းတို့ကို ဖော်ပြပါသည်။' },
  26: { title: '26th (Desa / Raja)', titleMy: '၂၆ လုံးမြောက် (ဋ္ဌီ၊ ဒေသ၊ ရာဇ)', meaning: "Indicates partners, loyalty, and the ability to build organizations. Governs power, authority, and one's kingdom or domain.", meaningMy: 'ခရီးသွားဖော်၊ လက်တွဲဖော်၊ သစ္စာခိုင်မြဲမှုကို ဖော်ပြပါသည်။ အရာရာကို တည်မြဲအောင် လုပ်နိုင်စွမ်း၊ အဖွဲ့အစည်း ထူထောင်နိုင်စွမ်း ရှိမရှိနှင့် ဇာတာရှင်၏ ဘုန်းတန်ခိုး၊ သြဇာအာဏာ၊ အုပ်ချုပ်ရသော တိုင်းပြည်နယ်ပယ်တို့ကို ကြည့်ရပါသည်။' },
  27: { title: '27th (Abhisheka)', titleMy: '၂၇ လုံးမြောက် (အဘိသေကနက္ခတ်)', meaning: "Reflects the soul's purpose and inescapable duties. Governs self-mastery, liberation, and wide-reaching fame or infamy.", meaningMy: 'သံသရာမှ ပေးအပ်ထားသော တာဝန်၊ ဒီဘုံကို လာရသည့် အကြောင်းရင်းများကို ကြည့်ရပါသည်။ ကိုယ်တိုင် စီမံပိုင်ခွင့်၊ လွတ်မြောက်မှု ပေးတတ်ပြီး တတိယမျက်လုံးနက္ခတ် ဟုလည်း ခေါ်ပါသည်။ တိုင်းသိပြည်သိ နာမည်ကျော်ကြား ဂုဏ်ပြုခံရခြင်း သို့မဟုတ် ရှုတ်ချခံရခြင်းကို ဖြစ်စေပါသည်။' },
}

export const TARA_COPY: Record<TaraName, {
  use: string; useMy: string; nature: string; natureMy: string;
  feeling: string; feelingMy: string; remedy: string; remedyMy: string
}> = {
  Janma: {
    use: 'Prioritize self-care and personal projects today.',
    useMy: 'မိမိကိုယ်ကိုယ် ပြုစုပျိုးထောင်ခြင်းနှင့် ကိုယ်ပိုင်ကိစ္စများကို ဦးစားပေး လုပ်ဆောင်ပါ။',
    nature: 'Inherently supportive but fragile like a newborn; avoid major events like housewarmings or weddings.',
    natureMy: 'မူလသဘာဝအတိုင်း အမြဲတမ်း အကျိုးပေးသည်။ မွေးကင်းစကလေးနှင့်တူ၍ အားနည်းသောကြောင့် အရေးကြီးသောကိစ္စများ (အိမ်ဆောက်၊ လက်ထပ်) အတွက် အခါမပေးရပါ။',
    feeling: 'New ideas may emerge, but execution feels difficult. Confidence may be low.',
    feelingMy: 'စိတ်ကူးကောင်းများရလာမည်ဖြစ်သော်လည်း အကောင်အထည်ဖော်ရန်ခက်မည်။ မိမိကိုယ်မိမိ ယုံကြည်မှုနည်းပြီး အားငယ်စိတ်ဝင်လွယ်တတ်သည်။',
    remedy: 'Donate rice, vegetables, fruits, or pumpkin. Trust your intuition.',
    remedyMy: 'ဆန်၊ ဟင်းသီးဟင်းရွက်၊ အသီးအနှံ သို့မဟုတ် ရွှေဖရုံသီး လှူဒါန်းပါ။ မိမိ၏ အလိုလို သိမြင်သောစိတ် (Intuition) ကို ယုံကြည်စွာအသုံးပြုပါ။',
  },
  Sampat: {
    use: 'A great day for acquiring resources and managing finances.',
    useMy: 'ဥစ္စာဓန ရရှိနိုင်သော နေ့ဖြစ်၍ ငွေကြေးစီမံမှုများ ဆောင်ရွက်ရန် အထူးသင့်လျော်ပါသည်။',
    nature: 'Brings wealth, success, fame, authority, and wisdom.',
    natureMy: 'ချမ်းသာကြွယ်ဝမှု၊ အောင်မြင်မှု၊ နာမည်ဂုဏ်သတင်း ကျော်ကြားမှု၊ သြဇာအာဏာနှင့် အသိဉာဏ်ပညာများကို အပြည့်အဝပေးစွမ်းသည်။',
    feeling: 'Optimistic and inclined toward forgiveness, understanding, and acceptance.',
    feelingMy: 'အကောင်းမြင်စိတ်ရှိမည်။ အရာရာကို ခွင့်လွှတ်၊ နားလည်၊ လက်ခံလိုစိတ်ရှိမည်။',
    remedy: 'Offer food or alms. Graceful speech and tidy appearance enhance your prosperity and charm.',
    remedyMy: 'ဆွမ်း၊ အာဟာရဒါန လောင်းလှူပါ။ ကျက်သရေရှိသော အပြောအဆို၊ အနေအထိုင်နှင့် ဝတ်စားဆင်ယင်မှုက ပီယအားကို တိုးစေပြီး ကြွယ်ဝစေသည်။',
  },
  Vipat: {
    use: 'Proceed with caution; stick to small, reversible steps.',
    useMy: 'အခက်အခဲ အနည်းငယ် ရှိနိုင်သဖြင့် သတိထား ဆောင်ရွက်ပါ။',
    nature: 'Can cause obstacles, misfortune, loss, and irritability.',
    natureMy: 'အခက်အခဲ၊ အနှောင့်အယှက်၊ ကံဆိုးခြင်း၊ ဆုံးရှုံးပျက်စီးခြင်းနှင့် ဒေါသကြီးခြင်းများကို ဖြစ်စေတတ်သည်။',
    feeling: 'Pessimistic and irritable; patience and willingness to negotiate are low.',
    feelingMy: 'အဆိုးမြင်စိတ်ရှိမည်။ အလိုမကျမှုများပြီး စေ့စပ်ညှိနှိုင်းလိုစိတ်၊ ခွင့်လွှတ်လိုစိတ် နည်းပါမည်။',
    remedy: 'Donate jaggery, brown sugar, or milk rice. Be extra mindful of harsh words and actions.',
    remedyMy: 'ထန်းလျက်၊ ကြံသကာ၊ သကြားညို သို့မဟုတ် နို့ထမင်း လှူဒါန်းပါ။ နှုတ်နှင့် ကိုယ်အမူအရာ မကြမ်းတမ်းအောင် အထူးဆင်ခြင်ပါ။',
  },
  Kshema: {
    use: 'Excellent for maintenance, stability, and securing what you have.',
    useMy: 'ရှိရင်းစွဲအခြေအနေကို ထိန်းသိမ်းရန်နှင့် တည်ငြိမ်မှုရှိစေရန် ဆောင်ရွက်သင့်ပါသည်။',
    nature: 'Brings peace, safety, steady progress, and healing.',
    natureMy: 'ငြိမ်းအေးခြင်း၊ ဘေးရန်ကင်းခြင်း၊ အများကို အကျိုးပြုခြင်း၊ ခိုင်မြဲသောတိုးတက်ခြင်းနှင့် ရောဂါဝေဒနာပျောက်ကင်းခြင်းတို့ကို ပေးစွမ်းသည်။',
    feeling: 'Feeling capable and secure; a sense of pride and self-satisfaction.',
    feelingMy: 'မိမိ၏အရည်အချင်းကို အကောင်းဆုံးဖော်ထုတ်နိုင်သည်ဟု ခံစားရမည်။ ဘေးကင်းလုံခြုံပြီး မိမိကိုယ်မိမိ ဂုဏ်ယူကျေနပ်မှုရှိမည်။',
    remedy: 'Burn camphor as an offering. Resolve issues quickly while in this Tara.',
    remedyMy: 'ပရုတ်ကို မီးရှို့ပူဇော်ပါ။ ပြဿနာတစုံတရာပေါ်လာပါက ဤတာရာမှ မပြောင်းမီ အမြန်ဆုံးပြေလည်အောင် ဖြေရှင်းပါ။',
  },
  Pratyak: {
    use: 'Expect some resistance; it is best to proceed carefully.',
    useMy: 'အဟန့်အတားများ ရှိနိုင်သောကြောင့် စိတ်ရှည်စွာဖြင့် ဖြည်းဖြည်းချင်း ဆောင်ရွက်ပါ။',
    nature: "Causes obstacles and intense mental distress; represents an 'equal rival'.",
    natureMy: 'အခက်အခဲ၊ အနှောင့်အယှက်ပေးပြီး ပြင်းထန်သော စိတ်ဒုက္ခရောက်စေတတ်သည်။ “မိမိနှင့် လက်ရည်တူသော ရန်သူ” ဟု အဓိပ္ပာယ်ရသည်။',
    feeling: 'Frustrated and prone to using force or anger to get results.',
    feelingMy: 'အလိုမကျမှုများကြောင့် ဒေါသတကြီးဖြင့် မိမိအလိုကျဖြစ်အောင် ကြိုးစားတတ်သည်။',
    remedy: 'Donate sea salt. Practice patience and help those of different faiths.',
    remedyMy: 'ပင်လယ်ဆား လှူဒါန်းပါ။ စိတ်ရှည်သည်းခံခြင်းကိုကျင့်ပါ။ မိမိနှင့် ဘာသာခြားသူများကို ကူညီပေးပါ။',
  },
  Sadhana: {
    use: 'Focus on disciplined work and steady progress toward your goals.',
    useMy: 'လုပ်ငန်းဆောင်တာများကို စည်းကမ်းတကျနှင့် တစိုက်မတ်မတ် လုပ်ဆောင်ရန် ကောင်းမွန်ပါသည်။',
    nature: "'The Practitioner' brings full benefits but requires effort and patience.",
    natureMy: '“ကျင့်စဉ်ကျင့်သူ” ဟု အဓိပ္ပာယ်ရပြီး အကျိုးကျေးဇူးကို အပြည့်အဝပေးသော်လည်း အားထုတ်မှုနှင့် စိတ်ရှည်မှု လိုအပ်သည်။',
    feeling: 'Gaining an appreciation for persistence and hard work.',
    feelingMy: 'ဇွဲ၊ ဝီရိယနှင့် ကြိုးစားအားထုတ်မှု၏ တန်ဖိုးကို သိမြင်လာမည်။',
    remedy: 'Donate clothes (avoid staying in pajamas during the day). Feed animals or support spiritual practitioners.',
    remedyMy: 'အဝတ်အထည်များ လှူဒါန်းပါ (ညအိပ်ဝတ်စုံဖြင့် နေ့ခင်းမနေပါနှင့်)။ တရားကျင့်သူကို လှူခြင်း သို့မဟုတ် ခွေးကျွေးခြင်း ပြုလုပ်ပါ။',
  },
  Naidhana: {
    use: 'Focus on finishing tasks, cleaning up, and closure.',
    useMy: 'အလုပ်ဟောင်းများကို အဆုံးသတ်ခြင်းနှင့် မလိုအပ်သည်များကို စွန့်ပယ်ရှင်းလင်းခြင်းအတွက်သာ အသုံးပြုပါ။',
    nature: "'The Obstruction' can cause sudden loss after giving hope; requires extreme caution.",
    natureMy: 'မျှော်လင့်ချက်ပေးပြီးမှ ဆုံးရှုံးမှု အကြီးအကျယ် ဖြစ်စေတတ်သော (ဘာဓ) နက္ခတ်ဖြစ်သဖြင့် အထူးသတိပြုရပါမည်။',
    feeling: 'Unable to find satisfaction even when things go well; high anxiety.',
    feelingMy: 'ကောင်းတာတွေဖြစ်လာလျှင်တောင် ကျေနပ်နိုင်စွမ်းမရှိဘဲ စိုးရိမ်ကြောင့်ကြမှု များနေမည်။',
    remedy: 'Donate sesame, gold, or support education. Practice forgiveness and release captives (animals).',
    remedyMy: 'နှမ်း၊ ရွှေ သို့မဟုတ် ပညာရေးဒါန ပြုလုပ်ပါ။ ခွင့်လွှတ်ခြင်း၊ ဘေးမဲ့လွှတ်ခြင်းများ ပြုလုပ်ပါ။',
  },
  Mitra: {
    use: 'Perfect for networking, meetings, and strengthening partnerships.',
    useMy: 'မိတ်ဆွေများနှင့် တွေ့ဆုံဆွေးနွေးခြင်းနှင့် ပူးပေါင်းဆောင်ရွက်မှုများအတွက် အဆင်ပြေပါသည်။',
    nature: 'Favors love, marriage, good children, and quality business partners.',
    natureMy: 'အချစ်ရေး၊ အိမ်ထောင်ရေး ကံကောင်းခြင်း၊ သားသမီးကောင်းရခြင်းနှင့် မိတ်ဖက်ဖောက်သည်ကောင်းများ ရရှိခြင်းတို့ကို ဖြစ်စေသည်။',
    feeling: 'Empathy, love, compassion, and humility are heightened.',
    feelingMy: 'ကိုယ်ချင်းစာတရား၊ မေတ္တာ၊ ကရုဏာ၊ ရိုကျိုးမှုနှင့် ပီတိစိတ်များ ဖြစ်ပေါ်မည်။',
    remedy: 'Donate milk or ghee. Light ghee lamps. Treat the opposite sex with respect.',
    remedyMy: 'နို့နှင့် နို့ထွက်ပစ္စည်း (ထောပတ်) လှူဒါန်းပါ။ ထောပတ်ဆီမီး ပူဇော်ပါ။ ဆန့်ကျင်ဘက်လိင်များကို လေးစားစွာ ဆက်ဆံပါ။',
  },
  'Parama Mitra': {
    use: 'A highly favorable day for major launches and positive initiatives.',
    useMy: 'အရေးကြီးသော အလုပ်များ စတင်ရန်နှင့် အောင်မြင်မှုရရှိရန် အထူးအားသာသော နေ့ဖြစ်ပါသည်။',
    nature: 'Similar to Mitra but more powerful; brings general luck, success, and prosperity.',
    natureMy: 'မိတ္တတာရာနှင့် ဆင်တူသော်လည်း အင်အားပိုကြီးမားပြီး ကျက်သရေမင်္ဂလာ၊ အောင်မြင်မှုနှင့် ကံကောင်းခြင်း အထွေထွေကို ရရှိစေသည်။',
    feeling: 'Strong desire to pursue noble goals and achieve success.',
    feelingMy: 'ဘဝကို အောင်မြင်မှုနှင့် မြင့်မြတ်သော ရည်မှန်းချက်များဆီသို့ ဦးတည်လိုသော စိတ်ဆန္ဒများ ပြင်းပြနေမည်။',
    remedy: 'Offer gold robe to Buddha. Feed birds or elephants. If highly afflicted, donate rice equal to your body weight in one complete donation.',
    remedyMy: 'ဘုရားရှင်၏ မျက်နှာတော်တစ်ပြင်လုံးကို ရွှေသင်္ကန်းကပ်လှူပါ။ ဆင်စာကျွေးပါ။ ငှက်များကို ဆန်ကွဲကျွေးပါ။ အလွန်ခိုက်နေပါက မိမိ၏ကိုယ်အလေးချိန်အတိုင်း ဆန်ကို (တစ်နေရာတည်းတွင် အပြီးအပြတ်) လှူဒါန်းပါက ဆိုးကျိုးများကျေပြီး စီးပွားတက်စေသည်။',
  },
}

export const SPECIALS: Record<number, { name: string; my: string; bonus: number; use: string; useMy: string }> = {
  1: { name: 'Janma', my: 'ဇနမ', bonus: 1, use: 'Self-reflection, personal reset, intention setting.', useMy: 'မိမိကိုယ်ကိုယ် ပြန်လည်ဆန်းစစ်ရန်နှင့် ရည်မှန်းချက်အသစ်များ ချမှတ်ရန် သင့်တော်ပါသည်။' },
  2: { name: 'Sampat', my: 'သမ္ပတ္တိ', bonus: 3, use: 'Food habits, resources, wealth handling, prosperity routines.', useMy: 'ဥစ္စာဓန စီမံခန့်ခွဲခြင်းနှင့် စားဝတ်နေရေး အခြေအနေများ ပြုပြင်ရန် ကောင်းမွန်ပါသည်။' },
  4: { name: 'Jaati', my: 'ဇာတိ', bonus: 2, use: 'Family lineage, community roots, home environment, cultural identity.', useMy: 'မိသားစု၊ မျိုးရိုးနှင့် နေအိမ်ပတ်ဝန်းကျင်ဆိုင်ရာ ကိစ္စရပ်များအတွက် သင့်တော်ပါသည်။' },
  5: { name: 'Treasure / Punya', my: 'ရတနာ / ပုည', bonus: 3, use: 'Gold, gems, stored merit, creative intelligence, children, followers.', useMy: 'ရွှေငွေရတနာ စုဆောင်းခြင်း၊ တီထွင်ကြံဆခြင်းနှင့် အတိတ်ကုသိုလ် အကျိုးပေးသော နေရာဖြစ်သည်။' },
  6: { name: 'Bhinna', my: 'ဘင်', bonus: 1, use: 'Overcoming enemies, learning through difficulty, strategic correction.', useMy: 'အခက်အခဲများကို ကျော်လွှားရန်နှင့် နည်းဗျူဟာမြောက် ပြုပြင်ပြောင်းလဲမှုများအတွက် သင့်တော်ပါသည်။' },
  7: { name: 'Naidhana', my: 'နိဓါန', bonus: -4, use: 'Closure, bondage-release, danger awareness; avoid major starts.', useMy: 'အဆုံးသတ်ခြင်းနှင့် အနှောင်အဖွဲ့မှ လွတ်မြောက်ခြင်းအတွက် ကောင်းမွန်သော်လည်း အရေးကြီးသော လုပ်ငန်းသစ်များ စတင်ရန် ရှောင်ကြဉ်သင့်ပါသည်။' },
  8: { name: 'Mitra support', my: 'မိတ္တ (အကူ)', bonus: 2, use: 'Motherly support, helpers, allies, health maintenance, networking.', useMy: 'မိတ်ဆွေအကူအညီ ရရှိခြင်း၊ ကျန်းမာရေး ဂရုစိုက်ခြင်းနှင့် လူမှုဆက်ဆံရေးများအတွက် ကောင်းမွန်ပါသည်။' },
  9: { name: 'Adhana I', my: 'အာဓါန ၁', bonus: 2, use: 'Protection, shelter, conception, manifestation of wishes.', useMy: 'အကာအကွယ် ရရှိခြင်း၊ ဆန္ဒများကို အကောင်အထည်ဖော်ခြင်းနှင့် အစီအစဉ်သစ်များအတွက် သင့်တော်ပါသည်။' },
  10: { name: 'Karma', my: 'ကမ္မ', bonus: 3, use: 'Career, livelihood, unfinished work, duty, professional effort.', useMy: 'အသက်မွေးဝမ်းကျောင်း၊ တာဝန်ဝတ္တရားများနှင့် မပြီးဆုံးသေးသော အလုပ်များအတွက် ကောင်းမွန်ပါသည်။' },
  11: { name: 'Manasa', my: 'မာနသ', bonus: 2, use: 'Mind power, imagination, mental focus, desired social circle.', useMy: 'စိတ်စွမ်းအား တိုးတက်ခြင်း၊ စိတ်ကူးသစ်များ ဖော်ထုတ်ခြင်းနှင့် အသိုင်းအဝိုင်းသစ်များအတွက် သင့်တော်ပါသည်။' },
  12: { name: 'Desha I', my: 'ဒေသ ၁', bonus: 2, use: 'Residence, blood bonds, foreign settlement, dependency, place karma.', useMy: 'နေထိုင်ရာ ဒေသကိစ္စများ၊ ရေခြားမြေခြား ခရီးစဉ်များနှင့် မိသားစုအရေးများအတွက် ကောင်းမွန်ပါသည်။' },
  13: { name: 'Abhisheka I', my: 'အဘိသေက ၁', bonus: 2, use: 'Rise or fall by destiny, protection, unavoidable karmic turning point.', useMy: 'ကံကြမ္မာ အပြောင်းအလဲများ၊ ဘေးကင်းလုံခြုံမှုနှင့် အကာအကွယ် ရရှိခြင်းတို့အတွက် ထူးခြားပါသည်။' },
  14: { name: 'Worldview', my: 'လောကအမြင်', bonus: 0, use: 'Worldview, emotional response to environment, attitude toward possessions.', useMy: 'လောကအမြင်နှင့် ပတ်ဝန်းကျင်အပေါ် ခံစားချက်များကို ပြုပြင်ပြောင်းလဲနိုင်သော နေရာဖြစ်သည်။' },
  15: { name: 'Shobhana', my: 'သောဘဏ', bonus: 3, use: 'Success, smooth social progress, easy achievement, graceful advancement.', useMy: 'အောင်မြင်မှု ရရှိခြင်း၊ ဂုဏ်တက်ခြင်းနှင့် လူမှုဆက်ဆံရေး ချောမွေ့ခြင်းတို့အတွက် ကောင်းမွန်ပါသည်။' },
  16: { name: 'Sanghatika', my: 'သံဃာဋိက', bonus: -2, use: 'Partners, helpers, debts, conflict handling; beware betrayal if afflicted.', useMy: 'လုပ်ဖော်ကိုင်ဖက်များနှင့် ပူးပေါင်းခြင်း၊ အကြွေးကိစ္စများ ဖြေရှင်းခြင်းနှင့် ပဋိပက္ခများကို ကိုင်တွယ်ရန် သင့်တော်ပါသည်။' },
  17: { name: 'Neutral Cause', my: 'အကြောင်းရင်း', bonus: 0, use: 'Causes of success or loss, coworkers, neighbors, neutral karmic testing.', useMy: 'အောင်မြင်မှု သို့မဟုတ် ဆုံးရှုံးမှုအတွက် အကြောင်းတရားများ ရှာဖွေတွေ့ရှိမည့် ကြားနေကံရှိသော နေရာဖြစ်သည်။' },
  18: { name: 'Samudayika / Udaya I', my: 'သာမုဒါယိက / ဥဒယ ၁', bonus: 2, use: 'Community, relatives, final fruits, leadership, accumulated merit.', useMy: 'ဆွေမျိုးအသိုင်းအဝိုင်း၏ အကျိုးကို ရရှိခြင်းနှင့် ခေါင်းဆောင်မှု ပြသခြင်းတို့အတွက် သင့်တော်ပါသည်။' },
  19: { name: 'Adhana II', my: 'အာဓါန ၂', bonus: 3, use: 'Father, guru, dharma, investment, pledges, fame, foundation-building.', useMy: 'ရင်းနှီးမြှုပ်နှံခြင်း၊ ကတိကဝတ်ပြုခြင်းနှင့် ဂုဏ်သတင်း ကျော်ကြားခြင်းတို့အတွက် ကောင်းမွန်ပါသည်။' },
  20: { name: 'Udaya / Windfall', my: 'ဥဒယ / ငွေဝင်', bonus: 3, use: 'Sudden wealth, lottery luck, or business rise.', useMy: 'ထင်မှတ်မထားသော ငွေဝင်ခြင်း၊ ထီကံကောင်းခြင်းနှင့် စီးပွားတက်ခြင်းတို့အတွက် အထူးကောင်းမွန်ပါသည်။' },
  21: { name: 'Mental Strength', my: 'စိတ်ကြံ့ခိုင်မှု', bonus: 1, use: 'Mental resilience, environmental adjustment, emotional endurance.', useMy: 'စိတ်ဓာတ်ကြံ့ခိုင်မှုနှင့် စိတ်ခံနိုင်ရည် မြှင့်တင်ရန် သင့်တော်ပါသည်။' },
  22: { name: 'Vainashika I', my: 'ဝိနာသက ၁', bonus: -4, use: 'Moral danger, punishment, battle, competition; avoid launches.', useMy: 'ကိုယ်ကျင့်တရားကို ထိန်းသိမ်းပြီး ပြိုင်ဆိုင်မှုများကို သတိဖြင့် ရင်ဆိုင်ပါ။ လုပ်ငန်းသစ်များ မစတင်ပါနှင့်။' },
  23: { name: 'Vainashika II', my: 'ဝိနာသက ၂', bonus: -3, use: 'Life-balance testing, rhythm disruption, trials; use only for correction.', useMy: 'ဘဝဟန်ချက်ကို ပြန်လည်ထိန်းညှိရန်နှင့် ပြုပြင်ပြောင်းလဲမှုများ ပြုလုပ်ရန်အတွက်သာ သင့်တော်ပါသည်။' },
  24: { name: 'Medicine', my: 'ဆေး', bonus: 3, use: 'Healing, cure, knowledge completion, ending a search, remedy work.', useMy: 'ရောဂါဝေဒနာ ကုသခြင်း၊ ကျန်းမာရေး ပြန်လည်ကောင်းမွန်ခြင်းနှင့် ဗဟုသုတ ရှာဖွေခြင်းတို့အတွက် ကောင်းမွန်ပါသည်။' },
  25: { name: 'Vinashaka / Secondary Manasa', my: 'ဝိနာသက / မာနသ ဒုတိယ', bonus: -2, use: 'Mind-caused self-destruction, memory, renunciation, deep inner caution.', useMy: 'အတွင်းစိတ်ကို သတိထား၍ စွန့်လွှတ်သင့်သည်များကို စွန့်လွှတ်ရန် သင့်တော်ပါသည်။' },
  26: { name: 'Desha / Raja', my: 'ဒေသ / ရာဇ', bonus: 3, use: "Authority, institution, rulership, organization-building, stable power.", useMy: 'သြဇာအာဏာ တိုးတက်ခြင်း၊ အဖွဲ့အစည်း တည်ထောင်ခြင်းနှင့် အုပ်ချုပ်မှု ကိစ္စများအတွက် ကောင်းမွန်ပါသည်။' },
  27: { name: 'Abhisheka II', my: 'အဘိသေက ၂', bonus: 3, use: 'Command, recognition, third-eye insight, public fame or blame, life mission.', useMy: 'အသိအမှတ်ပြု ခံရခြင်း၊ ဘဝတာဝန်များကို ကျေပွန်စွာ ထမ်းဆောင်နိုင်ခြင်းတို့အတွက် ထူးခြားပါသည်။' },
}

export const DIRECTIONS = [
  ['East', 'အရှေ့အရပ်'], ['Southwest', 'အနောက်တောင်အရပ်'],
  ['North', 'မြောက်အရပ်'], ['Southeast', 'အရှေ့တောင်အရပ်'],
  ['West', 'အနောက်အရပ်'], ['Northeast', 'အရှေ့မြောက်အရပ်'],
  ['South', 'တောင်အရပ်'], ['Northwest', 'အနောက်မြောက်အရပ်'],
] as const

export const CITIES = [
  { name: 'Yangon', my: 'ရန်ကုန်', lat: 16.8409, lon: 96.1735, offset: 6.5 },
  { name: 'Mandalay', my: 'မန္တလေး', lat: 21.9588, lon: 96.0891, offset: 6.5 },
  { name: 'Mogok', my: 'မိုးကုတ်', lat: 22.9177, lon: 96.5098, offset: 6.5 },
  { name: 'Minbu', my: 'မင်းဘူး', lat: 20.1806, lon: 94.875, offset: 6.5 },
  { name: 'Naypyidaw', my: 'နေပြည်တော်', lat: 19.7633, lon: 96.0785, offset: 6.5 },
  { name: 'Mawlamyine', my: 'မော်လမြိုင်', lat: 16.49, lon: 97.6256, offset: 6.5 },
  { name: 'Mudon', my: 'မုဒုံ', lat: 16.2562, lon: 97.7246, offset: 6.5 },
  { name: 'Bago', my: 'ပဲခူး', lat: 17.335, lon: 96.4815, offset: 6.5 },
  { name: 'Taunggyi', my: 'တောင်ကြီး', lat: 20.7892, lon: 97.0378, offset: 6.5 },
  { name: 'Pathein', my: 'ပုသိမ်', lat: 16.779, lon: 94.732, offset: 6.5 },
  { name: 'Monywa', my: 'မုံရွာ', lat: 22.1083, lon: 95.1358, offset: 6.5 },
] as const

export const myDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '၀၁၂၃၄၅၆၇၈၉'[Number(digit)])

export const nameOf = (index: number, language: Language) =>
  language === 'my' ? NAKSHATRAS_MY[index] : NAKSHATRAS[index]
