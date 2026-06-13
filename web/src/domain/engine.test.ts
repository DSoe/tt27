import { describe, expect, it } from 'vitest'
import {
  calculateBirth, calculateTransit, findMoonPadaEnd, jewelryTiming, padaClass,
  prosperityTiming, raviYoga, scoreNakshatra, taraFrom,
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

  it('preserves the current pada classification rules', () => {
    expect(padaClass(23, 3)).toEqual({ en: 'Wara Uttama Pada', my: 'ဝရဥတ္တမပါဒ' })
    expect(padaClass(23, 1)).toBeNull()
  })

  it('calculates a valid natal chart', () => {
    const result = calculateBirth('1990-03-12', '08:24', 16.8409, 96.1735, 6.5)
    expect(result.moonIdx).toBeGreaterThanOrEqual(0)
    expect(result.moonIdx).toBeLessThan(27)
    expect(result.lagnaPada).toBeGreaterThanOrEqual(1)
    expect(result.lagnaPada).toBeLessThanOrEqual(4)
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
