declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number
    spread?: number
    angle?: number
    startVelocity?: number
    particleSize?: number
    gravity?: number
    colors?: string[]
    origin?: { x: number; y: number }
    shapes?: string[]
    emoji?: string[]
  }

  interface ConfettiResult {
    add: () => void
    stop: () => void
  }

  function confetti(options?: ConfettiOptions): ConfettiResult
  function confetti(options: ConfettiOptions[], callback?: () => void): void

  export default confetti
}