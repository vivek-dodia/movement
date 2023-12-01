import { ExerciseData, WorkoutInDb } from '../libs/types'
import { MaxSets } from '../libs/types'
export const getExerciseData = (
  exercise: string,
  workouts: WorkoutInDb[]
): ExerciseData => {
  let pr = {
    weight: 0,
    rpe: 0 as number | string | null,
    sets: 0 as number | null,
  }
  let totalSets = 0
  let totalReps = 0
  let totalWorkouts = 0
  let maxSets: MaxSets[] = []

  for (let i = 0; i < workouts.length; i++) {
    if (!workouts[i].exercises.some((ex) => ex.name === exercise)) continue
    let maxSet = { weight: 0, reps: 0, date: new Date(workouts[i].date) }
    totalWorkouts++
    workouts[i].exercises.forEach((ex) => {
      if (ex.name !== exercise) return
      ex.sets.forEach((set) => {
        if (set.sets) {
          totalSets += set.sets
          if (set.reps) totalReps += set.sets * set.reps
        }
        if (set.weight) {
          if (set.weight > pr.weight) {
            pr = { weight: set.weight, rpe: set.rpe, sets: set.sets }
          }
          if (set.weight > maxSet.weight) {
            maxSet.weight = set.weight
            if (set.reps) maxSet.reps = set.reps
          }
        }
      })
    })
    if (maxSet.weight > 0 && maxSet.reps > 0) maxSets.push(maxSet)
  }

  return {
    exercise,
    maxSets,
    pr,
    totalSets,
    totalReps,
    totalWorkouts,
  }
}

// return data about exercises ->

// last hit, num times hit, PR (locations?), graph of weight over time, change all instances of name

// exercises specific data in useEffect, skeleton that
