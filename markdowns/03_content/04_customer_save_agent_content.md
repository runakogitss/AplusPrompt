# Customer Save Agent Content Spec

## Agent purpose

The Customer Save Agent helps business owners respond to unhappy customers safely and professionally.

It is not a replacement for human judgment. It is a supervised workflow that drafts and recommends.

## Agent promise

> Turn angry customer messages into policy-safe replies and follow-ups.

## Input fields

Required:

- Business type
- Customer complaint
- Business policy
- Desired tone

Optional:

- Customer name
- Order details
- Previous customer history
- Allowed compensation options
- Forbidden promises
- Escalation rules

## Standard business policy template

```text
Business type:
Tone:
Allowed offers:
Requires approval:
Forbidden promises:
Escalation rules:
Reply length:
Follow-up timing:
```

## Agent workflow

1. **Read complaint**
   - Extract issue.
   - Extract emotional signals.
   - Identify missing information.

2. **Classify issue**
   - Late delivery
   - Product quality
   - Wrong order
   - Rude service
   - Refund request
   - Safety/health issue
   - Other

3. **Detect emotion and severity**
   - Emotion: angry, disappointed, confused, anxious, neutral.
   - Severity: low, medium, high, critical.

4. **Check policy**
   - What is allowed?
   - What needs approval?
   - What must be avoided?

5. **Recommend action**
   - Apology only
   - Voucher
   - Partial refund
   - Replacement
   - Manager escalation
   - Full refund approval request

6. **Draft reply**
   - Human, warm, concise.
   - Policy-safe.
   - No blame shifting.

7. **Draft follow-up**
   - Short message for next day or after resolution.

8. **Require human approval**
   - Always in MVP.
   - If high/critical severity, make approval_required true.

## Required output JSON

```json
{
  "issue_type": "late_delivery",
  "emotion": "disappointed/angry",
  "severity": "high",
  "summary": "Customer's birthday cake arrived two hours late and the event was already over.",
  "policy_match": {
    "allowed_actions": ["20% refund", "free delivery voucher"],
    "requires_approval": ["full refund"],
    "forbidden": ["blaming driver"]
  },
  "recommended_action": "Apologize, offer 20% refund or free delivery voucher, and invite manager review if customer requests full refund.",
  "risk_flags": ["High emotional context: birthday event was affected", "Do not promise full refund without manager approval"],
  "draft_reply": "...",
  "follow_up_message": "...",
  "approval_required": true
}
```

## Example reply

```text
Hi [Name], I’m truly sorry your daughter’s birthday cake arrived so late. I understand how disappointing that must have been, especially for such an important moment. We’d like to offer either a 20% refund or a free delivery voucher, based on our late-delivery policy. I’ll also personally review what happened so we can prevent this again. Thank you for telling us, and again, I’m very sorry.
```

## Safety requirements

The agent must:

- Never claim the message has been sent.
- Never promise compensation outside policy.
- Flag manager approval needs.
- Use the provided policy as source of truth.
- Ask for missing information when needed.
- Avoid blaming staff, driver, or customer.
- Avoid legal claims.

## MVP UI copy

Before output:

> This agent drafts a safe response. You approve before sending.

After output:

> Review carefully before sending. A+Prompt does not send messages automatically.

## Agent teaching moment

After the agent runs, show:

> You just built your first supervised AI workflow. This is how prompting becomes an agent: repeated steps, business context, policy rules, and human approval.
