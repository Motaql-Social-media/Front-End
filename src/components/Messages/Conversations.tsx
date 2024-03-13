import Conversation from "./Conversation"

const Conversations = ({ conversations, setConversations }: { conversations: any[]; setConversations: any }) => {
  return <div>{conversations && conversations.length > 0 && conversations.map((c: any) => <Conversation key={c.conversationId} id={c.conversationId} isActive={c.isActive} otherContact={c.otherContact} unseenCount={c.unseenCount} />)}</div>
}

export default Conversations
