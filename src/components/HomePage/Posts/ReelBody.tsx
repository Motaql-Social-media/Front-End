const ReelBody = ({ media }: { media: string }) => {
  const handleVideoClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div className="flex w-[90%] justify-end">
      <video controls className="max-h-[600px] w-full rounded-2xl" src={media} onClick={handleVideoClick}></video>
    </div>
  )
}

export default ReelBody
