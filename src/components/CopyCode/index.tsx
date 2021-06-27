import { BiCopy } from 'react-icons/bi';
import { Container } from './styles';

import toast, { Toaster } from 'react-hot-toast';

type RoomCodeProps = {
    code: string;
}

export function CopyRoomCode (props: RoomCodeProps) {

    const notify = () => toast.success('Codigo da sala copiado com sucesso',
    {
        style: {
          border: '1px solid #835afd',
          padding: '16px',
          color: '#835afd',
        },
        iconTheme: {
          primary: '#835afd',
          secondary: '#fff',
        }
    });

    function copyRoomCodeToClipeBoard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <>
            <Container onClick={copyRoomCodeToClipeBoard}>
                
                <div>
                    <BiCopy size={25} onClick={notify}/>
                </div>
                <span>{props.code}</span>
            </Container>
            <Toaster/>
        </>
    )
}