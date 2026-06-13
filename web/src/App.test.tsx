import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('TT27 onboarding', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('starts with birth details instead of astrology selectors', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Start with your birth details.' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Moon Nakshatra')).not.toBeInTheDocument()
  })

  it('switches the setup to Myanmar', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'MY' }))
    expect(screen.getByRole('heading', { name: 'မွေးဖွားမှုအချက်အလက်ဖြင့် စတင်ပါ။' })).toBeInTheDocument()
  })

  it('accepts a Myanmar city name in birth place search', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'MY' }))
    fireEvent.change(screen.getByPlaceholderText('မြို့အမည်ကို မြန်မာ သို့မဟုတ် အင်္ဂလိပ်လို ရိုက်ပါ'), {
      target: { value: 'မိုးကုတ်' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'ရှာမည်' }))

    expect(screen.getByText('မိုးကုတ်ကို မွေးဖွားရာဒေသအဖြစ် ရွေးချယ်ထားပါသည်။')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'အမြန်ရွေးရန်' })).toHaveValue('2')
  })

  it('shows natal Ravi Yoga in the saved birth profile when present', () => {
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1990-03-12',
      time: '08:24',
      cityIndex: 0,
      natal: {
        sunIdx: 0,
        moonIdx: 3,
        moonPada: 1,
        lagnaIdx: 5,
        lagnaPada: 2,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }))
    expect(screen.getByText('Natal Ravi Yoga: Present')).toBeInTheDocument()
    expect(screen.getByText(/The birth Moon in Rohini is the 4th nakshatra/)).toBeInTheDocument()
    expect(screen.queryByText(/1990-03-12/)).not.toBeInTheDocument()
    expect(screen.queryByText(/08:24/)).not.toBeInTheDocument()
    expect(screen.queryByText('Yangon')).not.toBeInTheDocument()
  })

  it('migrates an older saved profile missing its birth Sun', () => {
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1977-01-24',
      time: '00:12',
      cityIndex: 0,
      natal: {
        moonIdx: 24,
        moonPada: 4,
        lagnaIdx: 1,
        lagnaPada: 1,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }))
    expect(screen.getByText('Natal Ravi Yoga: Present')).toBeInTheDocument()
    expect(screen.getByText(/The birth Moon in Purva Bhadrapada is the 4th nakshatra counted from the birth Sun in Shravana/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tt27.react.profile')!).natal.sunIdx).toBe(21)
  })

  it('applies a custom moment and Now resets it', () => {
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1990-03-12',
      time: '08:24',
      cityIndex: 0,
      natal: {
        sunIdx: 0,
        moonIdx: 3,
        moonPada: 1,
        lagnaIdx: 5,
        lagnaPada: 2,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '⌕ Choose time' }))
    fireEvent.change(screen.getByLabelText('Selected moment'), {
      target: { value: '2030-01-02T15:45' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Apply time →' }))
    expect(screen.getByText(/Wednesday, January 2 · 3:45 PM/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '↻ Now' }))
    expect(screen.queryByText(/Wednesday, January 2 · 3:45 PM/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Selected moment')).not.toBeInTheDocument()
  })

  it('shows both Moon and Lagna Tara remedies in Best Days', () => {
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1990-03-12',
      time: '08:24',
      cityIndex: 0,
      natal: {
        sunIdx: 0,
        moonIdx: 3,
        moonPada: 1,
        lagnaIdx: 5,
        lagnaPada: 2,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Best days' }))
    fireEvent.click(screen.getByRole('button', { name: /Ashwini/ }))

    expect(screen.getByText('Naidhana Tara remedy')).toBeInTheDocument()
    expect(screen.getByText('Pratyak Tara remedy')).toBeInTheDocument()
    expect(screen.getByText('Lagna Tara')).toBeInTheDocument()
    expect(screen.getByText(/represents an 'equal rival'/)).toBeInTheDocument()
    expect(screen.getByText(/Frustrated and prone to using force or anger/)).toBeInTheDocument()
    expect(screen.getByText(/Donate sesame, gold, or support education/)).toBeInTheDocument()
    expect(screen.getByText(/Donate sea salt/)).toBeInTheDocument()
  })

  it('uses the complete Burmese verdict and position narrative in Best Days', () => {
    localStorage.setItem('tt27.lang', 'my')
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1977-01-24',
      time: '00:12',
      cityIndex: 0,
      natal: {
        sunIdx: 21,
        moonIdx: 24,
        moonPada: 4,
        lagnaIdx: 14,
        lagnaPada: 1,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'အကောင်းဆုံးနေ့များ' }))
    fireEvent.click(screen.getByRole('button', { name: /ဓနသိဒ္ဓိ/ }))

    expect(screen.getByText(/ရရှိသော ရမှတ်များအရ ဓနသိဒ္ဓိ စန်းယှဉ်သောနေ့များသည်/)).toBeInTheDocument()
    expect(screen.getByText(/ဓနသိဒ္ဓိနက္ခတ်သည် သင်ရဲ့ ဇနမ စန်းနက္ခတ်မှ ၂၆ လုံးမြောက်/)).toBeInTheDocument()
    expect(screen.getByText(/ဤနေရာ၏ ကောင်းကျိုးကို အားဖြည့်နည်း/)).toBeInTheDocument()
    expect(screen.getByText('မိတ္တ သဘောသဘာဝ')).toBeInTheDocument()
    expect(screen.getByText('မိတ္တတာရာ ယတြာ')).toBeInTheDocument()
  })

  it('uses the complete Burmese narrative pattern in Today details', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-11T22:40:00Z'))
    localStorage.setItem('tt27.lang', 'my')
    localStorage.setItem('tt27.react.profile', JSON.stringify({
      name: 'Soe',
      date: '1977-01-24',
      time: '00:12',
      cityIndex: 0,
      natal: {
        sunIdx: 21,
        moonIdx: 24,
        moonPada: 4,
        lagnaIdx: 25,
        lagnaPada: 1,
      },
    }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'ဤရမှတ်ရသည့် အကြောင်းရင်း ↓' }))

    expect(screen.getByText(/ရရှိသော ရမှတ်များအရ ယခုအချိန်သည်/)).toBeInTheDocument()
    expect(screen.getByText(/ယခုအချိန်တွင် စန်းသည် အဿဝဏီ နက္ခတ်၌ ရောက်ရှိနေပါသည်/)).toBeInTheDocument()
    expect(screen.getByText('၄ လုံးမြောက်နေရာ၏ အဓိပ္ပာယ်')).toBeInTheDocument()
    expect(screen.getByText(/အခွင့်အလမ်း — စန်းစီးနက္ခတ် အဿဝဏီ/)).toBeInTheDocument()
    expect(screen.getByText(/ခေမတာရာ နှင့် သာဓကတာရာ၏ ကောင်းကျိုးအင်အားကို မြှင့်တင်ရန်/)).toBeInTheDocument()
  })
})
