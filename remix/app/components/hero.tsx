import type { Image } from "./image";
import ResponsiveImage from "./image";

const Hero = ({ image, title, subtitle, preload }: { image: Image; title: string; subtitle?: string; preload?: boolean }) => {
    return (
        <div className="relative w-full h-[60vh] flex content-center items-center text-center bg-black/30">
            <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
                <ResponsiveImage image={image} className="object-cover w-full h-full" fullWidth preload={preload}/>
            </div>
            <div className="container mx-auto">
                <h2 className="text-neutral-200">{title}</h2>
                {subtitle ? <p className="text-neutral-200">{subtitle}</p> : null}
            </div>
        </div>
    );
};

export default Hero;
