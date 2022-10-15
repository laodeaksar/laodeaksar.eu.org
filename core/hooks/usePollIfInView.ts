import React from "react"
import { useIntersection, useInterval } from "react-use"

export const usePollIfInView = (interval: number = 1000, max: number = 3) => {
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {})

  const [shouldPoll, setShouldPoll] = React.useState(false)
  const [polledCount, setPolledCount] = React.useState(0)

  useInterval(
    () => {
      if (polledCount >= max) {
        setShouldPoll(false)
      } else {
        setPolledCount(polledCount + 1)
      }
    },
    shouldPoll ? interval : null,
  )

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setShouldPoll(true)
      setPolledCount(0)
    } else {
      setShouldPoll(false)
    }
  }, [intersection?.isIntersecting])

  return {
    intersectionRef,
    shouldPoll,
  }
}