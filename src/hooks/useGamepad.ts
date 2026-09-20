import { useEffect, useRef, useState } from 'react'
import type { GamepadSnapshot, StickAxes } from '../lib/types'

function readStick(gp: Gamepad, xIndex: number, yIndex: number): StickAxes {
  return {
    x: gp.axes[xIndex] ?? 0,
    y: gp.axes[yIndex] ?? 0,
  }
}

function snapshotFromPad(gp: Gamepad): GamepadSnapshot {
  return {
    id: gp.id,
    index: gp.index,
    connected: gp.connected,
    left: readStick(gp, 0, 1),
    right: readStick(gp, 2, 3),
    buttons: gp.buttons.length,
  }
}

export function useGamepad(enabled = true) {
  const [pads, setPads] = useState<GamepadSnapshot[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return

    const onChange = () => {
      const list = navigator.getGamepads?.() ?? []
      const next: GamepadSnapshot[] = []
      for (const gp of list) {
        if (gp) next.push(snapshotFromPad(gp))
      }
      setPads(next)
      setSelectedIndex((prev) => (next.some((p) => p.index === prev) ? prev : next[0]?.index ?? 0))
    }

    window.addEventListener('gamepadconnected', onChange)
    window.addEventListener('gamepaddisconnected', onChange)

    const tick = () => {
      const list = navigator.getGamepads?.() ?? []
      const next: GamepadSnapshot[] = []
      for (const gp of list) {
        if (gp) next.push(snapshotFromPad(gp))
      }
      setPads(next)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    onChange()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('gamepadconnected', onChange)
      window.removeEventListener('gamepaddisconnected', onChange)
    }
  }, [enabled])

  const active = pads.find((p) => p.index === selectedIndex) ?? pads[0] ?? null

  return { pads, active, selectedIndex, setSelectedIndex }
}
