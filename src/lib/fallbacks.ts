import { getMission } from "@/data/missions";
import type { CustomerSaveAgentOutput, ImprovedPrompt, OutputComparison, PromptScore } from "@/lib/types";

export function scoreFallback(userPrompt: string, missionId: string): PromptScore {
  const prompt = userPrompt.toLowerCase();
  const hasContext = /bakery|coffee|business|customer|bandung|target|audience/.test(prompt);
  const hasPolicy = /policy|refund|voucher|approval|budget|under|avoid|do not/.test(prompt);
  const hasFormat = /table|list|json|draft|under \d+|format|step/.test(prompt);
  const hasVerification = /uncertain|assumption|verify|risk|flag|manual|approval/.test(prompt);
  const hasAction = /recommend|action|next|offer|cta|plan|reply|draft/.test(prompt);

  const category_scores = {
    goal_clarity: hasAction ? 12 : 8,
    business_context: hasContext ? 16 : 2,
    input_source_clarity: /message|competitor|policy|source|data|customer/.test(prompt) ? 12 : 3,
    output_format: hasFormat ? 8 : 0,
    constraints: hasPolicy ? 12 : 1,
    verification: hasVerification ? 8 : 0,
    actionability: hasAction ? 12 : 5
  };
  const total_score = Object.values(category_scores).reduce((sum, value) => sum + value, 0);
  const grade = total_score >= 80 ? "A" : total_score >= 70 ? "B" : total_score >= 60 ? "C" : "Needs Training";
  const user_title = total_score >= 80 ? "AI Operator" : total_score >= 70 ? "Context Builder" : total_score >= 60 ? "Prompt Trainee" : "AI Novice";

  return {
    total_score,
    grade,
    user_title,
    category_scores,
    strengths: ["You identified the general task."],
    weaknesses: [
      !hasContext ? "Missing business context" : "",
      !hasPolicy ? "Missing policy, budget, tone, or other constraints" : "",
      !hasFormat ? "No clear output format" : "",
      !hasVerification ? "No instruction to flag uncertainty or risky promises" : ""
    ].filter(Boolean),
    coach_explanation:
      missionId === "customer_save"
        ? "Good start, but this prompt needs stronger form. The AI does not know your bakery policy, tone, or approval rules, so it may overpromise to the customer."
        : "Good start, but the prompt needs more context, constraints, and a clear output shape before AI can produce business-ready work.",
    next_reps: ["Add business context", "Add the source or customer message", "Add constraints", "Ask AI to flag risks"]
  };
}

export function improveFallback(missionId: string): ImprovedPrompt {
  const mission = getMission(missionId) ?? getMission("customer_save")!;
  return {
    improved_prompt: mission.improved_prompt_example,
    changes_made: ["Added role", "Added business context", "Added constraints", "Added output expectations", "Added risk check"],
    why_it_is_better:
      "The stronger prompt gives AI the business situation, the information to use, the rules to follow, and the kind of answer that is actually useful."
  };
}

export function comparisonFallback(missionId: string): OutputComparison {
  if (missionId === "competitor_analysis") {
    return {
      weak_output: "Look at your competitors' prices, social media, and reviews. Try promotions and improve your service.",
      improved_output:
        "Create a comparison table for Cafe A, Cafe B, and Cafe C across pricing, menu position, review themes, social style, and likely audience. Then test two weekday student bundles, one office lunch offer, and a review-request workflow. Mark competitor claims as assumptions until verified.",
      comparison: {
        specificity: "The improved output names what to compare and what decisions to make.",
        safety: "It separates assumptions from facts instead of pretending research is confirmed.",
        usefulness: "It turns research into this-month actions.",
        business_fit: "It uses Bandung, students, young professionals, and weekday sales."
      },
      main_learning: "Competitor prompts need sources, criteria, and an action decision."
    };
  }

  if (missionId === "marketing_campaign") {
    return {
      weak_output: "Post discounts, run social media ads, make nice photos, and ask customers to buy.",
      improved_output:
        "Run a 7-day Instagram and WhatsApp plan: Monday croissant office bundle, Tuesday family cake reminder, Wednesday limited voucher, Thursday behind-the-scenes story, Friday pre-order push, Saturday birthday cake showcase, Sunday next-week reservation CTA. Keep it warm and low-budget.",
      comparison: {
        specificity: "The improved output has channels, products, audience, and daily offers.",
        safety: "It avoids expensive paid ads because budget is low.",
        usefulness: "It gives copy-ready campaign structure.",
        business_fit: "It is tailored to bakery weekday sales."
      },
      main_learning: "Marketing prompts get better when audience, offer, channel, tone, and CTA are included."
    };
  }

  return {
    weak_output:
      "Sorry for the late cake delivery. We apologize for the inconvenience. We can offer you a full refund and will make sure this never happens again.",
    improved_output:
      "Hi, I am truly sorry your daughter's birthday cake arrived two hours late. I understand how disappointing that must have been for such an important day. Based on our late-delivery policy, we can offer either a 20% refund or a free delivery voucher. If you would like us to review a full refund, I can escalate that to our manager. Thank you for telling us, and again, I am very sorry.",
    comparison: {
      specificity: "The improved reply mentions the birthday cake and two-hour delay.",
      safety: "The improved reply follows policy and flags manager approval for full refund.",
      usefulness: "The improved reply gives clear next options.",
      business_fit: "The improved reply matches the bakery's warm, professional tone."
    },
    main_learning: "Policy and approval rules make customer replies safer and more useful."
  };
}

export function customerSaveAgentFallback(): CustomerSaveAgentOutput {
  return {
    issue_type: "late_delivery",
    emotion: "disappointed/angry",
    severity: "high",
    summary: "Customer's birthday cake arrived two hours late and the party was already over.",
    policy_match: {
      allowed_actions: ["20% refund", "free delivery voucher"],
      requires_approval: ["full refund", "compensation above policy"],
      forbidden: ["blaming the delivery driver", "promising full refund without approval"]
    },
    recommended_action:
      "Apologize warmly, offer a 20% refund or free delivery voucher, and escalate to a manager if the customer requests a full refund.",
    risk_flags: ["High emotional context: birthday event was affected", "Do not promise a full refund without manager approval"],
    draft_reply:
      "Hi, I am truly sorry your daughter's birthday cake arrived so late. I understand how disappointing that must have been, especially for such an important moment. Based on our late-delivery policy, we can offer either a 20% refund or a free delivery voucher. If you would like us to review a full refund, I can ask our manager to look into it. Again, I am very sorry.",
    follow_up_message:
      "Hi, I wanted to check in and make sure we resolved the delivery issue in a way that felt fair. Thank you again for giving us the chance to make this right.",
    approval_required: true
  };
}
