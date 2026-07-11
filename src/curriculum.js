export const lessonCards = [
  {
    id: "MR-001",
    title: "Add business context first",
    skill_category: "Market Research",
    beginner_explanation: "AI gives better research when it knows what kind of business you run, what you sell, and why you need the research.",
    evaluation_rule: "Check whether the prompt includes business type, offer, situation, and research objective.",
    weak_prompt_example: "Find competitors for my business.",
    improved_prompt_example: "I run a small skincare brand in Jakarta selling gentle acne products. Compare competitors that target Gen Z women.",
    source_reference: "AplusPrompt internal business AI rubric, inspired by OpenAI and DeepLearning.AI prompting principles"
  },
  {
    id: "MR-002",
    title: "Name the customer and market",
    skill_category: "Market Research",
    beginner_explanation: "A competitor list changes a lot depending on the customer, geography, budget level, and buying situation.",
    evaluation_rule: "Check whether target customer and market or location are specific enough for useful research.",
    weak_prompt_example: "Who are my competitors?",
    improved_prompt_example: "Find competitors for a premium lunch catering service for office managers in Singapore's CBD.",
    source_reference: "AplusPrompt internal business AI rubric, inspired by Anthropic and Google business prompting guidance"
  },
  {
    id: "MR-003",
    title: "Ask for evidence and recency",
    skill_category: "Research Reliability",
    beginner_explanation: "Market research can go stale quickly. Ask AI to separate sourced evidence from assumptions and include recent references when possible.",
    evaluation_rule: "Check whether the prompt asks for source links, dates, current information, or assumptions.",
    weak_prompt_example: "Tell me the top competitors.",
    improved_prompt_example: "Use sources from the last 12 months where possible, include links, and label anything that is an assumption.",
    source_reference: "OpenAI prompt engineering guide and AplusPrompt internal business AI rubric"
  },
  {
    id: "MR-004",
    title: "Choose the output shape",
    skill_category: "Prompt Structure",
    beginner_explanation: "AI performs better when you tell it the format you want, such as a table, scorecard, short brief, or ranked action list.",
    evaluation_rule: "Check whether the prompt requests a clear format and comparison criteria.",
    weak_prompt_example: "Research competitors and explain them.",
    improved_prompt_example: "Return a table with columns for price, target customer, positioning, channels, strengths, weaknesses, and opportunity gap.",
    source_reference: "DeepLearning.AI and OpenAI prompt engineering principles, paraphrased for business users"
  },
  {
    id: "MR-005",
    title: "Set constraints and assumptions",
    skill_category: "Business Judgment",
    beginner_explanation: "Constraints help AI avoid wandering. Assumptions help you see what the AI is guessing instead of treating everything as fact.",
    evaluation_rule: "Check whether the prompt includes budget, scope, exclusions, must-haves, or assumption handling.",
    weak_prompt_example: "Give me a competitor strategy.",
    improved_prompt_example: "Focus on small local competitors, exclude enterprise brands, and state assumptions if pricing or traffic data is not public.",
    source_reference: "Anthropic prompt engineering guidance and AplusPrompt internal business AI rubric"
  },
  {
    id: "MR-006",
    title: "Connect research to action",
    skill_category: "Business Usefulness",
    beginner_explanation: "Research is more useful when AI knows the decision it should support and ends with practical next steps.",
    evaluation_rule: "Check whether the prompt asks for recommendations, priorities, next actions, or a business decision.",
    weak_prompt_example: "Give me information about competitors.",
    improved_prompt_example: "Finish with 3 actions I should take this week to position my offer against these competitors.",
    source_reference: "Google/Gemini business prompting guidance and AplusPrompt internal business AI rubric"
  }
];
