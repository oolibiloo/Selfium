
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

export const analyzeUsage = async (user: UserProfile): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    حلل بيانات استهلاك الإنترنت لهذا المستخدم وقدم نصائح باللغة العربية:
    الاسم: ${user.name}
    الخطة الحالية: ${user.currentPlan}
    الرصيد: ${user.balance}
    الاستهلاك اليومي للأسبوع الماضي: ${JSON.stringify(user.dailyUsage)}
    
    قدم ملخصاً سريعاً للاستهلاك وهل يحتاج المستخدم لترقية باقته أم لا. اجعل الرد ودوداً ومختصراً.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "عذراً، لم أتمكن من تحليل البيانات حالياً.";
  } catch (error) {
    console.error("AI Error:", error);
    return "حدث خطأ أثناء محاولة تحليل استهلاكك الذكي.";
  }
};
