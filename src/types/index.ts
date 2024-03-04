export {}

declare global {
  interface Window {
    grecaptcha: any
  }

  interface Diary {
    tweetId: number
    gifUrl: string
    imageUrls: string[]
    content: string
    createdAt: string
    poll: {}
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
