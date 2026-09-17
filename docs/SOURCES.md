# SOURCES — historical claims record

Policy: every historical claim surfaced in UI copy should be traceable here.
Format: topic · claim · source · URL · notes.
Prefer Internet Society, RFCs, IETF, ICANN, CERN, university archives,
Smithsonian, Computer History Museum, academic publications.

---

## ARPANET era (exhibit 01)

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| A1 | ARPANET established 1969, decommissioned 1990; funded by ARPA (now DARPA) from 1966; project initiated 1966 under Bob Taylor; Larry Roberts program manager | Wikipedia "ARPANET" (aggregates primary sources: Roberts, L. "The Evolution of Packet Switching", Proc. IEEE 66(11), 1978; Internet Society "Brief History") | https://en.wikipedia.org/wiki/ARPANET | Verified 2026-09-16 via article text. Primary source recommended for citation: Roberts 1978 (doi:10.1109/PROC.1978.11141). |
| A2 | Packet switching pioneered independently by Paul Baran (RAND) and Donald Davies (UK NPL) | Wikipedia "ARPANET" §Inspiration; Roberts 1978; Davies, D.W. "The Origin of Packet Switching" (1994, British Telecom) | https://en.wikipedia.org/wiki/ARPANET | UI wording avoids exact year claims beyond "1960s" to stay safe. |
| A3 | BBN (Bolt Beranek and Newman) built the IMPs; NCP team included Frank Heart and Robert Kahn | Wikipedia "ARPANET" (cites "IMP — Interface Message Processor", Living Internet archive) | https://en.wikipedia.org/wiki/ARPANET | UI says "NCP protocol team included Frank Heart and Robert Kahn" — matches source. |
| A4 | First four hosts: SRI, UCLA, UCSB, University of Utah; connected one at a time through late 1969, SRI first then UCLA | Wikipedia "ARPANET" §"Initial four hosts" (section confirmed in TOC); long-standing accounts (Kleinrock, Hafner & Lyon "Where Wizards Stay Up Late") | https://en.wikipedia.org/wiki/ARPANET | UI deliberately says "one at a time through late 1969" and does NOT state exact per-node dates. TODO: re-verify exact dates (SRI 30 Sep, UCLA 29 Oct, UCSB 16 Nov, Utah 15 Dec 1969) against CHM before adding them. |
| A5 | "Standard account": first message LOGIN from UCLA crashed after "LO"; SRI operator rebooted; LOGIN then delivered (replay labeled as the standard account, dated Oct 29, 1969) | Leon Kleinrock accounts (oral histories / CHM); Hafner & Lyon 1996 | https://computerhistory.org | Internet Society page returned 403 on fetch; CHM oral-history URL 404'd on fetch. UI copy attributes this as "the standard account" — safe. TODO: find the stable CHM Kleinrock oral-history page and record URL. |
| A6 | ARPANET used NCP (later TCP/IP) | Wikipedia "ARPANET" infobox (protocols) | https://en.wikipedia.org/wiki/ARPANET | Corroborated by Wikipedia "Network Control Protocol (ARPANET)" (NCP was the ARPANET host-to-host/transport protocol; cites Stevens, TCP/IP Illustrated vol. 1). NOTE (corrected 2026-09-16): the earlier note "Matches RFC 1009 (NCP, 1987)" was wrong — RFC 1009 is "Requirements for Internet gateways" (June 1987), not an NCP document. See the P1–P7 section below. |

### Verification access notes (2026-09-16)

- `https://www.internetsociety.org/internet/history-of-the-internet/early-days/` → HTTP 403 (blocked).
- `https://www.internetsociety.org/internet/history-of-the-internet/brief-history-of-the-internet/` → HTTP 403.
- `https://computerhistory.org/oral-history/leon-kleinrock` → HTTP 404 (site likely restructured; search for the current stable URL before citing).
- Wikipedia fetch succeeded and was used as the aggregator source above.

---

## 1971–1982 expansion (exhibit 02)

