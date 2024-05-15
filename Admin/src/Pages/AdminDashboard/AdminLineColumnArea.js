import React, { useState, useEffect } from "react";
import { Cell } from "recharts";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    
    ResponsiveContainer
} from "recharts";
import axios from "axios";

const LineColumnAreaData = ({ filter }) => {
    const [userData, setUserData] = useState([]);

    // Utilisez useEffect pour charger les données de l'API lors du montage du composant
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/user-statistics");
                setUserData(response.user_statistics);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    // Filtrer les données en fonction du filtre sélectionné
    const filteredData = userData.filter(user => {
        // Logique de filtrage en fonction du filtre sélectionné (semaine, mois, an)
        // Vous devez implémenter cette logique en fonction de vos besoins
        return true; // Pour l'exemple, nous retournons toujours true ici
    });

    // Créer un tableau de données pour le graphique
    const data = filteredData.map((user, index) => ({
        name: user.name, // Utiliser le nom de l'utilisateur comme nom pour l'axe des X
        num_logins: user.num_logins, // Garder le nombre total de connexions
        color: COLORS[index % COLORS.length], // Utiliser une couleur unique pour chaque utilisateur
        logins_per_date: user.logins_per_date // Garder les dates d'abonnement pour chaque utilisateur
    }));

    // Trouver la valeur maximale de num_logins
    const maxNumLogins = Math.max(...data.map(user => user.num_logins));

    // Ajouter une marge supplémentaire à la valeur maximale pour l'axe Y
    const yAxisMax = maxNumLogins + 10; // Vous pouvez ajuster la marge supplémentaire selon vos besoins

    return (
        <div style={{ width: '100%', height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Historiique des connexions</h2>
            <ResponsiveContainer width="90%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    {/* Utiliser la valeur maximale ajustée pour définir la plage de l'axe Y */}
                    <YAxis domain={[0, yAxisMax]} />
                    <Tooltip content={<CustomTooltip />} />
                    {/* Barre représentant le nombre de connexions */}
                    <Bar dataKey="num_logins" label={<CustomLabel />} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const CustomLabel = ({ x, y, width, height, value, color }) => (
    <text x={x + width / 2} y={y} fill={color} textAnchor="middle" dy={-6}>{value}</text>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px" }}>
                <p><strong>{payload[0].payload.name}</strong></p>
                <p>Dates d'abonnement :</p>
                <ul>
                    {payload[0].payload.logins_per_date.map((login, index) => (
                        <li key={index}>{login.date} ({login.count})</li>
                    ))}
                </ul>
                <p>Total connexions : {payload[0].payload.num_logins}</p>
            </div>
        );
    }

    return null;
};

// Liste de couleurs pour chaque utilisateur
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4D4F", "#36CFC9", "#40A9FF", "#F759AB", "#B37FEB"];

export default LineColumnAreaData;
