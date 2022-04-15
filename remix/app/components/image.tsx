import { LazyLoadImage } from "react-lazy-load-image-component";

export type Image = {
    formats?: ImageFormats;
    url: string;
    alternativeText: string | null;
    width: number | null;
};

type ImageFormats = {
    widescreen?: ImageFormat;
    hd?: ImageFormat;
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
};

type ImageFormat = {
    ext: string;
    url: string;
    hash: string;
    name: string;
    path?: string;
    size: number;
    width: number;
    height: number;
};

const ResponsiveImage = ({ image, className, fullWidth, sizes, preload }: { image: Image; className?: string; fullWidth?: boolean; sizes?: string, preload?: boolean }) => {
    const { formats, url, alternativeText } = image;

    const getSrcSet = () => {
        let srcSet = "";
        srcSet += formats?.small ? formats.small.url + " " + formats.small.width + "w, " : "";
        srcSet += formats?.medium ? formats.medium.url + " " + formats.medium.width + "w, " : "";
        srcSet += formats?.large ? formats.large.url + " " + formats.large.width + "w, " : "";
        srcSet += formats?.hd ? formats.hd.url + " " + formats.hd.width + "w, " : "";
        srcSet += formats?.widescreen ? formats.widescreen.url + " " + formats.widescreen.width + "w, " : "";
        srcSet += url + " " + image.width + "w";
        return srcSet;
    };

    const getSizes = () => {
        let s = fullWidth ? "100vw" : sizes || "(min-width: 1000px) 1000px, (min-width: 700px) 700px, 100vw";
        return s;
    };

    return (
        <LazyLoadImage
            alt={alternativeText || ""}
            src={formats?.small?.url || url} // use normal <img> attributes as props
            srcSet={getSrcSet()}
            className={className || ""}
            sizes={getSizes()}
            visibleByDefault={preload}
        />
    );
};

export default ResponsiveImage;
