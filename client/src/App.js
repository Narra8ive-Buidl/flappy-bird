import styled from "styled-components";
import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Layout } from './components/Layout';

// My additions
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Program, AnchorProvider, BN, web3 } from '@project-serum/anchor'
import idl from './utils/idl.json'
import * as token from '@solana/spl-token'

const wallets = [ new PhantomWalletAdapter(), new SolflareWalletAdapter()]
const programId = new PublicKey("E3KnktUoT56BnmmMRemi4yV3LLxtpEf5CaKYHBXtTeks")
const network = clusterApiUrl('devnet')


const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 1000;
const WALL_WIDTH = 1000;
const GRAVITY = 10;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 10;
const OBJ_GAP = 200;
function App() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);


  const getProvider = () => {
    const network = clusterApiUrl('devnet')
    const connection = new Connection(network, 'processed')
    const provider = new AnchorProvider(connection, wallet, 'processed')
    return provider
  }

  //my additions
  const wallet = useWallet()

  /*const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!");

        // check if a user has given us permission to use their wallet on our site — this is sorta like checking if our user is "logged in"
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  /*const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };*/
 
  /*const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );*/

  /*
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);*/
  const mintReward = async (amount) => {
    try {
      const provider = getProvider()
      const program = new Program(idl, programId, provider)
      const secretKey = Uint8Array.from([178,181,67,56,71,65,160,78,55,92,246,62,119,29,245,107,61,38,32,245,9,140,222,236,152,68,177,57,235,88,241,57,253,62,232,67,22,3,121,186,102,151,165,52,30,231,187,245,39,119,97,249,223,84,195,165,93,253,17,55,48,123,251,209])
      const mintAuth = web3.Keypair.fromSecretKey(secretKey, { skipValidation: true })
      const rewardMint = new PublicKey('BkG1tcC535nGSwaTY3RwvzdMwiVh8VTXmh7KQ189Jjye')
      const tokenAccount = token.getAssociatedTokenAddressSync(rewardMint, wallet.publicKey)
      await program.methods.mintReward(new BN(amount))
                           .accounts({
                              mintAuth: mintAuth.publicKey,
                              user: wallet.publicKey,
                              rewardMint,
                              tokenAccount
                           }).signers([mintAuth]).rpc()  
    } catch (err) {
      alert(err)
    }


  }

  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
      setBirspos(300);
      //setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);
  const handler = async () => {
    if (!isStart) {
      if (score>0) {
        await mintReward(score * 100)
      }
      setScore(0)
      setIsStart(true);
    }
    else if (birdpos < BIRD_HEIGHT) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 50);
    console.log(walletAddress)
  };
  return (
    <Fragment>
      {
      !wallet.connected &&
        (<div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
          <WalletMultiButton />
        </div>)
      }
      {
        wallet.connected &&
        <Home onClick={handler}>
        <span>Score: {score}</span>
        <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
          {!isStart ? <Startboard>Click To Start</Startboard> : null}
          <Obj
            height={objHeight}
            width={OBJ_WIDTH}
            left={objPos}
            top={0}
            deg={180}
          />
          <Bird
            height={BIRD_HEIGHT}
            width={BIRD_WIDTH}
            top={birdpos}
            left={100}
          />
          <Obj
            height={WALL_HEIGHT - OBJ_GAP - objHeight}
            width={OBJ_WIDTH}
            left={objPos}
            top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
            deg={0}
          />
  
        <Layout walletAddress={window.solana}></Layout>
        {/* {walletAddress && <Layout walletAddress={window.solana} > </Layout>} */}
  
        </Background>
      </Home>
      }
    </Fragment>
    
    
  );
}


const AppWithProvider = () => {
  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default AppWithProvider;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div`
  background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("./images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("./images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;
`;
