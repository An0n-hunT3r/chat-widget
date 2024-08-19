export type Sender = 'user' | 'bot';

export interface Message {
  id: number;
  content: string;
  sender: Sender;
}
