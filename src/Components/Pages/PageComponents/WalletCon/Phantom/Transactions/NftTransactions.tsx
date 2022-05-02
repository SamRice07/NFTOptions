import React, {FC, useState} from 'react'
import {actions} from '@metaplex/js'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomProvider } from '../Connection/Phantom';
import './Transactions.scss'
import axios from 'axios'
import Error from '../../../../../Misc/Error'
const pinataSDK = require('@pinata/sdk');

interface NftTransfer {
    provider: PhantomProvider;
}

const NftTransactions: FC<NftTransfer> = (props) => {

  var apiKey = ''
  var secretKey = ''
  var hash = ''
  const [tried, setTried] = useState(false)
  var nft = {
      "description": "test", //change to dynamic
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYBUaSlzxtH2ZKQQabzQm4lZRUAD2deSnOA&usqp=CAU", //change to dynamic
      "name": "testies",//change to dynamic
      "properties": {"category": "image", "creators": [{"address": props.provider.publicKey.toString(), "verified": true, "share": 100}], "files": [{"type": "image", "uri": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYBUaSlzxtH2ZKQQabzQm4lZRUAD2deSnOA&usqp=CAU" }]},//change to dynamic
      "seller_fee_basis_points": 100,
      "symbol": "tst",//change to dynamic
      "collection": {"family": "small testy", "name": "small testy"}, //change to dynamic,
    }
  

  var pinOpt = {
    "pinataMetadata": {
      "name": "Chomb" //make dynamic
    },
  }
  async function generateApiKey(pinataApiKey:string, pinataSecretApiKey:string) {
    const url = `https://api.pinata.cloud/users/generateApiKey`;
    const body = {
        keyName: 'Example Key',
        permissions: {
          admin: true
        }
    };
    await axios
        .post(url, body, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(async function (response: any) {
            apiKey = await response.data.pinata_api_key
            secretKey = await response.data.pinata_api_secret
            console.log(apiKey)

        })
        .catch(async function (error: any) {

        });
};

   async function pinJson(options: object, JSONBody: object){
    const pinata = pinataSDK(apiKey, secretKey);
    await pinata.pinJSONToIPFS(JSONBody, options).then(async (result: any) => {
      console.log(result);
      hash = await result.IpfsHash
      console.log(hash)
      }).catch(async (err: any) => {

      });
  }
  async function createNftData(){

    await generateApiKey('bfb48819291dbc662a76', '5b39f9ae4d8561c8e8bccbdc7f43e1df4fc5ab535a8277ee14cebe5e82136d12') //make more secure
    await pinJson(pinOpt, nft)
  }

  async function createNft(){
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      await createNftData()
      await actions.mintNFT({connection: connection, wallet: props.provider, uri: `https://gateway.pinata.cloud/ipfs/${hash}`, maxSupply: 1})
  }


  return (
    <button onClick={createNft} className="transactButton">Chunkies</button>
  )
}

export default NftTransactions