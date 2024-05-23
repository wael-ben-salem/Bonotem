import React, { useState, useEffect } from "react";
import { Cell } from "recharts";
import Select from "react-select";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const LineColumnAreaData = ({ filter }) => {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const filteredData = userData.filter(user => {
        // Logique de filtrage en fonction du filtre sélectionné (semaine, mois, an)
        return true; // Pour l'exemple, nous retournons toujours true ici
    });

    const data = filteredData.map((user, index) => ({
        name: user.name,
        num_logins: user.num_logins,
        color: COLORS[index % COLORS.length],
        logins_per_date: user.logins_per_date
    }));

    const maxNumLogins = Math.max(...data.map(user => user.num_logins));
    const yAxisMax = maxNumLogins + 10;

    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption ? selectedOption.value : null);
    };

    return (
        <div style={{ width: '100%', height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Historique des connexions</h2>
            <ResponsiveContainer width="90%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tickFormatter={(value, index) => index + 1} />
                    <YAxis domain={[0, yAxisMax]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="num_logins" barSize={30} label={<CustomLabel />}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div style={{ margin: '10px 0', width: '90%' }}>
                <Select
                    options={data.map(user => ({ value: user, label: <CustomOption user={user} /> }))}
                    onChange={handleUserChange}
                    placeholder="Sélectionnez un utilisateur"
                    isClearable
                />
            </div>
            {selectedUser && <CustomLegend user={selectedUser} />}
        </div>
    );
};

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4D4F", "#36CFC9", "#40A9FF", "#F759AB", "#B37FEB"];

const CustomOption = ({ user }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 10, height: 10, backgroundColor: user.color, marginRight: 5 }}></div>
        <span>{user.name}</span>
    </div>
);

const CustomLegend = ({ user }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                <div style={{ width: 10, height: 10, backgroundColor: user.color, marginRight: 5 }}></div>
                <span>{user.name}</span>
            </div>
        </div>
    );
};

export default LineColumnAreaData;
