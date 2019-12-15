var rating_data = '';

//mock json file for line chart
//mock json file for pie chart
var jsonfile = {
    "App": [{
      "App_ratings": [6488,2615,3229,6182,32065] 
    }]
  };

rating_data = jsonfile.App.map(function(e) {
    return e.App_ratings;
});;

console.log(rating_data);

var ctx = $("#rating_chart");
var config = {
  type: "horizontalBar",
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "# of Ratings",
        data: rating_data[0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 0.5,
        barPercentage: 0.4
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
                fontSize: 16,
                stepSize: 1000,
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
                fontSize: 12,
                stepSize: 1000,
                beginAtZero: true,
                fontFamily: "'Sulphur Point', sans-serif"
            },
            gridLines: {
                color: "#666666"
              },

        }],
}
  }};

var rating_chart = new Chart(ctx, config);
