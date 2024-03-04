import { useEffect, useRef } from "react"

const PollOptionResult = ({ option, percentage }: { option: string; percentage: number }) => {
  const optionFillRef = useRef<HTMLDivElement>(null)
  const optionEmptyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (optionFillRef.current && optionEmptyRef.current) {
      optionFillRef.current.style.width = `${percentage}%`
      optionEmptyRef.current.style.width = `${100 - percentage}%`
    }
  }, [percentage])

  return (
    <div className="relative my-2 flex w-full overflow-hidden rounded-xl border border-primary">
      <div ref={optionFillRef} className="h-12  rounded-lg bg-primary"></div>
      <div ref={optionEmptyRef} className="h-12 "></div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-100">{option}</div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-100">{percentage}%</div>
    </div>
  )
}

export default PollOptionResult
