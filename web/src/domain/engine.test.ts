import { describe, expect, it } from 'vitest'
import {
  calculateBirth, calculateTransit, findMoonPadaEnd, jewelryTiming, padaClass,
  prosperityTiming, raviYoga, scoreNakshatra, taraFrom, isVenusWealthStar,
} from './engine'

describe('TT27 engine', () => {
  it('keeps Navatara counting inclusive', () => {
    expect(taraFrom(0, 0)).toMatchObject({ count: 1, name: 'Janma', score: 1 })
    expect(taraFrom(0, 8)).toMatchObject({ count: 9, name: 'Parama Mitra', score: 5 })
    expect(taraFrom(22, 21).count).toBe(27)
  })

  it('applies the position special bonus', () => {
    const row = scoreNakshatra(22, 22, 0)
    expect(row.special?.name).toBe('Janma')
    expect(row.rawScore).toBe(row.moonTara.score + row.lagnaTara.score + 1)
  })

  it('detects Ravi Yoga counts', () => {
    expect(raviYoga(0, 3)).toEqual({ active: true, count: 4 })
    expect(raviYoga(0, 4)).toEqual({ active: false, count: 5 })
  })

  it('detects jewelry timing counted inclusively from the transit Sun', () => {
    expect(jewelryTiming(0, 8)).toEqual({ active: true, count: 9 })
    expect(jewelryTiming(26, 21)).toEqual({ active: true, count: 23 })
    expect(jewelryTiming(0, 11)).toEqual({ active: false, count: 12 })
  })

  it('detects the seven prosperity Moon nakshatras', () => {
    expect(prosperityTiming(2).active).toBe(true)
    expect(prosperityTiming(19).active).toBe(true)
    expect(prosperityTiming(24).active).toBe(true)
    expect(prosperityTiming(0).active).toBe(false)
  })

  it('adds a restrained Venus Wealth bonus without overriding danger layers', () => {
    expect(isVenusWealthStar(21)).toBe(true)
    expect(isVenusWealthStar(20)).toBe(false)

    const normal = scoreNakshatra(0, 1, 1)
    expect(normal.venusWealth).toMatchObject({ active: true, bonus: 1, blocked: false })
    expect(normal.score).toBe(normal.rawScore + 1)

    const friday = scoreNakshatra(0, 1, 1, { isFriday: true })
    expect(friday.venusWealth.bonus).toBe(2)
    expect(friday.score).toBe(friday.rawScore + 2)

    const vedha = scoreNakshatra(23, 12, 0, { isFriday: true })
    expect(vedha.venusWealth).toMatchObject({ active: true, bonus: 0, blocked: true })

    const destructive = scoreNakshatra(22, 0, 0, { isFriday: true })
    expect(destructive.venusWealth).toMatchObject({ active: true, bonus: 0, remedyOnly: true })

    const transitOnly = scoreNakshatra(3, 3, 3, { transitVenusIdx: 23 })
    expect(transitOnly.venusWealth).toMatchObject({
      active: true, bonus: 2, moonActive: false, transitVenusActive: true,
    })

    const natalOnly = scoreNakshatra(3, 3, 3, { natalVenusIdx: 21 })
    expect(natalOnly.venusWealth).toMatchObject({
      active: true, bonus: 0, moonActive: false, natalVenusActive: true,
    })

    const combined = scoreNakshatra(0, 1, 1, {
      isFriday: true,
      transitVenusIdx: 23,
      natalVenusIdx: 21,
    })
    expect(combined.venusWealth).toMatchObject({
      bonus: 3, moonActive: true, transitVenusActive: true, natalVenusActive: true,
    })
  })

  it('preserves the current pada classification rules', () => {
    expect(padaClass(23, 3)).toEqual({ en: 'Wara Uttama Pada', my: 'ဝရဥတ္တမပါဒ' })
    expect(padaClass(23, 1)).toBeNull()
  })

  it('calculates a valid natal chart', () => {
    const result = calculateBirth('1990-03-12', '08:24', 16.8409, 96.1735, 6.5)
    expect(result.venusIdx).toBe(21)
    expect(result.venusPada).toBe(1)
    expect(result.moonIdx).toBeGreaterThanOrEqual(0)
    expect(result.moonIdx).toBeLessThan(27)
    expect(result.lagnaPada).toBeGreaterThanOrEqual(1)
    expect(result.lagnaPada).toBeLessThanOrEqual(4)
  })

  it('calculates transit Venus in the sidereal nakshatra cycle', () => {
    const result = calculateTransit(new Date('2026-06-13T20:00:00Z'), 16.8409, 96.1735)
    expect(result.venusIdx).toBe(7)
    expect(result.venusPada).toBe(1)
  })

  it('finds the end of the current Moon pada', () => {
    const moment = new Date('2026-06-11T19:00:00Z')
    const ending = findMoonPadaEnd(moment)
    const before = calculateTransit(new Date(ending.getTime() - 1000), 16.8409, 96.1735)
    const after = calculateTransit(new Date(ending.getTime() + 1000), 16.8409, 96.1735)
    expect(ending.getTime()).toBeGreaterThan(moment.getTime())
    expect(
      before.moonIdx !== after.moonIdx || before.moonPada !== after.moonPada,
    ).toBe(true)
  })
})
