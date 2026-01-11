import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  const handleActivityAdded = () => {
    window.location.reload(); // simple & reliable
  };

  return (
    <Box sx={{ p: 2 }}>
      <ActivityForm onActivityAdded={handleActivityAdded} />
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (token && tokenData) {
      const userId =
        tokenData.sub ||
        tokenData.user_id ||
        tokenData.preferred_username;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }
  }, [token, tokenData]);

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Fitness Tracker App
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Please login to access your activities
          </Typography>
          <Button variant="contained" size="large" onClick={logIn}>
            LOGIN
          </Button>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mb: 2 }}
            onClick={logOut}
          >
            Logout
          </Button>

          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route
              path="/activities/:id"
              element={<ActivityDetail />}
            />
            <Route
              path="/"
              element={<Navigate to="/activities" replace />}
            />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;
