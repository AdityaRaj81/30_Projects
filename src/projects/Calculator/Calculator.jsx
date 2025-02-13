import { useState } from 'react';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setDisplay('0');
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="app">
      <HeaderProject title="Calculator App" />
      <main className="calculator-main">
        <div className="calculator">
          <div className="display">
            <div className="equation">{equation}</div>
            <div className="current">{display}</div>
          </div>
          <div className="buttons">
            <button onClick={handleClear} className="span-two">AC</button>
            <button onClick={() => handleNumber('.')}>.</button>
            <button onClick={() => handleOperator('/')}>/</button>
            <button onClick={() => handleNumber('7')}>7</button>
            <button onClick={() => handleNumber('8')}>8</button>
            <button onClick={() => handleNumber('9')}>9</button>
            <button onClick={() => handleOperator('*')}>×</button>
            <button onClick={() => handleNumber('4')}>4</button>
            <button onClick={() => handleNumber('5')}>5</button>
            <button onClick={() => handleNumber('6')}>6</button>
            <button onClick={() => handleOperator('-')}>-</button>
            <button onClick={() => handleNumber('1')}>1</button>
            <button onClick={() => handleNumber('2')}>2</button>
            <button onClick={() => handleNumber('3')}>3</button>
            <button onClick={() => handleOperator('+')}>+</button>
            <button onClick={() => handleNumber('0')}>0</button>
            <button onClick={() => handleNumber('0')}>00</button>
            <button onClick={handleEqual} className="span-two">=</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;