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

  interface Notification {
    notificationId: number
    content: string
    isSeen: boolean
    type: string
    createdAt: string
    metadata: any
    notificationFrom: {
      userId: number
      imageUrl: string
      username: string
      jobtitle: string
      name: string
      bio: string
      followersCount: number
      followingsCount: number
      isMuted: boolean
      isBlocked: boolean
      isFollowed: boolean
    }
  }

  interface Message {
    senderId: number
    messageId: number
    conversationId: number
    isSeen: boolean
    createdAt: string
    text: string
    isFromMe: boolean
  }

  interface AdminUserState {
    cnu: any
    cnt: string | null
  }

  interface Employee {
    userId: number
    name: string
    email: string
    phoneNumber: string
    imageUrl: string
    createdAt: string
    status: string
    type: string
    inActivatedAt: null | string
  }

  interface Subscriber {
    email: string
    imageUrl: string
    jobtitle: string
    name: string
    phoneNumber: string
    userId: number
    username: string
  }

  interface Subscription {
    type: string
    status: string
    liveImage: string
    createdAt: string
    fullname: string
    subscriber: Subscriber
    subscriptionId: number
  }
}
