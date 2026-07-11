# AplusPrompt Curriculum Notes

## Core learning idea
AplusPrompt teaches AI capability through interactive missions, mostly starting from prompting.

The app should not only grade prompts. It should train users to understand what makes a prompt useful for real business work.

## Source-of-truth direction
The AI coach should not teach randomly from model memory only. It should use a small internal curriculum knowledge base with lesson cards.

The curriculum is inspired by trusted AI education principles from:
- DeepLearning.AI / Andrew Ng and Isa Fulford prompt engineering principles
- OpenAI official prompt engineering guidance
- Anthropic prompt engineering guidance
- Google/Gemini business prompting guidance
- AplusPrompt internal business AI rubric

Do not copy paid or copyrighted course content word-for-word. Paraphrase into original beginner-friendly lessons.

## Core rubric
Evaluate user prompt attempts using this rubric:
1. Clarity of task
2. Business context
3. Target customer / market specificity
4. Source and recency awareness
5. Output structure
6. Constraints and assumptions
7. Business usefulness / actionability

## Coach principle
The AI coach should act like a personal trainer, not a judge.

Weak behavior:
"Score: 6/10. Your prompt needs improvement."

Better behavior:
"Good start. Your goal is clear, but your prompt is missing business context. If you ask AI this way, the answer will probably be generic. Let’s add your industry, location, target customer, and what you want to compare."

## Mission focus for MVP
Mission: Market Research Coach

Goal: Teach a non-technical business user how to use AI for better market research.

Example weak prompt:
"Find competitors for my business."

Common missing elements:
- Business type
- Location / market
- Target customer
- Comparison criteria
- Source and recency requirement
- Output format
- Business action

## Example lesson card structure
{
  "id": "MR-001",
  "title": "Add business context before asking for research",
  "skill_category": "Market Research",
  "beginner_explanation": "AI gives better research when it knows the business type, target customer, location, and decision goal.",
  "evaluation_rule": "Check whether the user included business type, target customer, market/location, and research objective.",
  "weak_prompt_example": "Find competitors for my business.",
  "improved_prompt_example": "I run a small skincare brand in Indonesia targeting Gen Z women. Compare 5 competitors by price, positioning, hero product, social media strategy, and market gap.",
  "source_reference": "AplusPrompt curriculum based on DeepLearning.AI, OpenAI, Anthropic, and Google prompting guidance"
}
