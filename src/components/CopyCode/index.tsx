import { BiCopy } from 'react-icons/bi';
import { Container } from './styles';

import { useTheme } from '../../hooks/useTheme';

import toast, { Toaster } from 'react-hot-toast';

type RoomCodeProps = {
    code: string;
}



export function CopyRoomCode (props: RoomCodeProps) {

    const { theme } = useTheme();

    const notify = () => toast.success('Codigo da sala copiado com sucesso',
    {
        style: {
          border: `1px solid ${theme.toast.borderColor}`,
          padding: '16px',
          color: `${theme.toast.textColor}`,
          background: `${theme.toast.background}`,
        },
        iconTheme: {
          primary: `${theme.toast.icon.cor1}`,
          secondary: `${theme.toast.icon.cor2}`,
        }

        //${theme.sideBar.background}
        //${theme.colors.background}

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