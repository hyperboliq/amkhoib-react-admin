import { Card, Typography, Box } from '@mui/material';

interface ClientListCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onClick?: () => void;
  sx?: object;
}

export const ProjectClientListCard = ({
  title = "Group Five",
  subtitle = "Ayanda Mthembu",
  imageUrl = "https://via.placeholder.com/80",
  onClick,
  sx = {}
}: ClientListCardProps) => {
  return (
    <Card 
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)', // Minimal shadow
        maxWidth: 300,
        maxHeight: 80,
        ...sx
      }}
      onClick={onClick}
    >
      {/* Text content */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '13px' }}
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

