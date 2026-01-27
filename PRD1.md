PRODUCT REQUIREMENTS DOCUMENT (PRD)

Product: Voterax Core (V1)

Category: Participation & Decision Infrastructure
Owner: Founder & Co-founder 
Status: V1 – Build & Launch
Target Platforms: Web App (Mobile-responsive)
Initial Chain Support: EVM-compatible chains


1. PRODUCT OVERVIEW

1.1 What is Voterax Core?

Voterax Core is a participation-driven coordination platform that enables organizations, communities, and ecosystems to run fair, transparent, and verifiable campaigns where influence is earned through contribution and reputation, not capital or status.

It provides structured campaign management, contribution tracking, reputation-aware voting, and auditable outcomes, designed to work across Web3 and Web2 organizations.



1.2 Problem Statement

Across DAOs, communities, schools, NGOs, and organizations, campaigns often fail due to:

Centralized or opaque decision-making

Token- or status-weighted voting that ignores contribution

Low-quality participation and Sybil activity

Weak accountability for outcomes

Contributor disengagement after campaigns


Existing tools optimize for activity or capital, not credible participation.



1.3 Voterax Core Solution

Voterax Core introduces a participation-first model:

Contribution Points (CP): Campaign-bound points earned by completing defined tasks

Reputation Points (RP): Global reputation earned through consistent participation and success

Voting Power Formula:
Voting Power = CP + (0.2 × RP)


This ensures:

Influence is earned, not bought

Contribution is visible and measurable

Outcomes are transparent and auditable




2. TARGET USERS & USE CASES

2.1 Primary Users

Organizers

DAOs

Ecosystems

Schools & universities

NGOs & public programs

Companies & institutions


Participants

Developers

Designers

Researchers

Students

Community contributors (technical & non-technical)





2.2 Core Use Cases

Bounty programs

Grants & funding selection

Hackathons & innovation challenges

Community decision-making

Internal competitions & evaluations

Public goods coordination





3. PRODUCT SCOPE (V1 ONLY)

3.1 Included in V1

Campaign creation & management

Task & milestone definition

CP allocation & tracking (campaign-bound)

RP tracking (global, persistent)

Reputation-weighted voting

Eligibility checks for voting

Result finalization

On-chain anchoring of outcomes

Basic dashboards (organizers & participants)




3.2 Explicitly Excluded from V1

Paid voting

Token issuance

Token trading or speculation

Public entertainment voting

Social feeds or viral mechanics

AI features

Messaging / chat


(These are reserved for Voterax Live (V2) or later expansions.)




4. FUNCTIONAL REQUIREMENTS

4.1 User Authentication & Profiles

Requirements:

Wallet-based login (EVM wallets)

Optional email login (future-ready)

Basic user profile:

Wallet address / user ID

Campaign participation history

CP per campaign

Total RP



4.2 Campaign Management (Organizer)

Organizer must be able to:

Create a campaign

Define:

Campaign description

Timeline (start/end)

Tasks & milestones

CP per task

Voting rules


Open & close campaigns

View participant progress

Finalize results




4.3 Task & Contribution System

Requirements:

Tasks must be clearly defined

Participants submit proof of work

Organizers approve or reject submissions

CP awarded per approved task

CP is:

Campaign-bound

Non-transferable

Used only for that campaign’s voting




4.4 Reputation System (RP)

Requirements:

RP is global and persistent

RP earned through:

Campaign completion

Winning campaigns

Milestone achievements


RP is not transferable

RP  burned when used in voting



4.5 Voting System

Requirements:

Voting only opens after eligibility criteria are met

Voting power calculation:

CP + (0.2 × RP)


Votes are:

Transparent

Auditable

Final once submitted


CP used for voting is burned after campaign

RP used for voting is burned



4.6 Results & Finalization

Requirements:

Vote tallying

Final result confirmation

Public result display

Immutable outcome once finalized




5. SMART CONTRACT LAYER (V1)

5.1 Purpose

The smart contract layer provides transparency and auditability, not heavy logic.



5.2 On-Chain Functions

Campaign registry anchoring (IDs, timelines)

Final result hash commitment

CP burn confirmation

RP usage and burn confirmation

Timestamping & immutability




5.3 Design Principles

Minimal, auditable contracts

Separation of concerns (off-chain logic, on-chain proof)

Upgrade-safe architecture (where required)

Gas-efficient operations

EVM-compatible deployment



6. NON-FUNCTIONAL REQUIREMENTS

6.1 Performance & Scalability

Majority of logic off-chain

Low gas usage

Support large campaigns with many participants


6.2 Security

Role-based access control

Campaign isolation

Protection against double voting

Smart contract audits before production use


6.3 Transparency

Public campaign pages

Verifiable voting logic

On-chain proof of final outcomes




7. UX / UI REQUIREMENTS

Core Screens (V1):

1. Homepage (clear entry for organizers & participants)


2. Campaign list


3. Campaign detail page


4. Task submission view


5. Voting interface


6. Participant dashboard


7. Organizer dashboard


8. Admin page



Design principles:

Simple

Neutral

Professional

No crypto jargon for non-Web3 users




8. SUCCESS METRICS (KPIs)

Number of campaigns created

Campaign completion rate

% of participants eligible to vote

Voting participation rate

Organizer retention

Participant repeat participation

Reduction in post-campaign disputes




9. RELEASE PLAN

V1 Milestones:

1. UI/UX completion


2. Frontend skeleton


3. Backend core logic


4. Smart contract integration


5. Internal testing


6. Pilot campaigns


7. Public V1 launch




10. LONG-TERM VISION (OUT OF SCOPE)

Voterax Live (V2): public voting & engagement

Cross-chain expansion

Advanced analytics

API access

Enterprise deployments



FINAL NOTE

Voterax Core V1 is infrastructure.
It prioritizes trust, fairness, and long-term coordination over hype, speculation, or virality.
