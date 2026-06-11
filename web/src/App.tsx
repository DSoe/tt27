import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  CITIES, NAKSHATRAS, NAKSHATRAS_MY, POSITION_COPY, SPECIALS, TARA_COPY,
  myDigits, nameOf, type Language,
} from './domain/data'
import {
  allScores, bestUse, calculateBirth, calculateTransit, directionsFor,
  findMoonPadaEnd, lordOf, padaClass, raviYoga, scoreBand, scoreNakshatra, verdict,
  type AstroPosition, type ScoreRow,
} from './domain/engine'

type View = 'today' | 'best' | 'profile'

interface Profile {
  name: string
  date: string
  time: string
  cityIndex: number
  location?: { name: string; lat: number; lon: number; offset: number }
  natal: AstroPosition
}

interface WorldCity {
  name: string
  admin1?: string
  country?: string
  latitude: number
  longitude: number
  timezone: string
}

const PROFILE_KEY = 'tt27.react.profile'
const LANGUAGE_KEY = 'tt27.lang'

function loadSavedProfile(): Profile | null {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null') as Profile | null
    if (!saved) return null
    if (Number.isFinite(saved.natal?.sunIdx)) return saved

    const quickCity = CITIES[saved.cityIndex] ?? CITIES[0]
    const location = saved.location ?? quickCity
    const calculated = calculateBirth(
      saved.date,
      saved.time,
      location.lat,
      location.lon,
      location.offset,
    )
    const migrated = {
      ...saved,
      natal: {
        ...saved.natal,
        sunIdx: calculated.sunIdx,
      },
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(migrated))
    return migrated
  } catch {
    return null
  }
}

const ui = {
  en: {
    today: 'Today', best: 'Best days', profile: 'Profile',
    setupEyebrow: 'PERSONAL TIMING, MADE CLEAR',
    setupTitle: 'Start with your birth details.',
    setupBody: 'We use them once to calculate your Moon and Lagna nakshatras. You can review the result before saving.',
    name: 'Your name', date: 'Birth date', time: 'Birth time', place: 'Birth place',
    quickPlaces: 'Quick places', worldSearch: 'Search worldwide', search: 'Search',
    cityHint: 'City or postal code', searching: 'Searching…', noCity: 'No matching city found.',
    continue: 'Calculate my profile', privacy: 'Stored only in this browser. Delete it anytime.',
    demo: 'Explore with a sample profile',
    verify: 'Review your birth profile', verifyBody: 'These two nakshatras personalize every score and recommendation.',
    moon: 'Moon nakshatra', lagna: 'Lagna nakshatra', pada: 'Pada',
    padaEnds: 'Pada ends',
    back: 'Back', save: 'Save and show today', change: 'Edit birth details',
    greeting: 'Your timing for today', current: 'Current moment', score: 'Your score',
    moonTransit: 'Transit Moon', lagnaTransit: 'Transit Lagna',
    overview: 'Today at a glance', details: 'Why this score?', hide: 'Hide details',
    position: 'Position from your natal Moon', opportunity: 'Moon Tara opportunity',
    support: 'Lagna Tara influence', action: 'Action plan',
    direction: 'Auspicious facing',
    directionGuidance: 'Praying and sharing loving-kindness while facing these directions at this time will greatly enhance the fulfillment of your aspirations.',
    refresh: 'Now', custom: 'Choose time', ravi: 'Ravi Yoga is active',
    applyTime: 'Apply time', cancel: 'Cancel', selectedMoment: 'Selected moment',
    raviInactive: 'Ravi Yoga is not active', bestTitle: 'Plan your best days',
    bestBody: 'Each nakshatra is ranked against your natal Moon and Lagna. Open a row for meaning and remedy.',
    use: 'Best use', tara: 'Moon Tara', lagnaTara: 'Lagna Tara', special: '27 position', vedha: 'Vedha',
    preferences: 'Preferences', language: 'Language', birthProfile: 'Birth profile',
    natalRavi: 'Natal Ravi Yoga: Present',
    natalRaviMeaning: 'This supports success, important undertakings, visibility, and leadership.',
    reset: 'Delete profile and start over', remedy: 'Tara remedy',
    moonRemedy: 'Moon Tara remedy', lagnaRemedy: 'Lagna Tara remedy',
  },
  my: {
    today: 'ယနေ့', best: 'အကောင်းဆုံးနေ့များ', profile: 'မိမိ',
    setupEyebrow: 'မိမိအတွက် အချိန်ကောင်းကို ရှင်းလင်းစွာ သိရှိရန်',
    setupTitle: 'မွေးဖွားမှုအချက်အလက်ဖြင့် စတင်ပါ။',
    setupBody: 'စန်းနက္ခတ်နှင့် လဂ်နက္ခတ်ကို တွက်ချက်ရန်သာ အသုံးပြုပါမည်။ မသိမ်းဆည်းမီ ရလဒ်ကို စစ်ဆေးနိုင်ပါသည်။',
    name: 'အမည်', date: 'မွေးနေ့', time: 'မွေးချိန်', place: 'မွေးဖွားရာဒေသ',
    quickPlaces: 'အမြန်ရွေးရန်', worldSearch: 'ကမ္ဘာတစ်ဝန်း မြို့ရှာရန်', search: 'ရှာမည်',
    cityHint: 'မြို့ သို့မဟုတ် စာတိုက်သင်္ကေတ', searching: 'ရှာဖွေနေပါသည်…', noCity: 'ကိုက်ညီသောမြို့ မတွေ့ပါ။',
    continue: 'မိမိဇာတာကို တွက်ချက်မည်', privacy: 'ဤ Browser ထဲတွင်သာ သိမ်းဆည်းထားပြီး အချိန်မရွေး ဖျက်နိုင်ပါသည်။',
    demo: 'နမူနာဇာတာဖြင့် အရင်ကြည့်မည်',
    verify: 'မိမိ၏ မွေးဖွားမှုဇာတာကို စစ်ဆေးပါ', verifyBody: 'ဤနက္ခတ်နှစ်ခုကို အသုံးပြု၍ ရမှတ်နှင့် အကြံပြုချက်များကို မိမိအတွက် သီးသန့်တွက်ချက်ပါသည်။',
    moon: 'စန်းနက္ခတ်', lagna: 'လဂ်နက္ခတ်', pada: 'ပါဒ',
    padaEnds: 'ပြီးဆုံးချိန်',
    back: 'နောက်သို့', save: 'သိမ်းဆည်း၍ ယနေ့အခြေအနေကြည့်မည်', change: 'မွေးဖွားမှုအချက်အလက် ပြင်ဆင်ရန်',
    greeting: 'ယနေ့ မိမိအတွက် အချိန်ကောင်း', current: 'လက်ရှိအချိန်', score: 'ရမှတ်',
    moonTransit: 'စန်းစီးနက္ခတ်', lagnaTransit: 'လဂ်စီးနက္ခတ်',
    overview: 'ယနေ့အခြေအနေ အကျဉ်းချုပ်', details: 'ဤရမှတ်ရသည့် အကြောင်းရင်း', hide: 'အသေးစိတ်ပိတ်မည်',
    position: 'ဇနမစန်းနက္ခတ်မှ ကျရောက်သောနေရာ', opportunity: 'စန်းတာရာ အခွင့်အလမ်း',
    support: 'လဂ်တာရာ အခြေအနေ', action: 'အောင်မြင်မှုရယူရန်နှင့် အတားအဆီးများ ကျော်လွှားရန်',
    direction: 'ကောင်းကျိုးပေးသော အရပ်မျက်နှာများ',
    directionGuidance: 'ယခုအချိန်တွင် အထက်ပါ အရပ်မျက်နှာများကို မျက်နှာမူပြီး ဆုတောင်းခြင်း မေတ္တာပို့သခြင်းများ ပြုလုပ်ပါက ဆုတောင်းအလွန်ပြည့်စေပါသည်။',
    refresh: 'ယခု', custom: 'အချိန်ရွေးရန်', ravi: 'ရဝိယောဂ ကျရောက်နေပါသည်',
    applyTime: 'အချိန်အသုံးပြုမည်', cancel: 'ပိတ်မည်', selectedMoment: 'ရွေးချယ်ထားသောအချိန်',
    raviInactive: 'ရဝိယောဂ မကျရောက်ပါ', bestTitle: 'အကောင်းဆုံးနေ့များကို ကြိုတင်စီစဉ်ပါ',
    bestBody: 'နက္ခတ်တစ်ခုချင်းစီကို မိမိ၏ စန်းနှင့် လဂ်အလိုက် ရမှတ်သတ်မှတ်ထားပါသည်။ အဓိပ္ပာယ်နှင့် ယတြာကို ကြည့်ရန် အတန်းကို ဖွင့်ပါ။',
    use: 'အသုံးချရန်', tara: 'စန်းတာရာ', lagnaTara: 'လဂ်တာရာ', special: '၂၇ နေရာ', vedha: 'ဝေဒ',
    preferences: 'စိတ်ကြိုက်သတ်မှတ်ချက်များ', language: 'ဘာသာစကား', birthProfile: 'မွေးဖွားမှုအချက်အလက်',
    natalRavi: 'ဇနမ ရဝိယောဂ: ရှိပါသည်',
    natalRaviMeaning: 'အောင်မြင်မှု၊ အရေးကြီးသော လုပ်ငန်းဆောင်တာများ၊ ထင်ပေါ်ကျော်ကြားမှုနှင့် ခေါင်းဆောင်မှုတို့ကို အထောက်အကူပြုပါသည်။',
    reset: 'အချက်အလက်ဖျက်၍ ပြန်စမည်', remedy: 'တာရာ ယတြာ',
    moonRemedy: 'စန်းတာရာ ယတြာ', lagnaRemedy: 'လဂ်တာရာ ယတြာ',
  },
} as const

