import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useEffect, useState } from 'react';

export const TotalReports = (props) => {
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    props.reports.map(report => setTotalReports(prevState => prevState + report.length));
  }, [props.reports]);

  return (
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
              TOTAL REPORTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {totalReports}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <ReportIcon fontSize='small' />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};