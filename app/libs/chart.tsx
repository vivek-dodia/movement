'use client'
import { DashboardData, ExerciseData, WeightEntries } from './types'
import { Bar, Doughnut, Pie, Radar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const noChartMessage = (message: string) => {
  return (
    <div className="h-full flex justify-center items-center">
      <p className="mb-16 text-sm ">{message}</p>
    </div>
  )
}

export const getWeightChart = (weightEntries: WeightEntries) => {
  const data = {
    labels: weightEntries.map((entry) =>
      new Date(entry.date).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Weight',
        data: weightEntries.map((entry) => entry.weight),
        fill: true,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgb(37, 99, 235, 0.25)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            console.log(context)
            return `${context.dataset.label}: ${context.parsed.y} lbs`
          },
        },
        displayColors: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (lbs)',
          font: {
            size: 12,
          },
          color: 'rgb(3, 7, 18)',
          padding: 10,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 12,
          },
          color: 'rgb(3, 7, 18)',
          padding: 10,
        },
      },
    },
    borderJoinStyle: 'round',
  }

  return weightEntries.length >= 2 ? (
    <div>
      <Line
        data={data}
        options={options}
      />
    </div>
  ) : (
    noChartMessage('Record at least two weights to view this chart.')
  )
}

export const getDashBoardCharts = (dashboardData: DashboardData) => {
  const donutData = {
    labels: Array.from(dashboardData.locations.keys()),
    datasets: [
      {
        label: 'Workouts',
        data: Array.from(dashboardData.locations.values()),
        backgroundColor: [
          'rgba(132, 208, 218, 0.3)',
          'rgba(31, 120, 180, 0.3)',
          'rgba(178, 223, 138, 0.3)',
          'rgba(51, 160, 44, 0.3)',
          'rgba(251, 154, 153, 0.3)',
          'rgba(227, 26, 28, 0.3)',
          'rgba(253, 191, 111, 0.3)',
          'rgba(255, 127, 0, 0.3)',
          'rgba(202, 178, 214, 0.3)',
          'rgba(106, 61, 154, 0.3)',
          'rgba(255, 255, 153, 0.3)',
          'rgba(177, 89, 40, 0.3)',
        ],
        borderColor: [
          'rgb(132, 208, 218)',
          'rgb(31, 120, 180)',
          'rgb(178, 223, 138)',
          'rgb(51, 160, 44)',
          'rgb(251, 154, 153)',
          'rgb(227, 26, 28)',
          'rgb(253, 191, 111)',
          'rgb(255, 127, 0)',
          'rgb(202, 178, 214)',
          'rgb(106, 61, 154)',
          'rgb(255, 255, 153)',
          'rgb(177, 89, 40)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 10,
          generateLabels: function (chart: any) {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0]
                const backgroundColor = dataset.backgroundColor[i]
                return {
                  text:
                    label.length > 10
                      ? label.substring(0, 10).trim() + '...'
                      : label,
                  fillStyle: backgroundColor,
                  strokeStyle: backgroundColor,
                }
              })
            }
            return []
          },
        },
      },
    },
  }

  const pieData = {
    labels: Array.from(dashboardData.popularWorkouts.keys()),
    datasets: [
      {
        label: 'Workouts',
        data: Array.from(dashboardData.popularWorkouts.values()),
        backgroundColor: [
          'rgba(132, 208, 218, 0.3)',
          'rgba(31, 120, 180, 0.3)',
          'rgba(178, 223, 138, 0.3)',
          'rgba(51, 160, 44, 0.3)',
          'rgba(251, 154, 153, 0.3)',
          'rgba(227, 26, 28, 0.3)',
          'rgba(253, 191, 111, 0.3)',
          'rgba(255, 127, 0, 0.3)',
          'rgba(202, 178, 214, 0.3)',
          'rgba(106, 61, 154, 0.3)',
          'rgba(255, 255, 153, 0.3)',
          'rgba(177, 89, 40, 0.3)',
        ],
        borderColor: [
          'rgb(132, 208, 218)',
          'rgb(31, 120, 180)',
          'rgb(178, 223, 138)',
          'rgb(51, 160, 44)',
          'rgb(251, 154, 153)',
          'rgb(227, 26, 28)',
          'rgb(253, 191, 111)',
          'rgb(255, 127, 0)',
          'rgb(202, 178, 214)',
          'rgb(106, 61, 154)',
          'rgb(255, 255, 153)',
          'rgb(177, 89, 40)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 10,
          generateLabels: function (chart: any) {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0]
                const backgroundColor = dataset.backgroundColor[i]
                return {
                  text:
                    label.length > 10
                      ? label.substring(0, 10).trim() + '...'
                      : label,
                  fillStyle: backgroundColor,
                  strokeStyle: backgroundColor,
                }
              })
            }
            return []
          },
        },
      },
    },
  }

  const popBarData = {
    labels: Array.from(dashboardData.popularExercises.keys()),
    datasets: [
      {
        label: 'Total sets',
        data: Array.from(dashboardData.popularExercises.values()),
        backgroundColor: [
          'rgba(132, 208, 218, 0.3)',
          'rgba(31, 120, 180, 0.3)',
          'rgba(178, 223, 138, 0.3)',
          'rgba(51, 160, 44, 0.3)',
          'rgba(251, 154, 153, 0.3)',
          'rgba(227, 26, 28, 0.3)',
          'rgba(253, 191, 111, 0.3)',
          'rgba(255, 127, 0, 0.3)',
          'rgba(202, 178, 214, 0.3)',
          'rgba(106, 61, 154, 0.3)',
          'rgba(255, 255, 153, 0.3)',
          'rgba(177, 89, 40, 0.3)',
        ],
        borderColor: [
          'rgb(132, 208, 218)',
          'rgb(31, 120, 180)',
          'rgb(178, 223, 138)',
          'rgb(51, 160, 44)',
          'rgb(251, 154, 153)',
          'rgb(227, 26, 28)',
          'rgb(253, 191, 111)',
          'rgb(255, 127, 0)',
          'rgb(202, 178, 214)',
          'rgb(106, 61, 154)',
          'rgb(255, 255, 153)',
          'rgb(177, 89, 40)',
        ],
      },
    ],
  }

  const popBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 1,
    borderRadius: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Total Sets',
          font: {
            size: 12,
          },
          color: 'rgb(3, 7, 18)',
          padding: 5,
        },
      },
      x: {
        ticks: {
          callback: (val: any) => {
            const label = Array.from(dashboardData.popularExercises.keys())
            if (label[val].length > 10)
              return label[val].substring(0, 10).trim() + '...'
            else return label[val]
          },
          font: {
            size: 10,
          },
          padding: 0,
        },
      },
    },
  }

  const PrBarData = {
    labels: Array.from(dashboardData.exercisePRs.keys()),
    datasets: [
      {
        label: 'PR',
        data: Array.from(dashboardData.exercisePRs.values()),
        backgroundColor: [
          'rgba(132, 208, 218, 0.3)',
          'rgba(31, 120, 180, 0.3)',
          'rgba(178, 223, 138, 0.3)',
          'rgba(51, 160, 44, 0.3)',
          'rgba(251, 154, 153, 0.3)',
          'rgba(227, 26, 28, 0.3)',
          'rgba(253, 191, 111, 0.3)',
          'rgba(255, 127, 0, 0.3)',
          'rgba(202, 178, 214, 0.3)',
          'rgba(106, 61, 154, 0.3)',
          'rgba(255, 255, 153, 0.3)',
          'rgba(177, 89, 40, 0.3)',
        ],
        borderColor: [
          'rgb(132, 208, 218)',
          'rgb(31, 120, 180)',
          'rgb(178, 223, 138)',
          'rgb(51, 160, 44)',
          'rgb(251, 154, 153)',
          'rgb(227, 26, 28)',
          'rgb(253, 191, 111)',
          'rgb(255, 127, 0)',
          'rgb(202, 178, 214)',
          'rgb(106, 61, 154)',
          'rgb(255, 255, 153)',
          'rgb(177, 89, 40)',
        ],
      },
    ],
  }

  const PrBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 1,
    borderRadius: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.formattedValue} lbs`
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (lbs)',
          font: {
            size: 12,
          },
          color: 'rgb(3, 7, 18)',
          padding: 5,
        },
      },
      x: {
        ticks: {
          callback: (val: any) => {
            const label = Array.from(dashboardData.exercisePRs.keys())
            if (label[val].length > 10)
              return label[val].substring(0, 10).trim() + '...'
            else return label[val]
          },
          font: {
            size: 10,
          },
          padding: 0,
        },
      },
    },
  }

  return {
    pieChart:
      dashboardData.popularWorkouts.size >= 5 ? (
        <div>
          <Pie
            data={pieData}
            // @ts-ignore
            options={pieOptions}
          />
        </div>
      ) : (
        noChartMessage('Record at least five workouts to view this chart.')
      ),
    donutChart:
      dashboardData.locations.size >= 5 ? (
        <div>
          <Doughnut
            data={donutData}
            // @ts-ignore
            options={donutOptions}
          />
        </div>
      ) : (
        noChartMessage(
          'Record at least five workouts with locations to view this chart.'
        )
      ),
    popBarChart:
      dashboardData.popularExercises.size >= 5 ? (
        <div>
          <Bar
            data={popBarData}
            options={popBarOptions}
          />
        </div>
      ) : (
        noChartMessage(
          'Record at least five workouts with exercises to view this chart.'
        )
      ),
    PrBarChart:
      dashboardData.exercisePRs.size >= 5 ? (
        <div>
          <Bar
            data={PrBarData}
            options={PrBarOptions}
          />
        </div>
      ) : (
        noChartMessage(
          'Record at least five workouts with recorded weights to view this chart.'
        )
      ),
  }
}

export const getExerciseChart = (exerciseData: ExerciseData) => {
  const lineData = {
    labels: exerciseData?.maxSets?.map((set) =>
      set.date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Weight',
        data: exerciseData?.maxSets?.map((set) => set.weight),
        fill: true,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgb(37, 99, 235, 0.25)',
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${exerciseData?.exercise} Weight Progression`,
        font: {
          size: 16,
        },
        color: 'rgb(3, 7, 18)',
        padding: 20,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            console.log(context)
            return `${context.dataset.label}: ${context.parsed.y} lbs`
          },
        },
        displayColors: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (lbs)',
          font: {
            size: 14,
          },
          color: 'rgb(3, 7, 18)',
          padding: 10,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
          },
          color: 'rgb(3, 7, 18)',
          padding: 10,
        },
      },
    },
    borderJoinStyle: 'round',
  }

  return (
    <Line
      data={lineData}
      options={lineOptions}
    />
  )
}
