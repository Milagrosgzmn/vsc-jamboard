export const copyText = async(value, setter)=>{
    try {
        await navigator.clipboard.writeText(value);
        setter(true)
        setTimeout(()=>{
            setter(false)
        },1000)
    } catch (error) {
        console.error(error);
    }
}