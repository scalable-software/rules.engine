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
  true: Outcome;
  false: Outcome;
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
      const { type, id } = current.condition(context)
        ? current.true
        : current.false;

      if (type === "end") return id;

      current =
        type === "rule" && id !== null
          ? this.rules.get(id) || null
          : null;
    }

    return null;
  }
}

// --- Example Usage ---
const rules: Rule[] = [
  {
    id: 1,
    description: "is diagnosis 204",
    condition: ({ diagnosis }) => diagnosis === 204,
    true: { type: "rule", id: 2 },
    false: { type: "end", id: 99999 },
  },
  {
    id: 2,
    description: "is length of stay less than 5 days",
    condition: ({ stayLength }) => stayLength < 5,
    true: { type: "end", id: 99499020 },
    false: { type: "end", id: 99499030 },
  },
];

const context = { diagnosis: 204, stayLength: 3 };
const start = 1;

const simulator = new Simulator(rules);
const end = simulator.run(start, context);

console.log(`end: ${end}`); // → 99499020
