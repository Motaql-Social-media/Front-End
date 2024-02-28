import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import { styles } from "../../../styles/styles"
import { useTranslation } from "react-i18next"

const ReelBar = ({ id, replyCount, reposted, repostsNum, liked, likesNum, topic }: { id: string; replyCount: number; reposted: boolean; repostsNum: number; liked: boolean; likesNum: number; topic: string }) => {
  const handleLikeClick = (e: any) => {
    e.stopPropagation()
    // if (liked) {
    //   // console.log(userToken)
    //   // console.log(id)
    //   axios
    //     .post(
    //       APIs.actual.unlike,
    //       {},
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setLikesNum(likesNum - 1);
    //       setLiked(!liked);
    //       // console.log("unlike success", response)
    //     })
    //     .catch((error) => {
    //       console.log("unlike fail", error);
    //     });
    // } else {
    //   // console.log(id)
    //   axios
    //     .post(
    //       APIs.actual.like,
    //       {},
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       // console.log("like success", response)
    //       setLikesNum(likesNum + 1);
    //       setLiked(!liked);
    //     })
    //     .catch((error) => {
    //       console.log("like fail", error);
    //     });
    // }
  }
  const handleRepostClick = (e: any) => {
    e.stopPropagation()
    // if (reposted) {
    //   // console.log(userToken)
    //   // console.log(id)
    //   axios
    //     .patch(
    //       APIs.actual.unrepost,
    //       {},
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setRepostsNum(repostsNum - 1);
    //       setReposted(!reposted);
    //       console.log("unrepost success", response);
    //     })
    //     .catch((error) => {
    //       console.log("unrepost fail", error);
    //     });
    // } else {
    //   // console.log(id)
    //   axios
    //     .patch(
    //       APIs.actual.repost,
    //       {},
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setRepostsNum(repostsNum + 1);
    //       setReposted(!reposted);
    //       console.log("repost success", response);
    //     })
    //     .catch((error) => {
    //       console.log("repost fail", error);
    //     });
    // }
  }
  const handelBookmarkClick = (e: any) => {
    e.stopPropagation()
  }

  const {t} =useTranslation()
  return (
    <div className="text-ternairy mt-3 flex w-[8%] flex-col justify-around dark:text-gray-500 ">
      <button className={`${styles.coloredButton}  !h-fit`}>{topic}</button>
      <div className={`group pointer-events-auto flex cursor-pointer flex-col items-center transition-colors  duration-300 hover:text-primary`} title={t("reply")}>
        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018] ">
          <ChatBubbleOutlineOutlinedIcon
            sx={{
              width: 16,
              height: 16,
            }}
          />
        </div>
        <span className="text-sm">{replyCount}</span>
      </div>
      <div className={`group pointer-events-auto flex cursor-pointer flex-col items-center transition-colors duration-300 ${reposted ? "text-green-500" : ""} hover:text-green-500`} title={t("repost")} onClick={handleRepostClick}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e8f9ee] dark:group-hover:bg-[#031309] ">
          <CachedOutlinedIcon
            sx={{
              width: 16,
              height: 16,
            }}
          />
        </div>
        <span className="text-sm">{repostsNum}</span>
      </div>
      <div className={`group  pointer-events-auto flex cursor-pointer flex-col items-center transition-colors duration-300 ${liked ? "text-pink-600" : ""} hover:text-pink-600`} title={t("like")} onClick={handleLikeClick}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#f9e5ef] dark:group-hover:bg-[#14000a]">
          {liked ? (
            <FavoriteOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          )}
        </div>
        <span className="text-sm">{likesNum}</span>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 hover:text-primary`} title={t("bookmark")} onClick={handelBookmarkClick}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
            <BookmarkBorderOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
        </div>
        <div className={`group pointer-events-auto flex cursor-pointer flex-col items-center transition-colors duration-300 hover:text-primary`} title={t("share")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
            <FileUploadOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReelBar
