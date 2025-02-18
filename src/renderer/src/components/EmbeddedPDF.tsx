interface EmbeddedPDFProps {
    pdfSRC: string;
    index: number;
    addPageToArray: (page: number) => {}
}

export function EmbeddedPDF({pdfSRC, index, addPageToArray}: EmbeddedPDFProps) {

    function handleClick() {
        addPageToArray(index);
    }

    return (
        <iframe src={`${pdfSRC}#toolbar=0`} onClick={handleClick}/>
    )
}