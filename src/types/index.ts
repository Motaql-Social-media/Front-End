export {}

declare global {
  interface Window {
    grecaptcha: any
  }

  interface Diary {
    tweetId: string
    media: any[]
    content: string
    createdAt: string
    poll?: {}
    originalTweet?: any
    originalTweeter?: any
    tweeter: {
      imageUrl: string
      username: string
      jobtitle: string
      name: string
      followersCount: number
      followingsCount: number
      isMuted: boolean
      isBlocked: boolean
    }
    mentions: string[]
    reactCount: number
    reTweetCount: number
    repliesCount: number
    isBookmarked: boolean
    isReacted: boolean
    isRetweeted: boolean
    type: string
  }

  interface Reel {
    reelId: string
    reelUrl: string
    content: string
    createdAt: string
    type: string
    originalReel?: any
    originalReeler?: any
    topics: string[]
    poll: {}
    reeler: {
      imageUrl: string
      username: string
      jobtitle: string
      name: string
      followersCount: number
      followingsCount: number
      isMuted: boolean
      isBlocked: boolean
    }
    mentions: string[]
    reactCount: number
    reReelCount: number
    repliesCount: number
    isBookmarked: boolean
    isReacted: boolean
    isRereeled: boolean
  }

  interface modalStyleT {
    position: React.CSSProperties["position"]
    backgroundColor: React.CSSProperties["backgroundColor"]
    border?: React.CSSProperties["border"]
    borderRadius: React.CSSProperties["borderRadius"]
    width?: React.CSSProperties["width"]
    height?: React.CSSProperties["height"]
    maxWidth?: React.CSSProperties["maxWidth"]
    top?: React.CSSProperties["top"]
    left?: React.CSSProperties["left"]
    transform?: React.CSSProperties["transform"]
  }
}
