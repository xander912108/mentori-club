'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestConnection() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  async function fetchMessages() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('test_connection')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        throw error
      }

      setMessages(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="mb-4">
        <Button 
          onClick={fetchMessages}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Messages from Database:</h2>
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li 
                key={msg.id}
                className="p-3 bg-gray-50 rounded"
              >
                {msg.message}
                <div className="text-sm text-gray-500">
                  Created: {new Date(msg.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : !loading && !error ? (
          <p>No messages found</p>
        ) : null}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Connection Details:</h3>
        <p>Project URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Connection Status: {loading ? 'Checking...' : error ? 'Error' : 'Connected'}</p>
      </div>
    </div>
  )
} 