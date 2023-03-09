import * as React from 'react';
import { ThemeProvider } from '@emotion/react';
import { SBox } from '../theme/theme';
import  Header from './Header';


export const Layout=({ walletAddress })=>{
  console.log("address",walletAddress)
    return(
  <SBox className='Container'>
  <Header/>
  </SBox>
    )
}

