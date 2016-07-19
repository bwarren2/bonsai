import Ember from 'ember';

export function math(params) {
  const operand1 = params[0];
  const operator = params[1];
  const operand2 = params[2];
  let result;

  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    case '/':
      result = operand1 / operand2;
      break;
    default:
      result = '';
      break;
  }

  return result;
}

export default Ember.Helper.helper(math);
