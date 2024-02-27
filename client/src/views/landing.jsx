import landing from '../assets/images/landing.jpg';

export default function Landing() {
    return(
        <>
            <section className="pt-16 bg-cover bg-center w-screen h-screen" style={{ backgroundImage: `url(${landing})`}}>
                <div className='bg-black/[0.8] w-1/2 h-full flex items-center justify-center'>
                    <h2 className='text-white  font-bold text-4xl px-4 m-2'>Codeá en tiempo real y olvidate de compartir pantalla.
                    </h2>
                </div>
                
            </section>

        </>
    )
}