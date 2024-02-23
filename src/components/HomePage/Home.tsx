import { useSelector } from "react-redux";
import HorizontalNavbar from "../General/HorizontalNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate=useNavigate()  

  const user = useSelector((state: any) => state.user)
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="flex flex-1 flex-grow-[8]">
      <div className="home ml-0 mr-1 w-full no-scrollbar max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-xs:border-l-0 max-xs:border-r-0 sm:w-[600px]">
        <div className="p-2 text-xl font-bold border-b dark:border-b-darkBorder">Home</div>
          <div className="flex h-[53px] items-center">
        <HorizontalNavbar urls={[{ title: "Diaries", location: "diaries" }, { title: "Reels", location: "reels" }]} originalUrl="/home" handlers={[null, null]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
