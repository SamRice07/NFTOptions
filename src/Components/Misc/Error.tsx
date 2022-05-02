import {FC} from 'react'
import '../Pages/PageComponents/WalletCon/Phantom/Connection/Phantom.scss'

const Error: FC = () => {



    return (
        <div>
       <div>
        <div className='wrapper'>
          <div className='popup'>
            <h1 className='failText'>An Error Has Occured Please Reload!</h1>
          </div>
          <div className='screen'/>
        </div>
        </div>
        </div>
    );
}

export default Error