import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class SearchLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='SearchLayout'>
        <Grid container spacing={3} className="layout-container">
          <Grid container xs={3} className="filter-column">Column</Grid>
          <Grid container spacing={3} xs={9} className="layout-container">
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={3}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper variant="outlined" elevation={6}>
                <div className="test-height">Test</div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default SearchLayout;
