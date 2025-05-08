"use client"

import { useState, useEffect } from "react"

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countdown, setCountdown] = useState(() => {
    const now = new Date().getTime()
    const distance = countDownDate - now

    if (distance < 0) {
      return [0, 0, 0, 0]
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    return [days, hours, minutes, seconds]
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      if (distance < 0) {
        clearInterval(interval)
        setCountdown([0, 0, 0, 0])
        return
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown([days, hours, minutes, seconds])
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return countdown
}

export { useCountdown }
