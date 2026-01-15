// components/PasswordGeneratorTool.tsx
'use client'

import { useState } from 'react'

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      alert('Please select at least one character type')
      return
    }

    // Use crypto.getRandomValues for cryptographically secure randomness
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }

    setPassword(result)
    setCopied(false)
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStrengthColor = () => {
    if (length < 8) return 'bg-red-500'
    if (length < 12) return 'bg-orange-500'
    if (length < 16) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (length < 8) return 'Weak'
    if (length < 12) return 'Fair'
    if (length < 16) return 'Good'
    return 'Strong'
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Password Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Password
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click 'Generate Password' to create a password"
              className="flex-1 px-4 py-3 border rounded-lg font-mono text-lg bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Password Length */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password Length: {length}
            </label>
            <span className={`text-sm font-semibold ${
              length < 8 ? 'text-red-600' : 
              length < 12 ? 'text-orange-600' : 
              length < 16 ? 'text-yellow-600' : 
              'text-green-600'
            }`}>
              {getStrengthText()}
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>64</span>
          </div>
          <div className={`h-1 rounded-full mt-2 ${getStrengthColor()}`} 
               style={{ width: `${(length / 64) * 100}%` }} />
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Include:</p>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm">Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm">Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm">Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm">Symbols (!@#$%^&*)</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-lg"
        >
          Generate Password
        </button>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            🔒 <strong>Privacy First:</strong> All passwords are generated locally in your browser. 
            Nothing is sent to any server or stored anywhere.
          </p>
        </div>
      </div>
    </div>
  )
}