import { PublicKey, Transaction } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import SolTransactions from '../Transactions/Transactions';
import Error from  '../../../../../Misc/Error';
import NftTransactions from '../Transactions/NftTransactions' 
import './Phantom.scss'

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

export interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
    publicKey: PublicKey;
    signTransaction(tx: Transaction): Promise<Transaction>
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>
}

type WindowWithSolana = Window & { 
    solana?: PhantomProvider;
}

interface phantomProps {
  showTransact: boolean;
  showMint: boolean;
  transactionAmount: number;
  //all the following must have px after the value
  transactTop?: string;
  transactLeft?: string;
  mintTop?: string;
  mintLeft?: string;
}



const Phantom: FC<phantomProps> = (props) => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);
    const [btnText, setBtnText] = useState('Connect Wallet')
    const [id, setId] = useState('')
    const [pressed, setPressed] = useState(false)
    const [pubKey, setPubKey] = useState('')
    const [copied, setCopied] = useState('Copy Address')


    
    useEffect( ()=>{
        if ("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                setWalletAvail(true);
                // Attemp an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true });
                solWindow.solana.connect({onlyIfTrusted: false})
            }
        }
    }, []);

    useEffect( () => {
        provider?.on("connect", (publicKey: PublicKey)=>{ 
            console.log(`connect event: ${publicKey}`);
            setConnected(true); 
            const pubString = publicKey.toString()
            const pubFirst = pubString.substring(0, 4)
            const pubLast = pubString.substring(pubString.length - (pubString.length - (pubString.length - 4)), pubString.length )
            setBtnText(pubFirst.concat('...', pubLast))
            setPubKey(pubString)
            setCopied('Copy Address')
        });
        provider?.on("disconnect", ()=>{ 
            console.log("disconnect event");
            setConnected(false); 
            setBtnText('Connect Wallet')
            setCopied('Copy Address')
        });
    }, [provider]);

    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`);
        provider?.connect()
        .catch((err) => { console.error("connect ERROR:", err); });
    }

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("disconnect handler");
        provider?.disconnect()
        .catch((err) => {console.error("disconnect ERROR:", err); });
    }

    function openDropdown() {
      if (pressed == false)
      {
        setId('dropdown-content-clicked')
        setPressed(true)

      }
      else{
        setId('')
        setPressed(false)
      }
    }

    function divDropdown(){
      if (pressed == true){
        setId('')
        console.log('clicked!')
        setPressed(false)
      }
    }

    function copyAddy(){
      navigator.clipboard.writeText(pubKey)
      setCopied('Copied')
    }

    return (
        <div onClick={divDropdown} className = 'overlay'>
            { walletAvail ?
                <>
                {connected? 
                <div>
                        <div className="sec-center" style={{top:'30px', left:'1800px', position:'fixed'}}> 	
                          <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                          <label className="for-dropdown" htmlFor="dropdown">{btnText} <i className="uil uil-arrow-down"></i></label>
                          <div className="section-dropdown"> 
                            <button className="DropBtn" onClick={disconnectHandler} id="btn">Disconnect<i className="uil uil-arrow-right"></i></button>
                            <button className="DropBtn" onClick={copyAddy} id="btn">{copied} <i className="uil uil-arrow-right"></i></button>
                            <button className="DropBtn" onClick={connectHandler} id="btn">Connect<i className="uil uil-arrow-right"></i></button>
                          </div>
                        </div>
                      </div>
                : 

                <button onClick={connectHandler} className="Connect">{btnText}</button>}

                { connected && provider && props.showTransact ? 
                <div style={{top: props.transactTop, position:'fixed', left: props.transactLeft}}>
                  <SolTransactions provider={provider} transactionAmount = {props.transactionAmount}/>
                </div>
                : 
                null }

                { connected && provider && props.showMint ? 
                  <div style={{top:props.mintTop, position:'fixed', left:props.mintLeft}}>
                    <NftTransactions provider={provider} />
                  </div>

                  :

                  null
                }
                </>
            :
                <>  
                  <Error />
                </>
            }
        </div>
    );
}

Phantom.defaultProps = {
  transactionAmount: 0,
  transactTop: '0px',
  transactLeft: '0px',
  mintLeft: '0px',
  mintTop: '0px'

}

export default Phantom;