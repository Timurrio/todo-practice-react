import { IconButton } from '@mui/material';

const ToggleAllButton: React.FC<{
  handleFunction: () => void;
  isChecked: boolean;
}> = ({ handleFunction, isChecked }) => {
  return (
    <IconButton
      id="toggleAll"
      onClick={handleFunction}
      disableRipple
      sx={{
        width: '40px',
        padding: '0',
        fontSize: '32px',
        color: isChecked ? 'text.primary' : 'text.disabled',
        transform: 'rotate(90deg)',
        transition: 'transform 0.2s',
        borderRadius: '0px',
        '&:focus': {
          'box-shadow': '0 0 2px 2px rgba(184, 63, 69, 0.85)',
        },
      }}
    >
      ❯
    </IconButton>
  );
};

export default ToggleAllButton;
