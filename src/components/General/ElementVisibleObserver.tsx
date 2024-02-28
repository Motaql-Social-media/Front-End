import React, { useEffect, useRef, useState } from "react"
const ElementVisibleObserver = ({ handler }: { handler: () => void }) => {
  const scrollRef = useRef<any>(null)
  const [isComponentVisible, setIsComponentVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsComponentVisible(entries[0].isIntersecting)
    })

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }

    const element = scrollRef.current
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (isComponentVisible) {
      handler()
    }
  }, [isComponentVisible])
  return <div ref={scrollRef} className="h-10 w-full "></div>
}

export default ElementVisibleObserver
