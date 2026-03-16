import { GoogleGenAI } from "@google/genai";
import { CONDO_CONTEXT } from "../data/condoInfo";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function askChatbot(message: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: CONDO_CONTEXT,
        temperature: 0.2, // Low temperature for factual consistency
      },
    });

    return response.text || "Não tenha essa informação.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
}
