import type { Mission } from "@/lib/types";

export const missions: Mission[] = [
  {
    id: "customer_save",
    title: "Customer Save Agent",
    subtitle: "Rescue an angry customer with a policy-safe AI reply.",
    difficulty: "beginner to agent builder",
    skill_focus: ["Prompt as Program", "Context Engineering", "Constraints", "Verification", "Agent Workflow"],
    scenario: {
      business_type: "Bakery",
      customer_message:
        "I ordered a cake for my daughter's birthday and it arrived 2 hours late. The party was already over. I'm very disappointed.",
      policy: [
        "Late delivery over 1 hour: eligible for 20% refund or free delivery voucher.",
        "Full refund requires manager approval.",
        "Never blame the delivery driver directly.",
        "Tone must be warm, apologetic, and professional.",
        "Keep customer replies under 120 words."
      ]
    },
    bad_prompt_example: "Reply to this angry customer.",
    improved_prompt_example:
      "Act as a customer support coach for a bakery. A customer's birthday cake arrived 2 hours late and they are very disappointed. Our policy allows either a 20% refund or free delivery voucher for delivery delays over 1 hour, but full refunds require manager approval. Write a warm apology under 120 words. Do not blame the delivery driver. Recommend the safest policy-compliant offer and flag anything that needs manager approval.",
    success_criteria: [
      "Includes business type",
      "Includes customer situation",
      "Includes policy",
      "Includes tone and length constraints",
      "Avoids overpromising",
      "Flags approval needs"
    ]
  },
  {
    id: "competitor_analysis",
    title: "Competitor Analysis Gym",
    subtitle: "Turn vague competitor research into a practical action plan.",
    difficulty: "intermediate",
    skill_focus: ["Goal Clarity", "Context Engineering", "Source Awareness", "Output Format", "Actionability"],
    scenario: {
      business_type: "Coffee shop",
      location: "Bandung",
      target_customers: "Students and young professionals",
      problem: "Weekday sales are slow",
      competitors: ["Cafe A", "Cafe B", "Cafe C"]
    },
    bad_prompt_example: "Analyze my competitors.",
    improved_prompt_example:
      "Act as a small-business strategy analyst. I run a mid-price coffee shop in Bandung targeting students and young professionals. Compare my shop against Cafe A, Cafe B, and Cafe C. Analyze pricing, menu positioning, promotions, Google review themes, social media style, and likely customer segments. Use a table. Then give me 5 practical actions I can take this month to improve weekday sales. Separate confirmed information from assumptions and tell me what I should verify manually.",
    success_criteria: [
      "Specifies business and location",
      "Names competitors",
      "Defines comparison criteria",
      "Requests table format",
      "Requests action plan",
      "Asks to separate facts from assumptions"
    ]
  },
  {
    id: "marketing_campaign",
    title: "Marketing Campaign Gym",
    subtitle: "Create a campaign that is specific, realistic, and usable.",
    difficulty: "beginner/intermediate",
    skill_focus: ["Audience", "Offer", "Channel", "Tone", "CTA", "Constraints"],
    scenario: {
      business_type: "Bakery",
      target_customer: "Office workers and young families",
      products: ["Croissants", "Birthday cakes"],
      goal: "Increase weekday sales",
      channels: ["Instagram", "WhatsApp"],
      budget: "Low",
      tone: "Warm and friendly"
    },
    bad_prompt_example: "Give me marketing ideas.",
    improved_prompt_example:
      "Act as a practical marketing coach for a small bakery. I want to increase weekday sales for croissants and birthday cakes. My target customers are office workers and young families. Create a 7-day low-budget Instagram and WhatsApp campaign. Include the daily offer, sample caption, WhatsApp broadcast message, CTA, and expected customer reaction. Keep the tone warm and friendly. Avoid expensive paid ads.",
    success_criteria: [
      "Defines target customer",
      "Defines product and sales goal",
      "Specifies channels",
      "Adds budget constraint",
      "Requests campaign structure",
      "Includes CTA"
    ]
  }
];

export function getMission(id: string) {
  return missions.find((mission) => mission.id === id);
}
