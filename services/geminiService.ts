
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Habit, UserStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getAICoachResponse = async (
  stats: UserStats, 
  habits: Habit[], 
  userMessage: string
): Promise<string> => {
  const systemInstruction = `
    You are 'StepUp Coach', an elite performance AI coach.
    You help users level up their lives.
    Current User Stats: 
    - Steps: ${stats.steps}/${stats.stepGoal}
    - Level: ${stats.level}
    - Streak: ${stats.streak} days
    Habits: ${habits.map(h => `${h.name} (${h.completed ? 'Done' : 'Pending'})`).join(', ')}
    
    Maintain a high-energy, motivational, yet empathetic tone. 
    Use RPG metaphors (quests, experience, leveling up).
    Be concise but impactful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction,
      },
    });
    return response.text || "I'm processing your progress. Keep stepping up!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The training ground is temporarily closed, but your grind never stops!";
  }
};

export const getDailyInspiration = async (stats: UserStats): Promise<{quote: string, challenge: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a daily motivation quote and a small fitness challenge based on the current user's journey.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            challenge: { type: Type.STRING },
          },
          required: ["quote", "challenge"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      quote: "The only bad workout is the one that didn't happen.",
      challenge: "Complete 500 extra steps today."
    };
  }
};

export const generateVisionImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A cinematic, ultra-realistic motivational vision board image for a high-performer: ${prompt}. Cyberpunk aesthetic, neon lighting, blue and emerald color palette.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
