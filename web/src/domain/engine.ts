import * as Astronomy from 'astronomy-engine'
import {
  DIRECTIONS, LORDS, NAKSHATRAS, SPECIALS, TARAS, TARA_COPY, VENUS_WEALTH_STAR_META,
  type TaraName,
} from './data'

const D2R = Math.PI / 180
const R2D = 180 / Math.PI
const NAK_WIDTH = 40 / 3

const norm360 = (value: number) => ((value % 360) + 360) % 360

export function jdUT(year: number, month: number, day: number, hourUT: number) {
  if (month <= 2) {
    year -= 1
    month += 12
  }
  const a = Math.floor(year / 100)
  const b = 2 - a + Math.floor(a / 4)
  return Math.floor(365.25 * (year + 4716))
    + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5 + hourUT / 24
}

function sunTrop(jd: number) {
  const t = (jd - 2451545) / 36525
  const l0 = norm360(280.46646 + 36000.76983 * t + 0.0003032 * t * t)
  const m = norm360(357.52911 + 35999.05029 * t - 0.0001537 * t * t)
  const c = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * D2R)
    + (0.019993 - 0.000101 * t) * Math.sin(2 * m * D2R)
    + 0.000289 * Math.sin(3 * m * D2R)
  return norm360(l0 + c)
}

const MOON_TERMS = [
  [0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],
  [0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],
  [0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],
  [0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],
  [2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],
  [4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],
  [1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,2069],[2,-2,-1,0,2048],
  [2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],
  [2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700],[2,1,-2,0,691],
  [2,-1,0,-2,596],[4,0,1,0,549],[0,0,4,0,537],[4,-1,0,0,520],[1,0,-2,0,-487],
  [2,1,0,-2,-399],[0,0,2,-2,-381],[1,1,1,0,351],[3,0,-2,0,-340],[4,0,-3,0,330],
  [2,-1,2,0,327],[0,2,1,0,-323],[1,1,-1,0,299],[2,0,3,0,294],
] as const

function moonTrop(jd: number) {
  const t = (jd - 2451545) / 36525
  const lp = norm360(218.3164477 + 481267.88123421*t - 0.0015786*t*t + t**3/538841 - t**4/65194000)
  const d = 297.8501921 + 445267.1114034*t - 0.0018819*t*t + t**3/545868 - t**4/113065000
  const m = 357.5291092 + 35999.0502909*t - 0.0001536*t*t + t**3/24490000
  const mp = 134.9633964 + 477198.8675055*t + 0.0087414*t*t + t**3/69699 - t**4/14712000
  const f = 93.272095 + 483202.0175233*t - 0.0036539*t*t - t**3/3526000 + t**4/863310000
  const e = 1 - 0.002516*t - 0.0000074*t*t
  let sum = 0
  for (const [a,b,c,q,coefficient] of MOON_TERMS) {
    const ef = Math.abs(b) === 1 ? e : Math.abs(b) === 2 ? e*e : 1
    sum += coefficient * ef * Math.sin((a*d + b*m + c*mp + q*f) * D2R)
  }
  return norm360(lp + sum / 1e6)
}

function venusTrop(date: Date) {
  const vector = Astronomy.GeoVector(Astronomy.Body.Venus, date, true)
  return Astronomy.Ecliptic(vector).elon
}

const lahiri = (jd: number) => 23.853 + ((jd - 2451545) / 365.25) * (50.2388475 / 3600)

function ascTrop(jd: number, lat: number, lon: number) {
  const t = (jd - 2451545) / 36525
  const g = norm360(280.46061837 + 360.98564736629*(jd-2451545) + 0.000387933*t*t - t**3/38710000)
  const ramc = norm360(g + lon) * D2R
  const eps = (23.4392911 - 0.0130042*t - 1.64e-7*t*t + 5.04e-7*t**3) * D2R
  const phi = lat * D2R
  return norm360(Math.atan2(Math.cos(ramc), -(Math.sin(ramc)*Math.cos(eps) + Math.tan(phi)*Math.sin(eps))) * R2D)
}

