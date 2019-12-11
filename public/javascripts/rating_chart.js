var ctx = $("#rating_chart");
var config = {
  type: "bar",
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "# of Ratings",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 0.5
      }
    ]
  },
  options: {
    legend: {
        labels: {
            fontColor: "white",
            fontSize: 14,
            fontFamily: "'Sulphur Point', sans-serif"
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true,
                fontFamily: "'Sulphur Point', sans-serif"
            },
            gridLines: {
                color: "#666666"

              },
        }],
        xAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true,
                fontFamily: "'Sulphur Point', sans-serif"
            },
            gridLines: {
                color: "#666666"
              },
        }]
}
  }};

var rating_chart = new Chart(ctx, config);
