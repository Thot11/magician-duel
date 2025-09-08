import { useState, useEffect } from 'react'
import styled from 'styled-components'

type TimerProps = {
  targetTimestamp: number
}

const StyledTimer = styled.div``

function Timer({ targetTimestamp }: TimerProps) {
  const calculateTimeLeft = () => (targetTimestamp - Date.now()) / 1000
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft <= 0) {
        clearInterval(timer)
        setTimeLeft(0)
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [calculateTimeLeft, timeLeft, targetTimestamp])

  if (timeLeft <= 0) {
    return null
  }

  return (
    <StyledTimer>Début du combat dans: {Math.round(timeLeft)}s</StyledTimer>
  )
}

export default Timer