const nakIndex = (longitude: number) => Math.floor(norm360(longitude) / NAK_WIDTH)
export const padaOf = (longitude: number) => Math.floor((norm360(longitude) % NAK_WIDTH) / (NAK_WIDTH / 4)) + 1
export const lordOf = (index: number) => LORDS[index % 9]

export interface AstroPosition {
  sunIdx: number
  venusIdx: number
  venusPada: number
  moonIdx: number
  moonPada: number
  lagnaIdx: number
  lagnaPada: number
}

export function calculateBirth(
  date: string, time: string, lat: number, lon: number, offset: number,
): AstroPosition {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  const jd = jdUT(year, month, day, hour + minute / 60 - offset)
  const ayan = lahiri(jd)
  const sun = norm360(sunTrop(jd) - ayan)
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute) - offset * 60 * 60 * 1000)
  const venus = norm360(venusTrop(utcDate) - ayan)
  const moon = norm360(moonTrop(jd) - ayan)
  const lagna = norm360(ascTrop(jd, lat, lon) - ayan)
  return {
    sunIdx: nakIndex(sun), venusIdx: nakIndex(venus), venusPada: padaOf(venus),
    moonIdx: nakIndex(moon), moonPada: padaOf(moon),
    lagnaIdx: nakIndex(lagna), lagnaPada: padaOf(lagna),
  }
}

export function calculateTransit(date: Date, lat: number, lon: number): AstroPosition {
  const jd = jdUT(
    date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(),
    date.getUTCHours() + date.getUTCMinutes()/60 + date.getUTCSeconds()/3600,
  )
  const ayan = lahiri(jd)
  const sun = norm360(sunTrop(jd) - ayan)
  const venus = norm360(venusTrop(date) - ayan)
  const moon = norm360(moonTrop(jd) - ayan)
  const lagna = norm360(ascTrop(jd, lat, lon) - ayan)
  return {
    sunIdx: nakIndex(sun), venusIdx: nakIndex(venus), venusPada: padaOf(venus),
    moonIdx: nakIndex(moon), moonPada: padaOf(moon),
    lagnaIdx: nakIndex(lagna), lagnaPada: padaOf(lagna),
  }
}

export function findMoonPadaEnd(date: Date) {
  const startJd = jdUT(
    date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(),
    date.getUTCHours() + date.getUTCMinutes()/60 + date.getUTCSeconds()/3600,
  )
  const positionAt = (jd: number) => {
    const siderealMoon = norm360(moonTrop(jd) - lahiri(jd))
    return { nakshatra: nakIndex(siderealMoon), pada: padaOf(siderealMoon) }
  }
  const start = positionAt(startJd)
  let before = startJd
  let after = startJd

  for (let step = 0; step < 500; step += 1) {
    after += 2 / (24 * 60)
    const position = positionAt(after)
    if (position.nakshatra !== start.nakshatra || position.pada !== start.pada) break
    before = after
  }

  for (let step = 0; step < 16; step += 1) {
    const middle = (before + after) / 2
    const position = positionAt(middle)
    if (position.nakshatra === start.nakshatra && position.pada === start.pada) {
      before = middle
    } else {
      after = middle
    }
  }

  return new Date((after - 2440587.5) * 86400000)
}

export function taraFrom(startIdx: number, targetIdx: number) {
  const count = ((targetIdx - startIdx + 27) % 27) + 1
  const tara = TARAS[(count - 1) % 9]
  return { count, name: tara.name as TaraName, my: tara.my, score: tara.score }
}

