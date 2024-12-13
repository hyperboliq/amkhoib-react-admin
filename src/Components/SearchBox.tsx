import { useState } from 'react'
import { 
    TextField, 
    InputAdornment,
    Box
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useTranslate } from 'react-admin'

interface SearchBoxProps {
    onSearch?: (query: string) => void
    placeholder?: string
    fullWidth?: boolean
}

export const SearchBox = ({ 
    onSearch, 
    placeholder,
    fullWidth = false 
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
        <Box sx={{ width: fullWidth ? '100%' : 240 }}>
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
                        '& fieldset': {
                            borderColor: 'transparent',
                            '&:hover': {
                                borderColor: 'transparent',
                            }
                        },
                        '&:hover': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            }
                        },
                        borderRadius: 3,
                    }
                }}
            />
        </Box>
    )
}

