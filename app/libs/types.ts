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

export type HandleEditSets = (
  e: React.MouseEvent<HTMLButtonElement>,
  setExercisesData: React.Dispatch<React.SetStateAction<Exercises>>,
  exercisesData: Exercises,
  exerciseIndex: number,
  add?: boolean,
  index?: number
) => void

export type HandleEditExercise = (
  e: React.MouseEvent<HTMLButtonElement>,
  exercisesData: Exercises,
  exerciseIndex: number,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
  setIsInvalid: React.Dispatch<React.SetStateAction<boolean>>,
  hide?: boolean
) => void

export type HandleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  setExercisesData: React.Dispatch<React.SetStateAction<Exercises>>,
  exerciseIndex: number
) => void

export type HandleAddExercise = (
  e: React.MouseEvent<HTMLButtonElement>,
  setExercisesData: React.Dispatch<React.SetStateAction<Exercises>>
) => void

export type HandleDeleteExercise = (
  index: number,
  exercisesData: Exercises,
  setExercisesData: React.Dispatch<React.SetStateAction<Exercises>>
) => void

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
  _id: string
}

export type Session = {
  user: {
    name: string
    email: string
    id: string
    image: string | null | undefined
  }
}
