'use client'
import React, { useEffect, useRef, useState } from 'react'
import { SearchInputsProps, Result, Results } from '@/app/libs/types'
import { filterHistoryData } from '@/app/helpers/filter-history-data'

export default function SearchInput({
  searchType,
  changeValue,
  userId,
  userHistory,
  ...rest
}: SearchInputsProps) {
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [results, setResults] = useState<Results>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdown && ref.current && !ref.current.contains(e.target as Node)) {
        setDropdown(false)
        setResults([])
        setSelectedIndex(null)
      }
    }

    document.addEventListener('mousedown', closeDropdown)

    return () => {
      document.removeEventListener('mousedown', closeDropdown)
    }
  })

  const handleChange = (input: string) => {
    changeValue(input)
    if (input.length > 0) {
      fetchResults(input)
      setDropdown(true)
    } else {
      setDropdown(false)
      setResults([])
      setSelectedIndex(null)
    }
  }

  const handleSelect = (index: number) => {
    if (!results[index]) return

    handleChange(results[index])
    setDropdown(false)
    setResults([])
    setSelectedIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prevIndex) => {
        if (prevIndex === null) return results.length - 1
        if (prevIndex === 0) return results.length - 1
        return prevIndex - 1
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prevIndex) => {
        if (prevIndex === null) return 0
        if (prevIndex === results.length - 1) return 0
        return prevIndex + 1
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex === null) return
      handleSelect(selectedIndex)
    } else if (e.key === 'Escape') {
      setDropdown(false)
      setResults([])
    }
  }

  const fetchResults = (query: string) => {
    const res = filterHistoryData(userHistory, query, searchType)
    if (!res) return
    setResults(res)
  }

  const renderedResults = results.map((result: Result, index: number) => {
    return (
      <li key={index}>
        <button
          className={`py-2 px-2 rounded-md w-full text-left hover:bg-blue-50 focus:bg-blue-50 transition-all ${
            selectedIndex === index ? 'bg-blue-50' : ''
          } `}
          onClick={(e) => {
            e.preventDefault()
            handleChange(result)
            setDropdown(false)
          }}
        >
          {result}
        </button>
      </li>
    )
  })

  return (
    <div className="mt-2 relative">
      <input
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        onFocus={(e) => handleChange(e.target.value)}
        autoComplete="off"
        onKeyDown={handleKeyDown}
        {...rest}
      />
      <div
        ref={ref}
        hidden={!dropdown || results.length === 0}
        className="absolute z-10 right-0 left-0 w-full py-2 px-1 mt-[0.5px] text-sm rounded-md border border-gray-300 bg-white shadow-sm"
      >
        <ul>{renderedResults}</ul>
      </div>
    </div>
  )
}
