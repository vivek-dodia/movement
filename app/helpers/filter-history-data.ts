import { UserHistory, WorkoutInDb } from '../libs/types'

type searchType = 'name' | 'location' | 'exercise-name'

export const getUniqueHistory = (workoutsData: Array<WorkoutInDb>) => {
  // filter to get unique exercise name, location, and workout names
  const workouts = new Set<string>()
  const exercises = new Set<string>()
  const locations = new Set<string>()

  workoutsData.forEach((workout) => {
    workouts.add(workout.name)
    locations.add(workout.location)
    workout.exercises.forEach((exercise) => {
      exercises.add(exercise.name)
    })
  })

  // all unique values from workout history
  return {
    workouts: Array.from(workouts).sort(),
    locations: Array.from(locations).sort(),
    exercises: Array.from(exercises).sort(),
  }
}

export const filterHistoryData = (
  data: UserHistory,
  query: string,
  searchType: searchType
) => {
  let arr

  if (searchType === 'exercise-name') {
    arr = data.exercises.filter((exercise) =>
      exercise.toLowerCase().startsWith(query.toLowerCase())
    )
  } else if (searchType === 'name') {
    arr = data.exercises.filter((name) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    )
  } else if (searchType === 'location') {
    arr = data.locations.filter((location) =>
      location.toLowerCase().startsWith(query.toLowerCase())
    )
  }

  return arr
}
