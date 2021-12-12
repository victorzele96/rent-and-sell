import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/victorzele96/rent-and-sell">
        Rent-n-Sell
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;