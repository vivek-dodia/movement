export const exerciseFormInputs = [
  {
    name: 'sets',
    label: 'Sets',
  },
  {
    name: 'reps',
    label: 'Reps',
  },
  {
    name: 'weight',
    label: 'lbs.',
  },
  {
    name: 'rpe',
    label: 'RPE',
  },
] as const

export const BASE_EXERCISE = {
  name: '',
  sets: [
    {
      sets: null,
      reps: null,
      weight: null,
      rpe: null,
    },
  ],
}
