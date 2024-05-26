import { useNavigate } from "react-router-dom"
import { t } from "i18next"

function SidebarOption({ icon, name, link, select, mobile }: { icon: any; name: string; link: string; select: boolean; mobile: boolean }) {
  const navigate = useNavigate()

  return (
    <div
      title={name}
      className="group my-1 box-border cursor-pointer border-0 max-[1278px]:w-fit"
      onClick={() => {
        navigate(link)
      }}
    >
      <div className="flex w-fit content-center items-start  rounded-full p-0.5 group-hover:bg-lightHover dark:group-hover:bg-darkHover max-[1278px]:mr-3">
        <div data-testid="icon" className={`py-2 pl-[3px] max-[1278px]:pr-2 xs:pl-2`}>
          {select ? icon[1] : icon[0]}
        </div>
        <div className={`${select ? "font-bold" : ""} py-2 pl-4 pr-6 text-start  ${mobile ? "" : "max-lg:hidden"}`}>
          <span>{t(name)}</span>
        </div>
      </div>
    </div>
  )
}

export default SidebarOption
