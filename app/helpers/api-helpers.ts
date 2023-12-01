import { Exercises } from '../libs/types'

export const validateExercises = (exercises: Exercises) => {
  if (!Array.isArray(exercises)) {
    throw new Error('Exercises must be an array.')
  }

  exercises.forEach((exercise) => {
    console.log(exercise)
    if (
      !exercise.name ||
      !Array.isArray(exercise.sets) ||
      exercise.sets.length === 0
    ) {
      throw new Error('Must include a name and at least one set.')
    } else {
      exercise.name = exercise.name.trim()
    }
    // remove extra sets with no data
    exercise.sets = exercise.sets.filter((set) => {
      return set.reps !== null && set.sets !== null && set.weight !== null
    })
  })

  return exercises
}
