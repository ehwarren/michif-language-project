const TextBlock = ({ html }: { html: string }) => {
    return (
        <div className="container mx-auto">
            <div className="text-block" dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
    );
};

export default TextBlock;
