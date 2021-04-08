import rxpp from 'rxpp'

const calculateDTAR = (ms: number): number => {
  if (ms < 300) {
    return 11 // with DT, the AR is capped at 11
  }
  if (ms < 1200) {
    return 11 - (ms - 300) / 150
  }
  return 5 - (ms - 1200) / 120
}

export const calculateApproachRate = (
  modifiers: number,
  ar: number
): number => {
  let ms: number
  switch (
    modifiers &
    (rxpp.modbits.ht |
      rxpp.modbits.dt |
      rxpp.modbits.ez |
      rxpp.modbits.hr)
  ) {
    case rxpp.modbits.hr:
      return Math.min(10, ar * 1.4)
    case rxpp.modbits.ez:
      return ar / 2

    case rxpp.modbits.dt + rxpp.modbits.hr: {
      if (ar < 4) {
        ms = 1200 - 112 * ar
      } else if (ar > 4) {
        ms = 740 - 140 * (ar - 4)
      } else {
        ms = 864 - 124 * (ar - 3)
      }
      return calculateDTAR(ms)
    }
    case rxpp.modbits.dt + rxpp.modbits.ez:
      return calculateDTAR(1200 - 40 * ar)

    case rxpp.modbits.dt:
      return calculateDTAR(ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80)
    case rxpp.modbits.ht: {
      if (ar <= 5) return (1600 - (600 + 160 * (10 - ar))) / 120
      ms = 600 + (10 - ar) * 200
      if (ms >= 1200) return 15 - ms / 120
      return 13 - ms / 150
    }

    case rxpp.modbits.ht + rxpp.modbits.hr: {
      if (ar > 7) return 8.5
      if (ar < 4) {
        ms = 2700 - 252 * ar
      } else if (ar < 5) {
        ms = 1944 - 279 * (ar - 3)
      } else {
        ms = 1665 - 315 * (ar - 4)
      }
      if (ar < 6) {
        return 15 - ms / 120
      }
      if (ar > 7) {
        return 13 - ms / 150
      }
      return 15 - ms / 120
    }
    case rxpp.modbits.ht + rxpp.modbits.ez:
      return (1800 - (1600 + 80 * (10 - ar))) / 120

    default:
      return ar
  }
}

export const calculatePerformance = (
  map: rxpp.beatmap,
  mods: number,
  combo: number,
  misses: number,
  accuracy: number
): {
  pp: rxpp.std_ppv2
  stars: rxpp.std_diff
} => {
  const stars = new rxpp.diff().calc({ map, mods })

  const pp = rxpp.ppv2({
    stars,
    combo,
    nmiss: misses,
    acc_percent: accuracy,
  })

  return { pp, stars }
}
