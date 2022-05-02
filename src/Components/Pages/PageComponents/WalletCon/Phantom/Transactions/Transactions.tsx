
import { clusterApiUrl, Connection, PublicKey, RpcResponseAndContext, SignatureResult, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useEffect, useRef, useState } from 'react';
import { PhantomProvider } from '../Connection/Phantom';
import './Transactions.scss'

interface ITransferSolProps {
    provider: PhantomProvider;
    transactionAmount: number | 0
}

const network = "devnet";

const defaultAddy = 'EaNZ33y1sejkaJLSSWNys8y2AhXfoLgEpNpSNtGfdRqS';

const TransferSol: FC<ITransferSolProps> = (props) => {

    // Create a connection to blockchain and
    // make it persistent across renders
    const connection = useRef(new Connection(clusterApiUrl(network)));

    const [ lamports, setLamports ] = useState(10000);
    const [ txid, setTxid ] = useState<string | null>(null);
    const [ slot, setSlot ] = useState<number | null>(null);
    const [ myBalance, setMyBalance ] = useState(0);
    const [ rxBalance, setRxBalance ] = useState(0);

    // Get the balance the first time the component is mounted
    useEffect( () => {
        connection.current.getBalance(props.provider.publicKey).then(setMyBalance);
    }, [props.provider.publicKey]);

    useEffect( () => {
        connection.current.getBalance(new PublicKey(defaultAddy)).then(setRxBalance);
    }, [defaultAddy]);


    const handleSubmit = async () => {

        // Create a TX object
        let transaction = new Transaction({
            feePayer: props.provider.publicKey,
            recentBlockhash: (await connection.current.getRecentBlockhash()).blockhash
        });

        // Add instructions to the tx
        transaction.add(
            SystemProgram.transfer({
            fromPubkey: props.provider.publicKey,
            toPubkey: new PublicKey(defaultAddy),
            lamports: props.transactionAmount * LAMPORTS_PER_SOL,
            })
        );
        
        // Get the TX signed by the wallet (signature stored in-situ)
        await props.provider.signTransaction(transaction);

        // Send the TX to the network
        connection.current.sendRawTransaction(transaction.serialize())
        .then(id => {
            console.log(`Transaction ID: ${id}`);
            setTxid(id);
            connection.current.confirmTransaction(id)
            .then((confirmation: RpcResponseAndContext<SignatureResult>) => {
                console.log(`Confirmation slot: ${confirmation.context.slot}`);
                setSlot(confirmation.context.slot);
                connection.current.getBalance(props.provider.publicKey).then(setMyBalance);
                connection.current.getBalance(new PublicKey(defaultAddy)).then(setRxBalance);
            });

        })
        .catch(console.error);

    }


    return (
      <button onClick={handleSubmit} className="transactButton">Monkeys</button>
    );

}


export default TransferSol;