import { Card, Typography, Box } from '@mui/material';

interface ClientListCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const ClientListCard = ({
  title = "Group Five",
  subtitle = "Ayanda Mthembu",
  imageUrl = "https://via.placeholder.com/80"
}: ClientListCardProps) => {
  return (
    <Card 
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 4,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)', // Minimal shadow
        maxWidth: 400,
      }}
    >
      {/* Text content */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ fontWeight: 'bold', color: 'text.primary' }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Image */}
      <Box
        component="img"
        src={imageUrl}
        alt={`${title} logo`}
        sx={{
          height: 60,
          width: 60,
          borderRadius: '50px',
          objectFit: 'contain',
          marginLeft: 2,
        }}
      />
    </Card>
  );
};
