import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #39c6db 0%, #6bcb74 50%, #dbe253 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <IconButton
        onClick={() => routeTo("/home")}
        sx={{
          alignSelf: "flex-start",
          color: "#fff",
          mb: 4,
          border: "1.5px solid #fff",
          borderRadius: "8px",
          padding: "6px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
        aria-label="Go Home"
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          fontFamily: "'Georgia', serif",
          textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
        }}
      >
        Your Meeting History
      </Typography>

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {meetings.length !== 0 ? (
          meetings.map((e, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#f0f8ff",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                padding: "12px 20px",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }} gutterBottom>
                  Meeting Code: <span style={{ fontWeight: "normal" }}>{e.meetingCode}</span>
                </Typography>
                <Typography sx={{ fontSize: 14, opacity: 0.8 }}>
                  Date: <span style={{ fontWeight: "normal" }}>{formatDate(e.date)}</span>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            sx={{
              fontSize: 18,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              mt: 4,
            }}
          >
            No meeting history available.
          </Typography>
        )}
      </div>
    </div>
  );
}
