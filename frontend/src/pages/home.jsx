import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <div className="landingPageContainer">
            <div className="navBar" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{
                        fontSize: "3.6rem",
                        fontWeight: "900",
                        letterSpacing: "3px",
                        color: "white",
                        margin: 0,
                        userSelect: "none",
                    }}>
                        vidO
                    </h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <Button
                        onClick={() => navigate("/history")}
                        startIcon={<RestoreIcon style={{ color: 'white' }} />}
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: '#a0d8a0',
                                color: '#a0d8a0',
                            },
                            padding: '6px 14px'
                        }}
                    >
                        History
                    </Button>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#a0d8a0',
                                borderColor: '#7abf7a',
                                color: '#fff',
                            },
                            padding: '6px 20px'
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer" style={{ display: 'flex', padding: '0 40px', gap: '60px', alignItems: 'center' }}>
                <div className="leftPanel" style={{ flex: 1 }}>
                    <div style={{ marginBottom: "40px", marginTop: "20px" }}>
                        <h2 style={{
                            maxWidth: "500px",
                            lineHeight: "1.4",
                            fontSize: "2.6rem",
                            fontFamily: "'Georgia', serif",
                            fontWeight: "600",
                            color: "#f0f8ff",
                            margin: 0,
                            userSelect: "none",
                        }}>
                            Video calls that ripple with clarity,<br />like water under leaves
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: "20px", maxWidth: '320px' }}>
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            label="Meeting Code"
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#f0f0f0' } }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '10px',
                                }
                            }}
                            sx={{ width: '100%' }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            style={{
                                backgroundColor: '#1c8f79',
                                color: 'white',
                                padding: '12px 0',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                transition: 'background-color 0.3s ease',
                                width: '100%'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#136b5e'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1c8f79'}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className='rightPanel' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src='/logo5.png'
                        alt="Video Call Illustration"
                        style={{
                            width: '100%',
                            maxWidth: '750px',
                            height: 'auto',
                            borderRadius: '20px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);
