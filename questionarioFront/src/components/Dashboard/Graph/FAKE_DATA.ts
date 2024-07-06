export const LineChartData = {
    // x
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    datasets: [
        {
            label: "Answers",
            data: [30, 50, 45, 60, 80, 70, 90, 50, 60, 70, 75, 70], // y
            borderColor: "red"
        }
    ]
    
}

export const pieChartData = {
    labels: ["React", "Typescript", "Vue", "Next", "Node"],
    datasets: [
        {
            label: "Answers",
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