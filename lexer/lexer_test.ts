import { fail } from "../test_deps.ts";
import { Token, tokens, TokenType } from "../token/token.ts";
import Lexer from "./lexer.ts";

Deno.test({
  name: "Test NextToken",
  fn: () => {
    const input = "=+(){},;";

    const tests: [expectedType: TokenType, expectedLiteral: string][] = [
      [tokens.ASSIGN, "="],
      [tokens.PLUS, "+"],
      [tokens.LPAREN, "("],
      [tokens.RPAREN, ")"],
      [tokens.LBRACE, "{"],
      [tokens.RBRACE, "}"],
      [tokens.COMMA, ","],
      [tokens.SEMICOLON, ";"],
      [tokens.EOF, ""],
    ];

    const lexer = new Lexer(input);

    for (const [expectedType, expectedLiteral] of tests) {
      const tok: Token = lexer.nextToken();
      if (tok.type !== expectedType) {
        fail(`TokenType mismatch. expected=${expectedType} got=${tok.type}`);
      }

      if (tok.literal !== expectedLiteral) {
        fail(
          `Token literal mismatch. expected=${expectedLiteral}, got=${tok.literal}`,
        );
      }
    }
  },
});
