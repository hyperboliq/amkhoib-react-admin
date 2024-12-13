import { Button, Box, styled } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

interface AddButtonProps {
    onClick?: () => void
    disabled?: boolean
}

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: 'unset',
    width: 50,
    height: 45,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 12,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: 'white',
    }
}))

export const AddButton = ({ onClick, disabled = false }: AddButtonProps) => {
    return (
        <Box sx={{ display: 'inline-block' }}>
            <StyledButton
                variant="contained"
                onClick={onClick}
                disabled={disabled}
            >
                <AddIcon />
            </StyledButton>
        </Box>
    )
}

