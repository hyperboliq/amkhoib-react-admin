import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface Row {
  [key: string]: any;
  id: number | string;
  status?: 'active' | 'inactive' | 'pending';
}

interface DynamicTableProps {
  columns: Column[];
  rows: Row[];
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
}

const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'grey';
    }
  };

  return (
    <Box
      component="span"
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: 1,
        backgroundColor: getColor(),
      }}
    />
  );
};

export const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  onEdit,
  onDelete,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<(number | string)[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number | string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: (number | string)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ backgroundColor: 'transparent' }}>
          <TableHead sx={{ backgroundColor: 'transparent' }}>
            <TableRow sx={{ backgroundColor: 'transparent' }}>
              <TableCell sx={{ backgroundColor: 'transparent' }} padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all' }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  sx={{ backgroundColor: 'transparent' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ backgroundColor: 'transparent' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'transparent' }}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      backgroundColor: 'transparent',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                    }}
                  >
                    <TableCell sx={{ backgroundColor: 'transparent' }} padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell sx={{ backgroundColor: 'transparent' }} key={column.id} align={column.align}>
                          {column.id === 'status' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StatusDot status={value} />
                              <Typography variant="body2">
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </Typography>
                            </Box>
                          ) : column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{ backgroundColor: 'transparent' }} align="right">
                      {onEdit && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row.id);
                          }}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(row.id);
                          }}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ backgroundColor: 'transparent' }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DynamicTable;

