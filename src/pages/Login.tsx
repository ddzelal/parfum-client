import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    // TUDU: Implement login logic
    const res = await login({username, password});
    if(res.token){
        navigate("/home")
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Prijavite se</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Korisinicko ime"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Lozinka"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
                Prijavite se
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;