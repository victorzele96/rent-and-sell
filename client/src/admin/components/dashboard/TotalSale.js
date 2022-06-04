import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';

export const TotalSale = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL SALE PROPERTIES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.properties.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SellIcon fontSize='small' />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
