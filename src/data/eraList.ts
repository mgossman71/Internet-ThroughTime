/**
 * Pure data: the ordered list of eras in the timeline.
 *
 * Keeping this free of components means it can be imported by the
 * store, the nav, and tests without pulling in React rendering code.
 *
 * IMPORTANT (decided 2026-09-16): timeline order is authoritative.
 * Inserting a new era = inserting a row here. Nothing else to change
 * except the registry mapping in src/app/eraRegistry.ts.
 */
export interface EraData {
  id: string;
  shortYear: string;
  title: string;
  subtitle: string;
  themeClass: string;
  speculative: boolean;
}

export const ERA_LIST: readonly EraData[] = [
  {
    id: 'intro',
    shortYear: '1960s',
    title: 'The Beginning',
    subtitle: 'A museum of how a few labs became the planet',
    themeClass: 'theme-intro',
    speculative: false,
  },
  {
    id: 'arpanet',
    shortYear: '1969',
    title: 'ARPANET',
    subtitle: 'Four nodes, packet switching, and the first network message',
    themeClass: 'theme-arpanet',
    speculative: false,
  },
  {
    id: 'expansion70s',
    shortYear: '1971–1982',
    title: 'A Network of Networks',
    subtitle: 'ARPANET grows; the protocols mature',
    themeClass: 'theme-arpanet',
    speculative: false,
  },
  {
    id: 'tcpip1983',
    shortYear: '1983',
    title: 'The Great Protocol Switch',
    subtitle: 'January 1, 1983 — the day the Internet was born',
    themeClass: 'theme-amber',
    speculative: false,
  },
  {
    id: 'dialup',
    shortYear: '1986–1994',
    title: 'BBS & Dial-Up',
    subtitle: 'Modems, bulletin boards, and the hum of 2400 baud',
    themeClass: 'theme-amber',
    speculative: false,
  },
  {
    id: 'cern-web',
    shortYear: '1989–1993',
    title: 'CERN & the Web',
    subtitle: 'One proposal at CERN changes everything',
    themeClass: 'theme-web90',
    speculative: false,
  },
  {
    id: 'linux90s',
    shortYear: '1991–1996',
    title: 'Linux, 1991–1996',
    subtitle: 'A hobby kernel, one GPL decision, and the engine of the 1990s web',
    themeClass: 'theme-web90',
    speculative: false,
  },
  {
    id: 'portal2000s',
    shortYear: '2000–2004',
    title: 'Portals, P2P & Search',
    subtitle: 'Broadband arrives; files, mail, and meaning move online',
    themeClass: 'theme-2000s',
    speculative: false,
  },
  {
    id: 'broadband2000s',
    shortYear: '2005–2009',
    title: 'Broadband & the Open Web',
    subtitle: 'Wikipedia, YouTube, and a network for everyone',
    themeClass: 'theme-2000s',
    speculative: false,
  },
  {
    id: 'mobile2010s',
    shortYear: '2010–2015',
    title: 'Mobile & Cloud',
    subtitle: 'The Internet leaves the desk',
    themeClass: 'theme-mobile',
    speculative: false,
  },
  {
    id: 'connected-decade',
    shortYear: '2016–2022',
    title: 'The Connected Decade',
    subtitle: '5G, streaming, short-form video, and the road to AI',
    themeClass: 'theme-modern',
    speculative: false,
  },
  {
    id: 'ai-era',
    shortYear: '2022–2026',
    title: 'The AI Era',
    subtitle: 'ChatGPT to the present — networks that learn',
    themeClass: 'theme-modern',
    speculative: false,
  },
  {
    id: 'future',
    shortYear: '??',
    title: 'The Road Ahead',
    subtitle: 'A speculative section — clearly marked, not history',
    themeClass: 'theme-future',
    speculative: true,
  },
] as const;
