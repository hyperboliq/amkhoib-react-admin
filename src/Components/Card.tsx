// CustomCard.tsx
import React from "react";
import { Card, CardHeader, IconButton, Box, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[0],
  borderRadius: '8px',
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-0px)",
    boxShadow: theme.shadows[0]
  }
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(2),
  "& .MuiCardHeader-action": {
    margin: 0,
    alignSelf: "center"
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1)
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}));

interface CustomCardProps {
  title: string;
  actions?: React.ReactNode;
}

interface CustomCardProps {
  title: string;
  actions?: React.ReactNode;
  content?: React.ReactNode; // New prop for content
}

const CustomCard: React.FC<CustomCardProps> = ({ title, actions, content }) => {
  return (
    <StyledCard>
      <StyledCardHeader title={title} action={actions} />
      {content && (
        <Box padding={2}>
          {content}
        </Box>
      )}
    </StyledCard>
  );
};

export default CustomCard;