const VEDHA_PAIRS = [
  ['ashwini','jyeshtha','primary'],['bharani','anuradha','primary'],['krittika','vishakha','primary'],
  ['rohini','swati','primary'],['ardra','shravana','primary'],['punarvasu','uttara_ashadha','primary'],
  ['pushya','purva_ashadha','primary'],['ashlesha','mula','primary'],['magha','revati','primary'],
  ['purva_phalguni','uttara_bhadrapada','primary'],['uttara_phalguni','purva_bhadrapada','primary'],
  ['hasta','shatabhisha','primary'],['mrigashira','chitra','primary'],['mrigashira','dhanishta','primary'],
  ['mrigashira','uttara_ashadha','additional'],['ardra','purva_ashadha','additional'],
  ['ashlesha','dhanishta','additional'],['magha','shravana','additional'],
] as const

const keyOf = (name: string) => name.toLowerCase().replaceAll(' ', '_')
function vedhaCategory(reference: string, target: string) {
  const ref = keyOf(reference)
  const day = keyOf(target)
  for (const [a,b,category] of VEDHA_PAIRS) {
    if ((a === ref && b === day) || (b === ref && a === day)) return category
  }
  return null
}

export interface ScoreRow {
  index: number
  moonTara: ReturnType<typeof taraFrom>
  lagnaTara: ReturnType<typeof taraFrom>
  special?: (typeof SPECIALS)[number]
  rawScore: number
  score: number
  vedha: string[]
  venusWealth: {
    active: boolean
    bonus: number
    blocked: boolean
    remedyOnly: boolean
    caution: boolean
    moonActive: boolean
    transitVenusActive: boolean
    natalVenusActive: boolean
    starIndex?: number
  }
}

export function isVenusWealthStar(index: number) {
  return index in VENUS_WEALTH_STAR_META
}

export function scoreNakshatra(
  index: number,
  natalMoon: number,
  natalLagna: number,
  options: { isFriday?: boolean; transitVenusIdx?: number; natalVenusIdx?: number } = {},
): ScoreRow {
  const moonTara = taraFrom(natalMoon, index)
  const lagnaTara = taraFrom(natalLagna, index)
  const special = SPECIALS[moonTara.count]
  const rawScore = moonTara.score + lagnaTara.score + (special?.bonus ?? 0)
  const moonVedha = vedhaCategory(NAKSHATRAS[natalMoon], NAKSHATRAS[index])
  const lagnaVedha = vedhaCategory(NAKSHATRAS[natalLagna], NAKSHATRAS[index])
  const vedha: string[] = []
  let penalty = 0
  if (moonVedha) {
    vedha.push('Moon')
    penalty += moonVedha === 'additional' ? -3 : -6
  }
  if (lagnaVedha) {
    vedha.push('Lagna')
    penalty += lagnaVedha === 'additional' ? -3 : -4
  }
  const computed = rawScore + penalty
  const moonActive = isVenusWealthStar(index)
  const transitVenusActive = Number.isFinite(options.transitVenusIdx)
    && isVenusWealthStar(options.transitVenusIdx as number)
  const natalVenusActive = Number.isFinite(options.natalVenusIdx)
    && isVenusWealthStar(options.natalVenusIdx as number)
  const active = moonActive || transitVenusActive || natalVenusActive
  const remedyOnly = moonTara.name === 'Naidhana'
    || ['Naidhana', 'Vainashika I', 'Vainashika II', 'Vinashaka / Secondary Manasa'].includes(special?.name ?? '')
  const caution = ['Vipat', 'Pratyak'].includes(moonTara.name)
  const blocked = vedha.length > 0
  let venusBonus = 0
  if (active && !blocked && !remedyOnly) {
    if (moonActive) venusBonus = 1
    if (moonActive && options.isFriday) venusBonus = 2
    if (transitVenusActive) venusBonus = Math.max(venusBonus, 2)
    if (moonActive && options.isFriday && transitVenusActive) venusBonus = 3
  }
  const starIndex = moonActive
    ? index
    : transitVenusActive
      ? options.transitVenusIdx
      : natalVenusActive
        ? options.natalVenusIdx
        : undefined
  return {
    index, moonTara, lagnaTara, special, rawScore,
    score: blocked ? Math.min(computed, 0) : computed + venusBonus,
    vedha,
    venusWealth: {
      active, bonus: venusBonus, blocked, remedyOnly, caution,
      moonActive, transitVenusActive, natalVenusActive, starIndex,
    },
  }
}

