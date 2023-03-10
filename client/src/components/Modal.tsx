import React, {FC} from 'react'

type Props = {
    msg: string
}

const Modal: FC<Props> = ({msg}) => {
 
     return (
        <div className="modal"><h2>{msg}</h2></div>
         
     );
 };
 
 export default Modal;