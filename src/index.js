// class Calculator {
//   constructor(expr = '') {
//     this.tokensString = '()*+-0123456789.';
//     this.digits = '0123456789.';
//     this.expr = expr;

//     this.tokens = {
//       '+': 'addition',
//       '-': 'subtraction',
//       '*': 'multiplication',
//       '/': 'division',
//       '(': 'bracketOpen',
//       ')': 'bracketClosed',
//       subExpression: 'subExpression',
//       number: 'number',
//       unknown: 'unknown',
//     };
//     this.currentToken = '';
//   }

//   getToken(char) {
//     if (this.digits.indexOf(char) >= 0) {
//       return this.tokens.number;
//     } else if (this.tokens[char]) {
//       return this.tokens[char];
//     } else {
//       return this.tokens.Unknown;
//     }
//   }

//   parseTokenized(exprObj, next = '') {
//     let resArray = [];
//     const len = exprObj.expr.length;
//     const expr = exprObj.expr;
//     let result = 0;

//     while (
//       exprObj.curIndex < len - 1 &&
//       expr[exprObj.curIndex].value !== next
//     ) {
//       let curValue = expr[exprObj.curIndex].value;
//       let curType = expr[exprObj.curIndex].type;

//       if (curValue === '(') {
//         exprObj.curIndex++;
//         let subExpr = this.parseTokenized(exprObj, ')');
//         resArray.push({ type: this.tokens.subExpression, value: subExpr });
//       } else if (curValue === ')') {
//         exprObj.curIndex++;
//       } else {
//         resArray.push({ type: curType, value: curValue });
//         exprObj.curIndex++;
//       }
//     }

//     return resArray;
//   }

//   parse(str) {
//     let prev = { type: '', value: '' };
//     let curr = { type: '', value: '' };
//     let value = '';
//     let res = [];

//     for (const char of str) {
//       curr = Object.assign({}, { type: this.getToken(char), value: char });

//       if (curr.type === this.tokens.number) {
//         value += curr.value;
//         prev = { type: curr.type, value: value };
//       } else {
//         if (prev.type === this.tokens.number) {
//           res.push({ type: prev.type, value: prev.value });
//         }
//         res.push(curr);
//         value = '';
//         prev = Object.assign({}, curr.type, curr.value);
//       }
//     }
//     if (prev.type === this.tokens.number) {
//       res.push({ type: prev.type, value: prev.value });
//     }

//     let exprObj = { curIndex: 0, expr: res };
//     const res1 = this.parseTokenized(exprObj);
//     console.log('ggg', JSON.stringify(res1));
//   }

//   eval() {
//     const parsed = this.parse(this.expr);

//     return 0;
//   }
// }

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
