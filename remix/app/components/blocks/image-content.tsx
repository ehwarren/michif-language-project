import { pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent } from "~/utils/queries/page/__generated__/pageBySlugQuery";
import ResponsiveImage, { Image } from "../image";
import { motion } from "framer-motion";

const ImageContent = ({ data }: { data: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent }) => {
    return (
        <motion.div
            className={`flex flex-col-reverse ${data.Reverse ? "sm:flex-row" : "sm:flex-row-reverse"} my-10 border-2 rounded-lg bg-primary-700 text-white`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{bounce: false, duration: 0.2}}
        >
            <div className="mx-10 my-10 flex-1">
                <h3>{data.Heading}</h3>
                <p className="self-center">{data.Content}</p>
            </div>
            <div className="aspect-square sm:w-[30%]">
                <ResponsiveImage
                    image={data?.Image?.data?.attributes as Image}
                    className="object-cover w-full h-full"
                    /** If you want to get an ideal sizes string for the image in your layout, you can use https://ausi.github.io/respimagelint/ */
                    sizes="(min-width: 1540px) 459px, (min-width: 1280px) 383px, (min-width: 1040px) 306px, (min-width: 780px) 229px, (min-width: 640px) 191px, 100vw"
                />
            </div>
        </motion.div>
    );
};

export default ImageContent;
