import DisplayMedia from "../../DisplayImages/DisplayMedia"

const PostBody = ({ description, media }: { description: string; media: string[] }) => {
  const mediaUrls = media.map((item: any) => process.env.REACT_APP_TWEETS_MEDIA_URL + item.split('/').pop())

  return (
    <div className="pl-12">
      <div className="post-text mt-1 ">
        <p className=" ">{description}</p>
      </div>

      <div className="post-media mt-3">
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={() => {}} margin={1} deleteCallback={() => {}} showCancelButton={false} />
      </div>
    </div>
  )
}

export default PostBody
