import { Token, tokens } from "../token/token.ts";

export default class Lexer {
  position: number;
  readPosition: number;
  ch?: string | null;

  constructor(
    private input: string,
  ) {
    this.position = 0;
    this.readPosition = 0;
    this.readChar();
  }

  nextToken(): Token {
    let token: Token;
    switch (this.ch) {
      case "=":
        token = { type: tokens.ASSIGN, literal: "=" };
        break;
      case ",":
        token = { type: tokens.COMMA, literal: "," };
        break;
      case ";":
        token = { type: tokens.SEMICOLON, literal: ";" };
        break;
      case "(":
        token = { type: tokens.LPAREN, literal: "(" };
        break;
      case ")":
        token = { type: tokens.RPAREN, literal: ")" };
        break;
      case "{":
        token = { type: tokens.LBRACE, literal: "{" };
        break;
      case "}":
        token = { type: tokens.RBRACE, literal: "}" };
        break;
      case "+":
        token = { type: tokens.PLUS, literal: "+" };
        break;
      default:
        token = { type: tokens.EOF, literal: "" };
    }

    this.readChar();
    return token;
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = null;
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }
}
