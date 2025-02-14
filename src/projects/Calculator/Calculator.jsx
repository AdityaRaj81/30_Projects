import { useState, useEffect } from 'react';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (number) => {
    if (display === '0' || display === 'Error') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    if (display !== 'Error') {
      setEquation(equation + display + ' ' + operator + ' ');
      setDisplay('0');
    }
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleClearEntry = () => {
    setDisplay('0');
  };

  const handleKeyPress = (e) => {
    if (/[0-9]/.test(e.key)) {
      handleNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      handleEqual();
    } else if (e.key === 'Backspace') {
      handleClearEntry();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, equation]);

  return (
    <div className="app">
    <HeaderProject 
      title="Calculator App" 
      description="A feature-rich Calculator app"
    />
      <main className="calculator-main">
        <div className="calculator">
          <div className="display">
            <div className="equation">{equation}</div>
            <div className="current">{display}</div>
          </div>
          <div className="buttons">
            <button onClick={handleClear} className="span-two clear">AC</button>
            <button onClick={handleClearEntry} className="clear-entry">CE</button>
            <button onClick={() => handleOperator('/')} className="operator">÷</button>
            <button onClick={() => handleNumber('7')}>7</button>
            <button onClick={() => handleNumber('8')}>8</button>
            <button onClick={() => handleNumber('9')}>9</button>
            <button onClick={() => handleOperator('*')} className="operator">×</button>
            <button onClick={() => handleNumber('4')}>4</button>
            <button onClick={() => handleNumber('5')}>5</button>
            <button onClick={() => handleNumber('6')}>6</button>
            <button onClick={() => handleOperator('-')} className="operator">−</button>
            <button onClick={() => handleNumber('1')}>1</button>
            <button onClick={() => handleNumber('2')}>2</button>
            <button onClick={() => handleNumber('3')}>3</button>
            <button onClick={() => handleOperator('+')} className="operator">+</button>
            <button onClick={() => handleNumber('0')} className="zero">0</button>
            <button onClick={() => handleNumber('.')}>.</button>
            <button onClick={handleEqual} className="span-two equal">=</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
