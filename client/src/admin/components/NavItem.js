import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { onClick, href, icon, title, ...others } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Button
        component={Link}
        startIcon={icon}
        disableRipple
        onClick={onClick}
        to={href}
        sx={{
          borderRadius: 1,
          color: 'neutral.400',
          fontWeight: 'fontWeightBold',
          justifyContent: 'flex-start',
          px: 3,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '& .MuiButton-startIcon': {
            color: 'neutral.400'
          },
          '&:hover': {
            backgroundColor: 'rgba(0,0,0, 0.08)'
          }
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {title}
        </Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
