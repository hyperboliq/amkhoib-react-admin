import { Button, Typography, styled } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

interface PopupButtonProps {
    onClick?: () => void
    text?: string
    disabled?: boolean
    fullWidth?: boolean
}

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 12,
    padding: theme.spacing(2, 3),
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: theme.palette.grey[50],
        boxShadow: 'none',
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1),
        fontSize: 24,
    },
}))

export const PopupButton = ({ 
    onClick, 
    text = "New Project", 
    disabled = false,
    fullWidth = false 
}: PopupButtonProps) => {
    return (
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            fullWidth={fullWidth}
            startIcon={<AddIcon />}
        >
            <Typography
                variant="body1"
                color="primary"
                sx={{
                    fontWeight: 500,
                    fontSize: '1rem',
                }}
            >
                {text}
            </Typography>
        </StyledButton>
    )
}

