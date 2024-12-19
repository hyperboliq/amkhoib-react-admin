import { useState } from 'react'
import { 
    TextField, 
    InputAdornment,
    Box,
    SxProps, // Import SxProps
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useTranslate } from 'react-admin'

interface SearchBoxProps {
    onSearch?: (query: string) => void
    placeholder?: string
    fullWidth?: boolean
    sx?: SxProps // Add sx prop
}

export const SearchBox = ({ 
    onSearch, 
    placeholder,
    fullWidth = false,
    sx, // Destructure sx
}: SearchBoxProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const translate = useTranslate()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setSearchQuery(query)
        if (onSearch) {
            onSearch(query)
        }
    }

    return (
        <Box sx={{ width: fullWidth ? '100%' : 240, ...sx }}> {/* Apply sx prop */}
            <TextField
                value={searchQuery}
                onChange={handleSearch}
                placeholder={placeholder || translate('ra.action.search')}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon sx={{ color: 'action.active' }} />
                        </InputAdornment>
                    ),
                    sx: {
                        backgroundColor: '#e8eff9',
                        borderRadius: 3,
                        '& fieldset': {
                            borderColor: 'transparent', // No border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', // No border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent', // No border color on focus
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent', // Ensures full transparency
                        },
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', // Remove default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', // Remove hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent', // Remove focus border color
                        },
                    },
                }}
            />
        </Box>
    )
}