function App() {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem(LANGUAGE_KEY) === 'my' ? 'my' : 'en')
  const [profile, setProfile] = useState<Profile | null>(loadSavedProfile)
  const [pending, setPending] = useState<Profile | null>(null)
  const [view, setView] = useState<View>('today')

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const copy = ui[language]
  const changeLanguage = (next: Language) => setLanguage(next)

  if (!profile) {
    if (pending) {
      return <VerifyProfile
        profile={pending}
        language={language}
        onLanguage={changeLanguage}
        onBack={() => setPending(null)}
        onSave={() => {
          localStorage.setItem(PROFILE_KEY, JSON.stringify(pending))
          setProfile(pending)
          setPending(null)
        }}
      />
    }
    return <Setup
      language={language}
      onLanguage={changeLanguage}
      onCalculated={setPending}
    />
  }

  return (
    <div className="app-shell">
      <Header language={language} onLanguage={changeLanguage} />
      <main>
        {view === 'today' && <Today profile={profile} language={language} />}
        {view === 'best' && <BestDays profile={profile} language={language} />}
        {view === 'profile' && <ProfileView
          profile={profile}
          language={language}
          onLanguage={changeLanguage}
          onReset={() => {
            localStorage.removeItem(PROFILE_KEY)
            setProfile(null)
            setView('today')
          }}
        />}
      </main>
      <nav className="bottom-nav" aria-label="Primary">
        {([
          ['today', '◷', copy.today],
          ['best', '✦', copy.best],
          ['profile', '○', copy.profile],
        ] as const).map(([key, icon, label]) => (
          <button
            className={view === key ? 'active' : ''}
            key={key}
            onClick={() => setView(key)}
          >
            <span aria-hidden="true">{icon}</span>{label}
          </button>
        ))}
      </nav>
    </div>
  )
}

function Header({ language, onLanguage }: {
  language: Language; onLanguage: (language: Language) => void
}) {
  return (
    <header className="app-header">
      <div className="brand"><span className="brand-mark">◔</span><b>TT27</b></div>
      <LanguageToggle language={language} onChange={onLanguage} />
    </header>
  )
}

