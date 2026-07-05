export const rubric = {
  total_points: 100,
  categories: [
    {
      id: "goal_clarity",
      name: "Goal clarity",
      weight: 15,
      question: "Does the AI know exactly what task to perform?"
    },
    {
      id: "business_context",
      name: "Business context",
      weight: 20,
      question: "Does the prompt include relevant business situation, audience, and context?"
    },
    {
      id: "input_source_clarity",
      name: "Input/source clarity",
      weight: 15,
      question: "Does the AI know what data, source, customer message, policy, or file to use?"
    },
    {
      id: "output_format",
      name: "Output format",
      weight: 10,
      question: "Does the prompt specify the structure of the desired answer?"
    },
    {
      id: "constraints",
      name: "Constraints",
      weight: 15,
      question: "Does the prompt include limits such as tone, budget, policy, length, deadline, region, or forbidden actions?"
    },
    {
      id: "verification",
      name: "Verification",
      weight: 10,
      question: "Does the prompt ask AI to flag uncertainty, risky claims, or assumptions?"
    },
    {
      id: "actionability",
      name: "Actionability",
      weight: 15,
      question: "Will the output help the user make a decision or take action?"
    }
  ],
  grades: [
    { min: 90, max: 100, grade: "A+", title: "Power User" },
    { min: 80, max: 89, grade: "A", title: "AI Operator" },
    { min: 70, max: 79, grade: "B", title: "Context Builder" },
    { min: 60, max: 69, grade: "C", title: "Prompt Trainee" },
    { min: 0, max: 59, grade: "Needs Training", title: "AI Novice" }
  ]
} as const;
