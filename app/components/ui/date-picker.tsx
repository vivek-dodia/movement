'use client'
import React, { useEffect } from 'react'
import { Calendar } from 'primereact/calendar'

//theme
import 'primereact/resources/themes/tailwind-light/theme.css'

type DatePickerProps<T extends Record<string, any>> = {
  data: T
  setData: (prev: T) => void
}
export default function DatePicker<T extends Record<any, any>>({
  data,
  setData,
}: DatePickerProps<T>) {
  return (
    <Calendar
      value={data.date}
      onChange={(e) => setData({ ...data, date: e.value || null })}
    />
  )
}
