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


Deno.test({
  name: "Test NextToken - 2",
  fn: () => {
    const input = `let five = 5;
    let ten = 10;

    let add = fn(x, y) {
      x + y;
    };

    let result = add(five, ten);
    `;

    const tests: [expectedType: TokenType, expectedLiteral: string][] = [
      [tokens.LET, "let"],
      [tokens.IDENT, "five"],
      [tokens.ASSIGN, "="],
      [tokens.INT, "5"],
      [tokens.SEMICOLON, ";"],
      [tokens.LET, "let"],
      [tokens.IDENT, "ten"],
      [tokens.ASSIGN, "="],
      [tokens.SEMICOLON, ";"],
      [tokens.LET, "let"],
      [tokens.IDENT, "add"],
      [tokens.ASSIGN, "="],
      [tokens.FUNCTION, "fn"],
      [tokens.LPAREN, "("],
      [tokens.IDENT, "x"],
      [tokens.COMMA, ","],
      [tokens.IDENT, "y"],
      [tokens.RPAREN, ")"],
      [tokens.LBRACE, "{"],
      [tokens.IDENT, "x"],
      [tokens.PLUS, "+"],
      [tokens.IDENT, "y"],
      [tokens.SEMICOLON, ";"],
      [tokens.RBRACE, "}"],
      [tokens.SEMICOLON, ";"],
      [tokens.LET, "let"],
      [tokens.IDENT, "result"],
      [tokens.ASSIGN, "="],
      [tokens.IDENT, "add"],
      [tokens.LPAREN, "("],
      [tokens.IDENT, "five"],
      [tokens.COMMA, ","],
      [tokens.IDENT, "ten"],
      [tokens.RPAREN, ")"],
      [tokens.SEMICOLON, ";"],
      [tokens.EOF, ""],
    ];

    const lexer = new Lexer(input);

    for (const [expectedType, expectedLiteral] of tests) {
      const tok: Token = lexer.nextToken();
      console.log(tok);
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
