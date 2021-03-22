import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  div:{
    width:40,
    height:40,
    borderRadius:'50%',
    backgroundColor:'#ffffff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    
  }
});
const Logo = (props) => {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <img
      alt="Logo"
      src="/static/logo.png"
      style={{
        width:25,
      }}
      {...props}
    />
    </div>
    
  );
};

export default withStyles(styles)(Logo);
