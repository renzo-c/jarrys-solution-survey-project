export const createOptionsHBar = (index, title) => ({
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: `${index} - ${title}`,
    },
  },
});

export const createOptionsLine = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: `${title}`,
    },
  },
});

export const createGraphData = (arrData, labels) => {
  return {
    labels,
    datasets: [
      {
        label: "Total",
        data: arrData,
        borderColor: "rgb(54, 205, 238)",
        backgroundColor: "rgba(54, 205, 238, 0.5)",
      },
    ],
  };
};

export const createShortAnswerLineChartGraphData = (labels, arrData) => {
  return {
    labels,
    datasets: [
      {
        label: "Total",
        data: arrData.respondentsByDate.map((d) => d.respondents),
        borderColor: "rgb(54, 205, 238)",
        backgroundColor: "rgba(54, 205, 238, 0.5)",
      },
    ],
  };
};

export const createShortAnswerLineChartLabels = (fetchedData) =>
  fetchedData.respondentsByDate.reverse().map((d) => d.data);
