/** Finds code-shape violations: long functions, nested functions, deep blocks and else-if chains. */
import ts from "typescript"

export const MAX_FUNCTION_LINES = 15
const MAX_BLOCK_DEPTH = 1

const CONTROL_KINDS = new Set([
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.TryStatement,
])

type Context = { insideFunction: boolean; blockDepth: number }

function isFunctionLike(node: ts.Node): boolean {
  return ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node)
}

function isElseIf(node: ts.Node): boolean {
  return ts.isIfStatement(node) && node.parent !== undefined && ts.isIfStatement(node.parent) && node.parent.elseStatement === node
}

function describe(source: ts.SourceFile, node: ts.Node): string {
  const { line } = source.getLineAndCharacterOfPosition(node.getStart(source))
  return `${source.fileName}:${line + 1}`
}

function functionLines(source: ts.SourceFile, node: ts.Node): number {
  const start = source.getLineAndCharacterOfPosition(node.getStart(source)).line
  const end = source.getLineAndCharacterOfPosition(node.getEnd()).line
  return end - start + 1
}

function functionProblems(source: ts.SourceFile, node: ts.Node, context: Context): string[] {
  const problems: string[] = []
  if (context.insideFunction) problems.push(`${describe(source, node)} nested function`)
  const lines = functionLines(source, node)
  if (lines > MAX_FUNCTION_LINES) problems.push(`${describe(source, node)} function has ${lines} lines`)
  return problems
}

function controlProblems(source: ts.SourceFile, node: ts.Node, context: Context): string[] {
  if (ts.isIfStatement(node) && node.elseStatement && ts.isIfStatement(node.elseStatement)) {
    return [`${describe(source, node)} else-if chain`]
  }
  const nested = context.blockDepth > MAX_BLOCK_DEPTH - 1 && !isElseIf(node)
  return nested ? [`${describe(source, node)} block nested too deep`] : []
}

function nextContext(node: ts.Node, context: Context): Context {
  if (isFunctionLike(node)) return { insideFunction: true, blockDepth: 0 }
  if (CONTROL_KINDS.has(node.kind) && !isElseIf(node)) return { ...context, blockDepth: context.blockDepth + 1 }
  return context
}

function nodeProblems(source: ts.SourceFile, node: ts.Node, context: Context): string[] {
  if (isFunctionLike(node)) return functionProblems(source, node, context)
  return CONTROL_KINDS.has(node.kind) ? controlProblems(source, node, context) : []
}

function visit(source: ts.SourceFile, node: ts.Node, context: Context): string[] {
  const problems = nodeProblems(source, node, context)
  const inner = nextContext(node, context)
  node.forEachChild((child) => problems.push(...visit(source, child, inner)))
  return problems
}

export function findViolations(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TSX)
  return visit(source, source, { insideFunction: false, blockDepth: 0 })
}
