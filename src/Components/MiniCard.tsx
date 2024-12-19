import { Card, Typography, Box } from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';

interface MiniCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  onClick?: () => void; // Add onClick prop
}

export const MiniCard = ({ 
  title = "Clients", 
  value = 2678,
  icon = <DescriptionIcon />,
  onClick // Destructure onClick
}: MiniCardProps) => {
  return (
    <Card 
      onClick={onClick} // Use onClick here
      sx={{
        padding: 2,
        borderRadius: 4,
        maxWidth: 200,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'space-between',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)', // Minimal shadow
        cursor: onClick ? 'pointer' : 'default', // Change cursor if clickable
      }}
    >
      {/* Top-left icon */}
      <Box
        sx={{
          color: 'primary.main',
          position: 'absolute',
          top: 16,
          left: 16,
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }}
      >
        {icon}
      </Box>

      {/* Bottom-right content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          textAlign: 'right',
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            lineHeight: 1
          }}
        >
          {value.toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
};