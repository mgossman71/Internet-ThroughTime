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
| A6 | ARPANET used NCP (later TCP/IP) | Wikipedia "ARPANET" infobox (protocols) | https://en.wikipedia.org/wiki/ARPANET | Matches RFC 1009 (NCP, 1987). |

### Verification access notes (2026-09-16)

- `https://www.internetsociety.org/internet/history-of-the-internet/early-days/` → HTTP 403 (blocked).
- `https://www.internetsociety.org/internet/history-of-the-internet/brief-history-of-the-internet/` → HTTP 403.
- `https://computerhistory.org/oral-history/leon-kleinrock` → HTTP 404 (site likely restructured; search for the current stable URL before citing).
- Wikipedia fetch succeeded and was used as the aggregator source above.

---

## Other eras

_No claims recorded yet — add entries here before writing UI copy for:
expansion70s, tcpip1983 (verify Jan 1 1983 cutover, NCP→TCP/IP), dialup
(1200/2400/9600 baud, V.22 era), cern-web (1989 proposal, 1990 first
browser/server, 1991 public, 1993 CERN puts WWW in public domain),
early-web (Mosaic 1993, Netscape 1994, GeoCities 1994), 2000s eras,
infrastructure (submarine cables — use reputable dataset, e.g. Telegeography/OpenSubmap).`