Verified 2026-09-16. Growth figures and node names from Living Internet
(itself cited by Wikipedia's ARPANET article); RFC facts from the
rfc-editor.org primary documents; email facts from Wikipedia
"History of email" (which cites the Computer History Museum's Email
Innovation Timeline and 2016 obituaries).

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| E1 | Documented site counts: 4 (1969) → 24 (end 1972) → 37 (end 1973) → 62 (June 1974) → 111 (March 1977) | Living Internet "ARPANET – The First Internet" (milestones); Wikipedia "ARPANET" (March 1977 logical map image) | https://www.livinginternet.com/internet/i/ii_arpanet.htm | Only documented checkpoints are shown; the UI never interpolates between them. |
| E2 | 1973: first international nodes — University College London (UK) and the Royal Radar Establishment (Norway); satellite link reaches Hawaii | Living Internet (1973 milestone); Wikipedia "ARPANET" infobox (location: US, UK, Norway) | https://www.livinginternet.com/internet/i/ii_arpanet.htm | Copenhagen/Royal Danish Academy (1973) is widely cited via Kirstein 2009, but that IEEE paper is paywalled and not verified here — intentionally NOT asserted. |
| E3 | Sept 1971: first Terminal Interface Processor (TIP); up to 63 dial-in terminals per TIP | Wikipedia "ARPANET" (cites Kirstein, IEEE Annals of the History of Computing 31(3), 2009); Living Internet (Sept 1971 TIP) | https://en.wikipedia.org/wiki/ARPANET | UI does not name the TIP's institution (unverified). |
| E4 | 1971: Ray Tomlinson (BBN) extends SNDMSG to copy messages between ARPANET machines, introducing user@machine | Wikipedia "History of email" (cites CHM Email Innovation Timeline; Guardian/NPR/BBC 2016; Moschovitis 1999) | https://en.wikipedia.org/wiki/History_of_email | The "happy accident" quote is widely attributed to Tomlinson but was not sourced here — not used in UI. |
| E5 | RFC 675, "Specification of Internet Transmission Control Program", Cerf, Dalal & Sunshine, December 1974 | RFC 675 (primary) | https://www.rfc-editor.org/rfc/rfc675.html | UI calls it "the first Internet TCP specification" — it is the first published TCP design in this RFC series. |
| E6 | RFC 791, "Internet Protocol", DARPA Internet Program Protocol Specification, September 1981, J. Postel (ed.) | RFC 791 (primary) | https://www.rfc-editor.org/rfc/rfc791.html | — |
| E7 | RFC 792, "Internet Control Message Protocol" (ICMP, incl. Echo request/reply), September 1981, J. Postel | RFC 792 (primary) | https://www.rfc-editor.org/rfc/rfc792.html | UI references ICMP without naming "ping" as an official term. |
| E8 | RFC 793, "Transmission Control Protocol", DARPA Internet Program Protocol Specification, September 1981, J. Postel (ed.) | RFC 793 (primary) | https://www.rfc-editor.org/rfc/rfc793.html | — |
| E9 | From 1975 ARPANET operated by the Defense Communications Agency | Wikipedia "ARPANET" infobox ("From 1975, Defense Communications Agency"); Living Internet (July 1975) | https://en.wikipedia.org/wiki/ARPANET | — |
| E10 | BBN joins March 1970 (first east-coast node); ARPANET demonstrated at the international computer communications conference, October 1972 | Living Internet (milestones); Wikipedia "ARPANET" (ICCC, Oct 1972) | https://www.livinginternet.com/internet/i/ii_arpanet.htm | — |

**Deliberately omitted (could not verify against accessible sources on 2026-09-16):**
exact node/IMP counts for 1980–1982 (commonly cited "56/57 IMPs");
Copenhagen 1973 link; Tomlinson "happy accident" quote.

---

## 1983 protocol switch (exhibit 03)

Verified 2026-09-16. Cutover + NCP details + the "straggler" exception
from Wikipedia "Network Control Protocol (ARPANET)" (whose references
include the DoD Network Newsletter of 17 June 1983 and a Google post
dated Jan 1, 2013); RFC facts from the rfc-editor.org primary (RFC 801);
MILNET from Living Internet (same page as E1/E2/E3/E10).

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| P1 | January 1, 1983: the ARPANET switched from NCP to TCP/IP ("flag day"); the date is widely marked as the birth of the Internet | Wikipedia "Network Control Protocol (ARPANET)" §Transition to TCP/IP (references: Google blog "Marking the birth of the modern-day Internet", Jan 1 2013; Telegraph "Internet celebrates 40th birthday: but what date should we be marking?", Sep 2009) | https://en.wikipedia.org/wiki/Network_Control_Protocol_(ARPANET) | The two anniversary articles were not fetched directly (Google URL 404s on its new host; Telegraph paywalled — HTTP 402); verified via the NCP article body, which asserts the mandatory Jan 1 1983 transition. |
| P2 | RFC 801 (Nov 1981, J. Postel, ISI) — the "NCP/TCP transition plan": the ARPANET host-to-host protocol "inadequate" for the new networks; 1973 work on a host-to-host protocol for "use across all these networks"; IP+TCP "allow all hosts in the interconnected set of these networks to share a common interprocess communication environment"; the ARPA Internet "sometimes called the Catenet"; IP/TCP adopted "as DoD wide standards for all DoD packet networks"; implementation to begin "no later than 1 January 1982 in any case" | RFC 801 (primary) | https://www.rfc-editor.org/rfc/rfc801 | All quotes verbatim from the RFC body. |
| P3 | NCP transport was simplex — "an odd and an even port were reserved for each application"; TCP/UDP "reduced the need for two simplex ports to a single duplex port" | Wikipedia NCP article (citing Stevens, "TCP/IP Illustrated" vol. 1, p. 15) | https://en.wikipedia.org/wiki/Network_Control_Protocol_(ARPANET) | UI desk table paraphrases closely. |
| P4 | "Despite the mandatory transition of January 1, 1983, a number of sites continued use of NCP until mid-1983. This was permitted as a special case that required permission from the backbone operators" | Wikipedia NCP article (citing DoD Network Newsletter, 17 June 1983 — the original museum URL 404s on fetch, so the quote is recorded via the article) | https://en.wikipedia.org/wiki/Network_Control_Protocol_(ARPANET) | UI: the "straggler" host shown is an ILLUSTRATIVE stand-in — the source documents the exception, not which site kept NCP (stated in the scene footnote). |
| P5 | "In 1983, an unclassified military-only network called MILNET split off from ARPANET" | Living Internet "ARPANET – The First Internet" | https://www.livinginternet.com/internet/i/ii_arpanet.htm | Page verified during Phase 2 (2026-09-16). |
| P6 | "NCP" originally referred to the Network Control Program; the protocol-name backronym was "created organically" later; Postel used the name in "Internetting or Beyond NCP" (IEN 11) | Wikipedia NCP article; RFC 1000 (Postel, Mar 1987) quote within it | https://en.wikipedia.org/wiki/Network_Control_Protocol_(ARPANET) | Postel's postel.org IEN 11 PDF is a dead link (archived copies on web.archive.org). |
| P7 | Framing: the switch was about internetworking — NCP could not reach "hosts in other networks participating in the ARPA Internet"; after Jan 1 1983 the ARPANET operated as one network among many | RFC 801 (primary); Wikipedia NCP article | https://www.rfc-editor.org/rfc/rfc801 | The sim rule "cross-protocol sends fail outright" is a teaching simplification of this point (labeled as such in the scene footnote). |

**Deliberately omitted (could not verify against accessible sources on 2026-09-16):**
which specific sites kept NCP into mid-1983 (P4 documents the exception
category only); the text of the 1983/2013 anniversary articles
(404/paywalled — the "birthday" framing is presented as "widely
marked", not as a sourced fact); flag-day logistics (order/timing of
host cutover).

---

## BBS & dial-up (exhibit 04, 1986–1994)

Verified 2026-09-16 from Wikipedia "Bulletin board system" and
"Modem" (sentences extracted verbatim on 2026-09-16). Note:
en.wikipedia.org/wiki/BBS is a DISAMBIGUATION page — the real article is
"Bulletin board system".

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| D1 | First public dial-up BBS: Ward Christensen + Randy Suess, members of the Chicago Area Computer Hobbyists' Exchange (CACHE); work began when "Chicago was snowed under during the Great Blizzard of 1978"; "CBBS officially went online on 16 February 1978"; Christensen "patterned the system after the cork board his local computer club used" | Wikipedia "Bulletin board system" | https://en.wikipedia.org/wiki/Bulletin_board_system | The 253,301-caller figure for CBBS is flagged "[citation needed]" in the article — NOT used. |
| D2 | "The 300 baud Smartmodem led to an initial wave of early bulletin board systems"; "A key innovation required for the popularization of the BBS was the Smartmodem manufactured by Hayes Microcomputer Products"; the Hayes command set "became a de facto standard, [integrated] into devices from many other manufacturers" | Wikipedia "Bulletin board system"; Wikipedia "Modem" §1980s | https://en.wikipedia.org/wiki/Bulletin_board_system ; https://en.wikipedia.org/wiki/Modem | UI uses the "de facto standard" framing only, not a specific Smartmodem intro year. |
| D3 | Speeds: "Speed improved with the introduction of 1200 bit/s asynchronous modems in the early 1980s, giving way to 2400 bit/s fairly rapidly" (BBS article); ITU-T V.22 "transmitted 1,200 bits by sending 600 symbols per second (600 baud) using phase-shift keying"; "In 1984, V.22bis was created, a 2,400-bit/s system similar in concept to the 1,200-bit/s Bell 212"; "at 2,400 baud the 9,600 bit/s V.32" (Modem article) | Wikipedia "Bulletin board system"; Wikipedia "Modem" | https://en.wikipedia.org/wiki/Modem | Important correction vs. common lore: **V.22 = 1,200 bit/s**; 2,400 bit/s is V.22bis (1984). |
| D4 | 9600 era: "There was a lengthy delay before 9600 bit/s models began to appear on the market. 9600 bit/s was not even established as a strong standard before V.32bis at 14.4 kbit/s took over in the early 1990s" (BBS); "In the early 1990s, V.32 modems operating at 9,600 bit/s were introduced, but were expensive and were only starting to enter the market when V.32bis was standardized, which operated at 14,400 bit/s"; "by the end of the year V.32 was dead, never having been really established" (Modem) | Wikipedia "Bulletin board system"; Wikipedia "Modem" §1990s | https://en.wikipedia.org/wiki/Modem | Modem desk cards: V.22 1200 / V.22bis 2400 (1984) / V.32 9600 (early 1990s) / V.32bis 14.4k (1992). |
| D5 | Board culture: "Most of the information was displayed using ordinary ASCII text or ANSI art, but a number of systems attempted character-based graphical user interfaces (GUIs) which began to be practical at 2400 bit/s" | Wikipedia "Bulletin board system" | https://en.wikipedia.org/wiki/Bulletin_board_system | Supports the ASCII terminal UI of the exhibit. |
| D6 | Era end: "These developments together resulted in the sudden obsolescence of bulletin board technology in 1995 and the collapse of its supporting market" | Wikipedia "Bulletin board system" | https://en.wikipedia.org/wiki/Bulletin_board_system | Shown as the post-era milestone. |
| D7 | Dial-up scale: "In the 1990s, tens of millions of people in the United States alone used dial-up modems for internet access"; a 1994 Software Publishers Association finding: "although 60% of computers in US households had a modem, only 7% of households went online" | Wikipedia "Modem" | https://en.wikipedia.org/wiki/Modem | Used as the era's closing fact. |

**Deliberately omitted (could not verify or is illustrative, 2026-09-16):**
which real BBSs the demo session represents — the board, handles and
messages in the exhibit are an ILLUSTRATIVE recreation (labeled as such in
the scene footnote); CBBS caller counts ([citation needed] in the source);
"peak BBS year" claims; ring/handshake timing details; 56k standards
(outside this era window — first appears in the next exhibits' story).

---

## CERN & the Web (exhibit 05, 1989–1993)

Verified 2026-09-16 against the live article text. The 1990
"first browser/server" is attributed to **CERN** (Berners-Lee), NOT W3C —
W3C was formed in 1994 (outside this era's window, shown only as a
beyond-era milestone).

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| W1 | Inception 12 March 1989; "Tim Berners-Lee invented the World Wide Web while working at CERN in 1989. He proposed a 'universal linked information system'" | Wikipedia "History of the World Wide Web" (infobox + body) | https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web | UI wording matches the quoted phrase. |
| W2 | "WorldWideWeb … is the first web browser and web page editor"; written "on a NeXT Computer during the second half of 1990, while working for CERN, a European nuclear research agency"; first edition completed "some time before" 25 Dec 1990 | Wikipedia "WorldWideWeb (browser)" | https://en.wikipedia.org/wiki/WorldWideWeb_(browser) | UI says "second half of 1990" and does NOT assert the popular "30 April 1990" date (see omissions). |
| W3 | The first website (info.cern.ch) — "First published 6 August 1991" | Wikipedia "World Wide Web" (infobox); corroborated by "WorldWideWeb (browser)" | https://en.wikipedia.org/wiki/World_Wide_Web | UI shows info.cern.ch as the first site. |
| W4 | The browser "became available to the general public in August 1991" (era goes public) | Wikipedia "WorldWideWeb (browser)" | https://en.wikipedia.org/wiki/WorldWideWeb_(browser) | Supports the 1991 "Web goes public" framing. |
| W5 | "The source code was released into the public domain on 30 April 1993"; the document that "officially put the World Wide Web into the public domain on 30 April 1993" (CERN CDS 1164399); infobox "License: Public domain (Since April 1993)" | Wikipedia "WorldWideWeb (browser)"; CERN document server | https://en.wikipedia.org/wiki/WorldWideWeb_(browser) ; https://cds.cern.ch | Used for the 1993 "no licence / public domain" state. |
| W6 | "CERN (1989–1994), W3C (1994–present)" — the Web's stewardship passed from CERN to the World Wide Web Consortium in 1994 | Wikipedia "World Wide Web" (infobox) | https://en.wikipedia.org/wiki/World_Wide_Web | Shown as the beyond-era (1994) milestone only. |
| W7 | "After publishing the markup language in 1991, and releasing the browser source code for public use in 1993, many other web browsers were soon developed" | Wikipedia "World Wide Web" | https://en.wikipedia.org/wiki/World_Wide_Web | Corroborates 1993 public release → browser proliferation. |

**Deliberately omitted (could not verify or is illustrative, 2026-09-16):**
the exact sub-page text of the first website — the browser pages in the
exhibit (home/guide/faq/news) are an ILLUSTRATIVE recreation (labeled as
such in the scene footnote); the popular "30 April 1990" first-browser date
(the verified source says "second half of 1990", so the UI uses that);
specific named universities/institutions reached after 1991 (kept to
"the outside world" in general terms); Mosaic/Netscape (1993–94, belongs
to the next exhibit).

---

---

## Linux, 1991–1996 (exhibit 06)

Verified 2026-09-16 against the live article text. The era spans the Linux
kernel's announcement (1991), its license fork (1992), and its growth into an
engine of the web (1994–1996). The "KEEP IT CLOSED" branch is a
**LABELED HYPOTHETICAL** ("WHAT IF?") — real Linux went GPL (L2). The
patch-mail lines in the terminal are **ILLUSTRATIVE** (not real messages) —
labeled as such in the scene footnote.

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| L1 | "Linux began in 1991 as a personal project by Finnish student Linus Torvalds to create a new free operating system kernel." (lead); announced as a "hobby" project "free of all commercial interest" on comp.os.minix (Aug 1991); Linux 0.01 released Sept 1991 | Wikipedia "History of Linux" (lead + "The creation of Linux") | https://en.wikipedia.org/wiki/History_of_Linux | The terminal's opening transcript is an illustrative recreation built on these verified fragments; the middle of the post is elided with "..." rather than quoted. |
| L2 | Early releases were "under a license prohibiting commercial distribution" (lead); the kernel is now "under the GNU General Public License v2"; GPLv2 was published June 1991; Linux 0.12 (Sept 1992) is the first GPL release | Wikipedia "History of Linux" (lead + "Linux under the GNU GPL") + Wikipedia "GNU General Public License" | https://en.wikipedia.org/wiki/History_of_Linux | The chapter-2 fork decision is built directly on this; the "closed" branch is a labeled hypothetical. |
| L3 | Linux 1.0 — March 1994 | Wikipedia "History of Linux" (chronology) | https://en.wikipedia.org/wiki/History_of_Linux | Backs the release line's "the first 'production' kernel (L3)". |
| L4 | Linux 2.0 — 1996, adds SMP and 64-bit support | Wikipedia "History of Linux" (chronology) | https://en.wikipedia.org/wiki/History_of_Linux | Backs "SMP + 64-bit — built for servers" on the 2.0 row. |
| L5 | By the mid-to-late 1990s Linux runs web servers and is on the TOP500 supercomputer list | Wikipedia "History of Linux" (industry / new-development coverage) | https://en.wikipedia.org/wiki/History_of_Linux | Backs "WHERE IT RUNS BY 1996"; the "TODAY (2026)" row is a present-day framing, not a sourced claim (tag "—"). |

**Deliberately omitted (could not verify or is illustrative, 2026-09-16):**
the full exact text of the 1991 announcement (the UI quotes only the two
verified fragments "hobby operating system" and "free of all commercial
interest" and elides the rest); contributor/patch counts (interactions, not
sourced figures); the specific patcher identities in the terminal
(illustrative); any line-count for Linux 1.0 (not asserted in the UI);
specific TOP500 rank positions (the UI says only "on the TOP500"); and the
exact month of the 2.0 release (the UI says "1996").

---

## Portals, P2P & Search (exhibit 07) — 2000–2004

Verified 2026-09-16 against live article text. Three chapters (2000 → 2001 → 2004); the 2001 fork offers the history path (labels win) and a **LABELED HYPOTHETICAL** ("WHAT IF" — courts side with Napster). Portal chrome (hit counter, "NEW!" badge, link grid), the mock share queue, mock search results, and the mock inbox are **ILLUSTRATIVE** recreations, labeled in the scene footnote.

| # | Claim (as shown in UI) | Source | Notes |
|---| --- | --- | --- |
| P1 | "A web portal is a specially designed website that provides information from a variety of sources in one place." + "for many users they served as the starting point of their web browsing if set as their home page" + US portals incl. Excite, Lycos, MSN, Yahoo! + "The term 'portal' emerged in the late 1990s" | Wikipedia "Web portal" — https://en.wikipedia.org/wiki/Web_portal | Backs CH 1 portal artifact + portal list. |
| P2 | Nasdaq "peaked on March 10, 2000"; "fall 78% from its peak" (by October 2002); collapse of Pets.com, Webvan, WorldCom | Wikipedia "Dot-com bubble" — https://en.wikipedia.org/wiki/Dot-com_bubble | Backs the 2000 "bubble context" card. |
| P3 | Napster 1999, Fanning & Parker, June 1999; "shut down in July 2001 and filed for bankruptcy in June 2002"; Roxio acquired IP Nov 2002 for $5.3M, relaunched as subscription; "as much as 61% of external network traffic consisted of MP3 file transfers" (dorms) | Wikipedia "Napster" — https://en.wikipedia.org/wiki/Napster | Backs CH 2 history branch (shutdown + relaunch); 61% used once as flavor. |
| P4 | Kazaa: BlueMoon (Jaan Tallinn) → Zennström & Friis; "introduced … in March 2001"; "While Napster lasted just three years, Kazaa survived much longer"; $100M settlement (FastTrack/Joltid/Sharman) | Wikipedia "Kazaa" — https://en.wikipedia.org/wiki/Kazaa | Backs CH 2 "the network lives on" beat. NOT attributed to Shawn Fanning (common error). |
| P5 | "In 2001, half of U.S. households had internet access." | Wikipedia "Internet in the United States" — https://en.wikipedia.org/wiki/Internet_in_the_United_States | Backs the CH 1 adoption line. |
| P6 | Google "officially launched in 1998 by Larry Page and Sergey Brin"; "settled at Mountain View in 2003 … making its initial public offering in 2004"; "Google is a misspelling of the word Googol" | Wikipedia "History of Google" — https://en.wikipedia.org/wiki/History_of_Google | Backs the CH 3 search panel. |
| P7 | Gmail "launched as a beta version in 2004. It went out of beta in 2009" (author Paul Buchheit); "early adoption of Ajax"; "On April 1, 2004, Gmail was launched with one gigabyte (GB) of storage space, a significantly higher amount than competitors offered at the time." | Wikipedia "Gmail" — https://en.wikipedia.org/wiki/Gmail | Backs the CH 3 mail panel. |
| P8 | Hotmail "launched on July 4, 1996" (Smith & Bhatia); "In 1997, Microsoft acquired Hotmail for a reported $400 million and rebranded it as MSN Hotmail"; 1999: "From Zero to 30 Million Members in 30 Months" | Wikipedia "Outlook.com" (Hotmail section) — https://en.wikipedia.org/wiki/Outlook.com | Backs the CH 3 mail panel. |

**Deliberately omitted (could not verify or is illustrative, 2026-09-16):**
Napster's exact RIAA filing date (the UI uses the verified "shut down in
July 2001" wording); Hotmail's original 2 MB mailbox size (the Gmail 1 GB
contrast uses "significantly higher than competitors"); Kazaa/Napster
user-count figures and portal market-share percentages (unverified); the
"WHAT IF courts side with Napster" branch is labeled speculation, not a
sourced claim (no P-tag).

---

## Broadband & the Open Web (exhibit 08) — 2005–2009

Verified 2026-09-16 against live article text. Three chapters (2005 → 2007 → 2009); the 2007 fork offers the history path (open uploads + copyright fights) and a **LABELED HYPOTHETICAL** ("WHAT IF" — licensed-only uploads). The mock article pane, edit-history lines, upload queue, and line-status panel are **ILLUSTRATIVE** recreations, labeled in the scene footnote.

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| B1 | "Nupedia was a multi-language online encyclopedia whose articles were written by volunteer contributors with relevant subject-matter expertise, reviewed by expert editors before publication, and licensed as free content… It was founded by Jimmy Wales and underwritten by Bomis, with Larry Sanger as editor-in-chief." + "Nupedia operated from March 2000 until September 2003." | Wikipedia "Nupedia" — https://en.wikipedia.org/wiki/Nupedia | Backs CH 1 "the slow encyclopedia" (founding + lifespan). |
| B2 | "Nupedia had a seven-step approval process to control content of articles before being posted, rather than live wiki-based updating." + "It had 21 articles in its first year, compared with Wikipedia having 200 articles in the first month, and 18,000 in the first year." + "Unlike Wikipedia, Nupedia was not a wiki; it was instead characterized by an extensive peer-review process…" | Wikipedia "Nupedia" | Backs the CH 1 Nupedia-vs-Wikipedia speed contrast. |
| B3 | "…is a free online encyclopedia written and maintained by a community of volunteers… Founded by [Jimmy Wales] and [Larry Sanger] in 2001, Wikipedia has been hosted since 2003 by the [Wikimedia Foundation], an American [non-profit] funded mainly by donations from readers." (bracketed words are wikilink targets stripped from the extract) | Wikipedia "Wikipedia" (lead) — https://en.wikipedia.org/wiki/Wikipedia | Backs CH 1 framing (open editing, non-profit). |
| B4 | "Nupedia and Wikipedia coexisted until the former's servers were taken down permanently in 2003, and its text was incorporated into Wikipedia." | Wikipedia "Wikipedia" (History → Nupedia) | Backs the CH 1 "Nupedia is gone" beat. |
| B5 | "…passed the mark of 2 million articles on September 9, 2007, making it the largest encyclopedia ever assembled" + "The [English] edition reached 3 million articles in August 2009." | Wikipedia "Wikipedia" (Milestones) | Backs the CH 3 scale strip. |
| B6 | "Around 1,800 articles were added daily to the encyclopedia in 2006" | Wikipedia "Wikipedia" (growth) | Backs the CH 1 edit-pace flavor line (2006). |
| B7 | "[Wikipedia and Britannica] were compared to professional and peer-reviewed sources in a 2005 *Nature* study" — Giles, "Internet encyclopaedias go head to head: Jimmy Wales' Wikipedia comes close to Britannica in terms of the accuracy of its science entries" (*Nature* 438: 900–901, 2005) | Wikipedia "Reliability of Wikipedia" — https://en.wikipedia.org/wiki/Reliability_of_Wikipedia | Backs the CH 1 Nature-study card. |
| B8 | The study's conclusion, as quoted in the article: "Wikipedia corrects the vast majority of errors within minutes, but if they're not spotted within the first day t[hey…]" (the article elides the rest of the quote) | Wikipedia "Reliability of Wikipedia" | Backs the CH 1 "corrections" annotation. |
| B9 | "In May 2005, a user edited the [Wikipedia] article on [Barry Seigenthaler] so that it contained several false and [defamatory] statements" + "The inaccurate claims went unnoticed between May and September 2005 when they were discovered by [a friend of Seigenthaler]." | Wikipedia "Reliability of Wikipedia" (notable incidents) | Backs the CH 1 Seigenthaler beat (use only the verified fragments). |
| B10 | "YouTube was founded on February 14, 2005, by Chad Hurley, Jawed Karim, and Steve Chen who were all former employees at PayPal." | Wikipedia "YouTube" (lead) — https://en.wikipedia.org/wiki/YouTube | Backs the CH 2 opening. |
| B11 | "The first video was uploaded on April 23, 2005. Titled 'Me at the zoo', it shows co-founder Jawed Karim at the [San Diego Zoo] and can still be viewed on the site." | Wikipedia "YouTube" | Backs the CH 2 "first upload" beat. |
| B12 | "On October 9, 2006, [Google] announced that they had acquired YouTube for $1.65 billion in Google stock." + "The deal was finalized on November 13, 2006." | Wikipedia "YouTube" | Backs the CH 2 acquisition card. |
| B13 | "YouTube does not view videos before they are posted online, and it is left to copyright holders to issue [DMCA takedown notices]…" + "In June 2007, YouTube began trials of a system for automatic detection of uploaded videos that infringe copyright" (Content ID) + the 2011 Viacom suit that "nearly resulted in the discontinuation of the website" | Wikipedia "YouTube" (copyright) | Backs the CH 2 history branch (open uploads + copyright fights). The WHAT IF branch is a labeled hypothetical (no tag). |
| B14 | "In September 2007, a majority of U.S. survey respondents reported having broadband internet at home." | Wikipedia "Internet in the United States" (lead) — https://en.wikipedia.org/wiki/Internet_in_the_United_States | Backs the CH 3 adoption line. |
| B15 | "Around the start of the 21st century, most residential access was by dial-up… In subsequent years dial-up declined in favor of broadband access." + "Dial-up connections typically do not exceed a speed of 56 [kbit/s]" | Wikipedia "Internet in the United States" | Backs the CH 3 dial-up-vs-broadband panel. |
| B16 | "The United States is widely perceived as falling behind in both its rate of broadband Internet penetration and the speed of its broadband infrastructure… [the] (FCC) did [adopt] a National Broadband Plan in [20]10, after first soliciting public comments from April 2009 through February 2010." + goal: "At least 100 million U.S. homes should have affordable access to actual download speeds of at least 100 megabits per second and actual upload speeds of at least 50 megabits per second by the year 2020." | Wikipedia "Internet in the United States" (National Broadband Plan section) | Backs the CH 3 FCC-plan card. The article dates the FCC action "March 2010"; the UI says "2010" only (a year-after beat — the era is 2005–2009). |

**Deliberately omitted (could not verify or is illustrative, 2026-09-16):**
the "4.5× more error-prone" Nature figure (widely cited, but not in the
current article text — the UI quotes only the verified "corrects the vast
majority of errors within minutes" fragment); any DMCA takedown-request
counts (no verified numbers in the article); ADSL/cable as named
technologies (the panel says DIAL-UP vs BROADBAND vs the 100 Mbps FCC goal
instead); the exact FCC plan publication date (the UI says "2010");
upload-queue progress bars, edit-history lines, and line-status values
(illustrative chrome); and the "WHAT IF: licensed-only uploads" branch is
labeled speculation, not a sourced claim (no B-tag).

## Mobile & Cloud (exhibit 09) — 2010–2015

Verified 2026-09-17 against live article text. Three chapters (2010 →
2012 → 2015); the 2012 fork offers the history path (the cloud wins) and
a **LABELED HYPOTHETICAL** ("WHAT IF" — everything stays on the device).
The phone screen (home screen, status bar, signal bars, sync queue, app
queue) is an **ILLUSTRATIVE** recreation, labeled in the scene footnote.

| # | Claim (as shown in UI) | Source | Notes |
|---| --- | --- | --- |
| M1 | "A smartphone is a mobile device that combines the functionality of a traditional mobile phone (feature phone) with advanced computing capabilities. It typically has a touchscreen interface, allowing users to access [the Internet]" | Wikipedia "Smartphone" (lead) — https://en.wikipedia.org/wiki/Smartphone | Backs CH 1 opening. |
| M2 | "[The iPad] is a brand of tablet computers developed and marketed by Apple… The first-generation iPad was introduced on January 27, 2010." | Wikipedia "iPad" (lead) — https://en.wikipedia.org/wiki/IPad | Backs CH 1 tablet beat. |
| M3 | "In telecommunications, Long Term Evolution (LTE) is a standard for wireless broadband communication for cellular mobile devices and data terminals. It is considered to be a 'transitional' 4G technology, and is therefore also referred to as 3.95G as a step above 3G." | Wikipedia "LTE (telecommunication)" (lead) — https://en.wikipedia.org/wiki/LTE_(telecommunication) | Backs CH 1 4G beat + the phone's signal panel. |
| M4 | "The LTE standard was finalized in December 2008, and the first publicly available LTE service was launched by TeliaSonera in Oslo and Stockholm on December 14, 2009, as a data connection with a USB modem." | Wikipedia "LTE (telecommunication)" (Overview) | Backs the CH 1 "first public LTE service" bubble. |

| M5 | "The mobile web comprises mobile browser-based World Wide Web services accessed from mobile devices, such as laptops, tablets, mobile phones… through a mobile or other wireless network." | Wikipedia "Mobile web" (lead) — https://en.wikipedia.org/wiki/Mobile_web | Backs the CH 1 mobile-web definition. |
| M6 | "Prior to 2014, the World Wide Web was primarily accessed via fixed-line services by laptops and desktop computers. However, the convenience offered by (personal) mobile devices saw an aggressive shift in the user mix favoring mobile devices since then." | Wikipedia "Mobile web" (History and development) | Backs the CH 1 shift + the CH 3 "mobile now leads" beat. |
| M7 | "In early 2010, ITU (International Telecommunication Union) reported that with current growth rates, web access by people on the go via laptops and smart mobile devices was likely to exceed web access from desktop computers within the following five years." | Wikipedia "Mobile web" (History and development) — citing the ITU 2010 press release | Backs the CH 1 2010 forecast + the CH 3 "the five-year window closes" beat. |
| M8 | NIST (as quoted in the article): "On-demand self-service: 'A consumer can unilaterally provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service provider.'" | Wikipedia "Cloud computing" (essential characteristics) — https://en.wikipedia.org/wiki/Cloud_computing | Backs the CH 2 "what is a cloud" annotation. |
| M9 | "iCloud is a personal cloud service run by Apple. Launched on October 12, 2011, iCloud enables users to store and sync data across devices, including Apple Mail, Apple Calendar, Apple Photos, Apple Notes, contacts, settings, backups, and files…" | Wikipedia "iCloud" (lead) — https://en.wikipedia.org/wiki/ICloud | Backs the CH 2 iCloud beat. |
| M10 | "Google Drive is a file-hosting service and synchronization service developed by Google. Launched on April 24, 2012, Google Drive allows users to store files in the cloud (on Google servers), synchronize files across devices, and share files." | Wikipedia "Google Drive" (lead) — https://en.wikipedia.org/wiki/Google_Drive | Backs the CH 2 Drive beat + the history fork path. |

| M11 | "Dropbox is a file hosting service operated by the American company Dropbox, Inc.… that offers cloud storage, file synchronization, personal cloud, and client software. Dropbox was founded in 2007 by MIT students Drew Houston and Arash Ferdowsi…" | Wikipedia "Dropbox" (lead) — https://en.wikipedia.org/wiki/Dropbox | Backs the CH 2 Dropbox beat. |
| M12 | "[Spotify] is a Swedish freemium music streaming service provider founded in April 2006 by Daniel Ek and Martin Lorentzon." + "Conceived as a legal alternative to music piracy, the service launched in several European markets in October 2008 and in the United States in July 2011." | Wikipedia "Spotify" (lead + History) — https://en.wikipedia.org/wiki/Spotify | Backs the CH 2 "stream, don't buy" beat. |
| M13 | "Launched in 2007, nearly a decade after Netflix, Inc. began its pioneering DVD-by-mail movie rental service, Netflix is the most-subscribed video on demand global streaming media service…" | Wikipedia "Netflix" (History) — https://en.wikipedia.org/wiki/Netflix | Backs the CH 2 "the mail-envelope era ends" beat. |
| M14 | "The App Store is an app marketplace developed and maintained by Apple, for mobile apps and desktop apps on its iOS, macOS and iPadOS operating systems." + "The iPhone App Store opened on July 10, 2008." | Wikipedia "App Store (Apple)" (lead + History) — https://en.wikipedia.org/wiki/App_Store_(Apple) | Backs the CH 3 app-store beat. |
| M15 | "Android Market was announced by Google on August 28, 2008" + "Also in March 2012, Android Market was re-branded as Google Play." | Wikipedia "Google Play" (History) — https://en.wikipedia.org/wiki/Google_Play | Backs the CH 3 two-store beat. |
| M16 | "Global smartphone sales surpassed the sales figures for feature phones in early 2013." | Wikipedia "Smartphone" (market section) | Backs the CH 3 "the phone outsells the desk" beat. |

**Deliberately omitted (could not verify or is illustrative, 2026-09-17):**
the ITU's later "true 4G" IMT-Advanced designation (the article covers
"transitional" 4G / 3.95G — the UI says "4G/LTE" only as era-name
shorthand, not an ITU-certification claim); Google Drive's free-storage
size (the current article cites the 15 GB tier; the UI claims no GB
figure); the App Store's launch app count ("500 apps" appears only in
citation titles, not article body); Google Play's "3.5 million apps"
(2017 figure, outside the era); Spotify/Netflix subscriber counts (2022/
2026 figures, outside the era); the phone's home-screen icons, status
bar, signal bars, sync-queue rows, and app-queue rows (illustrative
chrome); and the "WHAT IF: everything stays on the device" branch is
labeled speculation, not a sourced claim (no M-tag).

