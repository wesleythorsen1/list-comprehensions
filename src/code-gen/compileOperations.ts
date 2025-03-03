import type { Operation } from "../types/Operation.ts";

export function compileOperations(ops: Operation[]): (source: any[]) => any[] {
  let code = "const result = [];\n";
  code += "for (let i = 0, len = source.length; i < len; i++) {\n";
  code += "  let x = source[i];\n";
  for (const op of ops) {
    if (op.type === "select") {
      code += `  x = (${op.fn.toString()})(x, i);\n`;
    } else if (op.type === "where") {
      code += `  if (!(${op.fn.toString()})(x, i)) { continue; }\n`;
    }
  }
  code += "  result.push(x);\n";
  code += "}\n";
  code += "return result;\n";

  console.log("Generated fused function code:\n", code);

  return new Function("source", code) as (source: any[]) => any[];
}
