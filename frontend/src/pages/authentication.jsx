import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0=login, 1=register
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
        setUsername('');
        setPassword('');
        setName('');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Authentication failed';
      setError(msg);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Left panel with Unsplash image background */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', sm: 'block' },
          }}
        />

        {/* Right panel with green gradient background and form */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 5,
            background:
              'linear-gradient(135deg, #39c6db 0%, #6bcb74 50%, #dbe253 100%)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: 'rgba(255,255,255,0.85)',
              borderRadius: 2,
              p: 4,
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <Avatar sx={{ m: 'auto', bgcolor: '#1c8f79', mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5" sx={{ fontWeight: '600', mb: 3 }}>
              {formState === 0 ? 'Sign In' : 'Sign Up'}
            </Typography>

            <Box component="form" noValidate>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  InputLabelProps={{ style: { color: '#555' } }}
                  InputProps={{ style: { color: '#333' } }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus={formState === 0}
                InputLabelProps={{ style: { color: '#555' } }}
                InputProps={{ style: { color: '#333' } }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: '#555' } }}
                InputProps={{ style: { color: '#333' } }}
              />

              {error && (
                <Typography sx={{ color: 'red', mt: 1, mb: 1, fontWeight: '500' }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleAuth}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#1c8f79',
                  '&:hover': { backgroundColor: '#136b5e' },
                  fontWeight: '600',
                  textTransform: 'none',
                }}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant={formState === 0 ? 'outlined' : 'text'}
                  onClick={() => {
                    setFormState(0);
                    setError('');
                  }}
                  sx={{
                    color: formState === 0 ? '#1c8f79' : '#666',
                    borderColor: '#1c8f79',
                    textTransform: 'none',
                    fontWeight: '600',
                    width: 100,
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant={formState === 1 ? 'outlined' : 'text'}
                  onClick={() => {
                    setFormState(1);
                    setError('');
                  }}
                  sx={{
                    color: formState === 1 ? '#1c8f79' : '#666',
                    borderColor: '#1c8f79',
                    textTransform: 'none',
                    fontWeight: '600',
                    width: 100,
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Grid>
    </ThemeProvider>
  );
}