## The Connected Decade (exhibit 10, 2016–2022)

Verified 2026-09-17 via Wikipedia article text + infobox/TOC (fetched live).
UI copy uses C1–C8; anything under "Deliberately omitted" is unverified or
illustrative and carries NO tag.

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| C1 | 5G is "fifth-generation mobile telecommunications standard"; infobox: "Year started 2015", "Base standards IMT-2020", "Predecessor 4G (LTE, WiMAX)", "Successor 6G (in development)" | Wikipedia "5G" (lead + infobox) | https://en.wikipedia.org/wiki/5G | UI says 5G "builds on 4G/LTE" and comes after 4G — matches Predecessor/Successor. |
| C2 | 5G history has a named phase "Commercial rollout (2019–2021)", then "Recent developments (2022–present)" | Wikipedia "5G" (Contents/TOC: History §1.3, §1.4) | https://en.wikipedia.org/wiki/5G | UI frames 5G as arriving commercially 2019–2021. Exact first operator/date NOT asserted. |
| C3 | "Disney+ … launched on November 12, 2019"; "subscribers 131.6 million (November 2025)" | Wikipedia "Disney+" (lead + infobox) | https://en.wikipedia.org/wiki/Disney%2B | Backs the streaming-wars beat (Disney entering the market Nov 2019). |
| C4 | "TikTok is an international Chinese social media platform that hosts user-generated short videos… operated by ByteDance"; Douyin (China) launched 2016, international version 2017 | Wikipedia "TikTok" (lead + History) | https://en.wikipedia.org/wiki/TikTok | Backs short-form video as the rising format. Exact international month NOT asserted. |
| C5 | Facebook's history covers "2018–2020: Focus on the metaverse" and "2021: Rebrand as Meta" | Wikipedia "Meta Platforms" (Contents/TOC) | https://en.wikipedia.org/wiki/Meta_Platforms | Backs "2021: the industry bet on the metaverse." Exact rebrand day NOT asserted. |
| C6 | GPT-3 released May 2020, "the largest language model published at the time" (175B parameters) | Wikipedia "Large language model" (GPT-3 / T-NLG, May 2020) | https://en.wikipedia.org/wiki/Large_language_model | Backs "big models existed before ChatGPT." UI says "a large language model (GPT-3)". |
| C7 | ChatGPT "gained 100 million users within two months of its launch" (Jan 2023), "the fastest-growing consumer application to date" | Wikipedia "ChatGPT" (History/Usage) | https://en.wikipedia.org/wiki/ChatGPT | The "AI is coming" closing beat for 2022; also AI1. |
| C8 | Meta: "2025: Policy shifts and AI investments", "2026: Investments in AI" | Wikipedia "Meta Platforms" (Contents/TOC) | https://en.wikipedia.org/wiki/Meta_Platforms | Backs the pivot: by 2025–26 the metaverse money flowed to AI (fork conclusion). |

