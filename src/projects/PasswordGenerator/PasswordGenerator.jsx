import React, { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Slider } from '@/components/ui/slider';
// import { 
//   Copy, 
//   RefreshCw, 
//   Check,
//   ShieldCheck,
//   AlertCircle
// } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [strength, setStrength] = useState('medium');

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const generatePassword = () => {
    let charset = '';
    let generatedPassword = '';
    
    // Build character set based on selected options
    if (settings.uppercase) charset += characters.uppercase;
    if (settings.lowercase) charset += characters.lowercase;
    if (settings.numbers) charset += characters.numbers;
    if (settings.symbols) charset += characters.symbols;

    // Ensure at least one setting is selected
    if (charset === '') {
      setSettings({ ...settings, lowercase: true });
      charset = characters.lowercase;
    }

    // Generate password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    checkStrength(generatedPassword);
  };

  const checkStrength = (pass) => {
    let score = 0;
    
    // Length check
    if (pass.length >= 12) score += 2;
    else if (pass.length >= 8) score += 1;

    // Character variety check
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    // Set strength based on score
    if (score >= 5) setStrength('strong');
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

  // Generate initial password
  useEffect(() => {
    generatePassword();
  }, [length, settings]);

  const getStrengthColor = () => {
    switch (strength) {
      case 'strong': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 md:p-8">
      <Card className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Password Generator
          </h1>
          <p className="text-gray-600">Create secure, random passwords</p>
        </div>

        {/* Generated Password Display */}
        <div className="relative mb-6">
          <Input
            type="text"
            value={password}
            readOnly
            className="pr-24 font-mono text-lg h-12"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              onClick={generatePassword}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <RefreshCw size={18} />
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </Button>
          </div>
        </div>

        {/* Password Strength Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={20} className="text-gray-500" />
            <span className="text-gray-700">Password Strength:</span>
            <span className={`capitalize font-semibold ${
              strength === 'strong' ? 'text-green-500' :
              strength === 'medium' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {strength}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getStrengthColor()} transition-all duration-300`}
              style={{ 
                width: strength === 'strong' ? '100%' : 
                       strength === 'medium' ? '66%' : '33%' 
              }}
            />
          </div>
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password Length: {length}</label>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            max={32}
            min={6}
            step={1}
            className="w-full"
          />
        </div>

        {/* Character Settings */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.uppercase}
              onChange={(e) => setSettings({ ...settings, uppercase: e.target.checked })}
              className="rounded text-blue-500"
            />
            Uppercase Letters
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.lowercase}
              onChange={(e) => setSettings({ ...settings, lowercase: e.target.checked })}
              className="rounded text-blue-500"
            />
            Lowercase Letters
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.numbers}
              onChange={(e) => setSettings({ ...settings, numbers: e.target.checked })}
              className="rounded text-blue-500"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.symbols}
              onChange={(e) => setSettings({ ...settings, symbols: e.target.checked })}
              className="rounded text-blue-500"
            />
            Special Characters
          </label>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <AlertCircle size={20} />
            <h3 className="font-semibold">Password Tips</h3>
          </div>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of letters, numbers, and symbols</li>
            <li>• Avoid using personal information</li>
            <li>• Use unique passwords for different accounts</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PasswordGenerator;