function LanguageToggle({ language, onChange }: {
  language: Language; onChange: (language: Language) => void
}) {
  return (
    <div className="language-toggle" aria-label="Language">
      <button className={language === 'en' ? 'active' : ''} onClick={() => onChange('en')}>EN</button>
      <button className={language === 'my' ? 'active' : ''} onClick={() => onChange('my')}>MY</button>
    </div>
  )
}

function Setup({ language, onLanguage, onCalculated }: {
  language: Language
  onLanguage: (language: Language) => void
  onCalculated: (profile: Profile) => void
}) {
  const copy = ui[language]
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [cityIndex, setCityIndex] = useState(0)
  const [cityQuery, setCityQuery] = useState('')
  const [worldCities, setWorldCities] = useState<WorldCity[]>([])
  const [worldCity, setWorldCity] = useState<WorldCity | null>(null)
  const [searchStatus, setSearchStatus] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!date || !time) {
      setError(language === 'my' ? 'မွေးနေ့နှင့် မွေးချိန်ကို ဖြည့်သွင်းပါ။' : 'Enter your birth date and exact birth time.')
      return
    }
    const quickCity = CITIES[cityIndex]
    const location = worldCity
      ? {
          name: worldCityLabel(worldCity),
          lat: worldCity.latitude,
          lon: worldCity.longitude,
          offset: timeZoneOffsetHours(date, time, worldCity.timezone),
        }
      : undefined
    const lat = location?.lat ?? quickCity.lat
    const lon = location?.lon ?? quickCity.lon
    const offset = location?.offset ?? quickCity.offset
    const natal = calculateBirth(date, time, lat, lon, offset)
    onCalculated({ name: name.trim() || 'You', date, time, cityIndex, location, natal })
  }

  async function searchWorldwide() {
    if (cityQuery.trim().length < 2) return
    setSearchStatus(copy.searching)
    setWorldCities([])
    setWorldCity(null)
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery.trim())}&count=12&language=en&format=json`)
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json() as { results?: WorldCity[] }
      const matches = (data.results ?? []).filter((city) =>
        Number.isFinite(city.latitude) && Number.isFinite(city.longitude) && city.timezone)
      setWorldCities(matches)
      setWorldCity(matches[0] ?? null)
      setSearchStatus(matches.length ? '' : copy.noCity)
    } catch {
      setSearchStatus(language === 'my'
        ? 'အင်တာနက်ချိတ်ဆက်မှုကို စစ်ဆေးပါ သို့မဟုတ် အမြန်ရွေးရန်ကို အသုံးပြုပါ။'
        : 'Check your connection or use a quick place.')
    }
  }

  return (
    <div className="setup-page">
      <header className="setup-header">
        <div className="brand"><span className="brand-mark">◔</span><b>TT27</b></div>
        <LanguageToggle language={language} onChange={onLanguage} />
      </header>
      <section className="setup-layout">
        <div className="setup-intro">
          <p className="eyebrow">{copy.setupEyebrow}</p>
          <h1>{copy.setupTitle}</h1>
          <p>{copy.setupBody}</p>
          <div className="trust-list">
            <span>✓ {language === 'my' ? 'ရှင်းလင်းသော နေ့စဉ်အကြံပြုချက်' : 'Clear daily guidance'}</span>
            <span>✓ {language === 'my' ? 'စက်ထဲတွင်သာ သိမ်းဆည်းခြင်း' : 'Private, on-device storage'}</span>
            <span>✓ {language === 'my' ? 'အင်္ဂလိပ်နှင့် မြန်မာဘာသာ' : 'English and Myanmar'}</span>
          </div>
        </div>
        <form className="setup-card" onSubmit={submit}>
          <label>{copy.name}<input value={name} onChange={(event) => setName(event.target.value)} placeholder={language === 'my' ? 'ဥပမာ - စိုး' : 'e.g. Soe'} /></label>
          <div className="form-row">
            <label>{copy.date}<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label>{copy.time}<input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label>
          </div>
          <label>{copy.quickPlaces}
            <select value={cityIndex} onChange={(event) => {
              setCityIndex(Number(event.target.value))
              setWorldCity(null)
              setWorldCities([])
            }}>
              {CITIES.map((city, index) => <option value={index} key={city.name}>{language === 'my' ? city.my : city.name}</option>)}
            </select>
          </label>
          <label>{copy.worldSearch}
            <span className="search-control">
              <input
                value={cityQuery}
                onChange={(event) => setCityQuery(event.target.value)}
                placeholder={copy.cityHint}
              />
              <button type="button" onClick={searchWorldwide}>{copy.search}</button>
            </span>
          </label>
          {worldCities.length > 0 && <label>{copy.place}
            <select
              value={worldCity ? worldCities.indexOf(worldCity) : 0}
              onChange={(event) => setWorldCity(worldCities[Number(event.target.value)])}
            >
              {worldCities.map((city, index) => <option value={index} key={`${city.latitude}-${city.longitude}`}>{worldCityLabel(city)}</option>)}
            </select>
          </label>}
          {searchStatus && <small className="search-status">{searchStatus}</small>}
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" type="submit">{copy.continue}<span>→</span></button>
          <button
            className="demo-button"
            type="button"
            onClick={() => {
              const city = CITIES[0]
              onCalculated({
                name: language === 'my' ? 'စိုး' : 'Soe',
                date: '1990-03-12',
                time: '08:24',
                cityIndex: 0,
                natal: calculateBirth('1990-03-12', '08:24', city.lat, city.lon, city.offset),
              })
            }}
          >{copy.demo}</button>
          <small className="privacy">⌁ {copy.privacy}</small>
        </form>
      </section>
    </div>
  )
}

function VerifyProfile({ profile, language, onLanguage, onBack, onSave }: {
  profile: Profile; language: Language; onLanguage: (language: Language) => void
  onBack: () => void; onSave: () => void
}) {
  const copy = ui[language]
  const { natal } = profile
  const natalRavi = raviYoga(natal.sunIdx, natal.moonIdx)
  return (
    <div className="setup-page">
      <header className="setup-header">
        <div className="brand"><span className="brand-mark">◔</span><b>TT27</b></div>
        <LanguageToggle language={language} onChange={onLanguage} />
      </header>
      <section className="verify-wrap">
        <button className="text-button" onClick={onBack}>← {copy.back}</button>
        <p className="eyebrow">{language === 'my' ? 'အဆင့် ၂ / ၂' : 'STEP 2 OF 2'}</p>
        <h1>{copy.verify}</h1>
        <p>{copy.verifyBody}</p>
        <div className="result-grid">
          <ResultCard icon="☾" label={copy.moon} name={nameOf(natal.moonIdx, language)} pada={natal.moonPada} language={language} />
          <ResultCard icon="⌁" label={copy.lagna} name={nameOf(natal.lagnaIdx, language)} pada={natal.lagnaPada} language={language} />
        </div>
        <div className={`ravi-note ${natalRavi.active ? 'active' : ''}`}>
          <span>☀</span>
          <div><b>{natalRavi.active ? copy.ravi : copy.raviInactive}</b>
            <p>{language === 'my'
              ? `ဇနမစန်းသည် နေစီးနက္ခတ်မှ ${myDigits(natalRavi.count)} လုံးမြောက် ဖြစ်ပါသည်။`
              : `Your birth Moon is the ${natalRavi.count}${ordinal(natalRavi.count)} nakshatra from your birth Sun.`}</p>
          </div>
        </div>
        <button className="primary-button wide" onClick={onSave}>{copy.save}<span>→</span></button>
      </section>
    </div>
  )
}

function ResultCard({ icon, label, name, pada, language }: {
  icon: string; label: string; name: string; pada: number; language: Language
}) {
  return <article className="result-card">
    <span className="result-icon">{icon}</span>
    <small>{label}</small><h2>{name}</h2>
    <p>{ui[language].pada} - {language === 'my' ? myDigits(pada) : pada}</p>
  </article>
}

function Today({ profile, language }: { profile: Profile; language: Language }) {
  const copy = ui[language]
  const city = profile.location ?? CITIES[profile.cityIndex]
  const [moment, setMoment] = useState(() => new Date())
  const [showMomentPicker, setShowMomentPicker] = useState(false)
  const [draftMoment, setDraftMoment] = useState(() => toLocalDateTimeValue(new Date()))
  const [showDetails, setShowDetails] = useState(false)
  const transit = useMemo(() => calculateTransit(moment, city.lat, city.lon), [moment, city])
  const moonPadaEnd = useMemo(() => findMoonPadaEnd(moment), [moment])
  const row = useMemo(
    () => scoreNakshatra(transit.moonIdx, profile.natal.moonIdx, profile.natal.lagnaIdx),
    [transit.moonIdx, profile],
  )
  const lagnaTara = scoreNakshatra(transit.lagnaIdx, profile.natal.moonIdx, profile.natal.lagnaIdx).lagnaTara
  const band = scoreBand(row.score)
  const status = verdict(row)
  const use = bestUse(row)
  const ravi = raviYoga(transit.sunIdx, transit.moonIdx)
  const pada = padaClass(transit.moonIdx, transit.moonPada)
  const directions = directionsFor(transit.moonIdx)
  const moonCopy = TARA_COPY[row.moonTara.name]
  const lagnaCopy = TARA_COPY[lagnaTara.name]
  const positionCopy = POSITION_COPY[row.moonTara.count]
  const langValue = <T,>(en: T, my: T) => language === 'my' ? my : en
  const score = language === 'my' ? myDigits(`${row.score > 0 ? '+' : ''}${row.score}`) : `${row.score > 0 ? '+' : ''}${row.score}`
  const moonName = nameOf(transit.moonIdx, language)
  const lagnaName = nameOf(transit.lagnaIdx, language)
  const negativeTaras = ['Vipat', 'Pratyak', 'Naidhana']
  const moonFriction = negativeTaras.includes(row.moonTara.name)
    || ['Naidhana', 'Sanghatika', 'Vainashika I', 'Vainashika II', 'Vinashaka / Secondary Manasa'].includes(row.special?.name ?? '')
  const lagnaFriction = negativeTaras.includes(lagnaTara.name)
  const sameTara = row.moonTara.name === lagnaTara.name
  const supportiveTaras = [
    ...(!moonFriction ? [{ tara: row.moonTara, copy: moonCopy }] : []),
    ...(!sameTara && !lagnaFriction ? [{ tara: lagnaTara, copy: lagnaCopy }] : []),
  ]
  const obstacleTaras = [
    ...(moonFriction ? [{ tara: row.moonTara, copy: moonCopy }] : []),
    ...(!sameTara && lagnaFriction ? [{ tara: lagnaTara, copy: lagnaCopy }] : []),
  ]
  const todayVerdict = language === 'my'
    ? row.score >= 9
      ? 'ရရှိသော ရမှတ်များအရ ယခုအချိန်သည် သင့်အတွက် အထူးကောင်းမွန်သော အချိန်ဖြစ်သဖြင့် အရေးကြီးသော အစီအစဉ်များကို ယုံကြည်စိတ်ချစွာ ဆောင်ရွက်နိုင်ပါသည်။'
      : row.score >= 6
        ? 'ရရှိသော ရမှတ်များအရ ယခုအချိန်သည် သင့်အတွက် ကောင်းမွန်သော အချိန်ဖြစ်ပြီး အဘက်ဘက်မှ အထောက်အကူရရှိပါမည်။'
        : row.score >= 3
          ? 'ရရှိသော ရမှတ်များအရ ယခုအချိန်သည် တိကျသော ရည်ရွယ်ချက်ဖြင့် အသုံးပြုနိုင်သော အချိန်ဖြစ်ပါသည်။'
          : 'ရရှိသော ရမှတ်များအရ ယခုအချိန်တွင် အသုံးပြုမှုကို ကန့်သတ်ထားပြီး သာမန်လုပ်ငန်းများ၊ ပြုပြင်ခြင်းနှင့် အဆုံးသတ်ခြင်းများကိုသာ ဦးစားပေးသင့်ပါသည်။'
    : row.score >= 9
      ? 'Based on the score, this is an excellent time for proceeding confidently with important plans.'
      : row.score >= 6
        ? 'Based on the score, this is a supportive time with favorable assistance from several directions.'
        : row.score >= 3
          ? 'Based on the score, this time can be used with a clear and specific purpose.'
          : 'Based on the score, keep this time limited to routine work, repair, and closure.'

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">{formatDate(moment, language)} · {formatTime(moment, language)}</p>
          <h1>{copy.greeting}{profile.name !== 'You' ? `, ${profile.name}` : ''}</h1>
        </div>
        <div className="moment-actions">
          <button
            className="soft-button"
            onClick={() => {
              const now = new Date()
              setMoment(now)
              setDraftMoment(toLocalDateTimeValue(now))
              setShowMomentPicker(false)
            }}
          >↻ {copy.refresh}</button>
          <button
            className="soft-button"
            onClick={() => {
              setDraftMoment(toLocalDateTimeValue(moment))
              setShowMomentPicker((visible) => !visible)
            }}
          >⌕ {copy.custom}</button>
        </div>
      </section>
      {showMomentPicker && <form
        className="moment-picker"
        onSubmit={(event) => {
          event.preventDefault()
          const selectedMoment = String(new FormData(event.currentTarget).get('moment') ?? draftMoment)
          if (!selectedMoment) return
          setMoment(new Date(selectedMoment))
          setDraftMoment(selectedMoment)
          setShowMomentPicker(false)
        }}
      >
        <label>
          <span>{copy.selectedMoment}</span>
          <input
            aria-label={copy.selectedMoment}
            type="datetime-local"
            name="moment"
            value={draftMoment}
            onChange={(event) => setDraftMoment(event.target.value)}
          />
        </label>
        <div>
          <button type="button" className="text-button" onClick={() => setShowMomentPicker(false)}>{copy.cancel}</button>
          <button type="submit" className="primary-button">{copy.applyTime}<span>→</span></button>
        </div>
      </form>}

      <section className={`hero-card ${band}`}>
        <div className="hero-top">
          <span className="status-pill">{langValue(status.en, status.my)}</span>
          <div className="score-ring"><small>{copy.score}</small><b>{score}</b></div>
        </div>
        <h2>{langValue(use.en, use.my)}</h2>
        <div className="transit-line">
          <span>
            <small>{copy.moonTransit}</small>
            <b>{nameOf(transit.moonIdx, language)}</b>
            <em>{copy.pada} - {language === 'my' ? myDigits(transit.moonPada) : transit.moonPada}{pada ? ` · ${langValue(pada.en, pada.my)}` : ''}</em>
            <em>{copy.padaEnds} - {formatTime(moonPadaEnd, language)}</em>
          </span>
          <span>
            <small>{copy.lagnaTransit}</small>
            <b>{nameOf(transit.lagnaIdx, language)}</b>
            <em>{langValue(lagnaTara.name, lagnaTara.my)}</em>
            <em>{copy.pada} - {language === 'my' ? myDigits(transit.lagnaPada) : transit.lagnaPada}</em>
          </span>
        </div>
        <div className="hero-tags">
          <span className={ravi.active ? 'active' : ''}>☀ {ravi.active ? copy.ravi : copy.raviInactive}</span>
          {row.vedha.length > 0 && <span className="warning">⚠ {copy.vedha} · {row.vedha.join(' + ')}</span>}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">{copy.overview}</p><h2>{copy.position}</h2></div>
          <button className="text-button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? copy.hide : copy.details} {showDetails ? '↑' : '↓'}</button>
        </div>
        <div className="position-card">
          <span className="position-number">{language === 'my' ? myDigits(row.moonTara.count) : row.moonTara.count}</span>
          <div>
            <h3>{language === 'my'
              ? `${nameOf(transit.moonIdx, language)} သည် သင်ရဲ့ ဇနမ စန်းနက္ခတ်မှ ${myDigits(row.moonTara.count)} လုံးမြောက် ဖြစ်ပါသည်။`
              : `${nameOf(transit.moonIdx, language)} is the ${row.moonTara.count}${ordinal(row.moonTara.count)} position from your natal Moon.`}</h3>
            <p>{row.special ? langValue(row.special.use, row.special.useMy) : langValue(moonCopy.use, moonCopy.useMy)}</p>
          </div>
        </div>
      </section>

      {showDetails && <section className="detail-grid">
        <div className="today-verdict"><p>{todayVerdict}</p></div>
        <div className="today-position">
          <p><b>{language === 'my'
            ? `ယခုအချိန်တွင် စန်းသည် ${moonName} နက္ခတ်၌ ရောက်ရှိနေပါသည်`
            : `The Moon is now in ${moonName}`}</b></p>
          <p>{language === 'my'
            ? `မိမိ၏ ဇနမစန်းနက္ခတ်မှ စတင်ရေတွက်လျှင် ${moonName} သည် နက္ခတ် ၂၇ လုံးအနက် ${myDigits(row.moonTara.count)} လုံးမြောက်နေရာတွင် ကျရောက်ပါသည်။`
            : `Counted from your natal Moon nakshatra, ${moonName} is the ${row.moonTara.count}${ordinal(row.moonTara.count)} position in the cycle of 27 nakshatras.`}</p>
          <h3>{language === 'my'
            ? `${myDigits(row.moonTara.count)} လုံးမြောက်နေရာ၏ အဓိပ္ပာယ်`
            : `What the ${row.moonTara.count}${ordinal(row.moonTara.count)} position means`}</h3>
          <p>{langValue(positionCopy.meaning, positionCopy.meaningMy)}</p>
          {row.special && <p>{langValue(row.special.use, row.special.useMy)}</p>}
          <h3>{language === 'my' ? 'ဤနေရာ၏ ကောင်းကျိုးကို အားဖြည့်နည်း' : 'How to strengthen this position'}</h3>
          <p>{language === 'my'
            ? `${moonName} သည် ယခု မိမိ၏ ${myDigits(row.moonTara.count)} လုံးမြောက်နေရာအဖြစ် ကျရောက်နေသောကြောင့် ${moonName} နက္ခတ်နှင့် သက်ဆိုင်သော ကုသိုလ်ပြုမှု၊ ကျင့်စဉ်နှင့် ယတြာများကို ပြုလုပ်ခြင်းဖြင့် ဤနေရာ၏ ကောင်းသောအရည်အသွေးများကို ပိုမိုအားကောင်းစေနိုင်ပါသည်။`
            : `Because ${moonName} currently carries your ${row.moonTara.count}${ordinal(row.moonTara.count)}-position influence, practices and remedies associated with ${moonName} can help cultivate the positive qualities of this position.`}</p>
        </div>
        <div className={`today-tara ${moonFriction ? 'friction' : ''}`}>
          <h3>{language === 'my'
            ? `${moonFriction ? 'အဓိက သတိပြုရန်' : 'အခွင့်အလမ်း'} — စန်းစီးနက္ခတ် ${moonName}`
            : `${moonFriction ? 'Primary challenge' : 'Opportunity'} — Transit Moon in ${moonName}`}</h3>
          <p>{language === 'my'
            ? `ယခု စန်းစီးနက္ခတ် ${moonName} သည် မိမိ၏ ${row.moonTara.my}တာရာကို လှုံ့ဆော်နေပါသည်။ ${moonCopy.useMy}`
            : `The transit Moon in ${moonName} activates your ${row.moonTara.name} Tara. ${moonCopy.use}`}</p>
          <p>{langValue(moonCopy.nature, moonCopy.natureMy)}</p>
          <p className="tara-feeling">{langValue(moonCopy.feeling, moonCopy.feelingMy)}</p>
        </div>
        <div className={`today-tara ${lagnaFriction ? 'friction' : ''}`}>
          <h3>{language === 'my'
            ? `${lagnaFriction ? 'သတိပြုရန်' : 'အထောက်အပံ့'} — လဂ်စီးနက္ခတ် ${lagnaName}`
            : `${lagnaFriction ? 'The catch' : 'Support'} — Transit Lagna in ${lagnaName}`}</h3>
          <p>{language === 'my'
            ? `ယခု လဂ်စီးနက္ခတ် ${lagnaName} သည် မိမိ၏ ${lagnaTara.my}တာရာကို လှုံ့ဆော်နေပါသည်။ ${lagnaCopy.useMy}`
            : `The transit Lagna in ${lagnaName} activates your ${lagnaTara.name} Tara. ${lagnaCopy.use}`}</p>
          <p>{langValue(lagnaCopy.nature, lagnaCopy.natureMy)}</p>
          <p className="tara-feeling">{langValue(lagnaCopy.feeling, lagnaCopy.feelingMy)}</p>
        </div>
        <div className="today-action">
          <h3>{copy.action}</h3>
          {supportiveTaras.length > 0 && <div>
            <b>{language === 'my'
              ? `${supportiveTaras.map(({ tara }) => `${tara.my}တာရာ`).join(' နှင့် ')}၏ ကောင်းကျိုးအင်အားကို မြှင့်တင်ရန်:`
              : `To strengthen the supportive influence of ${supportiveTaras.map(({ tara }) => `${tara.name} Tara`).join(' and ')}:`}</b>
            {supportiveTaras.map(({ tara, copy: taraCopy }) =>
              <p key={`support-${tara.name}`}>{langValue(taraCopy.remedy, taraCopy.remedyMy)}</p>)}
          </div>}
          {obstacleTaras.length > 0 && <div>
            <b>{language === 'my'
              ? `${obstacleTaras.map(({ tara }) => `${tara.my}တာရာ`).join(' နှင့် ')}၏ အတားအဆီးများ လျော့ပါးစေရန်:`
              : `To ease obstacles from ${obstacleTaras.map(({ tara }) => `${tara.name} Tara`).join(' and ')}:`}</b>
            {obstacleTaras.map(({ tara, copy: taraCopy }) =>
              <p key={`obstacle-${tara.name}`}>{langValue(taraCopy.remedy, taraCopy.remedyMy)}</p>)}
          </div>}
        </div>
      </section>}

      <section className="direction-card">
        <div className="compass"><span>N</span><b>↖</b></div>
        <div><p className="eyebrow">{copy.direction}</p>
          <h2>{langValue(directions.self[0], directions.self[1])}</h2>
          <h2>{langValue(directions.other[0], directions.other[1])}</h2>
          <p>{copy.directionGuidance}</p>
        </div>
      </section>
    </div>
  )
}

function BestDays({ profile, language }: { profile: Profile; language: Language }) {
  const copy = ui[language]
  const rows = useMemo(() => allScores(profile.natal.moonIdx, profile.natal.lagnaIdx), [profile])
  const [open, setOpen] = useState<number | null>(null)
  return <div className="page">
    <section className="page-heading"><div><p className="eyebrow">27 NAKSHATRAS</p><h1>{copy.bestTitle}</h1><p>{copy.bestBody}</p></div></section>
    <div className="filter-chips"><span>{language === 'my' ? 'ရမှတ်အလိုက်' : 'By score'}</span><span>{language === 'my' ? 'အကောင်းဆုံးမှ စ၍' : 'Best first'}</span></div>
    <section className="best-list">
      {rows.map((row) => <BestRow key={row.index} row={row} language={language} open={open === row.index} onOpen={() => setOpen(open === row.index ? null : row.index)} />)}
    </section>
  </div>
}

function bestDayVerdict(row: ScoreRow, language: Language) {
  const nakshatra = nameOf(row.index, language)
  const purpose = bestUse(row)
  if (language === 'my') {
    const quality = row.score >= 9
      ? 'အထူးကောင်းမွန်သောနေ့ဖြစ်သဖြင့် '
      : row.score >= 6
        ? 'ကောင်းမွန်သောနေ့ဖြစ်သဖြင့် '
        : row.score >= 3
          ? 'တိကျသော ရည်ရွယ်ချက်ဖြင့် အသုံးပြုနိုင်သောနေ့ဖြစ်သဖြင့် '
          : 'အသုံးပြုမှု ကန့်သတ်ထားသင့်သောနေ့ဖြစ်သဖြင့် '
    return `ရရှိသော ရမှတ်များအရ ${nakshatra} စန်းယှဉ်သောနေ့များသည် သင့်အတွက် ${quality}${purpose.my}`
  }
  const quality = row.score >= 9 ? 'excellent' : row.score >= 6 ? 'supportive' : row.score >= 3 ? 'usable with a clear purpose' : 'limited'
  return `Based on the score, days with transit Moon in ${nakshatra} are ${quality} for: ${purpose.en}`
}

function BestRow({ row, language, open, onOpen }: {
  row: ScoreRow; language: Language; open: boolean; onOpen: () => void
}) {
  const copy = ui[language]
  const use = bestUse(row)
  const moonTaraCopy = TARA_COPY[row.moonTara.name]
  const lagnaTaraCopy = TARA_COPY[row.lagnaTara.name]
  const positionCopy = POSITION_COPY[row.moonTara.count]
  const langValue = <T,>(en: T, my: T) => language === 'my' ? my : en
  const nakshatra = nameOf(row.index, language)
  const positionNarrative = language === 'my'
    ? `${nakshatra} သည် သင်ရဲ့ ဇနမ စန်းနက္ခတ်မှ ${positionCopy.titleMy} ဖြစ်ပါသည်။ စန်းနက္ခတ်မှ ${myDigits(row.moonTara.count)} လုံးမြောက် နက္ခတ်သည် ${positionCopy.meaningMy}${row.special ? ` ${row.special.useMy}` : ''}`
    : `${nakshatra} is the ${positionCopy.title} position from your natal Moon nakshatra. The ${row.moonTara.count}${ordinal(row.moonTara.count)} nakshatra from the natal Moon ${positionCopy.meaning.charAt(0).toLowerCase()}${positionCopy.meaning.slice(1)}${row.special ? ` ${row.special.use}` : ''}`
  const strengthening = language === 'my'
    ? `${nakshatra} နက္ခတ်နှင့် သက်ဆိုင်သော ကုသိုလ်ပြုမှု၊ ကျင့်စဉ်နှင့် ယတြာများကို ပြုလုပ်ခြင်းဖြင့် ဤနေရာ၏ ကောင်းသောအရည်အသွေးများကို ပိုမိုအားကောင်းစေနိုင်ပါသည်။`
    : `Practices and remedies associated with ${nakshatra} can help cultivate the positive qualities of this position.`
  return <article className={`best-row ${scoreBand(row.score)} ${open ? 'open' : ''}`}>
    <button className="best-summary" onClick={onOpen}>
      <span className="rank-name"><b>{nameOf(row.index, language)}</b><small>{langValue(lordOf(row.index)[1], lordOf(row.index)[2])}</small></span>
      <span className="best-use"><small>{copy.use}</small>{langValue(use.en, use.my)}</span>
      <span className="row-score">{language === 'my' ? myDigits(`${row.score > 0 ? '+' : ''}${row.score}`) : `${row.score > 0 ? '+' : ''}${row.score}`}</span>
      <span className="chevron">{open ? '↑' : '↓'}</span>
    </button>
    {open && <div className="best-detail">
      <div className="best-verdict"><p>{bestDayVerdict(row, language)}</p></div>
      <div className="position-narrative">
        <p>{positionNarrative}</p>
        <p><b>{language === 'my' ? 'ဤနေရာ၏ ကောင်းကျိုးကို အားဖြည့်နည်း:' : 'How to strengthen this position:'}</b> {strengthening}</p>
      </div>
      <div className="tara-detail">
        <small>{copy.tara}</small>
        <b>{langValue(`${row.moonTara.name} nature`, `${row.moonTara.my} သဘောသဘာဝ`)}</b>
        <p>{langValue(moonTaraCopy.nature, moonTaraCopy.natureMy)}</p>
        <p className="tara-feeling">{langValue(moonTaraCopy.feeling, moonTaraCopy.feelingMy)}</p>
        <div className="tara-remedy">
          <small>{langValue(`${row.moonTara.name} Tara remedy`, `${row.moonTara.my}တာရာ ယတြာ`)}</small>
          <p>{langValue(moonTaraCopy.remedy, moonTaraCopy.remedyMy)}</p>
        </div>
      </div>
      {row.lagnaTara.name !== row.moonTara.name && <div className="tara-detail">
        <small>{copy.lagnaTara}</small>
        <b>{langValue(`${row.lagnaTara.name} nature`, `${row.lagnaTara.my} သဘောသဘာဝ`)}</b>
        <p>{langValue(lagnaTaraCopy.nature, lagnaTaraCopy.natureMy)}</p>
        <p className="tara-feeling">{langValue(lagnaTaraCopy.feeling, lagnaTaraCopy.feelingMy)}</p>
        <div className="tara-remedy">
          <small>{langValue(`${row.lagnaTara.name} Tara remedy`, `${row.lagnaTara.my}တာရာ ယတြာ`)}</small>
          <p>{langValue(lagnaTaraCopy.remedy, lagnaTaraCopy.remedyMy)}</p>
        </div>
      </div>}
      {row.moonTara.name === 'Pratyak' && <div className="remedy-guidance">
        <small>{langValue('Overcoming an equal rival', 'ပြတ္တရတာရာ (လက်ရည်တူရန်သူ) ကို အောင်နိုင်ခြင်း')}</small>
        <p>{langValue(
          'Strategy: Strengthen your inner virtue and merit so the rival is no longer equal. Practice extreme patience, help people of different faiths, and donate salt as the Saturn remedy.',
          'ဗျူဟာ - မိမိ၏ သီလ၊ သမာဓိ၊ ကုသိုလ်အင်အားကို မြှင့်တင်ပါ။ မိမိအဆင့်မြင့်သွားပါက ရန်သူသည် လက်ရည်တူအဆင့် မဟုတ်တော့ပါ။ စိတ်ရှည်သည်းခံခြင်းကို ကျင့်ပြီး ဘာသာခြားများကို ကူညီပါ။ စနေဂြိုဟ် ယတြာအဖြစ် ဆားလှူဒါန်းပါ။',
        )}</p>
      </div>}
      {row.moonTara.count === 20 && <div className="remedy-guidance">
        <small>{langValue('Wealth and windfall luck — Udaya Nakshatra', 'ထီပေါက်ကိန်း / ငွေဝင်ကိန်း — ဥဒယနက္ခတ်')}</small>
        <p>{langValue(
          'Use bulk donations such as a whole bag or container, anonymous charity, and feeding animals in bulk. Make daily offerings associated with both your Janma and Udaya nakshatras, and maintain an upright daily spiritual practice.',
          'အစုလိုက်အပုံလိုက် လှူဒါန်းခြင်း (ဥပမာ-ဆန်တစ်အိတ်)၊ ပံ့သကူဒါနနှင့် တိရစ္ဆာန်များကို အစုလိုက်ကျွေးမွေးခြင်း ပြုလုပ်ပါ။ မိမိ၏ ဇနမနှင့် ဥဒယနက္ခတ် နှစ်ခုစလုံးနှင့် ဆက်စပ်သော ပစ္စည်းများကို နေ့စဉ်ကပ်လှူပြီး ဖြောင့်မတ်တည်ကြည်သော နေ့စဉ်ကျင့်စဉ်ကို ထိန်းသိမ်းပါ။',
        )}</p>
      </div>}
    </div>}
  </article>
}

function ProfileView({ profile, language, onLanguage, onReset }: {
  profile: Profile; language: Language; onLanguage: (language: Language) => void; onReset: () => void
}) {
  const copy = ui[language]
  const city = profile.location ?? CITIES[profile.cityIndex]
  const cityName = 'my' in city && language === 'my' ? city.my : city.name
  const natalRavi = raviYoga(profile.natal.sunIdx, profile.natal.moonIdx)
  return <div className="page profile-page">
    <section className="page-heading"><div><p className="eyebrow">{copy.profile}</p><h1>{profile.name}</h1><p>{cityName}</p></div></section>
    <section className="settings-card">
      <h2>{copy.preferences}</h2>
      <div className="setting-row"><span>文</span><div><b>{copy.language}</b><small>{language === 'my' ? 'မြန်မာ' : 'English'}</small></div><LanguageToggle language={language} onChange={onLanguage} /></div>
    </section>
    <section className="settings-card">
      <h2>{copy.birthProfile}</h2>
      <div className="profile-natal">
        <ResultCard icon="☾" label={copy.moon} name={nameOf(profile.natal.moonIdx, language)} pada={profile.natal.moonPada} language={language} />
        <ResultCard icon="⌁" label={copy.lagna} name={nameOf(profile.natal.lagnaIdx, language)} pada={profile.natal.lagnaPada} language={language} />
      </div>
      {natalRavi.active && <div className="ravi-note active profile-ravi">
        <span>☀</span>
        <div>
          <b>{copy.natalRavi}</b>
          <p>{language === 'my'
            ? `မိမိ၏ မွေးဖွားချိန် ဇနမစန်း ${nameOf(profile.natal.moonIdx, language)} နက္ခတ်သည် မွေးဖွားချိန် နေစီးနက္ခတ် ${nameOf(profile.natal.sunIdx, language)} နက္ခတ်မှ စတင်ရေတွက်လျှင် ${myDigits(natalRavi.count)} လုံးမြောက်နက္ခတ် ဖြစ်ပါသည်။`
            : `The birth Moon in ${nameOf(profile.natal.moonIdx, language)} is the ${natalRavi.count}${ordinal(natalRavi.count)} nakshatra counted from the birth Sun in ${nameOf(profile.natal.sunIdx, language)}.`}</p>
          <p>{copy.natalRaviMeaning}</p>
        </div>
      </div>}
      <p className="profile-meta">{profile.date} · {profile.time} · {cityName}</p>
    </section>
    <button className="danger-button" onClick={onReset}>{copy.reset}</button>
  </div>
}

const ordinal = (value: number) => {
  const tens = value % 100
  if (tens >= 11 && tens <= 13) return 'th'
  return value % 10 === 1 ? 'st' : value % 10 === 2 ? 'nd' : value % 10 === 3 ? 'rd' : 'th'
}

const formatDate = (date: Date, language: Language) => {
  if (language === 'my') {
    const weekdays = ['တနင်္ဂနွေနေ့', 'တနင်္လာနေ့', 'အင်္ဂါနေ့', 'ဗုဒ္ဓဟူးနေ့', 'ကြာသပတေးနေ့', 'သောကြာနေ့', 'စနေနေ့']
    const months = ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ']
    return `${weekdays[date.getDay()]}၊ ${months[date.getMonth()]}လ ${myDigits(date.getDate())} ရက်`
  }
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).format(date)
}

const formatTime = (date: Date, language: Language) => {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
  if (language === 'en') return time
  const match = time.match(/^(.+)\s(AM|PM)$/)
  if (!match) return myDigits(time)
  return `${match[2] === 'AM' ? 'နံနက်' : 'ညနေ'} ${myDigits(match[1])}`
}

const toLocalDateTimeValue = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

const worldCityLabel = (city: WorldCity) =>
  [city.name, city.admin1, city.country]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(', ')

const timeZoneOffsetHours = (date: string, time: string, timeZone: string) => {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute)
  let utcGuess = localAsUtc
  let offset = 0
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  })
  for (let index = 0; index < 3; index += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(utcGuess))
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, Number(part.value)]),
    )
    const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
    offset = (zonedAsUtc - utcGuess) / 3600000
    utcGuess = localAsUtc - offset * 3600000
  }
  return offset
}

export default App
