import type { DeadzoneConfig, StickAxes } from './types'

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function magnitude(axes: StickAxes): number {
  return Math.hypot(axes.x, axes.y)
}

/** Radial deadzone + recenter offset, then rescale to full range. */
export function applyCorrection(
  raw: StickAxes,
  offset: StickAxes,
  deadzoneInner: number,
  deadzoneOuter: number,
): StickAxes {
  const x = clamp(raw.x - offset.x, -1, 1)
  const y = clamp(raw.y - offset.y, -1, 1)
  const mag = Math.hypot(x, y)
  if (mag < deadzoneInner || mag === 0) {
    return { x: 0, y: 0 }
  }
  const outer = Math.max(deadzoneInner + 0.01, deadzoneOuter)
  const scaled = clamp((mag - deadzoneInner) / (outer - deadzoneInner), 0, 1)
  const factor = scaled / mag
  return { x: clamp(x * factor, -1, 1), y: clamp(y * factor, -1, 1) }
}

export function correctSticks(
  left: StickAxes,
  right: StickAxes,
  leftOffset: StickAxes,
  rightOffset: StickAxes,
  dz: DeadzoneConfig,
): { left: StickAxes; right: StickAxes } {
  const leftInner = Math.max(dz.leftX, dz.leftY)
  const rightInner = Math.max(dz.rightX, dz.rightY)
  return {
    left: applyCorrection(left, leftOffset, leftInner, dz.leftOuter),
    right: applyCorrection(right, rightOffset, rightInner, dz.rightOuter),
  }
}

/** Recommend deadzone from measured center offset magnitude. */
export function recommendDeadzone(offsetMag: number): number {
  return clamp(Math.ceil((offsetMag + 0.04) * 100) / 100, 0.05, 0.35)
}

export function formatAxis(value: number): string {
  return value.toFixed(3)
}

export function percent(value: number): string {
  return `${Math.round(value * 100)}%`
}
