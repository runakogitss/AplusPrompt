# Mission Library

## Mission 1 — Customer Save Agent

### Mission title

Save an angry customer

### Difficulty

Beginner → Agent Builder

### Business problem

A customer is angry because a birthday cake arrived two hours late. The business owner needs to respond warmly while following refund policy.

### Skills trained

- Prompt as Program
- Context engineering
- Constraint prompting
- Verification
- Workflow prompting
- Supervised agent building

### Scenario

```text
Customer message:
“I ordered a cake for my daughter’s birthday and it arrived 2 hours late. The party was already over. I’m very disappointed.”

Business type:
Bakery

Policy:
- Late delivery over 1 hour: eligible for 20% refund or free delivery voucher.
- Full refund requires manager approval.
- Never blame the delivery driver directly.
- Tone must be warm, apologetic, and professional.
- Keep customer replies under 120 words.
```

### Bad prompt example

```text
Reply to this angry customer.
```

### Why it is bad

- No business context.
- No policy.
- No tone.
- No length constraint.
- No risk check.
- May overpromise.

### Improved prompt

```text
Act as a customer support coach for a bakery. A customer’s birthday cake arrived 2 hours late and they are very disappointed. Our policy allows either a 20% refund or free delivery voucher for delivery delays over 1 hour, but full refunds require manager approval. Write a warm apology under 120 words. Do not blame the delivery driver. Recommend the safest policy-compliant offer and flag anything that needs manager approval.
```

### Expected improved output qualities

- Apologetic.
- Specific to birthday context.
- Policy-safe.
- Does not blame driver.
- Under 120 words.
- Flags manager approval if needed.

### Agent unlock

Turn the improved prompt into a repeatable Customer Save Agent.

Agent workflow:

1. Classify complaint issue type.
2. Detect emotion and severity.
3. Check business policy.
4. Recommend action.
5. Draft response.
6. Draft follow-up.
7. Require human approval.

---

## Mission 2 — Competitor Analysis Gym

### Mission title

Beat your competitors with better AI research

### Difficulty

Intermediate

### Business problem

The user wants to know why nearby competitors are getting more customers and what to do this month.

### Skills trained

- Goal clarity
- Context engineering
- Source awareness
- Output format
- Actionability
- Verification

### Scenario

```text
Business type: Coffee shop
Location: Bandung
Target customers: Students and young professionals
Problem: Sales are slower on weekdays
Competitors: Cafe A, Cafe B, Cafe C
Decision needed: What actions should we take this month?
```

### Bad prompt example

```text
Analyze my competitors.
```

### Improved prompt

```text
Act as a small-business strategy analyst. I run a mid-price coffee shop in Bandung targeting students and young professionals. Compare my shop against Cafe A, Cafe B, and Cafe C. Analyze pricing, menu positioning, promotions, Google review themes, social media style, and likely customer segments. Use a table. Then give me 5 practical actions I can take this month to improve weekday sales. Separate confirmed information from assumptions and tell me what I should verify manually.
```

### Expected improved output qualities

- Structured table.
- Uses specified competitors.
- Does not hallucinate certainty.
- Produces concrete actions.
- Supports decision-making.

---

## Mission 3 — Marketing Campaign Gym

### Mission title

Create a campaign that is not generic

### Difficulty

Beginner/Intermediate

### Business problem

The user wants to create a weekly promotion but AI keeps giving generic ideas.

### Skills trained

- Audience definition
- Offer design
- Channel constraints
- Brand voice
- CTA clarity
- Variant generation

### Scenario

```text
Business type: Bakery
Target customer: Office workers and young families
Product: Croissants and birthday cakes
Goal: Increase weekday sales
Channels: Instagram and WhatsApp
Budget: Low
Tone: Warm and friendly
```

### Bad prompt example

```text
Give me marketing ideas.
```

### Improved prompt

```text
Act as a practical marketing coach for a small bakery. I want to increase weekday sales for croissants and birthday cakes. My target customers are office workers and young families. Create a 7-day low-budget Instagram and WhatsApp campaign. Include the daily offer, sample caption, WhatsApp broadcast message, CTA, and expected customer reaction. Keep the tone warm and friendly. Avoid expensive paid ads.
```

### Expected improved output qualities

- 7-day plan.
- Channel-specific copy.
- Clear CTA.
- Low-budget.
- Suitable tone.
- Practical for small business.

## Future mission ideas

- Supplier negotiation coach
- Product description optimizer
- Review analysis coach
- Hiring assistant prompt
- Sales spreadsheet analysis
- Meeting-to-action plan
- Inventory issue diagnosis
- Franchise SOP builder
- WhatsApp broadcast planner
