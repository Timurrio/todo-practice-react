import { Box } from '@mui/material';
import { TableTest } from '../../components/Tables/TableTest/TableTest';
import { TableExpand } from '../../components/Tables/TableExpand/TableExpand';
import AutoExpandTable from '../../components/Tables/AutoExpandTable/AutoExpandTable';

const TablePage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '50vw', maxWidth: '80%', height: '80vh', padding: 0 }}>
        {/* <TableTest /> */}
        {/* <TableExpand /> */}
        <AutoExpandTable />
      </Box>
    </Box>
  );
};

export default TablePage;
