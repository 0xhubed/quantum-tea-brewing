import React from 'react'

interface AIOptimizedContentProps {
  children: React.ReactNode
  summary?: string
  keywords?: string[]
}

// Component to wrap content with AI-optimized metadata
export function AIOptimizedContent({ children, summary, keywords }: AIOptimizedContentProps) {
  return (
    <div 
      className="ai-content" 
      data-ai-summary={summary}
      data-ai-keywords={keywords?.join(', ')}
    >
      {summary && (
        <div className="sr-only" aria-label="AI Summary">
          {summary}
        </div>
      )}
      {children}
    </div>
  )
}

// Component for machine-readable data tables
export function DataTable({ data, caption }: { data: any[], caption: string }) {
  if (!data || data.length === 0) return null
  
  const headers = Object.keys(data[0])
  
  return (
    <table className="w-full border-collapse" role="table" aria-label={caption}>
      <caption className="text-lg font-semibold mb-2">{caption}</caption>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header} className="border p-2 text-left font-medium">
              {header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map(header => (
              <td key={header} className="border p-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Component for structured Q&A format
export function StructuredQA({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="mb-4" itemScope itemType="https://schema.org/Question">
      <dt className="font-semibold mb-2" itemProp="name">{question}</dt>
      <dd className="text-gray-600 dark:text-gray-400" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
        <span itemProp="text">{answer}</span>
      </dd>
    </div>
  )
}