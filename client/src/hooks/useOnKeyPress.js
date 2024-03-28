import {useEffect} from 'react';

export const useOnKeyPress = (callback, targetKey, bool)=>{

    useEffect(()=>{
        const keyPressHandler = (event)=>{
            if (event.key === targetKey) {
                callback();
            }
        }
        if(bool){
        window.addEventListener('keydown', keyPressHandler);
        }
        const emptyHandler = ()=>{};
        const cleanup = bool ? () => {
            window.removeEventListener('keydown', keyPressHandler);
        } : emptyHandler;
        
        return cleanup;

    },[callback, targetKey, bool]);
};
