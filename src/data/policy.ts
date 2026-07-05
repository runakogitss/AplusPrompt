export const customerSavePolicy = {
  business_type: "Bakery",
  tone: "warm, apologetic, professional",
  allowed_offers: ["20% refund for delivery delay over 1 hour", "free delivery voucher"],
  requires_approval: ["full refund", "public apology post", "compensation above 20% refund"],
  forbidden_promises: [
    "Do not blame the delivery driver",
    "Do not guarantee full refund without approval",
    "Do not promise same-day replacement unless stock is confirmed"
  ],
  escalation_rules: ["High severity complaints require owner/manager review", "Health/safety complaints require immediate escalation"],
  reply_length: "under 120 words",
  follow_up_timing: "next day after resolution"
};
