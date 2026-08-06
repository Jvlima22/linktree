import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import avatarAsset from "@/assets/avatar.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

// ─── Produtos ──────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "operacao-resgate",
    title: "Operação Resgate",
    description: "Desafio de 7 dias para salvar seu negócio físico da crise digital.",
    price: "R$ 37,90",
    href: "https://operacaoresgate.vercel.app",
    kind: "Produto Digital",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663699984916/yAZfuScVThGbvxvg.svg",
  },
];

// ─── Sistemas ──────────────────────────────────────────────────
const SYSTEMS = [
  {
    id: "captu",
    name: "Captu",
    sub: "Inteligência de Mercado",
    href: "https://captu.vercel.app",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663699984916/ZEHTPiKwKrXxfFzX.png",
  },
  {
    id: "fury-ads",
    name: "Fury Ads API",
    sub: "Monitore campanhas e violações",
    href: "https://fury-ads-api.vercel.app",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663699984916/UUyqMsTpicHYuHJg.png",
  },
  {
    id: "vintech",
    name: "Vintech",
    sub: "Gestão Vinícola Integrada",
    href: "https://vintech-nine.vercel.app",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663699984916/BDlnNGAjNnbfmeve.svg",
  },
  {
    id: "tls-barber",
    name: "TLS Barber",
    sub: "Gestão para Barbearias",
    href: "https://tls-barber.vercel.app",
    logo: "https://tls-barber.vercel.app/Logo.svg",
  },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/jotadev",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/jotadev",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@jotadev",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1.01.03-1.51.14-1.73 1.08-3.39 2.53-4.51 1.36-1.06 3.09-1.54 4.79-1.57.23-.01.46-.02.7-.02v4.03c-.27.01-.54.05-.81.11-.75.17-1.41.56-1.86 1.19-.46.65-.64 1.45-.55 2.23.09.76.48 1.48 1.08 1.97.58.48 1.34.74 2.1.74.77 0 1.52-.27 2.1-.75.6-.49.99-1.21 1.08-1.97.09-.78-.09-1.58-.55-2.23-.45-.63-1.11-1.02-1.86-1.19-.27-.06-.54-.1-.81-.11V.02z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/5511999999999?text=Oi%20Jota!%20Vim%20pelo%20seu%20link%20na%20bio%20%F0%9F%91%8B",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6px 0 0 0;" />
        <path d="M12.04 2.001c-5.518 0-10.002 4.484-10.002 10.002 0 1.766.463 3.485 1.342 4.997l-1.764 6.435 6.585-1.724a9.966 9.966 0 003.839.765c5.517 0 10.001-4.484 10.001-10.002 0-5.518-4.484-10.002-10.001-10.002zm0 18.338a8.32 8.32 0 01-3.202-.637l-.23-.115-3.827 1.003 1.025-3.744-.151-.24a8.336 8.336 0 01-1.128-4.178c0-4.601 3.74-8.342 8.342-8.342s8.342 3.741 8.342 8.342-3.741 8.343-8.342 8.343z" />
      </svg>
    ),
  },
];

export const Route = createFileRoute("/")({
  component: BioPage,
});

type Item = {
  id: string;
  kind: "curso" | "ferramenta" | "consultoria";
  title: string;
  price?: string;
  cta: string;
  href: string;
  tags: string[];
  reason: string;
};

const ITEMS: Item[] = [
  {
    id: "kit-sobrevivencia",
    kind: "e-book",
    title: "Kit de Sobrevivência da IA 2026",
    price: "R$ 37",
    cta: "Baixar agora",
    href: "#",
    tags: ["iniciante", "pesquisa", "gratuito"],
    reason:
      "Você quer começar do zero sem gastar muito. Um guia prático com os 10 prompts essenciais + link de afiliado Perplexity.",
  },
  {
    id: "prompt-pro",
    kind: "curso",
    title: "Prompt Engineering Pro",
    price: "R$ 197",
    cta: "Começar agora",
    href: "#",
    tags: ["produtividade", "conteudo", "curso"],
    reason:
      "Você quer produzir mais conteúdo e código com IA. Frameworks de prompts que geram posts, artigos e scripts em segundos.",
  },
  {
    id: "workflow-zero",
    kind: "template",
    title: "Workflow Zero: Automações Prontas",
    price: "R$ 247",
    cta: "Liberar templates",
    href: "#",
    tags: ["produtividade", "automacao", "curso"],
    reason:
      "Você quer automatizar tarefas repetitivas. 3 blueprints prontos com tutoriais de agentes que rodam sozinhos.",
  },
  {
    id: "mastering-agents",
    kind: "curso",
    title: "Mastering Agents: Automação Total",
    price: "R$ 497",
    cta: "Comprar agora",
    href: "#",
    tags: ["automacao", "avancado", "mentoria"],
    reason:
      "Você já constrói com IA e quer escalar. Curso avançado que ensina a montar agentes autônomos para operação completa.",
  },
  {
    id: "consultoria-estrategica",
    kind: "consultoria",
    title: "Consultoria Estratégica 1:1",
    price: "R$ 2.500",
    cta: "Agendar diagnóstico",
    href: "#agenda",
    tags: ["negocio", "estrategia", "mentoria"],
    reason:
      "Você lidera um negócio e precisa de implantação de IA com governança, segurança e adoção da equipe. Plano sob medida.",
  },
];

