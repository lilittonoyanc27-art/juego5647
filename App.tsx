import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Headphones,
  Sparkles,
  Zap,
  RotateCcw,
  Languages,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Play,
  Check,
} from "lucide-react";
import {
  MAIN_DIALOGUE,
  MAIN_QUESTIONS,
  LISTENING_EXERCISES,
  KEY_PHRASES,
  PROGRESSIVE_LEVELS,
  BLITZ_ITEMS,
  type ListeningExercise,
  type LevelItem,
} from "./data";
import { speakSpanish, stopSpeaking } from "./audio";

type TabType = "dialogue" | "exercises" | "phrases" | "levels" | "blitz";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("dialogue");
  const [audioSpeed, setAudioSpeed] = useState<number>(0.92);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  // Global toggle for showing/hiding all Armenian translations
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Individual revealed translations states
  const [revealedDialogue, setRevealedDialogue] = useState<Record<number, boolean>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [revealedExercises, setRevealedExercises] = useState<Record<number, boolean>>({});
  const [revealedPhrases, setRevealedPhrases] = useState<Record<number, boolean>>({});
  const [revealedLevelDialogues, setRevealedLevelDialogues] = useState<Record<number, boolean>>({});
  const [revealedLevelQuestions, setRevealedLevelQuestions] = useState<Record<string, boolean>>({});

  // Interactive Exercise Quiz selections: exerciseId -> selectedKey ('A' | 'B' | 'C' | 'D')
  const [exerciseSelections, setExerciseSelections] = useState<Record<number, string>>({});

  // Filter for Levels tab
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number>(0); // 0 = all

  // Search filter for key phrases
  const [phraseSearch, setPhraseSearch] = useState<string>("");

  // Blitz game states
  const [blitzCurrentIndex, setBlitzCurrentIndex] = useState<number>(0);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzAnswered, setBlitzAnswered] = useState<boolean>(false);
  const [blitzSelectedOption, setBlitzSelectedOption] = useState<string | null>(null);
  const [blitzShuffledOptions, setBlitzShuffledOptions] = useState<{ es: string; am: string; isCorrect: boolean }[]>([]);
  const [blitzStreak, setBlitzStreak] = useState<number>(0);
  const [blitzFinished, setBlitzFinished] = useState<boolean>(false);

  // Prepare blitz options when current item changes
  useEffect(() => {
    if (activeTab === "blitz" && !blitzFinished) {
      const current = BLITZ_ITEMS[blitzCurrentIndex];
      if (current) {
        const options = [
          { es: current.correctAnswerEs, am: current.correctAnswerAm, isCorrect: true },
          ...current.wrongAnswers.map((w) => ({ es: w.es, am: w.am, isCorrect: false })),
        ];
        // Shuffle
        setBlitzShuffledOptions(options.sort(() => Math.random() - 0.5));
        setBlitzAnswered(false);
        setBlitzSelectedOption(null);

        // Auto speak prompt in blitz mode
        handlePlayAudio(current.promptEs);
      }
    }
  }, [blitzCurrentIndex, activeTab, blitzFinished]);

  const handlePlayAudio = async (text: string, idKey?: string) => {
    stopSpeaking();
    if (idKey) setIsPlayingAudio(idKey);
    await speakSpanish(text, audioSpeed);
    if (idKey) setIsPlayingAudio(null);
  };

  const toggleDialogueLine = (id: number) => {
    setRevealedDialogue((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleQuestion = (id: number) => {
    // When clicking question, reveal both the question translation and the answer
    setRevealedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExerciseTranslation = (id: number) => {
    setRevealedExercises((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePhraseTranslation = (id: number) => {
    setRevealedPhrases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLevelDialogue = (id: number) => {
    setRevealedLevelDialogues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLevelQuestion = (key: string) => {
    setRevealedLevelQuestions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectExerciseOption = (exerciseId: number, optionKey: string) => {
    setExerciseSelections((prev) => ({ ...prev, [exerciseId]: optionKey }));
  };

  // Blitz selection
  const handleBlitzSelect = (option: { es: string; am: string; isCorrect: boolean }) => {
    if (blitzAnswered) return;
    setBlitzAnswered(true);
    setBlitzSelectedOption(option.es);
    if (option.isCorrect) {
      setBlitzScore((s) => s + 1);
      setBlitzStreak((st) => st + 1);
    } else {
      setBlitzStreak(0);
    }
    // Speak option
    handlePlayAudio(option.es);
  };

  const nextBlitzQuestion = () => {
    if (blitzCurrentIndex + 1 < BLITZ_ITEMS.length) {
      setBlitzCurrentIndex((i) => i + 1);
    } else {
      setBlitzFinished(true);
    }
  };

  const resetBlitzGame = () => {
    setBlitzCurrentIndex(0);
    setBlitzScore(0);
    setBlitzStreak(0);
    setBlitzAnswered(false);
    setBlitzFinished(false);
    setBlitzSelectedOption(null);
  };

  // Filtered phrases
  const filteredPhrases = KEY_PHRASES.filter(
    (p) =>
      p.es.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.am.toLowerCase().includes(phraseSearch.toLowerCase())
  );

  // Filtered levels
  const filteredLevels =
    selectedLevelFilter === 0
      ? PROGRESSIVE_LEVELS
      : PROGRESSIVE_LEVELS.filter((l) => l.level === selectedLevelFilter);

  // Count correct answers in exercises
  const totalExercises = LISTENING_EXERCISES.length;
  const answeredExercises = Object.keys(exerciseSelections).length;
  const correctExercisesCount = LISTENING_EXERCISES.filter(
    (ex) => exerciseSelections[ex.id] === ex.correctKey
  ).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-500/20">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-2">
                Aprende Español & Հայերեն
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Դպրոցական Իսպաներեն
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Սեղմի՛ր իսպաներեն տեքստին՝ հայերեն թարգմանությունն ու պատասխանը բացելու համար 🇦🇲 🇪🇸
              </p>
            </div>
          </div>

          {/* Top Controls: Speech Rate & Global Reveal */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Speed selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
              <span className="px-2 text-slate-400 font-medium">Արագություն:</span>
              <button
                onClick={() => setAudioSpeed(0.8)}
                className={`px-2 py-1 rounded transition-colors ${
                  audioSpeed === 0.8
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
                title="Դանդաղ (0.8x)"
              >
                0.8x
              </button>
              <button
                onClick={() => setAudioSpeed(0.95)}
                className={`px-2 py-1 rounded transition-colors ${
                  audioSpeed === 0.95
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
                title="Բնական (1.0x)"
              >
                1.0x
              </button>
            </div>

            {/* Toggle all translations */}
            <button
              onClick={() => setShowAllTranslations((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                showAllTranslations
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
              }`}
            >
              {showAllTranslations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Թաքցնել թարգմանությունները</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Բացել բոլոր թարգմանությունները</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1 sm:gap-2 overflow-x-auto scrollbar-none border-t border-slate-800/80 pt-1">
          <button
            onClick={() => setActiveTab("dialogue")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "dialogue"
                ? "border-amber-400 text-amber-300 bg-amber-400/5 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>1. Երկխոսություն & Հարցեր</span>
          </button>

          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "exercises"
                ? "border-sky-400 text-sky-300 bg-sky-400/5 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Headphones className="w-4 h-4 text-sky-400" />
            <span>2. «Լսի՛ր և հասկացիր»</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-sky-500/20 text-sky-300 font-bold">
              20
            </span>
          </button>

          <button
            onClick={() => setActiveTab("phrases")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "phrases"
                ? "border-emerald-400 text-emerald-300 bg-emerald-400/5 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>3. Դպրոցական ֆրազներ</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              13
            </span>
          </button>

          <button
            onClick={() => setActiveTab("levels")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "levels"
                ? "border-purple-400 text-purple-300 bg-purple-400/5 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>4. 5 Մակարդակներ</span>
          </button>

          <button
            onClick={() => setActiveTab("blitz")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "blitz"
                ? "border-rose-400 text-rose-300 bg-rose-400/5 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Zap className="w-4 h-4 text-rose-400" />
            <span>5. Խաղ «Լսեցի՞ր՝ պատասխանի՛ր»</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-24">
        {/* ==================== TAB 1: DIALOGUE & QUESTIONS ==================== */}
        {activeTab === "dialogue" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Introduction Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    🇪🇸 Diálogo Escolar • 🇦🇲 Դպրոցական երկխոսություն
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    3. Diálogo — Antes de un examen
                  </h2>
                  <h3 className="text-base sm:text-lg font-medium text-amber-300/90">
                    3. Երկխոսություն — Քննությունից առաջ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
                    Սեղմի՛ր յուրաքանչյուր իսպաներեն նախադասության վրա կամ նվագարկի՛ր ձայնը: Սեղմելիս բացվում է հայերեն ճշգրիտ թարգմանությունը:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allText = MAIN_DIALOGUE.map((d) => d.es).join(". ");
                      handlePlayAudio(allText, "all-dialogue");
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Լսել ամբողջը</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dialogue Lines */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                <span>Երկխոսության տողեր ({MAIN_DIALOGUE.length})</span>
                <span className="text-xs text-amber-400 font-normal">
                  (սեղմի՛ր նախադասությանը՝ թարգմանությունը տեսնելու համար)
                </span>
              </h3>

              <div className="grid gap-3">
                {MAIN_DIALOGUE.map((line, idx) => {
                  const isRevealed = showAllTranslations || !!revealedDialogue[line.id];
                  const isA = line.speaker === "A";

                  return (
                    <div
                      key={line.id}
                      onClick={() => toggleDialogueLine(line.id)}
                      className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 shadow-sm ${
                        isRevealed
                          ? "bg-slate-800/90 border-amber-500/40 shadow-amber-500/5"
                          : "bg-slate-800/50 border-slate-700/70 hover:border-amber-500/30 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-inner ${
                              isA
                                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                                : "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {line.speaker}
                          </span>

                          <div className="space-y-1.5 flex-1">
                            <div className="text-base sm:text-lg font-medium text-slate-100 group-hover:text-amber-300 transition-colors flex items-center flex-wrap gap-2">
                              <span>{line.es}</span>
                            </div>

                            {/* Armenian Translation */}
                            {isRevealed ? (
                              <div className="text-sm text-amber-200/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 font-medium animate-fadeIn">
                                <span className="text-xs uppercase text-amber-400 font-semibold mr-1.5">
                                  🇦🇲 Հայերեն:
                                </span>
                                {line.am}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-0.5">
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>Սեղմի՛ր՝ հայերեն թարգմանությունը բացելու համար</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Audio Speak Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(line.es, `line-${line.id}`);
                          }}
                          className={`p-2 rounded-lg border shrink-0 transition-all ${
                            isPlayingAudio === `line-${line.id}`
                              ? "bg-amber-500 text-slate-950 border-amber-400 animate-pulse"
                              : "bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/30"
                          }`}
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Questions and Answers */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="bg-gradient-to-r from-sky-500/10 via-sky-600/5 to-transparent border border-sky-500/30 rounded-2xl p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  🇪🇸 Preguntas y respuestas • 🇦🇲 Հարցեր և պատասխաններ
                </div>
                <h3 className="text-xl font-bold text-white">
                  Հարցեր և պատասխաններ տեքստի վերաբերյալ
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Սեղմի՛ր յուրաքանչյուր հարցի վրա՝ հայերեն թարգմանությունն ու ճիշտ պատասխանը բացելու համար:
                </p>
              </div>

              <div className="grid gap-3.5">
                {MAIN_QUESTIONS.map((qa) => {
                  const isRevealed = showAllTranslations || !!revealedQuestions[qa.id];

                  return (
                    <div
                      key={qa.id}
                      onClick={() => toggleQuestion(qa.id)}
                      className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
                        isRevealed
                          ? "bg-slate-800/90 border-sky-500/40 shadow-lg shadow-sky-500/5"
                          : "bg-slate-800/50 border-slate-700/80 hover:border-sky-500/30 hover:bg-slate-800/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            #{qa.id}
                          </span>

                          <div className="space-y-3 flex-1">
                            {/* Question in Spanish */}
                            <div>
                              <div className="text-base sm:text-lg font-semibold text-white">
                                {qa.questionEs}
                              </div>

                              {isRevealed && (
                                <div className="text-sm text-sky-200/90 mt-1 font-medium">
                                  🇦🇲 {qa.questionAm}
                                </div>
                              )}
                            </div>

                            {/* Answer (hidden until clicked, or showAll) */}
                            {isRevealed ? (
                              <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-3.5 space-y-1.5 animate-fadeIn">
                                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  <span>Պատասխան / Respuesta:</span>
                                </div>
                                <div className="text-sm sm:text-base font-semibold text-emerald-300">
                                  {qa.answerEs}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-300">
                                  🇦🇲 {qa.answerAm}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-sky-400/90 flex items-center gap-1.5 font-medium">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Սեղմի՛ր՝ պատասխանն ու թարգմանությունը տեսնելու համար</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Audio Speak Question */}
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayAudio(qa.questionEs, `q-${qa.id}`);
                            }}
                            className={`p-2 rounded-lg border transition-all ${
                              isPlayingAudio === `q-${qa.id}`
                                ? "bg-sky-500 text-slate-950 border-sky-400 animate-pulse"
                                : "bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-500/30"
                            }`}
                            title="Լսել հարցը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          {isRevealed && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayAudio(qa.answerEs, `ans-${qa.id}`);
                              }}
                              className={`p-2 rounded-lg border transition-all ${
                                isPlayingAudio === `ans-${qa.id}`
                                ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse"
                                : "bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30"
                              }`}
                              title="Լսել պատասխանը"
                            >
                              <Volume2 className="w-4 h-4 text-emerald-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: LISTENING EXERCISES (20) ==================== */}
        {activeTab === "exercises" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Stats banner */}
            <div className="bg-gradient-to-r from-sky-500/10 via-indigo-600/10 to-transparent border border-sky-500/30 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    🎧 Лови на слух • 🇦🇲 Լսի՛ր և հասկացիր
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    20 Իրական դպրոցական խոսակցություններ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Իսպանիայի դպրոցներում իրականում հնչող բնական արտահայտություններ: Ընտրի՛ր ճիշտ տարբերակը, լսի՛ր արտասանությունը և սեղմելով բացի՛ր հայերեն թարգմանությունն ու բառապաշարի խորհուրդները:
                  </p>
                </div>

                {/* Score badge */}
                <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 shrink-0">
                  <Award className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="text-xs text-slate-400">Քո արդյունքը</div>
                    <div className="text-lg font-bold text-white">
                      {correctExercisesCount} / {answeredExercises}{" "}
                      <span className="text-xs text-slate-400 font-normal">
                        ({totalExercises}-ից)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* List of 20 Exercises */}
            <div className="space-y-4">
              {LISTENING_EXERCISES.map((exercise) => {
                const isRevealed = showAllTranslations || !!revealedExercises[exercise.id];
                const selectedOption = exerciseSelections[exercise.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = selectedOption === exercise.correctKey;

                return (
                  <div
                    key={exercise.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isAnswered
                        ? isCorrect
                          ? "bg-slate-800/90 border-emerald-500/50 shadow-md shadow-emerald-500/5"
                          : "bg-slate-800/90 border-rose-500/40"
                        : "bg-slate-800/60 border-slate-700/80 hover:border-sky-500/40"
                    }`}
                  >
                    {/* Header with Situation text */}
                    <div className="p-4 sm:p-5 border-b border-slate-700/50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {exercise.id}
                          </span>

                          <div className="space-y-2 flex-1">
                            {/* Spanish Situation text (Click to toggle Armenian) */}
                            <div
                              onClick={() => toggleExerciseTranslation(exercise.id)}
                              className="cursor-pointer group"
                            >
                              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                <span>🇪🇸 Իսպաներեն արտահայտություն:</span>
                                <span className="text-[11px] text-sky-400 group-hover:underline">
                                  (սեղմի՛ր՝ թարգմանությունը բացելու համար)
                                </span>
                              </div>
                              <p className="text-base sm:text-lg font-medium text-slate-100 group-hover:text-sky-300 transition-colors">
                                {exercise.situationEs}
                              </p>

                              {/* Armenian Translation */}
                              {isRevealed ? (
                                <div className="mt-2 text-sm text-amber-200/95 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 animate-fadeIn">
                                  <span className="text-xs uppercase font-semibold text-amber-400 mr-1.5">
                                    🇦🇲 Հայերեն:
                                  </span>
                                  {exercise.situationAm}
                                </div>
                              ) : (
                                <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Սեղմի՛ր՝ տեսնելու հայերենը</span>
                                </div>
                              )}
                            </div>

                            {/* Vocabulary Hint / Tip if available */}
                            {exercise.tip && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
                                <span>💡</span>
                                <span className="font-semibold text-white">{exercise.tip.es}</span>
                                {exercise.tip.ru && (
                                  <span className="text-slate-300">= {exercise.tip.ru}</span>
                                )}
                                {exercise.tip.am && (
                                  <span className="text-amber-200">/ {exercise.tip.am}</span>
                                )}
                              </div>
                            )}

                            {/* Question prompt */}
                            {exercise.promptQuestion && (
                              <div className="text-xs sm:text-sm font-semibold text-sky-300/90 pt-1">
                                {exercise.promptQuestion}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Audio Speak */}
                        <button
                          onClick={() =>
                            handlePlayAudio(exercise.situationEs, `ex-${exercise.id}`)
                          }
                          className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                            isPlayingAudio === `ex-${exercise.id}`
                              ? "bg-sky-500 text-slate-950 border-sky-400 animate-pulse"
                              : "bg-slate-700/60 text-slate-200 border-slate-600 hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-500/30"
                          }`}
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div className="p-4 sm:p-5 bg-slate-900/40 space-y-2">
                      <div className="text-xs text-slate-400 font-medium mb-1">
                        Ընտրի՛ր ճիշտ տարբերակը (սեղմի՛ր տարբերակի վրա՝ լսելու և ստուգելու համար):
                      </div>

                      <div className="grid gap-2">
                        {exercise.options.map((opt) => {
                          const isThisCorrect = opt.key === exercise.correctKey;
                          const isThisSelected = selectedOption === opt.key;

                          let optionStyle =
                            "bg-slate-800/70 border-slate-700/70 text-slate-200 hover:bg-slate-800 hover:border-slate-600";

                          if (isAnswered) {
                            if (isThisCorrect) {
                              optionStyle =
                                "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40";
                            } else if (isThisSelected && !isThisCorrect) {
                              optionStyle =
                                "bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500/40";
                            } else {
                              optionStyle = "bg-slate-800/30 border-slate-800 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={opt.key}
                              disabled={isAnswered}
                              onClick={() => {
                                handleSelectExerciseOption(exercise.id, opt.key);
                                handlePlayAudio(opt.es);
                              }}
                              className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${optionStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 border ${
                                    isAnswered && isThisCorrect
                                      ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                      : isAnswered && isThisSelected
                                      ? "bg-rose-500 text-white border-rose-400"
                                      : "bg-slate-700 border-slate-600 text-slate-300"
                                  }`}
                                >
                                  {opt.key}
                                </span>
                                <div>
                                  <div className="text-sm font-medium">{opt.es}</div>
                                  {(isRevealed || isAnswered) && opt.am && (
                                    <div className="text-xs text-slate-400 mt-0.5">
                                      🇦🇲 {opt.am}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center gap-2">
                                {isAnswered && isThisCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                )}
                                {isAnswered && isThisSelected && !isThisCorrect && (
                                  <XCircle className="w-5 h-5 text-rose-400" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation & Retry if answered */}
                      {isAnswered && (
                        <div className="pt-2 flex items-center justify-between text-xs">
                          <span
                            className={
                              isCorrect ? "text-emerald-400 font-semibold" : "text-rose-400 font-medium"
                            }
                          >
                            {isCorrect
                              ? "✅ Ճիշտ է: Հիանալի է!"
                              : `❌ Սխալ է: Ճիշտ պատասխանն է տարբերակ ${exercise.correctKey}`}
                          </span>
                          <button
                            onClick={() => {
                              const newSelections = { ...exerciseSelections };
                              delete newSelections[exercise.id];
                              setExerciseSelections(newSelections);
                            }}
                            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Նորից փորձել</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ESSENTIAL SCHOOL PHRASES (13) ==================== */}
        {activeTab === "phrases" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-600/10 to-transparent border border-emerald-500/30 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    💡 Очень важные живые школьные фразы • 🇦🇲 13 Կարևոր արտահայտություն
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Դպրոցական կենդանի խոսակցական արտահայտություններ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Այս արտահայտությունները հատկապես կարևոր է ճանաչել ամբողջությամբ՝ ականջով, այլ ոչ թե բառ առ բառ թարգմանել: Սեղմի՛ր յուրաքանչյուր քարտի վրա:
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allPhrasesText = KEY_PHRASES.map((p) => p.es).join(". ");
                    handlePlayAudio(allPhrasesText, "all-phrases");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-all active:scale-95 shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Լսել բոլորը</span>
                </button>
              </div>

              {/* Search bar */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Փնտրել արտահայտություն իսպաներեն կամ հայերեն..."
                  value={phraseSearch}
                  onChange={(e) => setPhraseSearch(e.target.value)}
                  className="w-full sm:max-w-md px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Phrase Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredPhrases.map((phrase) => {
                const isRevealed = showAllTranslations || !!revealedPhrases[phrase.id];

                return (
                  <div
                    key={phrase.id}
                    onClick={() => togglePhraseTranslation(phrase.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                      isRevealed
                        ? "bg-slate-800/90 border-emerald-500/40 shadow-sm"
                        : "bg-slate-800/50 border-slate-700/80 hover:border-emerald-500/30 hover:bg-slate-800/70"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center">
                          #{phrase.id}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(phrase.es, `phrase-${phrase.id}`);
                          }}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isPlayingAudio === `phrase-${phrase.id}`
                              ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse"
                              : "bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-emerald-500/20 hover:text-emerald-300"
                          }`}
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-base sm:text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                        <span>🇪🇸</span>
                        <span>{phrase.es}</span>
                      </div>

                      {isRevealed ? (
                        <div className="text-sm font-semibold text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20 animate-fadeIn">
                          🇦🇲 {phrase.am}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 py-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Սեղմի՛ր՝ տեսնելու հայերեն թարգմանությունը</span>
                        </div>
                      )}
                    </div>

                    {phrase.context && (
                      <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-700/50">
                        📌 {phrase.context}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PROGRESSIVE 5 LEVELS ==================== */}
        {activeTab === "levels" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-600/10 to-transparent border border-purple-500/30 rounded-2xl p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                📶 5 Ступеней сложности • 🇦🇲 5 Մակարդակներ
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Աստիճանական ուսուցում. կարճ ռեպլիկներից մինչև ամբողջական խոսք
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Սկզբում լսի՛ր իսպաներենը առանց հայերենի, պատասխանի՛ր հարցերին, ապա սեղմելով ստուգի՛ր թարգմանությունը:
              </p>

              {/* Level Filter Buttons */}
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-purple-500/20">
                <button
                  onClick={() => setSelectedLevelFilter(0)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 0
                      ? "bg-purple-500 text-white font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  Բոլոր մակարդակները
                </button>
                <button
                  onClick={() => setSelectedLevelFilter(1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 1
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  🟢 Մակարդակ 1 (Կարճ)
                </button>
                <button
                  onClick={() => setSelectedLevelFilter(2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 2
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  🟡 Մակարդակ 2 (Ավելի երկար)
                </button>
                <button
                  onClick={() => setSelectedLevelFilter(3)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 3
                      ? "bg-orange-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  🟠 Մակարդակ 3 (Իրական խոսք)
                </button>
                <button
                  onClick={() => setSelectedLevelFilter(4)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 4
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  🔴 Մակարդակ 4 (Բարդ)
                </button>
                <button
                  onClick={() => setSelectedLevelFilter(5)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevelFilter === 5
                      ? "bg-red-600 text-white font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  🔴 Մակարդակ 5 (Ընդհանուր իմաստ)
                </button>
              </div>
            </div>

            {/* Level Items */}
            <div className="space-y-4">
              {filteredLevels.map((item) => {
                const isDialogueRevealed =
                  showAllTranslations || !!revealedLevelDialogues[item.id];

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-700/80 bg-slate-800/60 overflow-hidden shadow-sm hover:border-purple-500/30 transition-all"
                  >
                    {/* Item Header */}
                    <div className="p-4 sm:p-5 border-b border-slate-700/60 bg-slate-850 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-700 border border-slate-600 text-slate-200">
                          {item.levelBadge}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          #{item.id}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {item.levelTitle}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const fullText = item.dialogueEs.join(" ");
                          handlePlayAudio(fullText, `lvl-${item.id}`);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isPlayingAudio === `lvl-${item.id}`
                            ? "bg-purple-500 text-white border-purple-400 animate-pulse"
                            : "bg-slate-700/60 text-slate-200 border-slate-600 hover:bg-purple-500/20 hover:text-purple-300"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Լսել խոսակցությունը</span>
                      </button>
                    </div>

                    {/* Dialogue Box (Click to toggle Armenian) */}
                    <div
                      onClick={() => toggleLevelDialogue(item.id)}
                      className="p-4 sm:p-5 cursor-pointer group bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>🇪🇸 Երկխոսություն:</span>
                        <span className="text-[11px] text-purple-400 group-hover:underline">
                          (սեղմի՛ր՝ հայերենը բացելու համար)
                        </span>
                      </div>

                      <div className="space-y-1 text-base sm:text-lg font-medium text-slate-100 group-hover:text-purple-200 transition-colors">
                        {item.dialogueEs.map((line, lIdx) => (
                          <div key={lIdx}>{line}</div>
                        ))}
                      </div>

                      {/* Armenian Dialogue */}
                      {isDialogueRevealed ? (
                        <div className="mt-3 text-sm text-purple-200/90 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 space-y-1 animate-fadeIn">
                          <div className="text-xs uppercase font-semibold text-purple-300 mb-1">
                            🇦🇲 Հայերեն թարգմանություն:
                          </div>
                          {item.dialogueAm.map((line, lIdx) => (
                            <div key={lIdx}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Սեղմի՛ր՝ տեսնելու հայերենը</span>
                        </div>
                      )}
                    </div>

                    {/* Questions Section */}
                    <div className="p-4 sm:p-5 border-t border-slate-700/60 bg-slate-800/40 space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Հարցեր և ստուգում:
                      </div>

                      {item.questions.map((q, qIdx) => {
                        const qKey = `${item.id}-${qIdx}`;
                        const isQRevealed = showAllTranslations || !!revealedLevelQuestions[qKey];

                        return (
                          <div
                            key={qIdx}
                            onClick={() => toggleLevelQuestion(qKey)}
                            className="cursor-pointer rounded-xl bg-slate-800/80 border border-slate-700/70 p-3.5 hover:border-purple-500/40 transition-all"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                {q.questionEs && (
                                  <div className="text-sm font-semibold text-white">
                                    {q.questionEs}
                                  </div>
                                )}
                                {isQRevealed && q.questionAm && (
                                  <div className="text-xs text-purple-300 mt-0.5">
                                    🇦🇲 {q.questionAm}
                                  </div>
                                )}
                              </div>
                              <span className="text-[11px] text-purple-400 shrink-0">
                                {isQRevealed ? "Թաքցնել" : "Տեսնել պատասխանը"}
                              </span>
                            </div>

                            {/* Options if present */}
                            {q.options && (
                              <div className="grid gap-1.5 mt-2">
                                {q.options.map((opt) => (
                                  <div
                                    key={opt.key}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                      isQRevealed && opt.correct
                                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold"
                                        : "bg-slate-750 border-slate-700 text-slate-300"
                                    }`}
                                  >
                                    {opt.key}) {opt.text} {isQRevealed && opt.correct && "✅"}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Answer revealed */}
                            {isQRevealed ? (
                              <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-start gap-2 text-xs animate-fadeIn">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-emerald-300">
                                    {q.answerEs}
                                  </span>
                                  {q.answerAm && (
                                    <span className="text-slate-300 ml-1.5">
                                      — {q.answerAm}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Սեղմի՛ր՝ պատասխանը բացելու համար</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Summary for level 5 if present */}
                      {item.summaryAm && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                          <span className="font-bold text-amber-300">📌 Խորհուրդ.</span>{" "}
                          {item.summaryAm}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: BLITZ SPEED GAME ==================== */}
        {activeTab === "blitz" && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-transparent border border-rose-500/30 rounded-2xl p-5 sm:p-6 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
                🎧 Խաղ «Լսեցի՞ր՝ պատասխանի՛ր» • Игра «Услышал — ответь сразу»
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Արագ արձագանքման մարզիչ
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Նպատակն է չթարգմանել յուրաքանչյուր բառը, այլ լսելով միանգամից հասկանալ՝ ով է խոսում, ինչ է ուզում, և ինչպես արագ պատասխանել:
              </p>
            </div>

            {!blitzFinished ? (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      Հարց {blitzCurrentIndex + 1} / {BLITZ_ITEMS.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-bold">
                      🔥 Շարք (Streak): {blitzStreak}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      🏆 Միավոր: {blitzScore}
                    </span>
                  </div>
                </div>

                {/* Question Prompt Card */}
                {BLITZ_ITEMS[blitzCurrentIndex] && (
                  <div className="text-center py-4 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Ի՞նչ ես լսում.
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {BLITZ_ITEMS[blitzCurrentIndex].promptEs}
                    </div>

                    {/* Audio repeat button */}
                    <button
                      onClick={() =>
                        handlePlayAudio(
                          BLITZ_ITEMS[blitzCurrentIndex].promptEs,
                          "blitz-prompt"
                        )
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Կրկին լսել</span>
                    </button>

                    {/* Translation hint (revealed or clickable) */}
                    <div>
                      {blitzAnswered || showAllTranslations ? (
                        <div className="text-sm font-medium text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg inline-block border border-amber-500/20 animate-fadeIn">
                          🇦🇲 {BLITZ_ITEMS[blitzCurrentIndex].promptAm}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            // temporarily reveal
                            alert(BLITZ_ITEMS[blitzCurrentIndex].promptAm);
                          }}
                          className="text-xs text-slate-400 hover:text-slate-200 underline"
                        >
                          (ցույց տալ հայերեն ակնարկը)
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Option Buttons */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Ընտրի՛ր ճիշտ արագ պատասխանը.
                  </div>

                  <div className="grid gap-3">
                    {blitzShuffledOptions.map((opt, idx) => {
                      const isSelected = blitzSelectedOption === opt.es;

                      let btnStyle =
                        "bg-slate-700/60 border-slate-600 text-slate-100 hover:bg-slate-700 hover:border-rose-400/50";

                      if (blitzAnswered) {
                        if (opt.isCorrect) {
                          btnStyle =
                            "bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle =
                            "bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50";
                        } else {
                          btnStyle = "bg-slate-800/40 border-slate-800 text-slate-400 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={blitzAnswered}
                          onClick={() => handleBlitzSelect(opt)}
                          className={`w-full p-4 rounded-xl border text-left font-medium flex items-center justify-between gap-3 transition-all ${btnStyle}`}
                        >
                          <div>
                            <div className="text-base sm:text-lg">{opt.es}</div>
                            {blitzAnswered && (
                              <div className="text-xs text-slate-300 mt-1">
                                🇦🇲 {opt.am}
                              </div>
                            )}
                          </div>

                          {blitzAnswered && opt.isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                          )}
                          {blitzAnswered && isSelected && !opt.isCorrect && (
                            <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Next Button */}
                {blitzAnswered && (
                  <div className="pt-4 border-t border-slate-700 flex justify-end animate-fadeIn">
                    <button
                      onClick={nextBlitzQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>Հաջորդ հարցը</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Finish Screen */
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 text-center space-y-6 shadow-xl animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Շնորհավորո՜ւմ ենք: Դուք ավարտեցիք մարզումը:
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Դուք հավաքեցիք{" "}
                  <span className="text-amber-400 font-bold text-lg">
                    {blitzScore} / {BLITZ_ITEMS.length}
                  </span>{" "}
                  միավոր: Շարունակեք կանոնավոր կերպով մարզել լսողությունն ու արագ արձագանքելը:
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={resetBlitzGame}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Խաղալ նորից</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("dialogue")}
                    className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all"
                  >
                    Վերադառնալ երկխոսությանը
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-400">
        <p>
          🇪🇸 Aprende Español con Diálogos Reales • 🇦🇲 Իսպաներեն-հայերեն ուսուցողական հավելված
        </p>
      </footer>
    </div>
  );
}
