import { rootQuery_footer } from "~/utils/queries/rootQuery/__generated__/rootQuery";
import ResponsiveImage from "./image";

const Footer: React.FC<{ data: rootQuery_footer }> = ({ data }) => {
    return (
        <footer className="bg-gradient-to-br from-secondary-800 to-secondary-900 text-white pt-32 text-center relative z-10">
            <div className="container mx-auto">
                <h2 className="mb-8">{data.data?.attributes?.Heading}</h2>
                <div className="flex flex-wrap justify-center gap-4 opacity-60 mb-6">
                    {data.data?.attributes?.Phone && <a href={`tel:${data.data.attributes.Phone}`}>{data.data.attributes.Phone}</a>}
                    {data.data?.attributes?.Email && <a href={`mailto:${data.data.attributes.Email}`}>{data.data.attributes.Email}</a>}
                </div>
                {data.data?.attributes?.Address && (
                    <p dangerouslySetInnerHTML={{ __html: data.data.attributes.Address.replace(/(?:\r\n|\r|\n)/g, "<br />") }} />
                )}
                <div className="my-8 max-w-prose mx-auto acknowledement" dangerouslySetInnerHTML={{ __html: data.data?.attributes?.Acknowledement || "" }} />
            </div>
            <p className="mt-32 py-4">© {new Date().getFullYear()} Bluegrove Technologies Ltd.</p>
        </footer>
    );
};

export default Footer;
