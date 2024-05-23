import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, CircularProgress, Grid, Box } from "@mui/material";
import { BsCurrencyDollar, BsGraphUp, BsCalculator, BsCalendar } from "react-icons/bs";
import { getAllChiffreDaffaireData } from "../../store/chiffredaffaire/gitChiffreDaffaireSlice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChiffreAffaire = () => {
  const dispatch = useDispatch();
  const { montant_total, chiffre_total, benefice, date_debut, date_fin, loading, error } = useSelector((state) => state.gitChiffreDaffaire);
  const id = useSelector(state => state.login.user.id);

  useEffect(() => {
    dispatch(getAllChiffreDaffaireData(id));
  }, [dispatch, id]);

  const formatDate = (date) => moment(date).format('DD MMM YYYY');

  const data = {
    labels: ['Montant Total', 'Chiffre Total', 'Bénéfice'],
    datasets: [
      {
        label: 'Valeurs',
        data: [montant_total, chiffre_total, benefice],
        backgroundColor: [
          'rgba(10, 112, 55, 0.2)',
          'rgba(10, 12, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(10, 112, 55, 1)',
          'rgba(10, 12, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Chiffre d'Affaires du ${formatDate(date_debut)} au ${formatDate(date_fin)}`
      }
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 800, 
      margin: "auto", 
      marginTop: 20, 
      padding: 2, 
      border: '1px solid #1976d2', 
      borderRadius: 4, 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <BsCurrencyDollar style={{ fontSize: 32, marginRight: 10 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Chiffre d'Affaires
          </Typography>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            Erreur: {error}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Bar data={data} options={options} />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <BsCurrencyDollar style={{ fontSize: 24, marginRight: 10 }} />
                <Typography variant="body1" style={{ color: '#006400' }}>
                  <strong>Montant Total:</strong> {montant_total}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <BsGraphUp style={{ fontSize: 24, marginRight: 10 }} />
                <Typography variant="body1" style={{ color: 'blue' }}>
                  <strong>Chiffre Total:</strong> {chiffre_total}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <BsCalculator style={{ fontSize: 24, marginRight: 10 }} />
                <Typography variant="body1"><strong>Bénéfice:</strong> {benefice}</Typography>
              </Box>
              {benefice < 0 && (
                <Typography variant="body1" color="error" style={{ display: "flex", alignItems: "center" }}>
                  Bénéfice négatif: {benefice} <span style={{ color: "red", marginLeft: 5 }}>&darr;</span>
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <BsCalendar style={{ fontSize: 24, marginRight: 10 }} />
                <Typography variant="body1"><strong>Date Début:</strong> {formatDate(date_debut)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <BsCalendar style={{ fontSize: 24, marginRight: 10 }} />
                <Typography variant="body1"><strong>Date Fin:</strong> {formatDate(date_fin)}</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ChiffreAffaire;
