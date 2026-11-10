# Homepage Components — Variant Rename Proposal

**Status: EXECUTED 2026-09-22.** All 21 sets / 46 variants renamed and verified (final
`get_metadata` read-back confirmed every touched set exposes exactly `Version`/`Viewport`/
`Status`, no collisions). Deviations from the original proposal, per Shay's answers:
- **Logo Bar**: both "2" variants kept `Status=Live` (not Draft) — just Desktop/Mobile labels, no live/draft split intended.
- **In Stock**: all 3 variants share `Version=In Stock`; `Status` (Live/Draft) does the distinguishing instead of a "2" suffix.
- **"Frame 1232"** → renamed to **`Social`**; `Short`→`Viewport=Desktop`, `Tall`→`Viewport=Mobile` (both `Version=Social, Status=Live`) — dropped the short/medium/tall content framing in favor of a straight viewport pair, per Shay's direction.
- **Global Promo Banner** and **Collections Module 1**: confirmed `Variant2`/1440↔375 width pairs are unlabeled Mobile variants, not draft alternates — both `Status=Live`.

This file is kept as the historical record of the migration — see `FIGMA_SYSTEMS.md` for the
narrative summary and next steps (mapping these into the app's Homepage docs page).


Target: OG file `DTjIdCKhnDUVvJhEfpn10v`, canvas **"🏡Homepage Components"** (node `1059:3763`).
21 component sets inventoried, all using the legacy single `Property 1=` property — none yet
on the `Version=/Viewport=/Status=` convention. Nothing has been written to Figma yet — this
is the proposal for review before any renames execute.

**Per your call this session:** `Default` = live/current. Variants I can't place as either
"the live one" or "a draft alternate" are flagged below — please resolve those before I run
anything.

## Legend
- ✅ = confident, applying migration rules directly
- 🚩 = flagged, need your confirmation before this one gets written

---

## 1. Global Promo Banner (`1060:1915`)
Title cleanup: `Global promo banner` → **`Global Promo Banner`**

| Node | Current | Proposed | Note |
|---|---|---|---|
| `1060:1914` | `Property 1=Desktop` | `Version=Global Promo Banner, Viewport=Desktop, Status=Live` | ✅ bare Desktop marker |
| `1060:1916` | `Property 1=Variant2` | 🚩 `Version=Global Promo Banner, Viewport=Mobile, Status=Live` | **Flag:** named a generic placeholder, but it's 375px wide (exactly mobile width) vs. Desktop's 1480px — looks like an unlabeled Mobile variant, not a draft alternate. Confirm?

## 2. Logo Bar (`1060:1704`)
Title cleanup: `Logo bar` → **`Logo Bar`**

| Node | Current | Proposed | Note |
|---|---|---|---|
| `1060:1705` | `Property 1=Desktop` | 🚩 `Version=Logo Bar, Viewport=Desktop, Status=Live` | |
| `1060:1755` | `Property 1=Desktop 2` | 🚩 `Version=Logo Bar 2, Viewport=Desktop, Status=?` | |
| `1060:1805` | `Property 1=Mobile` | 🚩 `Version=Logo Bar, Viewport=Mobile, Status=Live` | |
| `1060:1856` | `Property 1=Mobile 2` | 🚩 `Version=Logo Bar 2, Viewport=Mobile, Status=?` | |

**Flag:** 2 looks per viewport ("Desktop"/"Desktop 2", "Mobile"/"Mobile 2"). I'm guessing the "2"s pair up as a second design (positional inference, rule 5) — but I don't know if that second design is a legitimate alternate (both Live) or an old draft that should be `Status=Draft`. Which is it?

## 3–6. Category Cards — Living Room / Accent Chairs / Outdoor / Storage
Each is its own 2-variant set, same shape. Title Case cleanup on each set name.

| Set | Node | Current | Proposed |
|---|---|---|---|
| Living Room (`1063:1669`) | `1063:1668` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1063:1670` | `Property 1=Variant2` | ✅ `Version=Living Room 2, Viewport=Desktop, Status=Draft` |
| Accent Chairs (`1063:1679`) | `1063:1678` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1063:1680` | `Property 1=Variant2` | ✅ `Version=Accent Chairs 2, Viewport=Desktop, Status=Draft` |
| Outdoor (`1063:1692`) | `1063:1691` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1063:1693` | `Property 1=Variant2` | ✅ `Version=Outdoor 2, Viewport=Desktop, Status=Draft` |
| Storage (`1063:1706`) | `1063:1705` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1063:1707` | `Property 1=Variant2` | ✅ `Version=Storage 2, Viewport=Desktop, Status=Draft` |

No viewport marker on any of these and no mobile-width sibling in the same set (Mobile is its
own separate set, #7) — treating all 4 sets as Desktop-only per their context (sit inside the
"Categories" frame's Desktop token-wrapper column). Both variants same pixel size (301.75×338),
so no mobile-width tell like #1/#9 — Variant2 reads as a genuine draft alternate design, not an
unlabeled breakpoint.

## 7. Mobile Categories (`1063:1776`)
| Node | Current | Proposed |
|---|---|---|
| `1063:1775` | `Property 1=Default` | ✅ `Version=Default, Viewport=Mobile, Status=Live` |
| `1063:1777` | `Property 1=Variant2` | ✅ `Version=Mobile Categories 2, Viewport=Mobile, Status=Draft` |

## 8. New Arrivals (`1063:2001`)
Title cleanup: `New arrivals - Desktop` → **`New Arrivals`** (redundant viewport suffix — the
`- Desktop` belongs in the `Viewport` property, not the set title)

| Node | Current | Proposed | Note |
|---|---|---|---|
| `1063:2000` | `Property 1=Default` | 🚩 `Version=Default, Viewport=Desktop, Status=Live` | Viewport inferred from set title's old "- Desktop" suffix — confirm |
| `1063:2002` | `Property 1=Variant2` | 🚩 `Version=New Arrivals 2, Viewport=Desktop, Status=Draft` | same |

(`New arrivals mobile`, node `1063:2098`, is a **standalone component**, not part of a variant
set — left untouched per the convention's non-goals.)

## 9. New Arrivals Product Row (`1063:2050`)
Title cleanup: Title Case only.

| Node | Current | Proposed |
|---|---|---|
| `1063:2049` | `Property 1=Desktop` | ✅ `Version=New Arrivals Product Row, Viewport=Desktop, Status=Live` |
| `1063:2051` | `Property 1=Mobile` | ✅ `Version=New Arrivals Product Row, Viewport=Mobile, Status=Live` |

## 10. Promo Banner (`1063:2215`)
| Node | Current | Proposed |
|---|---|---|
| `1063:2214` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| `1063:2216` | `Property 1=Variant2` | ✅ `Version=Promo Banner 2, Viewport=Desktop, Status=Draft` |

## 11. In Stock (`1063:2295`)
| Node | Current | Proposed | Note |
|---|---|---|---|
| `1063:2294` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` | |
| `1111:1389` | `Property 1=Variant3` | 🚩 `Version=In Stock 2, Viewport=Desktop, Status=Draft` | **Flag:** named "Variant3" but is the 2nd variant by display order (Variant2 doesn't exist — likely deleted earlier). Renaming by position (rule 4) gives "In Stock 2," not "In Stock 3" — confirm that's fine, not meant to imply a missing 3rd. |
| `1063:2296` | `Property 1=Mobile` | ✅ `Version=In Stock, Viewport=Mobile, Status=Live` | |

## 12. Collections Module 1 (`1063:2467`)
| Node | Current | Proposed | Note |
|---|---|---|---|
| `1063:2466` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` | |
| `1063:2468` | `Property 1=Variant2` | 🚩 `Version=Collections Module 1, Viewport=Mobile, Status=Live` | **Flag:** same width tell as #1 — 375px vs. Default's 1440px. Reclassify as unlabeled Mobile rather than a draft alternate? |

## 13–16. Collections Sub-cards — Chair / Storage / Nightstand / Side Table
Title cleanup: `chair` → **`Chair`**, `Storgae` → **`Storage`** (typo), others Title Case only.
Same shape as #3–6 (same pixel size both variants, no mobile tell).

| Set | Node | Current | Proposed |
|---|---|---|---|
| Chair (`1063:2506`) | `1063:2505` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1063:2507` | `Property 1=Variant2` | ✅ `Version=Chair 2, Viewport=Desktop, Status=Draft` |
| Storage (`1067:1455`, typo "Storgae") | `1067:1456` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1067:1460` | `Property 1=Variant2` | ✅ `Version=Storage 2, Viewport=Desktop, Status=Draft` |
| Nightstand (`1067:1466`) | `1067:1467` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1067:1471` | `Property 1=Variant2` | ✅ `Version=Nightstand 2, Viewport=Desktop, Status=Draft` |
| Side Table (`1067:1477`) | `1067:1478` | `Property 1=Default` | ✅ `Version=Default, Viewport=Desktop, Status=Live` |
| | `1067:1482` | `Property 1=Variant2` | ✅ `Version=Side Table 2, Viewport=Desktop, Status=Draft` |

(`Mobile product grid`, node `1063:2537`, is a **standalone component** — left untouched.)

## 17. About Us (`1063:2626`)
| Node | Current | Proposed |
|---|---|---|
| `1063:2625` | `Property 1=Desktop` | ✅ `Version=About Us, Viewport=Desktop, Status=Live` |
| `1063:2627` | `Property 1=Mobile` | ✅ `Version=About Us, Viewport=Mobile, Status=Live` |

## 18. Social CTA Header (`1063:5022`)
| Node | Current | Proposed |
|---|---|---|
| `1063:5021` | `Property 1=Desktop` | ✅ `Version=Social CTA Header, Viewport=Desktop, Status=Live` |
| `1063:5023` | `Property 1=Mobile` | ✅ `Version=Social CTA Header, Viewport=Mobile, Status=Live` |

## 19. Social Post Container (`1063:5053`)
Title cleanup: `Social post container - Desktop` → **`Social Post Container`**

These 3 aren't placeholders — "short"/"Med"/"Tall" are real content-length descriptions, so they
become the `Version` value directly (Title Case corrected), not `{Set} N`.

| Node | Current | Proposed |
|---|---|---|
| `1063:5052` | `Property 1=short` | ✅ `Version=Short, Viewport=Desktop, Status=Live` |
| `1063:5054` | `Property 1=Med` | ✅ `Version=Medium, Viewport=Desktop, Status=Live` |
| `1063:5058` | `Property 1=Tall` | ✅ `Version=Tall, Viewport=Desktop, Status=Live` |

## 20. "Frame 1232" (`1063:5069`) 🚩 needs a real name, not just a rename
| Node | Current | Proposed |
|---|---|---|
| `1063:5052`-style | `1063:5068` | `Property 1=Short` | — |
| | `1063:5070` | `Property 1=Tall` | — |

**Flag:** the *component-set itself* is still named "Frame 1232" — Figma's own default name,
never given a real title. It sits in the Social section, positioned right after Social Post
Container and before Get the Look, same Short/Tall shape as #19 but narrower (160×207/265 vs.
402×467+). What is this actually — a secondary/smaller social-post format? A sidebar module?
I don't want to guess a title for it; what should this set be called?

## 21. Get the Look (`1063:5870`)
| Node | Current | Proposed |
|---|---|---|
| `1063:5869` | `Property 1=Default` | ✅ `Version=Get the Look, Viewport=Desktop, Status=Live` |
| `1063:5871` | `Property 1=Mobile` | ✅ `Version=Get the Look, Viewport=Mobile, Status=Live` |

---

## Summary of flags needing your input

1. **Global Promo Banner** — is `Variant2` actually an unlabeled Mobile variant (375px wide)?
2. **Logo Bar** — are the "2" variants (Desktop 2/Mobile 2) a legitimate second live design, or a draft/old alternate?
3. **New Arrivals** — OK to infer `Viewport=Desktop` for both variants from the set's old "- Desktop" title suffix?
4. **In Stock** — OK to rename "Variant3" to "In Stock 2" (by position, not by its literal embedded number)?
5. **Collections Module 1** — is `Variant2` actually an unlabeled Mobile variant (375px wide), same as flag #1?
6. **"Frame 1232"** — what should this set actually be called? (Never got a real title.)

Everything else (✅) I'm ready to run as soon as you give the go-ahead — happy to execute the
✅ items now and hold the 🚩 ones for your answers, or wait for all of it together, whichever
you'd rather.
