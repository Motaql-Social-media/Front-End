import DisplayMedia from "../DisplayMedia";


const PostBody = ({
  description,
  mediaUrls,
  mediaTypes,
  media,
}: {
  description: string;
  mediaUrls: string[];
  mediaTypes: string[];
  media: any;
}) => {
  

  return (
    <div className="pl-12">
      <div className="post-text mt-1 ">
        <p className=" ">{description}</p>
      </div>

      <div className="post-media mt-3">
        <DisplayMedia
          mediaUrls={mediaUrls}
          mediaTypes={mediaTypes}
          margin={1}
          handleDeleteMedia={() => {}}
          showCancelButton={false}
        />
      </div>
    </div>
  );
};

export default PostBody;
