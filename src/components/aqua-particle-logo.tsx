"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  size: number
  phase: number
  trail: number
}

const MASK_WIDTH = 760
const MASK_HEIGHT = 240

function makeParticles() {
  const mask = document.createElement("canvas")
  mask.width = MASK_WIDTH
  mask.height = MASK_HEIGHT
  const context = mask.getContext("2d")
  if (!context) return []

  context.fillStyle = "#fff"
  context.font = "900 184px 'Arial Black', Arial, sans-serif"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillText("AQUA", MASK_WIDTH / 2, MASK_HEIGHT / 2 + 5)

  const pixels = context.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT).data
  const particles: Particle[] = []

  for (let y = 4; y < MASK_HEIGHT; y += 7) {
    for (let x = 4; x < MASK_WIDTH; x += 7) {
      if (pixels[(y * MASK_WIDTH + x) * 4 + 3] > 80) {
        const seed = (x * 17 + y * 31) % 101
        particles.push({
          x: (x - MASK_WIDTH / 2) / MASK_HEIGHT,
          y: (y - MASK_HEIGHT / 2) / MASK_HEIGHT,
          size: 0.7 + (seed % 8) / 10,
          phase: seed * 0.13,
          trail: 0.3 + ((seed * 7) % 70) / 100,
        })
      }
    }
  }

  return particles
}

export default function AquaParticleLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !hero || !context) return

    const particles = makeParticles()
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0
    let height = 0
    let pixelRatio = 1
    let animationFrame = 0
    let velocityX = 0
    let velocityY = 0
    let targetVelocityX = 0
    let targetVelocityY = 0
    let lastX = 0
    let lastY = 0
    let lastTime = performance.now()
    let hasPointer = false
    let color = "0, 137, 207"

    const readThemeColor = () => {
      color = getComputedStyle(hero)
        .getPropertyValue("--aqua-particle-rgb")
        .trim()
    }

    const resize = () => {
      const bounds = hero.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const elapsed = Math.max(12, now - lastTime)
      if (hasPointer) {
        targetVelocityX = Math.max(
          -1.2,
          Math.min(1.2, (event.clientX - lastX) / elapsed)
        )
        targetVelocityY = Math.max(
          -1.2,
          Math.min(1.2, (event.clientY - lastY) / elapsed)
        )
      }
      lastX = event.clientX
      lastY = event.clientY
      lastTime = now
      hasPointer = true
    }

    const handlePointerLeave = () => {
      hasPointer = false
      targetVelocityX = 0
      targetVelocityY = 0
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      velocityX += (targetVelocityX - velocityX) * 0.2
      velocityY += (targetVelocityY - velocityY) * 0.2
      targetVelocityX *= 0.9
      targetVelocityY *= 0.9

      const rawSpeed = Math.min(1, Math.hypot(velocityX, velocityY) / 0.65)
      const speed = 1 - Math.pow(1 - rawSpeed, 1.6)
      const compact = width < 700
      const scale = Math.min(
        compact ? width * 0.26 : width * 0.19,
        height * 0.46,
        205
      )
      const centerX = width * 0.5
      const centerY = height * (compact ? 0.4 : 0.46)
      const lineStride = Math.max(3, Math.round(8 - speed * 5))

      context.lineCap = "round"
      particles.forEach((particle, index) => {
        const x = centerX + particle.x * scale
        const y = centerY + particle.y * scale
        const trailLength = particle.trail * (445 + speed * 110)

        if (index % lineStride === 0) {
          const waveAmplitude = 4 + speed * 11 + particle.trail * 3
          const waveCount = 3 + particle.trail * 3
          const wavePhase = time * 0.004 + particle.phase
          const segments = 20

          context.beginPath()
          context.moveTo(x, y)
          for (let step = 1; step <= segments; step += 1) {
            const progress = step / segments
            const waveEnvelope = Math.sin(progress * Math.PI)
            const wave =
              Math.sin(wavePhase + progress * Math.PI * 2 * waveCount) *
              waveAmplitude *
              waveEnvelope
            context.lineTo(x - trailLength * progress, y + wave)
          }
          context.strokeStyle = `rgba(${color}, ${0.07 + speed * 0.19})`
          context.lineWidth = particle.size * 0.65
          context.lineJoin = "round"
          context.stroke()
        }

        const drift = Math.sin(time * 0.0018 + particle.phase) * 0.8
        context.beginPath()
        context.arc(x + drift, y - drift * 0.35, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${color}, ${0.55 + particle.trail * 0.42})`
        context.fill()
      })

      if (!reducedMotion.matches) animationFrame = requestAnimationFrame(draw)
    }

    readThemeColor()
    resize()
    window.addEventListener("resize", resize)
    hero.addEventListener("pointermove", handlePointerMove)
    hero.addEventListener("pointerleave", handlePointerLeave)
    const themeObserver = new MutationObserver(readThemeColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    draw(performance.now())

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      hero.removeEventListener("pointermove", handlePointerMove)
      hero.removeEventListener("pointerleave", handlePointerLeave)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <section ref={heroRef} className="aqua-particle-hero">
      <canvas
        ref={canvasRef}
        className="aqua-particle-canvas"
        aria-hidden="true"
      />
      <div className="aqua-particle-copy">
        <h1 className="sr-only">AQUA</h1>
        <p>Advancing Quantum Architecture Research Group</p>
      </div>
    </section>
  )
}
