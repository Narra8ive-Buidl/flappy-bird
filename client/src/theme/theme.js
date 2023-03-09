import { Typography } from "@mui/material";
import { createTheme,styled,Box } from "@mui/system";
import '../theme/global.css';

export const theme=createTheme({
    palette:{
        primary:{
        light: '#4f5b62',
        main: '#263238',
        dark: '#000a12',
        contrastText: '#fff',},
        secondary:{
            light: '#ff6f60',
            main: '#fff',
            dark: '#ab000d',
            contrastText: '#000',
        }
    },
    typography:{
        fontFamily:{
         title:'Oswald',
         bodyText:'Raleway',
         smText:''  
        },
        fontSize:{
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.3rem',
            '2x1': '1.5rem',
            '3x1': '1.875rem',
            '4x1': '2.25ren',
            '5x1': '3rem',
            '6x1': '3.75rem',
            '7x1': '4.5rem',
            '8x1': '6rem',
            '9x1': '8rem'
        }

    }


})


export const SBox=styled(Box)(({theme})=> ({
    //Layout styles
 '&.Container':{
    backgroundColor: "#60c4d0",
    minHeight: "10vh",
    minWidth: "20%",
    // display: "flex",
    // flexDirection: "column",
    position: "fixed",
    top: 0, // Position it at the top of the screen
    left: "50%", // Center horizontally
    transform: "translateX(-50%)", // Center horizontally
    right: "10%", // Shift to the right

 }

}));
export const FlexCol=styled(Box)(({theme})=> ({
    
    display:'flex',
    flexDirection:'column',
 '&.Container':{
    backgroundColor: '#120c18',
    minHeight: '100vh',
    minWidth: '100%',
    display:'flex',
    flexDirection:'column',
 }

}));
export const FlexRow=styled(Box)(({theme})=> ({
    
    display:'flex',
    flexDirection:'row',
    //header
 '&.header':{
    backgroundColor: 'transparent',
    width:'100%',
    height:'100%',
    justifyContent:'space-between',
    alignItems:'center'

}
}));

export const MainText=styled(Typography)(({theme})=> ({
    fontFamily:'RobotoC',
    //header
 '&.Head':{
   fontSize:'3rem',
   color:'#fff'
}
}));