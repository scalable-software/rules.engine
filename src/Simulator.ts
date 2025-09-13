type Context = Record<string, any>;
type Condition = (context: Context) => boolean;

type Outcome = {
  type: "rule" | "end";
  id: number | null;
};

type Rule = {
  id: number;
  description: string;
  condition: Condition;
  trueOutcome: Outcome;
  falseOutcome: Outcome;
};

class Simulator {
  private rules: Map<number, Rule>;

  constructor(rules: Rule[]) {
    this.rules = new Map(rules.map((rule) => [rule.id, rule]));
  }

  run(start: number, context: Context): number | null {
    let current = this.rules.get(start);
    if (!current) throw new Error(`Rule ${start} not found`);

    while (current) {
      const result = current.condition(context);
      const outcome = result
        ? current.trueOutcome
        : current.falseOutcome;

      if (outcome.type === "end") {
        return outcome.id;
      }

      if (outcome.type === "rule" && outcome.id !== null) {
        current = this.rules.get(outcome.id) || null;
      } else {
        return null;
      }
    }

    return null;
  }
}

// --- Example Usage ---
const rules: Rule[] = [
  {
    id: 1,
    description: "Check diagnosis is STEMI (204)",
    condition: (context) => context.diagnosis === 204,
    trueOutcome: { type: "rule", id: 2 },
    falseOutcome: { type: "end", id: 99999 },
  },
  {
    id: 2,
    description: "Check length of stay < 5 days",
    condition: (context) => context.stayLength < 5,
    trueOutcome: { type: "end", id: 99499020 },
    falseOutcome: { type: "end", id: 99499030 },
  },
];

const context = { diagnosis: 204, stayLength: 3 };
const start = 1;

const simulator = new Simulator(rules);
const end = simulator.run(start, context);

console.log(`end: ${end}`); // → 99499020
