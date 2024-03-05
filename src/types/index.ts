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
    reelId: number
    reelUrl: string
    content: string
    createdAt: string
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
}
