import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function({ handleClick }) {
  return (
    <IconButton style={{width: 'min-content'}} onClick={handleClick || (() => undefined) } color="primary">
      <CloseIcon />
    </IconButton>
  );
}