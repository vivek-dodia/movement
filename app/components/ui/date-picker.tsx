'use client'
import React, { useEffect } from 'react'
import { Calendar } from 'primereact/calendar'

//theme
import 'primereact/resources/themes/tailwind-light/theme.css'
import { Workout } from '@/app/libs/types'

type DatePickerProps = {
  workoutData: Workout
  setWorkoutData: (prev: Workout) => void
}

export default function DatePicker({
  workoutData,
  setWorkoutData,
}: DatePickerProps) {
  return (
    <Calendar
      value={workoutData.date}
      onChange={(e) =>
        setWorkoutData({ ...workoutData, date: e.value || null })
      }
    />
  )
}
