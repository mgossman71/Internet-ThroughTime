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

## Other eras

_No claims recorded yet — add entries here before writing UI copy for:
cloud2000s, social2010s, infrastructure (submarine cables — use a reputable
dataset, e.g. Telegeography/OpenSubmap), and the speculative future section.
(linux90s 1991–1996 is recorded in the "Linux, 1991–1996 (exhibit 06)"
section; portal2000s 2000–2004 in the "Portals, P2P & Search (exhibit 07)"
section; broadband2000s 2005–2009 in the "Broadband & the Open Web
(exhibit 08)" section above.)_
