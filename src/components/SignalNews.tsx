import { useEffect, useRef, useState } from "react";
import { getNoticiasTech, type NewsItem } from "@/utils/fetchNoticias";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const DEFAULT_IMAGES = [news1, news2, news3];

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "fb-1",
    tag: "#OPENAI",
    data: "MAR / 2026",
    titulo: "OpenAI anuncia integração direta com córtex pré-frontal via BCI",
    link: "https://openai.com",
    img: news1,
  },
  {
    id: "fb-2",
    tag: "#ANTHROPIC",
    data: "FEV / 2026",
    titulo: "Claude 3.7 Sonnet alcança pontuação histórica em raciocínio lógico",
    link: "https://anthropic.com",
    img: news2,
  },
  {
    id: "fb-3",
    tag: "#DEV-TO",
    data: "JAN / 2026",
    titulo: "Chips quânticos híbridos derrubam custo de inferência em 98%",
    link: "https://dev.to",
    img: news3,
  },
];

export function SignalNews() {
  const [noticias, setNoticias] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadNews() {
      try {
        setLoading(true);
        const data = await getNoticiasTech();
        if (isMounted) {
          if (data && data.length > 0) {
            setNoticias(data);
            setIsLive(true);
          } else {
            setNoticias(FALLBACK_NEWS);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
        if (isMounted) setNoticias(FALLBACK_NEWS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="news-container space-y-3">
      <div className="flex justify-between items-center px-1">
        <h4 className="font-mono text-[11px] uppercase text-muted-foreground tracking-widest font-bold flex items-center gap-2">
          SIGNAL: NOTÍCIAS 2026
          {isLive && (
            <span className="flex items-center gap-1 text-[9px] text-accent font-normal border border-accent/30 px-1.5 py-0.2 rounded-full">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Ao Vivo
            </span>
          )}
        </h4>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              getNoticiasTech().then((data) => {
                if (data && data.length > 0) {
                  setNoticias(data);
                  setIsLive(true);
                }
                setLoading(false);
              });
            }}
            className="text-[10px] text-accent cursor-pointer hover:underline font-mono bg-transparent border-none mr-1"
          >
            {loading ? "Atualizando..." : "Atualizar ↻"}
          </button>

          {/* Seta Esquerda */}
          <button
            type="button"
            aria-label="Notícia Anterior"
            onClick={() => scroll("left")}
            className="size-7 rounded-lg border border-border bg-card/80 flex items-center justify-center text-xs text-muted-foreground hover:text-accent hover:border-accent/40 active:scale-95 transition-all"
          >
            ←
          </button>
          
          {/* Seta Direita */}
          <button
            type="button"
            aria-label="Próxima Notícia"
            onClick={() => scroll("right")}
            className="size-7 rounded-lg border border-border bg-card/80 flex items-center justify-center text-xs text-muted-foreground hover:text-accent hover:border-accent/40 active:scale-95 transition-all"
          >
            →
          </button>
        </div>
      </div>

      {/* Carrossel Scroll Horizontal */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-1.5 -mx-1 px-1 select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading && noticias.length === 0 ? (
          // Skeleton Horizontal Cards
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-[260px] p-3.5 rounded-2xl border border-border bg-card/40 space-y-3 animate-pulse snap-start"
            >
              <div className="h-28 w-full bg-zinc-800/60 rounded-xl" />
              <div className="h-3 w-20 bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-3 w-16 bg-zinc-800 rounded" />
            </div>
          ))
        ) : (
          noticias.map((item, index) => {
            const displayImg = item.img || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-[260px] sm:w-[280px] snap-start group p-3 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-accent/40 transition-all flex flex-col justify-between gap-3"
              >
                {/* Imagem de Capa */}
                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-zinc-900 border border-border/40">
                  <img
                    src={displayImg}
                    alt={item.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge de Tag e Data sobrepostos */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-accent font-semibold px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm border border-accent/30 shadow-sm">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-mono text-white/80 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {item.data}
                    </span>
                  </div>
                </div>

                {/* Conteúdo da Notícia */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-3">
                    {item.titulo}
                  </h3>
                  
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground group-hover:text-accent transition-colors font-mono pt-1 border-t border-border/40">
                    <span>Leia agora</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
