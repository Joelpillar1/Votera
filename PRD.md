# 🔒 VOTERAX — MASTER SYSTEM PROMPT FOR GOOGLE AI STUDIO

**ROLE & AUTHORITY**

You are building **VOTERAX**, a participation-first decision-making platform.
This instruction is the **single source of truth**.
All requirements, constraints, exclusions, and design rules below are **non-negotiable**.

Do **not** invent features, flows, UI patterns, or logic outside this specification.

---

## 1. PRODUCT DEFINITION

Voterax is a participation-first coordination platform where influence is earned through contribution and long-term reputation — never through money, tokens, popularity, or status.

The platform enables organizations to:

* Design contribution-based campaigns
* Measure participation
* Build non-transferable reputation
* Produce transparent, legitimate outcomes through voting

The system must feel **calm, fair, serious, and inevitable**.

---

## 2. CORE PHILOSOPHY (HARD CONSTRAINTS)

These principles override all other considerations:

1. Participation always precedes power
2. Reputation is earned, not owned
3. Influence must be spent deliberately and burned
4. Outcomes must be transparent and auditable
5. Simplicity over cleverness
6. One primary action per screen
7. Brand clarity over visual noise

If a feature does not directly support **contribution, reputation, or legitimate decision-making**, it must not be built.

---

## 3. USER ROLES & PERMISSIONS

### Contributor

* View campaigns
* Submit contributions
* Earn Campaign Points (CP)
* Accumulate Reputation Points (RP)
* Vote when eligible
* View results and reputation history

### Organizer

* Create campaigns
* Define tasks and CP values
* Review and approve/reject contributions
* Open and close voting
* Finalize and publish outcomes

### System Admin (Internal Only)

* Monitor platform integrity
* Access CP/RP ledgers
* Detect abuse
* Anchor results on-chain
* Maintain audit trails

---

## 4. POINT SYSTEM & GOVERNANCE LOGIC

### Campaign Points (CP)

* Earned only through approved tasks
* Campaign-specific
* Non-transferable
* Burned when used in voting

### Reputation Points (RP)

* Earned across campaigns
* Persistent and global
* Non-transferable
* Burned when used in voting

### Voting Power Formula

```
Voting Power = CP + (0.2 × RP)
```

Points used in voting must be:

* Permanently deducted
* Recorded in an immutable ledger
* Visibly explained to the user before confirmation

Voting must feel **intentional and irreversible**.

---

## 5. DATA MODELS (REQUIRED)

Define and persist at minimum:

**User**

* id
* name
* role
* RP_balance

**Campaign**

* id
* title
* objective
* organizer_id
* timeline
* status (draft, active, voting, completed)

**Task**

* id
* campaign_id
* description
* CP_value

**Contribution**

* id
* task_id
* user_id
* submission_proof
* status (pending, approved, rejected)
* timestamp

**Points Ledger**

* user_id
* source (task or vote)
* CP_delta
* RP_delta
* burn_flag
* timestamp

**Vote**

* campaign_id
* user_id
* voting_power_used
* timestamp

---

## 6. PLATFORM STRUCTURE

### Public Layer (No Authentication)

* Landing page
* Read-only campaign previews

### Authenticated Layer

* Contributor dashboard
* Organizer dashboard
* Campaign participation flows
* Voting & results

### System Layer

* Admin panel
* Audit logs
* On-chain anchoring interface

---

## 7. LANDING PAGE REQUIREMENTS

Build a minimal, trust-driven landing page with:

1. Hero section

   * Clear headline
   * One-sentence value proposition
   * Primary CTA: “Create a Campaign”
   * Secondary CTA: “How It Works”

2. How It Works

   * Contribute → Build Reputation → Decide

3. Principles

   * No token voting
   * No pay-to-win
   * Transparent outcomes

4. Use Cases

   * DAOs
   * Schools
   * NGOs
   * Communities
   * Public programs

5. Footer

   * Documentation
   * Transparency
   * Legal

No animations. No decorative elements.

---

## 8. CONTRIBUTOR EXPERIENCE

### Contributor Dashboard

Display:

* Total RP
* Campaign-specific CP
* Active campaigns
* Eligible campaigns

### Campaign Page (Contributor)

Include:

* Campaign overview
* Task list with CP values
* Contribution submission flow
* Contribution status tracking
* Voting interface (locked until eligible)
* Results page after finalization

---

## 9. ORGANIZER EXPERIENCE

### Organizer Dashboard

* Draft campaigns
* Active campaigns
* Completed campaigns
* Campaign health indicators

### Campaign Creation Flow

Must follow this order:

1. Campaign basics (name, objective, timeline)
2. Task definition and CP assignment
3. Voting rules
4. Review & launch confirmation

### Campaign Management

* Review contributions (approval requires reason)
* Monitor voting participation
* Finalize outcomes
* Anchor results on-chain

---

## 10. ADMIN & SYSTEM TOOLS

Admin interface must include:

* Campaign registry
* CP/RP ledger access
* Abuse detection flags
* Immutable audit logs
* On-chain result anchoring

Admin UI is functional, not decorative.

---

## 11. BRAND & UI SYSTEM (STRICT ENFORCEMENT)

### Typography

* Primary: **Josefin Sans (Semi-Bold)** — headlines only
* Secondary: **Lato (Light)** or **Thasadith** — body, buttons, captions

Rules:

* Eyebrow text: ALL CAPS (secondary font)
* Buttons: ALL CAPS (secondary font)
* No other fonts allowed

### Color

* Neutral base dominates
* Vibrant brand colors used sparingly
* Gradients limited to 2–3 brand colors
* Red reserved only for irreversible actions

### Layout

* Grid-based system
* Content tiles for grouping
* Clear margins and spacing
* One primary action per screen

### Motion

* Minimal
* Only for state changes or confirmations
* No decorative animation

---

## 12. FEATURES EXPLICITLY OUT OF SCOPE (DO NOT BUILD)

* Token issuance
* Token trading
* Paid voting
* Messaging or chat
* Social feeds
* Gamification
* AI decision-making
* Notification spam

Any of the above is a violation of this specification.

---

## 13. UX TONE & LANGUAGE

* Neutral
* Professional
* Human
* Clear
* No hype
* No crypto jargon unless strictly necessary

The product should feel like **public infrastructure**, not a social app.

---

## 14. SUCCESS CRITERIA

The build is successful if:

* Users trust outcomes
* Founders feel decisions are legitimate
* Contribution correlates with influence
* The UI disappears behind the system’s fairness

If users praise the UI, it is overdesigned.
If users trust the outcome, the product is correct.

---

## 15. FINAL DIRECTIVE

Build Voterax with restraint.
Remove anything that does not support contribution, reputation, or legitimate outcomes.
Favor clarity over cleverness at all times.

This system prompt overrides all other instructions.

---

### 🧠 Final note (designer to designer)

This prompt encodes:

* Product vision
* UX discipline
* Brand law
* Governance logic
* Engineering constraints

