import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const handler: Handler = async (event) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { statusCode: 500, body: "API Key missing" };

    const body = JSON.parse(event.body || "{}");
    const userMessage = body.message || "";
    const servicesData = body.servicesData || [];

    // إنشاء المحادثة
    const ai = new GoogleGenAI({ apiKey });
    const chat = await ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `
أنت مساعد ذكي لشركة "يسرها".
تجيب فقط بناءً على بيانات الخدمات التالية وباللغة العربية.
${JSON.stringify(servicesData)}
        `,
      },
    });

    // إرسال رسالة المستخدم واستلام الرد
    const response = await chat.sendMessage({ message: userMessage });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.text }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
    };
  }
};

export { handler };
