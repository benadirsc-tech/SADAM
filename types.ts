
export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  category: 'fitness' | 'mindset' | 'learning' | 'productivity';
}

export interface UserStats {
  steps: number;
  stepGoal: number;
  level: number;
  experience: number;
  streak: number;
}

export interface AIPerspective {
  mood: string;
  motivationQuote: string;
  dailyChallenge: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
