import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenteStatiqueData } from "../../store/user/gitVenteStatiqueSlice";

const LineColumnArea = () => {
  const dispatch = useDispatch();
  const { ventesDetails, loading, error } = useSelector((state) => state.gitVenteStatique);
  const id = useSelector((state) => state.login.user.id);

  useEffect(() => {
    dispatch(getAllVenteStatiqueData(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const generateDateList = (days) => {
    const dateList = [];
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dateList.push(date.toISOString().split("T")[0]);
    }
    return dateList;
  };

  const dateList = generateDateList(30); 

  
  const labelsData = [...new Set(ventesDetails.map((vente) => vente.nom))];

  
  const datasets = labelsData.map((nom) => {
    const quantiteData = dateList.map((date) => {
      const totalQuantite = ventesDetails
        .filter((vente) => vente.nom === nom && new Date(vente.date).toISOString().split("T")[0] === date)
        .reduce((sum, vente) => sum + vente.quantite, 0);
      return totalQuantite;
    });

    return {
      label: nom,
      data: quantiteData,
      lineTension: 0.2,
      borderColor: "#" + ((1 << 24) * Math.random() | 0).toString(16), // Couleur aléatoire
      borderWidth: 3,
      fill: false,
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#" + ((1 << 24) * Math.random() | 0).toString(16),
    };
  });

  const data = {
    labels: dateList,
    datasets: datasets,
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            max: Math.max(...datasets.flatMap(dataset => dataset.data)) + 10,
            min: 0,
            stepSize: 1,
            zeroLineColor: "#7b919e",
            borderDash: [3, 3],
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <Line width={537} height={268} data={data} options={options} />
    </React.Fragment>
  );
};

export default LineColumnArea;
