import React from "react";
import CustomCard from "../../Components/Card";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, styled, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const HomeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(4)
}));

const Home: React.FC = () => {
  const handleAdd = () => {
    console.log("Add clicked from Home");
  };

  const handleNavigate = () => {
    console.log("Navigate clicked from Home");
  };

  const sampleTable = (
    <Table>
    <h5>This is not dynamic yet</h5>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>3455</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>New This Month</TableCell>
          <TableCell>+2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <HomeContainer>
      <CustomCard
        title="Client Management"
        actions={
          <Box display="flex" gap={1}>
            <IconButton onClick={handleAdd} aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleNavigate} aria-label="navigate">
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        }
        content={sampleTable} // Pass the table as content
      />

      <CustomCard
        title="People Management"
        actions={
          <Box display="flex" gap={1}>
            <IconButton onClick={handleAdd} aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleNavigate} aria-label="navigate">
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        }
      />
    </HomeContainer>
  );
};

export default Home;
