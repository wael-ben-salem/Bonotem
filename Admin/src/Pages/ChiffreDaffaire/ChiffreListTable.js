import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, CircularProgress, Grid, Box, Container } from "@mui/material";
import { BsCurrencyDollar, BsGraphUp, BsCalculator, BsCalendar, BsArrowUp, BsArrowDown } from "react-icons/bs";
import { getAllChiffreDaffaireData } from "../../store/chiffredaffaire/gitChiffreDaffaireSlice";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
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
        data: [montant_total, chiffre_total, benefice].map(value => parseFloat(value).toFixed(2)),
        backgroundColor: [
          'rgba(10, 112, 55, 0.2)',
          'rgba(10, 12, 235, 0.2)',
          benefice >= 0 ? 'rgba(10, 112, 55, 0.2)' : 'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(10, 112, 55, 1)',
          'rgba(10, 12, 235, 1)',
          benefice >= 0 ? 'rgba(10, 112, 55, 1)' : 'rgba(255, 99, 132, 1)'
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
    <Container maxWidth="md">
      <Card sx={{ marginTop: 4, padding: 2, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <BsCurrencyDollar style={{ fontSize: 32, marginRight: 10 }} />
            <Typography variant="h4" component="h2">
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
            <>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12}>
                  <Bar data={data} options={options} />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BsCurrencyDollar style={{ fontSize: 24, marginRight: 10, color: '#006400' }} />
                    <Typography variant="body1">
                      <strong>Montant Total:</strong> {parseFloat(montant_total).toFixed(2)} TND
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BsGraphUp style={{ fontSize: 24, marginRight: 10, color: 'blue' }} />
                    <Typography variant="body1">
                      <strong>Chiffre Total:</strong> {parseFloat(chiffre_total).toFixed(2)} TND
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BsCalculator style={{ fontSize: 24, marginRight: 10, color: benefice >= 0 ? 'green' : 'red' }} />
                    <Typography variant="body1" style={{ color: benefice >= 0 ? 'green' : 'red' }}>
                      <strong>Bénéfice:</strong> {parseFloat(benefice).toFixed(2)} TND
                    </Typography>
                    {benefice >= 0 ? (
                      <BsArrowUp style={{ fontSize: 24, color: 'green', marginLeft: 10 }} />
                    ) : (
                      <BsArrowDown style={{ fontSize: 24, color: 'red', marginLeft: 10 }} />
                    )}
                  </Box>
                  {benefice < 0 && (
                    <Typography variant="body1" color="error" style={{ display: "flex", alignItems: "center" }}>
                      Bénéfice négatif: {parseFloat(benefice).toFixed(2)} TND <span style={{ color: "red", marginLeft: 5 }}>&darr;</span>
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BsCalendar style={{ fontSize: 24, marginRight: 10, color: '#1976d2' }} />
                    <Typography variant="body1">
                      <strong>Date Début:</strong> {formatDate(date_debut)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BsCalendar style={{ fontSize: 24, marginRight: 10, color: '#1976d2' }} />
                    <Typography variant="body1">
                      <strong>Date Fin:</strong> {formatDate(date_fin)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChiffreAffaire;
