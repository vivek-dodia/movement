export type Sets = Array<{
  sets: number | null
  reps: number | null
  weight: number | null
  rpe: number | null
}>

export type Exercises = Array<{
  name: string
  sets: Sets
}>

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
  onDelete: (index: number) => void
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

export type HandleNameChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  isInvalid: boolean,
  setIsInvalid: React.Dispatch<React.SetStateAction<boolean>>,
  exercisesData: Exercises,
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
