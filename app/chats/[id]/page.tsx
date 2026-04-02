import ChatContainer from '@/components/ChatContainer';

interface ChatPageProps {
  params: { id: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const chatId = Number(params.id);

  return <ChatContainer initialChatId={Number.isNaN(chatId) ? undefined : chatId} />;
}
