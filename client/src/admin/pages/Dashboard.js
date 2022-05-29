import { useState, useCallback, useEffect } from 'react';

import { useHttpClient } from "../../shared/hooks/http-hook";

import { Box, Container, Grid } from '@mui/material';
import { TotalRent } from '../components/dashboard/TotalRent';
import { TotalSale } from '../components/dashboard/TotalSale';
import { TotalReports } from '../components/dashboard/TotalReports';
import { ReportsChart } from '../components/dashboard/ReportsChart';
import { TotalUsers } from '../components/dashboard/TotalUsers';
import { TrafficByDevice } from '../components/dashboard/TrafficByDevice';
import { DashboardLayout } from '../components/DashboardLayout';
import CircularProgressModal from '../../shared/components/UIElements/CircularProgressModal';

const Dashboard = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loadedProperties, setLoadedProperties] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const loadElements = useCallback(async (path) => {
    let url = process.env.REACT_APP_BACK_URL + `/${path}`;

    try {
      const responseData = await sendRequest(url);
      let data;
      let data_arr = [];
      let flag = false;
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(responseData)) {
        if (Array.isArray(value)) {
          data = value;
          flag = true;
        } else {
          if (value?.length > 1) {
            value.map(item => data_arr.push(item));
          } else {
            data_arr.push(value);
          }
        }
      }
      if (path === 'users') setLoadedUsers(prevState => prevState.concat(flag ? data : data_arr));
      if (path === 'properties') setLoadedProperties(prevState => prevState.concat(flag ? data : data_arr));
    } catch (err) {
      console.log(err.message);
    }
  }, [sendRequest]);

  const filterProperty = (listing_status) => {
    return loadedProperties.filter(property => property.details.listing_status === listing_status);
  };

  useEffect(() => {
    loadElements('users')
    loadElements('properties');
  }, [loadElements]);
  return (
    <>
      {isLoading && <CircularProgressModal />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: "50px"
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalUsers users={loadedUsers} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalRent properties={filterProperty('rent')} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalSale properties={filterProperty('sale')} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalReports reports={loadedProperties.map(property => property.reports)} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <ReportsChart />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
