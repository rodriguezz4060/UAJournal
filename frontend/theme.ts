import { createTheme } from "@material-ui/core";

export const theme = createTheme ({
  overrides: {
    MuiButton: {
        contained: {
            backgroundColor: 'white',
            boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.06)',
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.06), 0 2px 4px 0 rgba(0,0,0,0.08);',
            }
        }
    }
  }  
})

