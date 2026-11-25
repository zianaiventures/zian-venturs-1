export type EpisodeCategory = 'Entrepreneurs' | 'Investors' | 'Leaders' | 'Influencers';

export interface CommunityVideo {
  id: string;
  title: string;
  published: string;
  category: EpisodeCategory;
  series: string;
}

export const CHANNEL_HANDLE = '@ZIANAIVENTURES';
export const CHANNEL_ID = 'UCalhdJqPMHYjIM4U2ABze0g';

// `hl=en` is required: without it YouTube's edge answers this feed with a 404 page.
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}&hl=en`;

/**
 * Newest-first ids/titles from the channel. Used when the live feed is
 * unreachable so the carousel never renders empty.
 */
const FALLBACK_VIDEOS: Array<Pick<CommunityVideo, 'id' | 'title' | 'published'>> = [
  { id: '2sPfXgFL9s0', title: "Don't guess. get checked. put your health first.", published: '2026-10-23T14:30:02+00:00' },
  { id: 'vNB9TJzw0g4', title: 'Testosterone Boosters: Do They Really Work?', published: '2026-10-23T12:30:27+00:00' },
  { id: 'UwBnZuKHbEY', title: 'Kidney Stone Pain: Why Is It So Severe?', published: '2026-10-23T10:30:11+00:00' },
  { id: 'nlvZuu_-rHY', title: 'The Right Way to Use AI: Better Prompts, Smarter Businesses & Bigger Results | Yash Sanghavi', published: '2026-10-13T09:32:48+00:00' },
  { id: 'nQBoN8MA8BU', title: 'Female Athlete Triad: A Health Issue Every Female Athlete Should Know About', published: '2026-10-08T05:30:09+00:00' },
  { id: '703wXN4cP10', title: 'Knee Pain? It May Not Be Just About Your Knee.', published: '2026-10-07T12:30:06+00:00' },
  { id: 'mrhCp-nVKe4', title: 'Is the Deadlift Really Dangerous?', published: '2026-10-06T10:00:10+00:00' },
  { id: 'qGBQWufsEGs', title: 'Beyond Disability: Reclaiming Identity, Confidence & Possibility', published: '2026-10-06T08:45:13+00:00' },
  { id: 't30ofe0ijXc', title: 'The Biggest Myth Founders Have About Investors', published: '2026-09-30T08:30:45+00:00' },
  { id: 'D6Asln1lBbE', title: 'Investing With Clarity: Understanding Risk, Volatility & the Long Term', published: '2026-09-30T05:30:15+00:00' },
  { id: 'RGZNe7RSeLE', title: 'Starting From Zero Is Part of the Journey', published: '2026-09-29T07:19:35+00:00' },
  { id: 'fSk1IJa0hTM', title: 'Becoming a Porsche Trainer: Passion for Cars and Earning the Right Credentials', published: '2026-09-29T07:17:32+00:00' },
  { id: 'nPD2g-2fjX4', title: 'Money Wasn’t Enough. The Lesson Was Bigger.', published: '2026-09-29T07:11:49+00:00' },
  { id: 'TpyxPrkgLdA', title: '5 Hard Truths Every Young Founder Should Know | Startup, Money, POSH & AI', published: '2026-09-22T12:34:13+00:00' },
  { id: 'NZ3ylqqSOL8', title: 'From Student to Entrepreneur: Building Startups with AI & Purpose', published: '2026-09-12T06:00:12+00:00' },
];

const decodeEntities = (value: string) =>
  value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

/** YouTube titles are hashtag-heavy; strip them so cards read like episode names. */
export const cleanTitle = (raw: string) =>
  decodeEntities(raw)
    .replace(/#\w+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*[-|·]\s*$/g, '')
    .trim();

const classify = (title: string): EpisodeCategory => {
  const t = title.toLowerCase();
  if (/(invest|risk|volatility|money|equity|valuation|capital)/.test(t)) return 'Investors';
  if (/(founder|startup|entrepreneur|student|business|building|从零|porsche|disability|journey)/.test(t)) {
    return 'Entrepreneurs';
  }
  if (/(ai|health|knee|back|athlete|kidney|testosterone|deadlift|medical|prompt)/.test(t)) return 'Leaders';
  return 'Influencers';
};

const SERIES_BY_CATEGORY: Record<EpisodeCategory, string> = {
  Entrepreneurs: 'ZIAN Founder Series · Startup Insights',
  Investors: 'ZIAN Capital · Investment Strategy',
  Leaders: 'ZIAN HealthTech AI · AI Research',
  Influencers: 'ZIAN Builders · Entrepreneurship',
};

const decorate = (video: Pick<CommunityVideo, 'id' | 'title' | 'published'>): CommunityVideo => {
  const title = cleanTitle(video.title);
  const category = classify(title);
  return { id: video.id, title, published: video.published, category, series: SERIES_BY_CATEGORY[category] };
};

const parseFeed = (xml: string): Array<Pick<CommunityVideo, 'id' | 'title' | 'published'>> => {
  const entries = xml.split('<entry>').slice(1);
  const parsed = entries
    .map((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)</)?.[1];
      const title = entry.match(/<media:title>([^<]*)</)?.[1];
      const published = entry.match(/<published>([^<]+)</)?.[1];
      return id && title && published ? { id, title, published } : null;
    })
    .filter((v): v is Pick<CommunityVideo, 'id' | 'title' | 'published'> => v !== null);

  return parsed.sort((a, b) => b.published.localeCompare(a.published));
};

export async function getCommunityVideos(): Promise<CommunityVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    const parsed = parseFeed(await res.text());
    if (parsed.length === 0) throw new Error('feed contained no entries');
    return parsed.map(decorate);
  } catch (error) {
    console.warn('[community-videos] falling back to baked list:', error);
    return FALLBACK_VIDEOS.map(decorate);
  }
}

export const thumbnailSrc = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const embedUrl = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

export const episodeLabel = (index: number) => `EP ${String(index + 1).padStart(2, '0')}`;

export const formatDuration = (published: string) => {
  const date = new Date(published);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
