'use client'

import { useState } from 'react'

export default function LoremIpsumTool() {
  const [generatedText, setGeneratedText] = useState('')
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs')
  const [count, setCount] = useState(5)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [copied, setCopied] = useState(false)

  // Standard Lorem Ipsum text
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'vitae', 'suscipit',
    'tellus', 'mauris', 'pharetra', 'massa', 'ultricies', 'mi', 'eget', 'proin',
    'nibh', 'nisl', 'condimentum', 'mattis', 'pellentesque', 'habitant', 'morbi',
    'tristique', 'senectus', 'netus', 'malesuada', 'fames', 'ac', 'turpis', 'egestas'
  ]

  const generateWords = (num: number, start: boolean): string => {
    const result: string[] = []
    let wordIndex = 0

    if (start) {
      result.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet')
      wordIndex = 5
      num -= 5
    }

    for (let i = 0; i < num; i++) {
      result.push(loremWords[wordIndex % loremWords.length])
      wordIndex++
    }

    return result.join(' ')
  }

  const generateSentence = (start: boolean): string => {
    const wordCount = Math.floor(Math.random() * 10) + 8 // 8-17 words
    const words = generateWords(wordCount, start).split(' ')
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }

  const generateParagraph = (start: boolean): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4 // 4-7 sentences
    const sentences: string[] = []
    
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence(start && i === 0))
    }
    
    return sentences.join(' ')
  }

  const generate = () => {
    let result = ''

    if (type === 'paragraphs') {
      const paragraphs: string[] = []
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph(startWithLorem && i === 0))
      }
      result = paragraphs.join('\n\n')
    } else if (type === 'words') {
      result = generateWords(count, startWithLorem)
    } else if (type === 'sentences') {
      const sentences: string[] = []
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(startWithLorem && i === 0))
      }
      result = sentences.join(' ')
    }

    setGeneratedText(result)
    setCopied(false)
  }

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generate
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              data-analytics-event="lorem_type"
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
            </select>
          </div>

          {/* Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many?
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              data-analytics-event="lorem_count"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Start with Lorem */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                data-analytics-event="lorem_start_with"
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="text-sm">Start with "Lorem ipsum"</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          data-analytics-event="lorem_generate"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Generate Lorem Ipsum
        </button>

        {/* Output */}
        {generatedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Generated Text ({generatedText.length} characters)
              </label>
              <button
                onClick={copyToClipboard}
                data-analytics-event="lorem_copy"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <textarea
              value={generatedText}
              readOnly
              className="w-full h-64 px-4 py-3 border rounded-lg font-sans text-sm bg-gray-50 resize-none"
            />
          </div>
        )}

        {/* Quick Actions */}
        {!generatedText && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => {
                setType('paragraphs')
                setCount(3)
                setStartWithLorem(true)
                setTimeout(generate, 0)
              }}
              data-analytics-event="lorem_quick"
              data-analytics-label="3_paragraphs"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              3 Paragraphs
            </button>
            <button
              onClick={() => {
                setType('paragraphs')
                setCount(5)
                setStartWithLorem(true)
                setTimeout(generate, 0)
              }}
              data-analytics-event="lorem_quick"
              data-analytics-label="5_paragraphs"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              5 Paragraphs
            </button>
            <button
              onClick={() => {
                setType('words')
                setCount(50)
                setStartWithLorem(true)
                setTimeout(generate, 0)
              }}
              data-analytics-event="lorem_quick"
              data-analytics-label="50_words"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              50 Words
            </button>
            <button
              onClick={() => {
                setType('sentences')
                setCount(10)
                setStartWithLorem(true)
                setTimeout(generate, 0)
              }}
              data-analytics-event="lorem_quick"
              data-analytics-label="10_sentences"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              10 Sentences
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Lorem Ipsum is dummy text used in design and publishing. 
            It helps focus on layout and design without being distracted by readable content.
          </p>
        </div>
      </div>
    </div>
  )
}
