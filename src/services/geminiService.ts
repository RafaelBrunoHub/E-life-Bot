import { GoogleGenAI } from "@google/genai";
import { CONDO_SNIPPETS, SYSTEM_INSTRUCTION } from "../data/condoInfo";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

function retrieveSnippets(query: string) {
  const normalizedQuery = query.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove accents for better matching
  
  const queryWords = normalizedQuery.split(/\W+/).filter(w => w.length > 2);
  
  // Scoring based on word matches in tags and content
  const scoredSnippets = CONDO_SNIPPETS.map(snippet => {
    let score = 0;
    
    // 1. Check tags (higher weight)
    snippet.tags.forEach(tag => {
      const normalizedTag = tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalizedQuery.includes(normalizedTag)) {
        score += 5;
      }
    });

    // 2. Check content (lower weight per word)
    const normalizedContent = snippet.content.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
      
    queryWords.forEach(word => {
      if (normalizedContent.includes(word)) {
        score += 1;
      }
    });

    return { ...snippet, score };
  });

  // Sort by score and take top 4
  const topSnippets = scoredSnippets
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Fallback: if no matches, always include general and contacts to be helpful
  if (topSnippets.length === 0) {
    return CONDO_SNIPPETS
      .filter(s => s.id === "geral" || s.id === "contatos")
      .map(s => s.content);
  }

  return topSnippets.map(s => s.content);
}

export async function askChatbot(message: string) {
  try {
    const relevantContext = retrieveSnippets(message).join("\n\n");
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você tem acesso aos seguintes trechos de documentos do condomínio para responder à pergunta do morador.
      
--- CONTEXTO ---
${relevantContext}
--- FIM DO CONTEXTO ---

PERGUNTA DO MORADOR: ${message}

Lembre-se: Se a resposta não estiver clara no CONTEXTO acima, diga apenas "Não tenho essa informação."`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
      },
    });

    return response.text || "Não tenho essa informação.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
}
