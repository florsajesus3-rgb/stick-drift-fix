import { DEFAULT_DEADZONE, type ControllerId, type StickAxes, type StickProfile } from './types'

const KEY = 'stick-drift-fix.profiles.v1'

export function loadProfiles(): StickProfile[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StickProfile[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveProfiles(profiles: StickProfile[]): void {
  localStorage.setItem(KEY, JSON.stringify(profiles))
}

export function createProfile(
  name: string,
  controllerId: ControllerId,
  deadzone = DEFAULT_DEADZONE,
  leftOffset: StickAxes = { x: 0, y: 0 },
  rightOffset: StickAxes = { x: 0, y: 0 },
): StickProfile {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    name,
    controllerId,
    deadzone: { ...deadzone },
    leftOffset: { ...leftOffset },
    rightOffset: { ...rightOffset },
    createdAt: now,
    updatedAt: now,
  }
}
