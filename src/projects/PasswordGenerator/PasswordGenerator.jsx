import { useState, useEffect } from 'react';
import "./PasswordGenerator.css";
import ProjectHeader from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usePassphrase, setUsePassphrase] = useState(false);
  const [strength, setStrength] = useState('medium');

  const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    ambiguous: false,
    spaces: false
  });

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    ambiguous: '{}[]()<>"\'',
    spaces: ' '
  };

  const similarCharacters = 'il1Lo0O';
  const words = ['sun', 'moon', 'star', 'sky', 'ocean', 'forest', 'river', 'dream', 'cloud', 'mountain'];

  const generatePassword = () => {
    let charset = '';
    let generatedPassword = '';

    if (usePassphrase) {
      generatedPassword = Array.from({ length: 4 }, () =>
        words[Math.floor(Math.random() * words.length)]
      ).join('-');
    } else {
      if (settings.uppercase) charset += characters.uppercase;
      if (settings.lowercase) charset += characters.lowercase;
      if (settings.numbers) charset += characters.numbers;
      if (settings.symbols) charset += characters.symbols;
      if (settings.ambiguous) charset += characters.ambiguous;
      if (settings.spaces) charset += characters.spaces;

      if (excludeSimilar) {
        charset = charset.split('').filter(c => !similarCharacters.includes(c)).join('');
      }

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }
    }

    setPassword(generatedPassword);
    setHistory(prev => [generatedPassword, ...prev.slice(0, 4)]);
    checkStrength(generatedPassword);
  };

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 14) score += 2;
    else if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    if (settings.spaces) score += 1;

    if (score >= 6) setStrength('very strong');
    else if (score >= 4) setStrength('strong');
    else if (score >= 3) setStrength('medium');
    else setStrength('weak');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const downloadPassword = () => {
    const blob = new Blob([password], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "password.txt";
    link.click();
  };

  useEffect(() => {
    generatePassword();
  }, [length, settings, excludeSimilar, usePassphrase]);

  return (
    <div className="app">
      <ProjectHeader 
        title="Advanced Password Generator" 
        description="A powerful password generator with enhanced security options."
      />
      <div className="password-generator-container">
        <h1>Password Generator</h1>
        <div className="password-display">
          <input type={showPassword ? "text" : "password"} value={password} readOnly />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button onClick={generatePassword}>Generate</button>
        <button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
        <button onClick={downloadPassword}>Save</button>

        <label>
          Length: {length}
          <input type="range" min="6" max="32" value={length} onChange={e => setLength(e.target.value)} />
        </label>
        
        <div>
          <label><input type="checkbox" checked={usePassphrase} onChange={() => setUsePassphrase(!usePassphrase)} /> Use Passphrase</label>
          <label><input type="checkbox" checked={settings.uppercase} onChange={() => setSettings(prev => ({ ...prev, uppercase: !prev.uppercase }))} /> Uppercase</label>
          <label><input type="checkbox" checked={settings.lowercase} onChange={() => setSettings(prev => ({ ...prev, lowercase: !prev.lowercase }))} /> Lowercase</label>
          <label><input type="checkbox" checked={settings.numbers} onChange={() => setSettings(prev => ({ ...prev, numbers: !prev.numbers }))} /> Numbers</label>
          <label><input type="checkbox" checked={settings.symbols} onChange={() => setSettings(prev => ({ ...prev, symbols: !prev.symbols }))} /> Symbols</label>
          <label><input type="checkbox" checked={settings.ambiguous} onChange={() => setSettings(prev => ({ ...prev, ambiguous: !prev.ambiguous }))} /> Include Ambiguous Characters</label>
          <label><input type="checkbox" checked={settings.spaces} onChange={() => setSettings(prev => ({ ...prev, spaces: !prev.spaces }))} /> Include Spaces</label>
          <label><input type="checkbox" checked={excludeSimilar} onChange={() => setExcludeSimilar(!excludeSimilar)} /> Exclude Similar Characters</label>
        </div>
        
        <p>Strength: <span className={`strength-${strength.replace(" ", "-")}`}>{strength}</span></p>
        <div className="password-history">
          <h2>Previous Passwords</h2>
          <ul>
            {history.map((pass, index) => (
              <li key={index}>{pass}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordGenerator;
