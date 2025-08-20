import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import pathConfig from "../../assets/pathConfig";
import HighlightsDrawer from "./components/HighlightsDrawer";

const teamMembers = [
  {
    name: "Jane Done",
    role: "Project Lead",
    affiliation: "MNIT, Jaipur (India)",
    avatarUrl: "https://i.pravatar.cc/A",
  },
  {
    name: "Sherlock Holmes",
    role: "Lead Developer",
    affiliation: "UCL, London (UK)",
    avatarUrl: "https://i.pravatar.cc/B",
  },
  {
    name: "Charlie Brown",
    role: "UX/UI Designer",
    affiliation: "UCL, London (UK)",
    avatarUrl: "https://i.pravatar.cc/C",
  },
  {
    name: "Diana Edinburgh",
    role: "Data Scientist",
    affiliation: "Dept of Transportation (UK)",
    avatarUrl: "https://i.pravatar.cc/D",
  },
    {
    name: "Eddie Murphy",
    role: "Community Manager",
    affiliation: "MNIT, Jaipur (India)",
    avatarUrl: "https://i.pravatar.cc/E",
  },
];

const Highlights = () => {
  const [highlightCards, setHighlightCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch(pathConfig.HIGHLIGHTS_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          name: item.title,
          image_url: item.image,
        }));
        setHighlightCards(formattedData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch highlights data:", fetchError);
        setError("Could not load highlights. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <Grid container spacing={4} sx={{ my: 4, px: 4 }}>
        {/* Highlights */}
        <Grid size={{ xs: 12, sm: 9 }} sx={{ pr: 4 }}>
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ my: 2 }}>
              {error}
            </Typography>
          )}

          <Grid container spacing={2}>
            {!isLoading &&
              !error &&
              highlightCards.map((card) => (
                <Grid item size={{ sm: 12, md: 4 }} key={card.name}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "12px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(card)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={card.image_url}
                        alt={card.alt}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="p"
                          sx={{
                            textOverflow: "ellipsis",
                            mb: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Team */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "primary.dark" }}>
            Project Team
          </Typography>
          {teamMembers.map((member, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", my: 2 }}
            >
              <Avatar
                alt={member.name}
                src={member.avatarUrl}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  color="primary."
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.affiliation}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
      {/* --- Render the Drawer Component --- */}
      <HighlightsDrawer
        item={selectedCard}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Box>
  );
};

export default Highlights;
