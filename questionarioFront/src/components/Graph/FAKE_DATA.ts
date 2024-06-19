export const LineChartData = {
    // x
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets: [
        {
            label: "Steps",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 9000], // y
            borderColor: "red"
        }
    ]
    
}

export const pieChartData = {
    labels: ["Facebook", "Instagram", "Twitter", "Youtube", "LinkedIn"],
    datasets: [
        {
            label: "Time Spent",
            data: [120, 60, 30, 90],
            backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(75, 192, 192, 0.9)",
                "rgba(135, 102, 255, 0.9)"
            ],
            hoverOffset: 4,
        },
    ]
}