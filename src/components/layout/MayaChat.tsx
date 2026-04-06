import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Minus,
  Sparkles,
  MessageCircle,
  BookOpen,
  Trophy,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import mayaAvatar from '../../assets/images/maya.png';

type TabId = 'chat' | 'education' | 'quiz';

interface Message {
  id: number;
  from: 'maya' | 'user';
  text: string;
  time: string;
}

const quickActions = [
  'Ouvrir un compte',
  'Suivre ma demande',
  'Simuler un prêt',
  "Horaires d'ouverture",
  'Contacter un conseiller',
];

const autoReplies: Record<string, string> = {
  'ouvrir un compte':
    "Bonne idée ! Vous pouvez ouvrir un compte en ligne depuis notre formulaire. Les dépôts initiaux varient selon le type de compte (à partir de 10 000 FCFA pour plusieurs offres). Souhaitez-vous le lien vers la page d’ouverture ?",
  'suivre ma demande':
    "Pour suivre votre demande, utilisez la page « Suivre ma demande » avec votre référence CMF ou votre e-mail.",
  'simuler un prêt':
    "Vous pouvez simuler un crédit depuis votre espace connecté (menu Crédit) : tableau d’amortissement et demande en ligne. Indiquez le montant et la durée qui vous intéressent !",
  "horaires d'ouverture":
    "Nos agences sont en général ouvertes du lundi au vendredi (horaires affichés sur la page Contact). Le centre d’assistance peut vous aider par téléphone.",
  'contacter un conseiller':
    "Vous pouvez nous joindre via la page Contact ou demander un rappel. Je peux aussi vous orienter vers les bonnes rubriques du site.",
};

const educationTopics = [
  {
    id: 'budget',
    title: 'Budget et enveloppes',
    summary: 'Répartir vos revenus et suivre vos dépenses par catégorie.',
    content:
      "Fixez un budget mensuel par poste (logement, transport, alimentation…). L’idée des « enveloppes » : vous ne dépensez pas plus que ce qui est prévu dans chaque catégorie. Utilisez le Planner budget dans votre espace client pour saisir vos dépenses et voir où va l’argent.",
  },
  {
    id: 'epargne',
    title: 'Épargne de précaution',
    summary: 'Constituez un matelas pour les imprévus.',
    content:
      "L’objectif classique est de couvrir 3 à 6 mois de charges essentielles. Commencez petit, avec un virement automatique vers un compte épargne, puis augmentez progressivement. Coris Meso Finance propose des comptes épargne adaptés à votre profil.",
  },
  {
    id: 'credit',
    title: 'Comprendre un crédit',
    summary: 'Taux, durée, mensualité et coût total.',
    content:
      "La mensualité dépend du montant, du taux annuel et de la durée. Plus la durée est longue, plus les mensualités baissent, mais le coût total des intérêts augmente. Consultez toujours le tableau d’amortissement avant de vous engager. Ne contractez un crédit que si le reste à vivre reste confortable.",
  },
  {
    id: 'frais',
    title: 'Frais et pièges à éviter',
    summary: 'Lire les conditions avant de signer.',
    content:
      "Vérifiez les frais de dossier, d’assurance, de retard et les pénalités de remboursement anticipé. Méfiez-vous des offres trop urgentes sans document écrit. En cas de doute, demandez l’avis d’un conseiller en agence.",
  },
  {
    id: 'securite',
    title: 'Sécurité bancaire',
    summary: 'Protéger vos codes et vos données.',
    content:
      "Ne communiquez jamais votre mot de passe ou OTP par téléphone ou e-mail. Coris Meso Finance ne vous demandera pas ces informations hors canaux sécurisés. Utilisez des mots de passe uniques et activez les alertes sur vos opérations.",
  },
];

const quizQuestions = [
  {
    q: 'Qu’est-ce que le « reste à vivre » ?',
    options: [
      "L’argent qu'il reste après impôts et charges fixes",
      'Le total de tous vos comptes',
      'Uniquement votre salaire net',
    ],
    correct: 0,
  },
  {
    q: 'Qu’est-ce que le TAEG (ou coût total du crédit) permet de comparer ?',
    options: [
      'Le nombre de mois du prêt',
      'Le coût global du crédit sur une base annuelle',
      'Uniquement le taux d’intérêt nominal',
    ],
    correct: 1,
  },
  {
    q: 'Quelle bonne pratique pour l’épargne de précaution ?',
    options: [
      'Tout mettre sur un seul compte courant',
      'Viser 3 à 6 mois de charges essentielles de côté',
      "Ne jamais toucher à l'épargne même en cas d'urgence",
    ],
    correct: 1,
  },
  {
    q: 'Avant de signer un crédit, il est recommandé de…',
    options: [
      'Se fier uniquement à la mensualité la plus basse',
      'Lire le tableau d’amortissement et le coût total des intérêts',
      'Ignorer les frais de dossier',
    ],
    correct: 1,
  },
];

