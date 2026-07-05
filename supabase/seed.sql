insert into missions (id, title, subtitle, difficulty, skill_focus, scenario, bad_prompt_example, improved_prompt_example, success_criteria)
values
(
  'customer_save',
  'Customer Save Agent',
  'Rescue an angry customer with a policy-safe AI reply.',
  'beginner to agent builder',
  array['Prompt as Program','Context Engineering','Constraints','Verification','Agent Workflow'],
  '{"business_type":"Bakery","customer_message":"I ordered a cake for my daughter''s birthday and it arrived 2 hours late. The party was already over. I''m very disappointed.","policy":["Late delivery over 1 hour: eligible for 20% refund or free delivery voucher.","Full refund requires manager approval.","Never blame the delivery driver directly.","Tone must be warm, apologetic, and professional.","Keep customer replies under 120 words."]}'::jsonb,
  'Reply to this angry customer.',
  'Act as a customer support coach for a bakery. A customer''s birthday cake arrived 2 hours late and they are very disappointed. Our policy allows either a 20% refund or free delivery voucher for delivery delays over 1 hour, but full refunds require manager approval. Write a warm apology under 120 words. Do not blame the delivery driver. Recommend the safest policy-compliant offer and flag anything that needs manager approval.',
  array['Includes business type','Includes customer situation','Includes policy','Includes tone and length constraints','Avoids overpromising','Flags approval needs']
),
(
  'competitor_analysis',
  'Competitor Analysis Gym',
  'Turn vague competitor research into a practical action plan.',
  'intermediate',
  array['Goal Clarity','Context Engineering','Source Awareness','Output Format','Actionability'],
  '{"business_type":"Coffee shop","location":"Bandung","target_customers":"Students and young professionals","problem":"Weekday sales are slow","competitors":["Cafe A","Cafe B","Cafe C"]}'::jsonb,
  'Analyze my competitors.',
  'Act as a small-business strategy analyst. I run a mid-price coffee shop in Bandung targeting students and young professionals. Compare my shop against Cafe A, Cafe B, and Cafe C. Analyze pricing, menu positioning, promotions, Google review themes, social media style, and likely customer segments. Use a table. Then give me 5 practical actions I can take this month to improve weekday sales. Separate confirmed information from assumptions and tell me what I should verify manually.',
  array['Specifies business and location','Names competitors','Defines comparison criteria','Requests table format','Requests action plan','Asks to separate facts from assumptions']
),
(
  'marketing_campaign',
  'Marketing Campaign Gym',
  'Create a campaign that is specific, realistic, and usable.',
  'beginner/intermediate',
  array['Audience','Offer','Channel','Tone','CTA','Constraints'],
  '{"business_type":"Bakery","target_customer":"Office workers and young families","products":["Croissants","Birthday cakes"],"goal":"Increase weekday sales","channels":["Instagram","WhatsApp"],"budget":"Low","tone":"Warm and friendly"}'::jsonb,
  'Give me marketing ideas.',
  'Act as a practical marketing coach for a small bakery. I want to increase weekday sales for croissants and birthday cakes. My target customers are office workers and young families. Create a 7-day low-budget Instagram and WhatsApp campaign. Include the daily offer, sample caption, WhatsApp broadcast message, CTA, and expected customer reaction. Keep the tone warm and friendly. Avoid expensive paid ads.',
  array['Defines target customer','Defines product and sales goal','Specifies channels','Adds budget constraint','Requests campaign structure','Includes CTA']
)
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  difficulty = excluded.difficulty,
  skill_focus = excluded.skill_focus,
  scenario = excluded.scenario,
  bad_prompt_example = excluded.bad_prompt_example,
  improved_prompt_example = excluded.improved_prompt_example,
  success_criteria = excluded.success_criteria;

insert into rubric_categories (id, name, weight, question)
values
('goal_clarity','Goal clarity',15,'Does the AI know exactly what task to perform?'),
('business_context','Business context',20,'Does the prompt include relevant business situation, audience, and context?'),
('input_source_clarity','Input/source clarity',15,'Does the AI know what data, source, customer message, policy, or file to use?'),
('output_format','Output format',10,'Does the prompt specify the structure of the desired answer?'),
('constraints','Constraints',15,'Does the prompt include limits such as tone, budget, policy, length, deadline, region, or forbidden actions?'),
('verification','Verification',10,'Does the prompt ask AI to flag uncertainty, risky claims, or assumptions?'),
('actionability','Actionability',15,'Will the output help the user make a decision or take action?')
on conflict (id) do update set name = excluded.name, weight = excluded.weight, question = excluded.question;

insert into subscription_plans (plan_id, name, price_display, features, is_mock)
values
('free','AI Able','Free',array['Foundation track','AI Able Certificate','Basic prompt scoring','5 saved playbook prompts'],true),
('pro','AI Operator','$9-$19/month',array['Unlimited missions','Full prompt playbook','Business memory','Industry context packs','Customer Save Agent'],true),
('team','AI Operator Team','$49-$199/month',array['Multiple users','Team progress dashboard','Shared playbooks','Cohort certificates'],true)
on conflict (plan_id) do update set name = excluded.name, price_display = excluded.price_display, features = excluded.features, is_mock = excluded.is_mock;