export const allScores = (moon: number, lagna: number) =>
  NAKSHATRAS.map((_, index) => scoreNakshatra(index, moon, lagna))
    .sort((a, b) => b.score - a.score || a.index - b.index)

export const scoreBand = (score: number) =>
  score >= 9 ? 'excellent' : score >= 6 ? 'good' : score >= 3 ? 'usable' : score >= 0 ? 'neutral' : 'avoid'

export function verdict(row: ScoreRow) {
  if (row.vedha.length) return { en: 'Avoid major starts', my: 'အရေးကြီးသော လုပ်ငန်းသစ်များ ရှောင်ကြဉ်ပါ' }
  if (row.score >= 9) return { en: 'Excellent — clean green-light', my: 'အထူးကောင်းမွန်သော အချိန်ဖြစ်ပါသည်' }
  if (row.score >= 6) return { en: 'Good — supportive', my: 'ကောင်းမွန်ပြီး အထောက်အကူရရှိမည့် အချိန်ဖြစ်ပါသည်' }
  if (row.score >= 3) return { en: 'Usable — with a clear purpose', my: 'တိကျသော ရည်ရွယ်ချက်ဖြင့် အသုံးပြုနိုင်ပါသည်' }
  return { en: 'Neutral — keep it routine', my: 'သာမန်လုပ်ငန်းများအတွက်သာ အသုံးပြုပါ' }
}

export function bestUse(row: ScoreRow) {
  if (row.vedha.length) return {
    en: 'Repair, correction, cutting, or closure only.',
    my: 'ပြုပြင်ခြင်း၊ အမှားပြင်ဆင်ခြင်း၊ ဖြတ်တောက်ခြင်းနှင့် အဆုံးသတ်ခြင်းများအတွက်သာ အသုံးပြုပါ။',
  }
  if (row.special) return { en: row.special.use, my: row.special.useMy }
  const copy = TARA_COPY[row.moonTara.name]
  return { en: copy.use, my: copy.useMy }
}

export function raviYoga(sunIdx: number, moonIdx: number) {
  const count = ((moonIdx - sunIdx + 27) % 27) + 1
  return { active: [4,6,9,10,13,20].includes(count), count }
}

const JEWELRY_COUNTS_FROM_SUN = [9,10,11,14,15,16,17,18,19,20,23,24,25,26]
const PROSPERITY_MOON_NAKSHATRAS = [2,7,8,9,10,19,24]

export function jewelryTiming(sunIdx: number, moonIdx: number) {
  const count = ((moonIdx - sunIdx + 27) % 27) + 1
  return { active: JEWELRY_COUNTS_FROM_SUN.includes(count), count }
}

export function prosperityTiming(moonIdx: number) {
  return { active: PROSPERITY_MOON_NAKSHATRAS.includes(moonIdx) }
}

export function padaClass(nakIdx: number, pada: number) {
  const cycle = Math.floor(nakIdx / 9)
  const offset = nakIdx % 9
  const active = [[1],[1],[1,2],[2],[2,3],[3],[3,4],[4],[4]][offset]
  if (!active.includes(pada)) return null
  const type = ((3 - cycle) % 3 + offset) % 3
  return type === 0
    ? { en: 'Wara Uttama Pada', my: 'ဝရဥတ္တမပါဒ' }
    : type === 1
      ? { en: 'Wealth Pada', my: 'သူဌေးပါဒ' }
      : { en: 'Virtuous Pada', my: 'သူတော်ကောင်းပါဒ' }
}

export const directionsFor = (moonIdx: number) => ({
  self: DIRECTIONS[moonIdx % 8],
  other: DIRECTIONS[(moonIdx + 6) % 8],
})