type Question = { id: string; prompt: string; options: { label: string; tags: string[] }[] };

const QUESTIONS: Question[] = [
  {
    id: "nivel",
    prompt: "Qual seu nível atual com IA?",
    options: [
      { label: "Curioso — mal usei ChatGPT", tags: ["iniciante"] },
      { label: "Uso no dia a dia, quero avançar", tags: ["produtividade"] },
      { label: "Já construo com IA, quero escalar", tags: ["avancado"] },
    ],
  },
  {
    id: "objetivo",
    prompt: "Qual seu principal objetivo agora?",
    options: [
      { label: "Automatizar tarefas repetitivas", tags: ["automacao"] },
      { label: "Produzir mais conteúdo/código", tags: ["conteudo"] },
      { label: "Definir estratégia de IA no negócio", tags: ["negocio"] },
      { label: "Pesquisar e aprender mais rápido", tags: ["pesquisa"] },
    ],
  },
  {
    id: "investimento",
    prompt: "Quanto você quer investir agora?",
    options: [
      { label: "Só ferramentas grátis/baratas", tags: ["gratuito"] },
      { label: "Um curso ou template (até R$ 500)", tags: ["curso"] },
      { label: "Mentoria direta com especialista", tags: ["mentoria"] },
    ],
  },
];

// Mapeamento 1:1 — cada combinação de cenário aponta para um produto específico
type ScenarioKey = string;
const SCENARIO_MAP: Record<ScenarioKey, string> = {
  // Iniciante + Pesquisa + Grátis → Kit de Sobrevivência
  "iniciante|pesquisa|gratuito": "kit-sobrevivencia",
  // Iniciante + Conteúdo + Grátis → Kit de Sobrevivência
  "iniciante|conteudo|gratuito": "kit-sobrevivencia",
  // Iniciante + Automação + Grátis → Kit de Sobrevivência
  "iniciante|automacao|gratuito": "kit-sobrevivencia",
  // Iniciante + Estratégia + Grátis → Kit de Sobrevivência
  "iniciante|negocio|gratuito": "kit-sobrevivencia",
  // Produtividade + Automação + Curso → Workflow Zero
  "produtividade|automacao|curso": "workflow-zero",
  // Produtividade + Conteúdo + Curso → Prompt Engineering Pro
  "produtividade|conteudo|curso": "prompt-pro",
  // Produtividade + Pesquisa + Curso → Prompt Engineering Pro
  "produtividade|pesquisa|curso": "prompt-pro",
  // Produtividade + Estratégia + Curso → Workflow Zero
  "produtividade|negocio|curso": "workflow-zero",
  // Avançado + Automação + Curso → Mastering Agents
  "avancado|automacao|curso": "mastering-agents",
  // Avançado + Conteúdo + Curso → Mastering Agents
  "avancado|conteudo|curso": "mastering-agents",
  // Avançado + Pesquisa + Curso → Mastering Agents
  "avancado|pesquisa|curso": "mastering-agents",
  // Avançado + Estratégia + Curso → Mastering Agents
  "avancado|negocio|curso": "mastering-agents",
  // Qualquer + Estratégia + Mentoria → Consultoria Estratégica
  "iniciante|negocio|mentoria": "consultoria-estrategica",
  "produtividade|negocio|mentoria": "consultoria-estrategica",
  "avancado|negocio|mentoria": "consultoria-estrategica",
  // Qualquer + Automação + Mentoria → Mastering Agents
  "iniciante|automacao|mentoria": "mastering-agents",
  "produtividade|automacao|mentoria": "mastering-agents",
  "avancado|automacao|mentoria": "mastering-agents",
  // Qualquer + Conteúdo + Mentoria → Mastering Agents
  "iniciante|conteudo|mentoria": "mastering-agents",
  "produtividade|conteudo|mentoria": "mastering-agents",
  "avancado|conteudo|mentoria": "mastering-agents",
  // Qualquer + Pesquisa + Mentoria → Consultoria Estratégica
  "iniciante|pesquisa|mentoria": "consultoria-estrategica",
  "produtividade|pesquisa|mentoria": "consultoria-estrategica",
  "avancado|pesquisa|mentoria": "consultoria-estrategica",
};

