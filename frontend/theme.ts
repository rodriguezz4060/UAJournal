import {createTheme} from "@material-ui/core";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4683d9'
        }
    },

    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: '8'
            }
        },

        MuiPopover: {},

        MuiButton: {
            root: {
                borderRadius: '8px',
                textTransform: 'inherit',
                fontSize: '16',
                transition: 'none',
                '&:active': {
                    boxShadow: '0 0 0 3px rgba(22, 147, 229, 0.12)',
                    transform: 'translateY(1px)'
                }
            },
            contained: {
                backgroundColor: 'white',
                boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.06)',
                '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.06), 0 2px 4px 0 rgba(0,0,0,0.08);',
                }
            },
            containedPrimary: {
                backgroundColor: '#4683d9',
                '&:hover': {
                    backgroundColor: '#437CCE'
                }
            },
        }
    }
})

