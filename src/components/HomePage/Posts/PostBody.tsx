import DisplayMedia from "../../DisplayImages/DisplayMedia"

const PostBody = ({ description, mediaUrls, setMediaUrls, media }: { description: string; mediaUrls: string[]; setMediaUrls: any; media: any }) => {
  return (
    <div className="pl-12">
      <div className="post-text mt-1 ">
        <p className=" ">{description}</p>
      </div>

      <div className="post-media mt-3">
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} margin={1} deleteCallback={() => {}} showCancelButton={false} />
      </div>
    </div>
  )
}

export default PostBody
