/**
 * Speech synthesis helper for Spanish pronunciation
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakSpanish(text: string, rate: number = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Clean dialogue hyphens or quotes if desired, or speak naturally
      const cleanText = text.replace(/^[—–-]\s*/, "").replace(/[✅💡]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "es-ES";
      utterance.rate = rate; // 0.8 to 1.0 is great for learners

      // Try finding European Spanish or Latin American Spanish voice
      const voices = window.speechSynthesis.getVoices();
      const esVoice =
        voices.find((v) => v.lang === "es-ES") ||
        voices.find((v) => v.lang.startsWith("es")) ||
        null;
      if (esVoice) {
        utterance.voice = esVoice;
      }

      utterance.onend = () => {
        currentUtterance = null;
        resolve();
      };
      utterance.onerror = () => {
        currentUtterance = null;
        resolve();
      };

      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    } catch {
      // ignore
    }
  }
}
