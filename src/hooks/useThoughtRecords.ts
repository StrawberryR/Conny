import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ThoughtRecord } from '../types'

export function useThoughtRecords() {
  const [thoughtRecords, setThoughtRecords] = useState<ThoughtRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchThoughtRecords()
  }, [])

  const fetchThoughtRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('thought_records')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedThoughts: ThoughtRecord[] = data.map(record => ({
        id: record.id,
        date: record.date,
        situation: record.situation,
        automaticThought: record.automatic_thought,
        emotion: record.emotion,
        emotionIntensity: record.emotion_intensity,
        evidence: record.evidence,
        alternativeThought: record.alternative_thought,
        newEmotionIntensity: record.new_emotion_intensity
      }))

      setThoughtRecords(formattedThoughts)
    } catch (error) {
      console.error('Error fetching thought records:', error)
    } finally {
      setLoading(false)
    }
  }

  const addThoughtRecord = async (thought: Omit<ThoughtRecord, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('thought_records')
        .insert({
          date: thought.date,
          situation: thought.situation,
          automatic_thought: thought.automaticThought,
          emotion: thought.emotion,
          emotion_intensity: thought.emotionIntensity,
          evidence: thought.evidence,
          alternative_thought: thought.alternativeThought,
          new_emotion_intensity: thought.newEmotionIntensity
        })
        .select()
        .single()

      if (error) throw error

      const newThought: ThoughtRecord = {
        id: data.id,
        date: data.date,
        situation: data.situation,
        automaticThought: data.automatic_thought,
        emotion: data.emotion,
        emotionIntensity: data.emotion_intensity,
        evidence: data.evidence,
        alternativeThought: data.alternative_thought,
        newEmotionIntensity: data.new_emotion_intensity
      }

      setThoughtRecords(prev => [newThought, ...prev])
      return { data: newThought, error: null }
    } catch (error) {
      console.error('Error adding thought record:', error)
      return { data: null, error }
    }
  }

  const deleteThoughtRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('thought_records')
        .delete()
        .eq('id', id)

      if (error) throw error

      setThoughtRecords(prev => prev.filter(record => record.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Error deleting thought record:', error)
      return { error }
    }
  }

  return {
    thoughtRecords,
    loading,
    addThoughtRecord,
    deleteThoughtRecord,
    refetch: fetchThoughtRecords
  }
}