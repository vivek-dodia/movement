import { WorkoutInDb, DashboardData } from '../libs/types'
import { fetchUserWeights } from './fetch-user-weights'

export const getDashboardData = async (
  workouts: WorkoutInDb[],
  id: string
): Promise<DashboardData> => {
  const workoutsMap = new Map<string, number>()
  const exercisesMap = new Map<string, number>()
  const exercisePRs = new Map<string, number>()
  const locations = new Map<string, number>()
  const totals = {
    workouts: 0,
    exercises: new Set<string>(),
    reps: 0,
    sets: 0,
  }

  workouts.forEach((workout) => {
    const name = workout.name
    totals.workouts++

    if (workoutsMap.has(name)) workoutsMap.set(name, workoutsMap.get(name)! + 1)
    else workoutsMap.set(name, 1)

    if (workout.location) {
      if (locations.has(workout.location)) {
        locations.set(workout.location, locations.get(workout.location)! + 1)
      } else locations.set(workout.location, 1)
    }

    workout.exercises.forEach((exercise) => {
      const name = exercise.name
      let sets = 0
      let max = 0

      totals.exercises.add(name)

      exercise.sets.forEach((set) => {
        if (set.sets) {
          sets += set.sets

          totals.sets += set.sets
          if (set.reps) totals.reps += set.sets * set.reps
        }
        if (set.weight && set.weight > max) max = set.weight
      })

      if (!exercisePRs.has(name) || max > exercisePRs.get(name)!)
        exercisePRs.set(name, max)

      if (exercisesMap.has(name)) {
        exercisesMap.set(name, exercisesMap.get(name)! + sets)
      } else exercisesMap.set(name, sets)
    })
  })

  const weights = await fetchUserWeights(id)

  return {
    locations,
    popularExercises: new Map<string, number>(
      Array.from(exercisesMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
    ),
    popularWorkouts: new Map<string, number>(
      Array.from(workoutsMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
    ),
    exercisePRs: new Map<string, number>(
      Array.from(exercisePRs.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
    ),
    totals: {
      workouts: totals.workouts,
      exercises: totals.exercises.size,
      reps: totals.reps,
      sets: totals.sets,
    },
    weights,
  }
}
