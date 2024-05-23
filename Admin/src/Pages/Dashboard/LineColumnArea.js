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

  // Générer une liste de dates pour le mois en cours
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  const dateList = [];
  for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
    dateList.push(new Date(d).toLocaleDateString());
  }

  // Extraire les noms des produits
  const labelsData = [...new Set(ventesDetails.map((vente) => vente.nom))];

  // Préparer les datasets pour le graphique
  const datasets = labelsData.map((nom) => {
    const quantiteData = dateList.map((date) => {
      const totalQuantite = ventesDetails
        .filter((vente) => vente.nom === nom && new Date(vente.date).toLocaleDateString() === date)
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
            stepSize: 10,
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
