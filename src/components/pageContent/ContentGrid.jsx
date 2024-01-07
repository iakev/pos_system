import React from "react";
import LinearIndeterminate from "../loadingComponents/linearProgress/LinearIndeterminate";
import Grid from '@mui/material/Unstable_Grid2';
// import Grid from '@mui/material/Grid';

const ContentGrid = ({ content, ...props }) => {
  const { isLoading, sections } = content;

  return (
    <>
      {isLoading ? (
        <LinearIndeterminate />
      ) : (
        <Grid container
          sx={{
            padding: '20px',
          }}
          spacing={2.5}
          direction="row"
          justifyItems="center"
          alignItems="stretch"
        >
          {sections.map((section) => {
            return (
              <Grid xs={6}
                key={section.component.name}
              >
                {section.component && (
                  <section.component
                    {...section.componentProps}
                    key={section.componentProps.uuid}
                  />
                )}
              </Grid>
            )
          })
          }
        </Grid >
      )}
    </>
  )
};

export default ContentGrid;