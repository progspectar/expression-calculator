class Calculator {
  constructor() {
    this._symbols = {};
    this.defineOperator('*', this.multiplication, 'infix', 4);
    this.defineOperator('/', this.division, 'infix', 4);
    this.defineOperator('+', this.addition, 'infix', 2);
    this.defineOperator('-', this.subtraction, 'infix', 2);
    this.defineOperator('(', this.brackets, 'prefix');
    this.defineOperator(')', null, 'postfix');
  }

  defineOperator(
    symbol,
    func,
    notation = 'func',
    precedence = 0,
    rightToLeft = false
  ) {
    const numberArgs = notation === 'infix' ? 2 : 1;
    this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
      [notation]: {
        symbol,
        func,
        notation,
        precedence,
        rightToLeft,
        numberArgs: numberArgs,
      },
      symbol,
      regSymbol:
        symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') +
        (/\w$/.test(symbol) ? '\\b' : ''),
    });
  }
  brackets(...a) {
    return a[a.length - 1];
  }

  addition(a, b) {
    return a + b;
  }
  subtraction(a, b) {
    return a - b;
  }
  multiplication(a, b) {
    return a * b;
  }
  division(a, b) {
    if (b === 0) throw 'TypeError: Division by zero.';
    return a / b;
  }

  calculate(expression) {
    let match;
    const values = [],
      operators = [this._symbols['('].prefix],
      exec = (_) => {
        let op = operators.pop();
        values.push(op.func(...[].concat(...values.splice(-op.numberArgs))));
        return op.precedence;
      },
      noMatchingBracketException = (msg) => msg,
      pattern = new RegExp(
        '\\d+(?:\\.\\d+)?|' +
          Object.values(this._symbols)
            // longer symbols should be listed first
            .sort((a, b) => b.symbol.length - a.symbol.length)
            .map((val) => val.regSymbol)
            .join('|') +
          '|(\\S)',
        'g'
      );
    let afterValue = false;
    pattern.lastIndex = 0;
    let result = '';
    do {
      match = pattern.exec(expression);
      const [token, bad] = match || [')', undefined],
        notNumber = this._symbols[token],
        notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
        notAfterValue = !notNumber || (!notNumber.postfix && !notNumber.infix);
      // Check for syntax errors:
      if (bad || (afterValue ? notAfterValue : notNewValue))
        return error('Syntax error');
      if (afterValue) {
        // We either have an infix or postfix operator (they should be mutually exclusive)
        const curr = notNumber.postfix || notNumber.infix;
        do {
          const prev = operators[operators.length - 1];
          if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0)
            break;
          // Apply previous operator, since it has precedence over current one
        } while (exec()); // Exit loop after executing an opening bracket
        afterValue = curr.notation === 'postfix';
        if (curr.symbol !== ')') {
          operators.push(curr);

          if (afterValue) exec();
        }
      } else if (notNumber) {
        // prefix operator or function
        operators.push(notNumber.prefix || notNumber.func);
        if (notNumber.func) {
          // Require an opening parenthesis
          match = pattern.exec(expression);
          if (!match || match[0] !== '(')
            return error('Function needs parentheses');
        }
      } else {
        // number
        values.push(+token);
        afterValue = true;
      }
    } while (match && operators.length);
    if (operators.length) {
      throw noMatchingBracketException(
        'ExpressionError: Brackets must be paired'
      );
    } else if (match) {
      throw noMatchingBracketException(
        'ExpressionError: Brackets must be paired'
      );
    } else {
      return values.pop();
    }
  }
}

function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  const calc = new Calculator(); // Create a singleton
  return calc.calculate(expr);
}

module.exports = {
  expressionCalculator,
};
