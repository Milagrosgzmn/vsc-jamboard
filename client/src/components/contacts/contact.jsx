/* eslint-disable react/prop-types */

export default function Contact({contact}) {
    return (
        <article className="flex flex-row w-56 h-20 rounded-full border-2 items-center justify-evenly mx-2">
            <div className=" bg-red-500 rounded-full w-16 h-16">
                <img src="" alt="" />
            </div>
            <h3>{contact.username}</h3>
        </article>
    )
}