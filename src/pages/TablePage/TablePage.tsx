import { Box } from '@mui/material';
import { TableTest } from '../../components/Tables/TableTest/TableTest';
import { TableExpand } from '../../components/Tables/TableExpand/TableExpand';

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
      <Box
        sx={{ width: '700px', maxWidth: '80%', height: '500px', padding: 0 }}
      >
        {/* <TableTest /> */}
        <TableExpand />
      </Box>
    </Box>
  );
};

export default TablePage;
