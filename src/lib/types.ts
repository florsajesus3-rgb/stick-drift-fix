export type ControllerId = 'ps4' | 'ps5' | 'elite2'

export interface StickAxes {
  x: number
  y: number
}

export interface DeadzoneConfig {
  leftX: number
  leftY: number
  rightX: number
  rightY: number
  leftOuter: number
  rightOuter: number
}

export interface StickProfile {
  id: string
  name: string
  controllerId: ControllerId
  deadzone: DeadzoneConfig
  leftOffset: StickAxes
  rightOffset: StickAxes
  createdAt: number
  updatedAt: number
}

export interface GamepadSnapshot {
  id: string
  index: number
  connected: boolean
  left: StickAxes
  right: StickAxes
  buttons: number
}

export const DEFAULT_DEADZONE: DeadzoneConfig = {
  leftX: 0.12,
  leftY: 0.12,
  rightX: 0.12,
  rightY: 0.12,
  leftOuter: 0.98,
  rightOuter: 0.98,
}
