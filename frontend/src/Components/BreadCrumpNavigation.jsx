import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';  

const BreadcrumbNavigation = () => {
  const location = useLocation(); 
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbLinks = pathnames.map((path, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return (
      <Link
        key={to}
        underline="hover"
        color="inherit"
        href={to}
      >
        {path}
      </Link>
    );
  });

  return (
    <div role="presentation"  >
      <Breadcrumbs aria-label="breadcrumb" style={{marginTop:"30px", marginLeft:"30px"}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {breadcrumbLinks} 
        <Typography color="text.primary">
            
        </Typography>
        {/* <Typography color="text.primary">
           
          {pathnames[pathnames.length - 1]} 
        </Typography> */}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbNavigation;
