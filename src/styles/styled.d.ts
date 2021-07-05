import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        
        colors: {
            button: string,
            buttonHover: string,
            colorButton: string,
            blocosInput: {
                background: string
            },    
            background: string,
            text: string,
        },
    
        copyCode: {
            background: string,
            borderColor: string,
            colorText: string,
    
            div: {
                background: string,
                color: string
            },
    
            hover: {
                background: string,
            }
        },
    
        sideBar: {
            background: string,
            colorText: string,
    
            hover: {
                background: string,
                colorText: string
            }
        },

        toast: {
            background: string,
            borderColor: string,
            icon: {
                cor1: string,
                cor2: string,
            },
            textColor: string
        },

        home: {
            aside: {
                background: string,
                textColor: string
            },           
            main: {
                input: {
                    background: string,
                    placeholder: string,
                    color: string,     
                    borderColor: string            
                }
            }
        },

        newRoom: {
            aside: {
                background: string,
                textColor: string
            },
            
            main: {
                input: {
                    background: string,
                    placeholder: string,
                    color: string, 
                    borderColor: string           
                },

                p: {
                    color: string,
                    corDestque: string,
                    corDestqueHover: string
                }
            }
        },
        modal: {
            background: string,
            h2: string,
            p: string,
            svg: string,
            button: {
                button1: {
                    color: string,
                    background: string,
                    backgroundHover: string
                },
                button2: {
                    color: string,
                    background: string,
                    backgroundHover: string
                }
            }
        }
    };
}