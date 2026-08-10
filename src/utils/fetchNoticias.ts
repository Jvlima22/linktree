export interface NewsItem {
  id: string;
  tag: string;
  data: string;
  titulo: string;
  link: string;
  img?: string;
}

function formatDate(dateInput?: string): string {
  if (!dateInput) return '2026';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '2026';
  const month = d
    .toLocaleDateString('pt-BR', { month: 'short' })
    .replace('.', '')
    .toUpperCase();
  return `${month} / ${d.getFullYear()}`;
}

// Utilitário para traduzir o título para Português (PT-BR) de forma rápida e transparente
async function translateToPt(text: string): Promise<string> {
  if (!text) return text;
  // Se já contiver caracteres acentuados típicos do português, não precisa traduzir
  if (/[\u00C0-\u00FF]/.test(text)) return text;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt`
    );
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

export async function getNoticiasTech(): Promise<NewsItem[]> {
  try {
    const googleOpenAI = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      'https://news.google.com/rss/search?q=OpenAI+ChatGPT&hl=pt-BR&gl=BR&ceid=BR:pt-419'
    )}`;
    const googleAnthropic = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      'https://news.google.com/rss/search?q=Anthropic+Claude&hl=pt-BR&gl=BR&ceid=BR:pt-419'
    )}`;

    const results = await Promise.allSettled([
      // 1. Feeds RSS em Português / Oficiais (OpenAI & Anthropic)
      fetch(googleOpenAI).then((r) => r.json()),
      fetch(googleAnthropic).then((r) => r.json()),

      // 2. Dev.to API (Claude & OpenAI)
      fetch('https://dev.to/api/articles?tag=claude&per_page=3').then((r) =>
        r.json()
      ),
      fetch('https://dev.to/api/articles?tag=openai&per_page=3').then((r) =>
        r.json()
      ),

      // 3. Algolia Hacker News API (Claude & OpenAI)
      fetch(
        'https://hn.algolia.com/api/v1/search_by_date?query=Claude+Anthropic&tags=story&hitsPerPage=2'
      ).then((r) => r.json()),
      fetch(
        'https://hn.algolia.com/api/v1/search_by_date?query=OpenAI+ChatGPT&tags=story&hitsPerPage=2'
      ).then((r) => r.json()),
    ]);

    const rawNews: NewsItem[] = [];

    // 1. Processa Google News / RSS OpenAI em Português
    if (results[0].status === 'fulfilled' && results[0].value?.items) {
      results[0].value.items.slice(0, 2).forEach((item: any) => {
        const cleanTitle = (item.title || '').replace(/\s*-\s*[^-]+$/, '');
        rawNews.push({
          id: `rss-openai-${Math.random().toString(36).substring(2, 7)}`,
          tag: '#OPENAI',
          data: formatDate(item.pubDate),
          titulo: cleanTitle,
          link: item.link,
        });
      });
    }

    // Processa Google News / RSS Anthropic em Português
    if (results[1].status === 'fulfilled' && results[1].value?.items) {
      results[1].value.items.slice(0, 2).forEach((item: any) => {
        const cleanTitle = (item.title || '').replace(/\s*-\s*[^-]+$/, '');
        rawNews.push({
          id: `rss-anthropic-${Math.random().toString(36).substring(2, 7)}`,
          tag: '#ANTHROPIC',
          data: formatDate(item.pubDate),
          titulo: cleanTitle,
          link: item.link,
        });
      });
    }

    // 2. Processa Dev.to (Claude)
    if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) {
      results[2].value.slice(0, 2).forEach((item: any) => {
        rawNews.push({
          id: `dev-claude-${item.id}`,
          tag: '#CLAUDE',
          data: formatDate(item.published_at),
          titulo: item.title,
          link: item.canonical_url || item.url,
          img: item.cover_image || item.social_image,
        });
      });
    }

    // Processa Dev.to (OpenAI)
    if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) {
      results[3].value.slice(0, 2).forEach((item: any) => {
        rawNews.push({
          id: `dev-openai-${item.id}`,
          tag: '#OPENAI',
          data: formatDate(item.published_at),
          titulo: item.title,
          link: item.canonical_url || item.url,
          img: item.cover_image || item.social_image,
        });
      });
    }

    // 3. Processa Hacker News (Claude)
    if (results[4].status === 'fulfilled' && results[4].value?.hits) {
      results[4].value.hits.slice(0, 2).forEach((item: any) => {
        rawNews.push({
          id: `hn-claude-${item.objectID}`,
          tag: '#ANTHROPIC',
          data: formatDate(item.created_at),
          titulo: item.title,
          link: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
        });
      });
    }

    // Processa Hacker News (OpenAI)
    if (results[5].status === 'fulfilled' && results[5].value?.hits) {
      results[5].value.hits.slice(0, 2).forEach((item: any) => {
        rawNews.push({
          id: `hn-openai-${item.objectID}`,
          tag: '#OPENAI',
          data: formatDate(item.created_at),
          titulo: item.title,
          link: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
        });
      });
    }

    // Limita a no máximo 6 notícias principais antes da tradução para melhor performance
    const selectedNews = rawNews.slice(0, 6);

    const translatedNews = await Promise.all(
      selectedNews.map(async (item) => ({
        ...item,
        titulo: await translateToPt(item.titulo),
      }))
    );

    return translatedNews;
  } catch (error) {
    console.error('Erro ao buscar notícias em português:', error);
    return [];
  }
}
