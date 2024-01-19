/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ProtectedVIew({element}) {

    const navigate = useNavigate();

    const isAuth = useSelector(state=>{
        return state.user.id;
    })

    useEffect(()=>{
        if(!isAuth){
            navigate('/log-in')
        }
    },[isAuth])

    return (
        isAuth && element
    )
}