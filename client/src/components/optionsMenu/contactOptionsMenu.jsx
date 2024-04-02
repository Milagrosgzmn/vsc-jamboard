/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "../../redux/actions/userActions";
export default function ContactOptionsMenu({contact}) {
    const dispatch = useDispatch();
    const {id} = useSelector(state=>{
        return state.user;
    });

    return(
        <article className=' absolute left-full top-0 bg-neutral-900 text-white w-32 h-max rounded-2xl hover:bg-neutral-700'>
                <ul className='py-2 font-medium text-xs'>
                    <li className='w-full px-4 py-2 hover:text-red-600 cursor-pointer'
                        onClick={()=>{
                            dispatch(removeContact(id, contact.id))
                        }}
                    >Eliminar contacto</li>
                </ul>

        </article>
    )
}