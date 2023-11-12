import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnEvent, ColumnEditorOptions } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber'

interface Exercise {
  id: string
  exercise: string
  sets: number
  reps: number
  weight?: number
  RPE?: number
}

interface ColumnMeta {
  field: string
  header: string
}

export default function ExerciesTable() {
  const [exercises, setExercises] = useState<Exercise[] | undefined>([
    {
      id: '1',
      exercise: 'Squats',
      sets: 3,
      reps: 8,
      weight: 65,
      RPE: 8,
    },
  ])

  const columns: ColumnMeta[] = [
    { field: 'exercise', header: 'Exercise' },
    { field: 'sets', header: 'Sets' },
    { field: 'reps', header: 'Reps' },
    { field: 'weight', header: 'Weight' },
    {
      field: 'RPE',
      header: 'RPE',
    },
  ]

  useEffect(() => {}, [])

  const isPositiveInteger = (val: any) => {
    let str = String(val)

    str = str.trim()

    if (!str) {
      return false
    }

    str = str.replace(/^0+/, '') || '0'
    let n = Math.floor(Number(str))

    return n !== Infinity && String(n) === str && n >= 0
  }

  const onCellEditComplete = (e: ColumnEvent) => {
    let { rowData, newValue, field, originalEvent: event } = e

    switch (field) {
      case 'quantity':
      case 'price':
        if (isPositiveInteger(newValue)) rowData[field] = newValue
        else event.preventDefault()
        break

      default:
        if (newValue.trim().length > 0) rowData[field] = newValue
        else event.preventDefault()
        break
    }
  }

  const cellEditor = (options: ColumnEditorOptions) => {
    if (options.field === 'price') return priceEditor(options)
    else return textEditor(options)
  }

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   options.editorCallback(e.target.value)
        // }
      />
    )
  }

  const priceEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        // onValueChange={(e: InputNumberValueChangeEvent) =>
        //   options.editorCallback(e.value)
        // }
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    )
  }

  return (
    <div className="card p-fluid">
      <DataTable
        value={exercises}
        editMode="cell"
      >
        {columns.map(({ field, header }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          )
        })}
      </DataTable>
    </div>
  )
}
