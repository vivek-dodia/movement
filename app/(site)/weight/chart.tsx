'use client'

import { getWeightChart } from '@/app/libs/chart'
import { WeightEntries } from '@/app/libs/types'

export default function WeightChart({
  weightEntries,
}: {
  weightEntries: WeightEntries
}) {
  const chart = getWeightChart(weightEntries)

  return chart
}