**Deliberately omitted (2026-09-17):** the first 5G commercial operator + exact
date (only the 2019–2021 window is confirmed); TikTok's exact international
launch month (UI says "2017"); Meta's exact rebrand day (UI says "2021");
subscriber counts beyond Disney+'s Nov-2025 figure; the short-video feed,
streaming-app grid, VR-headset chrome, 5G signal bars, and "like" counters
(illustrative); and the "WHAT IF: the metaverse becomes the next platform"
branch (labeled a hypothetical — no C-tag).

## The AI Era (exhibit 11, 2022–2026, in progress)

Verified 2026-09-17 via Wikipedia article text (fetched live). The 2025–2026
material is deliberately framed as CURRENT / in-progress, NOT settled history.
UI copy uses AI1–AI5.

| # | Claim (as shown in UI) | Source | URL | Notes |
|---| --- | --- | --- | --- |
| AI1 | "ChatGPT is a generative artificial intelligence chatbot based on the OpenAI-developed GPT-3.5 large language model"; "gained 100 million users within two months of its launch" (Jan 2023) | Wikipedia "ChatGPT" (lead + infobox + History) | https://en.wikipedia.org/wiki/ChatGPT | Launch date Nov 30, 2022 from infobox/History. "fastest-growing consumer application to date" matches the source wording. |
| AI2 | GPT-4 was released in March 2023 and is multimodal (accepts image input) | Wikipedia "GPT-4" / "Large language model" (GPT-4, March 2023) | https://en.wikipedia.org/wiki/Large_language_model | Backs the "multimodal" beat — "GPT-4 (March 2023), multimodal". |
| AI3 | ChatGPT is "based on" GPT-3.5 (the underlying large language model) | Wikipedia "ChatGPT" (lead/infobox) | https://en.wikipedia.org/wiki/ChatGPT | Backs "ChatGPT runs on GPT-3.5". |
| AI4 | A large language model is "a type of machine learning model" (generative AI / deep-learning family) | Wikipedia "Large language model" (lead) | https://en.wikipedia.org/wiki/Large_language_model | General framing used in the lede. |
| AI5 | The 2024–2026 period is ongoing: 5G "Recent developments (2022–present)"; Meta "2025 / 2026: AI investments" — i.e. this era is CURRENT | Wikipedia "5G" (TOC) + "Meta Platforms" (TOC) | https://en.wikipedia.org/wiki/5G | UI labels 2025–2026 as "in progress / current as of September 2026", not settled. No 2024–26 model name asserted (see omitted). |