function getReply(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [key, reply] of Object.entries(autoReplies)) {
    if (lower.includes(key) || key.includes(lower)) return reply;
  }
  if (lower.includes('merci')) return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊";
  if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello'))
    return "Bonjour ! Je suis Maya, votre assistante financière virtuelle. Comment puis-je vous aider aujourd'hui ?";
  if (lower.includes('prêt') || lower.includes('credit') || lower.includes('crédit'))
    return "Nous proposons plusieurs types de crédits (consommation, immobilier, véhicule…). Vous pouvez simuler et déposer une demande depuis l’espace client. Quel sujet vous intéresse ?";
  if (lower.includes('carte'))
    return "Nous proposons des cartes VISA et cartes prépayées avec des plafonds adaptés. Souhaitez-vous des précisions sur une carte en particulier ?";
  return "Je comprends votre demande. Pour une réponse personnalisée, contactez notre service client ou rendez-vous en agence. Puis-je vous aider autrement ?";
}

function now() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function MayaChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [tab, setTab] = useState<TabId>('chat');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(educationTopics[0].id);

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const openChat = () => {
    setOpen(true);
    setShowBubble(false);
    setMinimized(false);
    if (!hasGreeted) {
      setMessages([
        {
          id: 1,
          from: 'maya',
          text: "Bonjour ! 👋 Je suis Maya, votre assistante financière virtuelle chez Coris Meso Finance. Comment puis-je vous aider ?",
          time: now(),
        },
      ]);
      setHasGreeted(true);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, from: 'maya', text: getReply(text), time: now() };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 800 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizDone(false);
    setSelectedOption(null);
  };

  const answerQuiz = (index: number) => {
    if (selectedOption !== null || quizDone) return;
    setSelectedOption(index);
    const correct = quizQuestions[quizStep].correct === index;
    if (correct) setQuizScore((s) => s + 1);
    setTimeout(() => {
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep((s) => s + 1);
        setSelectedOption(null);
      } else {
        setQuizDone(true);
      }
    }, 600);
  };

  const tabs: { id: TabId; label: string; icon: typeof MessageCircle }[] = [
    { id: 'chat', label: 'Conseillère', icon: MessageCircle },
    { id: 'education', label: 'Éducation', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: Trophy },
  ];

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showBubble && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 p-4 max-w-[260px] cursor-pointer"
              onClick={openChat}
            >
              <p className="text-sm text-coris-navy font-medium leading-snug">
                Bonjour ! 👋 Je suis <strong>Maya</strong>, votre <strong>assistante financière virtuelle</strong> — chat, pédagogie et quiz.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <motion.button
            onClick={openChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 rounded-full shadow-2xl shadow-coris-blue/30 overflow-hidden border-3 border-white group"
          >
            <img src={mayaAvatar} alt="Maya, assistante financière virtuelle" className="w-full h-full object-cover" />
            <span className="absolute inset-0 rounded-full border-2 border-coris-red animate-ping opacity-30" />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`fixed z-50 bg-white shadow-2xl shadow-black/15 border border-gray-200 flex flex-col overflow-hidden ${
              minimized
                ? 'bottom-5 right-5 w-72 h-14 rounded-2xl'
                : 'bottom-5 right-5 w-[400px] h-[min(92vh,640px)] rounded-3xl sm:max-h-[92vh]'
            } max-sm:inset-2 max-sm:w-auto max-sm:h-auto max-sm:rounded-2xl`}
          >
            <div
              className="bg-gradient-to-r from-coris-blue to-coris-blue-dark px-4 py-3 flex items-center gap-3 shrink-0 cursor-pointer"
              onClick={() => minimized && setMinimized(false)}
            >
              <div className="relative shrink-0">
                <img src={mayaAvatar} alt="Maya, assistante financière virtuelle" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-coris-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-white font-bold text-sm">Maya</h4>
                  <Sparkles size={12} className="text-coris-gold" />
                </div>
                <p className="text-white/50 text-[10px]">Assistante financière virtuelle</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinimized(!minimized);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                <div className="flex border-b border-gray-100 bg-coris-gray/40 px-2 pt-2 gap-1 shrink-0">
                  {tabs.map((t) => {
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2.5 px-1 rounded-t-xl text-[10px] sm:text-xs font-bold transition-all ${
                          active
                            ? 'bg-white text-coris-blue shadow-sm border border-b-0 border-gray-100'
                            : 'text-coris-gray-dark hover:text-coris-navy'
                        }`}
                      >
                        <Icon size={14} className="shrink-0" />
                        <span className="leading-tight text-center">{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  {tab === 'chat' && (
                    <>
                      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-coris-gray/30">
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex gap-2.5 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'maya' && (
                              <img src={mayaAvatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
                            )}
                            <div className={`max-w-[75%] ${msg.from === 'user' ? 'order-first' : ''}`}>
                              <div
                                className={`px-4 py-2.5 text-sm leading-relaxed ${
                                  msg.from === 'user'
                                    ? 'bg-coris-blue text-white rounded-2xl rounded-br-md'
                                    : 'bg-white text-coris-navy rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                                }`}
                              >
                                {msg.text}
                              </div>
                              <p
                                className={`text-[10px] mt-1 ${
                                  msg.from === 'user' ? 'text-right text-gray-400' : 'text-gray-400'
                                }`}
                              >
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        ))}

                        {typing && (
                          <div className="flex gap-2.5">
                            <img src={mayaAvatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
                            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                          </div>
                        )}

                        {messages.length <= 2 && !typing && (
                          <div className="pt-2">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                              Suggestions
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {quickActions.map((action) => (
                                <button
                                  key={action}
                                  type="button"
                                  onClick={() => sendMessage(action)}
                                  className="text-xs bg-white border border-gray-200 text-coris-navy font-medium px-3 py-1.5 rounded-full hover:border-coris-blue/30 hover:bg-coris-blue/5 transition-colors"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
                        <div className="flex items-center gap-2">
                          <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Posez votre question…"
                            className="flex-1 bg-coris-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/15 placeholder:text-gray-400"
                          />
                          <button
                            type="submit"
                            disabled={!input.trim()}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              input.trim()
                                ? 'bg-coris-blue text-white hover:bg-coris-blue-dark shadow-md shadow-coris-blue/20'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <Send size={16} />
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-400 text-center mt-2">
                          Maya est votre assistante financière virtuelle (réponses automatisées) — pour un conseil personnalisé, un conseiller humain reste disponible.
                        </p>
                      </form>
                    </>
                  )}

                  {tab === 'education' && (
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-coris-gray/20">
                      <p className="text-[11px] text-coris-gray-dark mb-2">
                        Fiches courtes pour mieux gérer votre argent au quotidien.
                      </p>
                      {educationTopics.map((topic) => {
                        const open = expandedTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setExpandedTopic(open ? null : topic.id)}
                            className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-coris-blue/25 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2 px-3 py-3">
                              <div>
                                <p className="text-sm font-bold text-coris-navy">{topic.title}</p>
                                <p className="text-[11px] text-coris-gray-dark mt-0.5">{topic.summary}</p>
                              </div>
                              <ChevronRight
                                size={18}
                                className={`text-coris-blue shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
                              />
                            </div>
                            <AnimatePresence>
                              {open && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-gray-50"
                                >
                                  <p className="px-3 pb-3 text-xs text-coris-gray-dark leading-relaxed">{topic.content}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {tab === 'quiz' && (
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col bg-coris-gray/20">
                      {!quizDone ? (
                        <>
                          <div className="flex justify-between items-center text-[11px] text-coris-gray-dark mb-3">
                            <span>
                              Question {quizStep + 1} / {quizQuestions.length}
                            </span>
                            <span className="font-mono text-coris-blue">{quizScore} pt</span>
                          </div>
                          <p className="text-sm font-bold text-coris-navy mb-4">{quizQuestions[quizStep].q}</p>
                          <div className="space-y-2">
                            {quizQuestions[quizStep].options.map((opt, i) => {
                              const revealed = selectedOption !== null;
                              const correctIdx = quizQuestions[quizStep].correct;
                              const isCorrect = i === correctIdx;
                              const isWrongPick = revealed && selectedOption === i && i !== correctIdx;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  disabled={revealed}
                                  onClick={() => answerQuiz(i)}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                                    revealed && isCorrect
                                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                      : isWrongPick
                                        ? 'border-red-300 bg-red-50 text-red-900'
                                        : 'border-gray-200 bg-white hover:border-coris-blue/40 text-coris-navy'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <CheckCircle2 className="text-emerald-600" size={36} />
                          </div>
                          <p className="text-lg font-black text-coris-navy mb-1">Bravo !</p>
                          <p className="text-sm text-coris-gray-dark mb-2">
                            Vous avez obtenu <strong className="text-coris-blue">{quizScore}</strong> /{' '}
                            {quizQuestions.length} bonnes réponses.
                          </p>
                          <p className="text-xs text-coris-gray-dark mb-6 max-w-[280px]">
                            Continuez à utiliser l’éducation financière et n’hésitez pas à demander à Maya en cas de doute.
                          </p>
                          <button
                            type="button"
                            onClick={resetQuiz}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coris-blue text-white text-sm font-bold hover:bg-coris-blue-dark"
                          >
                            <RotateCcw size={16} />
                            Rejouer le quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
