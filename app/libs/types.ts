export type Set = {
  sets: number | null
  reps: number | null
  weight: number | null
  rpe: number | null
}

export type Sets = Array<Set>

export type Exercise = {
  name: string
  sets: Sets
}

export type Exercises = Array<Exercise>

export type Workout = {
  name: string
  date: Date | null
  location: string
  notes: string
}

export type ExerciseFormProps = {
  setExercisesData: React.Dispatch<React.SetStateAction<Exercises>>
  exercisesData: Exercises
  exerciseIndex: number
  userHistory: UserHistory
  onDelete: (index: number) => void
  userId: string
}

export type UserHistory = {
  workouts: Array<string>
  locations: Array<string>
  exercises: Array<string>
}

export type SearchInputsProps = {
  searchType: 'name' | 'location' | 'exercise-name'
  changeValue: (input: string) => void
  userId?: string
  userHistory: UserHistory
} & React.InputHTMLAttributes<HTMLInputElement>

export type Result = string

export type Results = Array<Result>

export type WorkoutInDb = {
  name: string
  date: Date
  location: string
  exercises: Exercises
  notes: string
  id: string
}

export type Session = {
  user: {
    name: string
    email: string
    id: string
    image: string | null | undefined
  }
}

export type MaxSets = {
  weight: number
  reps: number
  date: Date
}

export type ExerciseData = {
  exercise: string
  maxSets: MaxSets[] | null
  pr: {
    weight: number
    rpe: number | string | null
    sets: number | null
  }
  totalSets: number
  totalReps: number
  totalWorkouts: number
}

export type DashboardData = {
  locations: Map<string, number>
  popularExercises: Map<string, number>
  popularWorkouts: Map<string, number>
  exercisePRs: Map<string, number>
  totals: {
    workouts: number
    exercises: number
    reps: number
    sets: number
  }
  weights: WeightEntries
}

export type WeightEntry = {
  weight: number
  date: Date
  id: string
}

export type WeightEntries = WeightEntry[]
