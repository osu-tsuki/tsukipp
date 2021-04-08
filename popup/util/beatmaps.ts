import { beatmap, hitobject, timing } from 'rxpp'

export namespace beatmaps {
  export const getTimingPointAt = (map: beatmap, time: number): timing => {
    let value: timing = map.timing_points[0] // default
    map.timing_points.forEach((timing) => {
      if (timing.ms_per_beat < 0) return
      if (timing.time <= time && value.time < timing.time) {
        value = timing
      }
    })
    return value
  }

  export const getNearestTimingPointAt = (
    map: beatmap,
    time: number
  ): timing => {
    let value: timing = map.timing_points[0] // default
    map.timing_points.forEach((timing) => {
      if (timing.time <= time && value.time < timing.time) {
        value = timing
      }
    })
    return value
  }

  export const getAdjustedMsPerBeatAt = (
    map: beatmap,
    time: number
  ): number => {
    const theTiming = getNearestTimingPointAt(map, time)
    if (theTiming.ms_per_beat < 0) {
      const uninheritedTiming = getTimingPointAt(map, time)
      return uninheritedTiming.ms_per_beat / getSpeedMultiplierAt(map, time)
    }
    return theTiming.ms_per_beat
  }

  export const getMsPerBeatAt = (map: beatmap, time: number): number => {
    const theTiming = getNearestTimingPointAt(map, time)
    if (theTiming.ms_per_beat < 0) {
      const uninheritedTiming = getTimingPointAt(map, time)
      return uninheritedTiming.ms_per_beat
    }
    return theTiming.ms_per_beat
  }

  // TODO(acrylic-style): i think it's ok, but it may be wrong
  export const getSpeedMultiplierAt = (map: beatmap, time: number): number => {
    let i = Number.MAX_VALUE
    let value: timing = map.timing_points[0] // default
    let exactMatch: timing | undefined
    map.timing_points.forEach((timing) => {
      if (exactMatch) return
      if (timing.time === time) {
        exactMatch = timing
        return
      }
      let n = time - timing.time
      if (n > 0 && n < i && timing.time <= time) {
        i = n
        value = timing
      }
    })
    if (exactMatch) value = exactMatch
    return value.ms_per_beat > 0 ? 1 : -100 / value.ms_per_beat
  }

  export const getHitObjectAt = (
    map: beatmap,
    time: number
  ): hitobject | undefined => {
    let tim: number = Number.MAX_VALUE
    let value: hitobject | undefined
    map.objects.forEach((obj) => {
      if (tim > Math.abs(obj.time - time)) {
        tim = Math.abs(obj.time - time)
        value = obj
      }
    })
    return value
  }

  export const getHitObjectOrDefaultAt = (
    map: beatmap,
    time: number,
    def: hitobject
  ): hitobject => {
    return getHitObjectAt(map, time) || def
  }
}