**Deliberately omitted (2026-09-17):** any specific 2024–2026 flagship model
name (a "GPT-6" / "Astra" label appeared in a fetched infobox but could NOT
be independently confirmed, so it is NOT used); benchmark/score figures for
post-2023 models; the chat console's prompt/response lines, the "models" panel
rows, and the "frontier" status chrome (illustrative); and the "WHAT IF: AGI
is already here" branch (labeled a hypothetical — no AI-tag).

## The Road Ahead (speculative section, beyond 2026)

**This section is NOT a historical record and NOT a prediction.** It is a
three-act STORY (not a widget): Act I states "where we are" (verified, CURRENT
as of September 2026); Act II presents the three in-progress threads (AGENCY,
ON-DEVICE, MULTIMODAL), each openable to "what it means for you"; Act III lets
the reader pick a slice of life and read it "today → where the threads point"
(a labeled FORECAST). A closing "deliberately not asserted" list keeps it
honest. Every forward-looking line is an extrapolation of the verified 2025–2026
anchors recorded in "The AI Era (exhibit 11)" above (AI5, AI2, AI4) — nothing
new is asserted, and no dates, products, or AGI timeline are claimed.

| # | Thread (verified today) | What it is (anchor) | Direction it points (a forward-reading, a forecast) |
|---|---|---|---|
| T1 | AGENCY | the wave is "agentic" (AI5); an LLM is a type of ML model (AI4). | you state the goal; the interface runs the steps and hands back the result. |
| T2 | ON-DEVICE | the wave is "on-device" (AI5). | the internet recedes toward a local capability — less "going online," more "it just knows." |
| T3 | MULTIMODAL | the wave is "multimodal" (AI5); GPT-4 accepts image input (AI2). | the interface stops being only words — you can point at the world. |

Act III forecast slices (each a "today → where the threads point" read, all
labeled forecasts, grounded in AI5/AI2/AI4): GET SOMEWHERE · MAKE A MEAL · KEEP
A RECORD.

**Deliberately NOT asserted (2026-09-17):** no dates or timelines; no named
future products or companies; no claim that AGI will (or won't) arrive, or
when; no forecast stated as settled fact; the "today" steps are a general
picture of current web use, not unverifiable facts. The "forecast" text is
illustrative extrapolation, labeled as such in every case.

## Other eras

_All timeline sections are now built. Recorded above: the intro prologue;
arpanet 1969 (exhibit 01); expansion 1971–1982 (exhibit 02); tcpip 1983
(exhibit 03); bbs/dial-up 1986–1994 (exhibit 04); cern-web 1989–1993
(exhibit 05); linux90s 1991–1996 (exhibit 06); portal2000s 2000–2004
(exhibit 07); broadband2000s 2005–2009 (exhibit 08); mobile2010s 2010–2015
(exhibit 09); connected-decade 2016–2022 (exhibit 10); ai-era 2022–2026
(exhibit 11); and the speculative future ("The Road Ahead", beyond 2026 —
forecasts, not facts)._
