import React, { ReactNode } from 'react';
import { Box, Tab as MuiTab, Tabs as MuiTabs, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface TabBarProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: ReactNode;
}

// Styled components (unchanged)
const StyledTabs = styled(MuiTabs)({
  minHeight: '10px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },
});

const StyledTab = styled(MuiTab)(({ theme }) => ({
  minHeight: '5px',
  padding: '5px 16px',
  borderRadius: '20px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#165685',
  backgroundColor: '#deeaf6',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: '#f5f9fa',
    border: '2px solid #b6d2e7',
  },
  '&.MuiTab-root': {
    minWidth: 'auto',
  },
}));

const CheckIconWrapper = styled('span')({
  display: 'inline-flex',
  marginRight: '4px',
  alignItems: 'center',
});

export const TabBar = ({ value, onChange, children }: TabBarProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <StyledTabs value={value} onChange={onChange} aria-label="client type tabs">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <StyledTab
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {value === index && (
                      <CheckIconWrapper>
                        <CheckIcon sx={{ fontSize: 18 }} />
                      </CheckIconWrapper>
                    )}
                    {child.props.label}
                  </Box>
                }
              />
            );
          }
          return null;
        })}
      </StyledTabs>
    </Box>
  );
};

