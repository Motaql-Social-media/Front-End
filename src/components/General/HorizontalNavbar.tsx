import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const HorizontalNavbar = ({ urls, originalUrl, handlers }: { urls: any[]; originalUrl: string; handlers: any[] }) => {
  const location = useLocation() // once ready it returns the 'window.location' object
  const [urlLocation, setUrlLocation] = useState<null | string>(null)

  useEffect(() => {
    setUrlLocation(location.pathname)
  }, [location])

  // useEffect(() => {
  //   console.log(urls)
  // }, [])

  return (
    <>
      {urls.map((url, index) => {
        return (
          <Link className="relative flex h-[100%] flex-1 flex-col transition-colors hover:bg-lightHover dark:hover:bg-darkHover dark:hover:backdrop-blur-xl" key={url.title} to={`${originalUrl}${url.location === "" ? "" : "/" + url.location}`} onClick={handlers && handlers[index]}>
            <span className={`m-auto font-medium ${urlLocation === `${originalUrl}/${url.location}` ? "" : "text-gray-600 dark:text-gray-400"}`}>{url.title}</span>
            <div className={`absolute bottom-0 h-1 w-12 self-center rounded-sm ${urlLocation === `${originalUrl}/${url.location}` || (urlLocation === `${originalUrl}` && url.title === urls[0].title) || (urlLocation?.split("/")[1] === "trending" && urlLocation?.split("/").pop() === url.location.split("/").pop()) ? "bg-primary" : "bg-inherit"}`}></div>
          </Link>
        )
      })}
    </>
  )
}

export default HorizontalNavbar
