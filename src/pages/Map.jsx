import { useEffect, useRef, useState } from "react"

export function Map() {
    const ref = useRef(null);
    const [img, setImg] = useState(null)

    useEffect(() => {
        const image = new Image();
        image.src = '/division_2_map.avif'
        image.onload = () => {
            setImg(image);
        }
    }, [])

    useEffect(() => {
        if(!img){
            return;
        }

        const canvas = ref.current;
        const context = canvas.getContext('2d');

        const render = () => {
            const containerWidth = window.innerWidth * 0.95;
            const aspectRatio = img.width / img.height;

            canvas.width = containerWidth;
            canvas.height = containerWidth / aspectRatio;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
        }

        render();
        window.addEventListener("resize", render);
    }, [img])
    return(
        <>
            <canvas ref={ref} id="dcCanvas" style={{maxWidth: "100%", height: "auto"}}></canvas>
        </>
    )
}