import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Emotion } from '../types'

export function useEmotions() {
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmotions()
  }, [])

  const fetchEmotions = async () => {
    try {
      const { data, error } = await supabase
        .from('emotions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedEmotions: Emotion[] = data.map(emotion => ({
        id: emotion.id,
        name: emotion.name,
        intensity: emotion.intensity,
        date: emotion.date,
        note: emotion.note,
        triggers: emotion.triggers || []
      }))

      setEmotions(formattedEmotions)
    } catch (error) {
      console.error('Error fetching emotions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addEmotion = async (emotion: Omit<Emotion, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('emotions')
        .insert({
          name: emotion.name,
          intensity: emotion.intensity,
          date: emotion.date,
          note: emotion.note,
          triggers: emotion.triggers
        })
        .select()
        .single()

      if (error) throw error

      const newEmotion: Emotion = {
        id: data.id,
        name: data.name,
        intensity: data.intensity,
        date: data.date,
        note: data.note,
        triggers: data.triggers || []
      }

      setEmotions(prev => [newEmotion, ...prev])
      return { data: newEmotion, error: null }
    } catch (error) {
      console.error('Error adding emotion:', error)
      return { data: null, error }
    }
  }

  const deleteEmotion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('emotions')
        .delete()
        .eq('id', id)

      if (error) throw error

      setEmotions(prev => prev.filter(emotion => emotion.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Error deleting emotion:', error)
      return { error }
    }
  }

  return {
    emotions,
    loading,
    addEmotion,
    deleteEmotion,
    refetch: fetchEmotions
  }
}