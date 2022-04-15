import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData, useMatches, useParams } from "@remix-run/react";
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import FourOhHour from "~/components/404";
import ImageContent from "~/components/blocks/image-content";
import TextBlock from "~/components/blocks/text-block";
import Form from "~/components/form";
import Hero from "~/components/hero";
import { PageBySlugQuery } from "~/utils/queries/page";
import {
    pageBySlugQuery,
    pageBySlugQueryVariables,
    pageBySlugQuery_pageBySlug_data_attributes,
    pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksTextBlock,
} from "~/utils/queries/page/__generated__/pageBySlugQuery";
import { rootQuery } from "~/utils/queries/rootQuery/__generated__/rootQuery";
import { strapi } from "~/utils/strapi.server";

export const CatchBoundary: CatchBoundaryComponent = () => {
    return <FourOhHour />;
};

export const meta: MetaFunction = ({ data, parentsData, location }) => {
    if (data) {
        const { seo } = data as pageBySlugQuery_pageBySlug_data_attributes;
        return {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            "og:image": seo?.metaImage.data?.attributes?.url,
        };
    }
    else {
        return {
            title: "404 - Page Not Found",
            description: `There is no page at this address`,
        };
    }
};

export const loader: LoaderFunction = async ({
    params,
    request,
}): Promise<(pageBySlugQuery_pageBySlug_data_attributes & { textBlockHtml?: { [key: string]: string } }) | null> => {
    const slug = params["*"];
    if (slug) {
        const data = await strapi.query<pageBySlugQuery, pageBySlugQueryVariables>({
            query: PageBySlugQuery,
            variables: {
                slug,
            },
            fetchPolicy: "no-cache",
        });
        if (data.data.pageBySlug) {
            const markdownBlocks = data.data.pageBySlug.data?.attributes?.Blocks?.filter((n) => n?.__typename === "ComponentBlocksTextBlock");
            const textBlockHtml = markdownBlocks?.reduce((prev, curr) => {
                const next = { ...prev };
                let tblock = curr as pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksTextBlock;
                if (tblock) {
                    next[tblock.id] = tblock.Content || "";
                }
                return next;
            }, {} as { [key: string]: string });
            if (data.data.pageBySlug?.data?.attributes) {
                return { ...data.data.pageBySlug?.data?.attributes, textBlockHtml };
            }
        }
    }
    throw new Response("Not Found", {
        status: 404,
    });
};

export default function Page() {
    const data = useLoaderData<(pageBySlugQuery_pageBySlug_data_attributes & { textBlockHtml?: { [key: string]: string } }) | null>();
    const params = useParams();
    return (
        <div>
            {data?.Blocks?.map((block) => {
                switch (block?.__typename) {
                    case "ComponentBlocksImageContent": {
                        return <ImageContent data={block} key={`${block.__typename}-${block.id}`}/>;
                    }
                    case "ComponentBlocksHero": {
                        if (block.BackgroundImage?.data?.attributes && block.Title && block.Subtitle) {
                            return <Hero image={block.BackgroundImage.data?.attributes} title={block.Title} subtitle={block.Subtitle} preload={block.Preload || false} key={`${block.__typename}-${block.id}`}/>;
                        }
                        return null;
                    }
                    case "ComponentBlocksContactForm": {
                        if (block.form?.data) {
                            return (
                                <div className="my-6" key={`${block.__typename}-${block.id}`}>
                                    <div className="card max-w-2xl mx-auto">
                                        <h3>{block.form.data.attributes?.Title}</h3>
                                        <Form form={block.form.data} id={block.form.data.id || "block-form-" + block.id}/>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }
                    case "ComponentBlocksTextBlock": {
                        return <TextBlock html={block.Content || ""} key={`${block.__typename}-${block.id}`}/>;
                    }
                }
            })}
        </div>
    );
}