function recommend(selectedTags: string[]): Item {
  // Extrai tags por categoria (nivel, objetivo, investimento)
  const levelTag = selectedTags.find((t) => ["iniciante", "produtividade", "avancado"].includes(t)) ?? "produtividade";
  const goalTag = selectedTags.find((t) => ["automacao", "conteudo", "negocio", "pesquisa"].includes(t)) ?? "conteudo";
  const investTag = selectedTags.find((t) => ["gratuito", "curso", "mentoria"].includes(t)) ?? "curso";

  // Monta a chave do cenário
  const key = `${levelTag}|${goalTag}|${investTag}`;

  // Tenta match exato
  if (SCENARIO_MAP[key]) {
    const found = ITEMS.find((it) => it.id === SCENARIO_MAP[key]);
    if (found) return found;
  }

  // Fallback: score por tags (mantém lógica original como segurança)
  const scored = ITEMS.map((it) => ({
    item: it,
    score: it.tags.reduce((s, t) => s + (selectedTags.includes(t) ? 1 : 0), 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].item;
}

const NEWS = [
  {
    tag: "#NEURAL-LINK",
    title: "OpenAI anuncia integração direta com córtex pré-frontal via BCI",
    date: "MAR / 2026",
    img: news1,
  },
  {
    tag: "#GOVERNANÇA",
    title: "Primeira Lei de Imposto sobre Processamento é aprovada na UE",
    date: "FEV / 2026",
    img: news2,
  },
  {
    tag: "#HARDWARE",
    title: "Chips quânticos híbridos derrubam custo de inferência em 98%",
    date: "JAN / 2026",
    img: news3,
  },
];

const TOOLS = [
  { name: "Perplexity Pro", sub: "Search do futuro", logo: "PX" },
  { name: "Claude Sonnet 4.5", sub: "Reasoning avançado", logo: "CL" },
  { name: "Cursor", sub: "IDE nativo em IA", logo: "CR" },
  { name: "ElevenLabs v3", sub: "Voz sintética viva", logo: "EL" },
];

const WA_NUMBER = "5511999999999";
const WA_MSG = encodeURIComponent("Oi Jota! Vim pelo seu link na bio 👋");

function BioPage() {
  const [step, setStep] = useState<"idle" | "quiz" | "result">("idle");
  const [answers, setAnswers] = useState<string[][]>([]);
  const current = answers.length;

  const recommendation = useMemo(() => {
    if (step !== "result") return null;
    return recommend(answers.flat());
  }, [step, answers]);

  function startQuiz() {
    setAnswers([]);
    setStep("quiz");
  }

  function answer(tags: string[]) {
    const next = [...answers, tags];
    setAnswers(next);
    if (next.length >= QUESTIONS.length) setStep("result");
  }

  function reset() {
    setAnswers([]);
    setStep("idle");
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-28 md:max-w-md md:mx-auto selection:bg-accent/30">
      <header className="space-y-6 pt-8 animate-entrance">
        <div className="flex items-start justify-between">
          <div className="relative">
            <img
              src={avatarAsset}
              alt="Jota Dev"
              width={80}
              height={80}
              className="size-20 rounded-xl object-cover outline outline-1 outline-offset-2 outline-accent/20"
            />
            <div className="absolute -bottom-1 -right-1 size-4 bg-accent rounded-full border-2 border-background" />
          </div>
          <div className="text-right font-mono text-[10px] space-y-1">
            <p className="text-accent uppercase tracking-tighter flex items-center gap-1.5 justify-end">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
              />
              Status: Conectado
            </p>
            <p className="text-muted-foreground">V.2026.4.12</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-extrabold tracking-tight italic">
              jotadev.ai
            </h1>
            <span className="px-1.5 py-0.5 rounded border border-accent/30 text-[9px] font-mono text-accent uppercase">
              Expert L3
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed text-pretty">
            Traduzindo o caos do silício em estratégia. Criador do framework{" "}
            <span className="text-foreground font-mono">[SENTIENT-UX]</span>.
          </p>
        </div>
      </header>

      <section className="mt-6 animate-entrance" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="size-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6 animate-entrance" style={{ animationDelay: "100ms" }}>
        <div className="p-5 rounded-2xl bg-card border border-border relative overflow-hidden">
          <div className="flex items-center gap-2 text-accent mb-3">
            <span
              className="size-2 bg-accent rounded-full"
              style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-widest">IA Concierge</span>
          </div>

          {step === "idle" && (
            <>
              <h2 className="text-lg font-display font-bold mb-1">Descubra o ideal para você</h2>
              <p className="text-xs text-muted-foreground mb-5">
                Responda 3 perguntas e receba uma curadoria imediata.
              </p>
              <button
                onClick={startQuiz}
                className="w-full py-3 bg-foreground text-background font-display font-bold rounded-lg transition-transform active:scale-[0.98] hover:bg-foreground/90"
              >
                Iniciar Diagnóstico IA
              </button>
              <div className="flex justify-center gap-1 mt-4">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="h-1 w-8 rounded-full bg-zinc-800" />
                ))}
              </div>
            </>
          )}

          {step === "quiz" && (
            <div key={current}>
              <p className="font-mono text-[10px] text-muted-foreground mb-2">
                Pergunta {current + 1} de {QUESTIONS.length}
              </p>
              <h2 className="text-base font-display font-bold mb-4 leading-snug">
                {QUESTIONS[current].prompt}
              </h2>
              <div className="space-y-2">
                {QUESTIONS[current].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => answer(opt.tags)}
                    className="w-full text-left p-3 rounded-lg bg-background border border-border hover:border-accent/60 hover:bg-accent/5 transition-colors text-sm"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-1 mt-5">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-8 rounded-full transition-colors ${
                      i <= current ? "bg-accent" : "bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "result" && recommendation && (
            <div className="animate-entrance">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">
                → Recomendação para você
              </p>
              <h3 className="text-xl font-display font-extrabold leading-tight mb-2">
                {recommendation.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{recommendation.reason}</p>
              <div className="flex items-center gap-3 mb-4">
                {recommendation.price && (
                  <span className="text-lg font-bold">{recommendation.price}</span>
                )}
                <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-[10px] font-mono uppercase text-accent">
                  {recommendation.kind}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={recommendation.href}
                  className="flex-1 py-3 text-center bg-accent text-accent-foreground rounded-lg font-bold text-sm uppercase tracking-wide"
                >
                  {recommendation.cta}
                </a>
                <button
                  onClick={reset}
                  className="px-4 py-3 border border-border rounded-lg font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground"
                >
                  Refazer
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mt-12 space-y-4 animate-entrance" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-end px-1">
          <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold">
            Signal: Notícias 2026
          </h3>
          <span className="text-[10px] text-accent cursor-pointer">Ver todas</span>
        </div>

        <div className="space-y-3">
          {NEWS.map((n) => (
            <a
              key={n.title}
              href="#"
              className="group p-3 rounded-xl border border-border bg-card/50 flex gap-4 items-center transition-colors hover:border-accent/40"
            >
              <img
                src={n.img}
                alt=""
                loading="lazy"
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-lg object-cover"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-accent">{n.tag}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{n.date}</span>
                </div>
                <h4 className="text-sm font-semibold leading-tight text-pretty">{n.title}</h4>
                <p className="text-[11px] text-muted-foreground group-hover:text-accent transition-colors">
                  Leia agora →
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-4 animate-entrance" style={{ animationDelay: "300ms" }}>
        <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold px-1">
          Catálogo de Produtos
        </h3>
        <div className="space-y-3">
          {ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:border-accent/40 transition-colors"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded border border-accent/30 text-[9px] font-mono text-accent uppercase">
                    {item.kind}
                  </span>
                </div>
                <h4 className="text-sm font-bold leading-tight text-pretty">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.reason}</p>
              </div>
              <div className="text-right shrink-0">
                {item.price && (
                  <p className="text-sm font-bold text-accent">{item.price}</p>
                )}
                <p className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors mt-1">
                  {item.cta} →
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Produtos Próprios ─── */}
      <section className="mt-12 space-y-4 animate-entrance" style={{ animationDelay: "380ms" }}>
        <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold px-1">
          Produtos
        </h3>
        <div className="space-y-3">
          {PRODUCTS.map((product) => (
            <a
              key={product.id}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:border-accent/40 transition-colors"
            >
              <div className="shrink-0">
                <img
                  src={product.logo}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="size-10 object-contain"
                />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <h4 className="text-sm font-bold leading-tight text-pretty">{product.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-snug">{product.description}</p>
              </div>
              <div className="text-right shrink-0">
                {product.price && (
                  <p className="text-sm font-bold text-accent">{product.price}</p>
                )}
                <p className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors mt-1">
                  Ver produto →
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Sistemas ─── */}
      <section className="mt-12 space-y-4 animate-entrance" style={{ animationDelay: "420ms" }}>
        <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold px-1">
          Sistemas
        </h3>
        <div className="space-y-2">
          {SYSTEMS.map((sys) => (
            <a
              key={sys.id}
              href={sys.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-card hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={sys.logo}
                  alt={`${sys.name} logo`}
                  width={36}
                  height={36}
                  className="size-9 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = document.createElement("span");
                    fallback.textContent = sys.name.slice(0, 2).toUpperCase();
                    fallback.className = "text-[10px] text-accent font-mono";
                    target.parentElement?.appendChild(fallback);
                  }}
                />
                <div>
                  <p className="text-sm font-semibold">{sys.name}</p>
                  <p className="text-[10px] text-muted-foreground">{sys.sub}</p>
                </div>
              </div>
              <button className="px-3 py-1 text-[10px] font-mono border border-border rounded-md hover:border-accent hover:text-accent transition-colors">
                ACESSAR →
              </button>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-4 animate-entrance" style={{ animationDelay: "500ms" }}>
        <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold px-1">
          Minha Stack (Afiliados)
        </h3>
        <div className="space-y-2">
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded bg-card grid place-items-center text-[10px] text-accent font-mono border border-border">
                  {t.logo}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.sub}</p>
                </div>
              </div>
              <button className="px-3 py-1 text-[10px] font-mono border border-border rounded-md hover:border-accent hover:text-accent transition-colors">
                TESTAR GRÁTIS
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="agenda"
        className="mt-12 space-y-4 animate-entrance"
        style={{ animationDelay: "600ms" }}
      >
        <h3 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold px-1">
          Consultoria 1:1
        </h3>
        <div className="relative overflow-hidden p-5 rounded-2xl bg-card border border-border">
          <div className="absolute top-0 right-0 p-3 font-mono text-2xl font-black opacity-5 uppercase select-none">
            AI-05
          </div>
          <div className="relative">
            <p className="text-sm mb-2">
              Sessão de 60 minutos com diagnóstico completo e roadmap escrito de implementação de IA no seu negócio.
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Ideal para líderes que precisam de governança, segurança de dados e plano de adoção.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-accent">R$ 2.500</span>
              <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-[10px] font-mono uppercase text-accent">
                High-Ticket
              </span>
            </div>
            <a
              href="#"
              className="block w-full py-3 text-center bg-foreground text-background rounded-lg font-bold text-sm"
            >
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-border text-center">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 jotadev.ai — Signal not noise
        </p>
      </footer>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-card/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-2 flex items-center justify-between gap-2 z-50">
        <a
          href="#agenda"
          className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl flex items-center justify-center gap-2"
        >
          <span className="font-mono text-[10px] text-muted-foreground">[01]</span>
          <span className="text-xs font-bold uppercase tracking-wide">Agenda</span>
        </a>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 bg-success text-success-foreground hover:opacity-90 transition-opacity rounded-xl flex items-center justify-center gap-2"
        >
          <span className="font-mono text-[10px] text-white/60">[02]</span>
          <span className="text-xs font-bold uppercase tracking-wide">WhatsApp</span>
        </a>
      </nav>

      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] overflow-hidden">
        <div className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent animate-scanline" />
      </div>
    </div>
  );
}
