interface EmbeddedPDFProps {
    pdfSRC: string;
    index: number;
    addPageToArray: (page: number) => void
}

export function EmbeddedPDF({pdfSRC, index, addPageToArray}: EmbeddedPDFProps) {

    function handleClick() {
        addPageToArray(index);
    }

    return (
        <div>
            <iframe src={`${pdfSRC}#toolbar=0`}/>
            <button onClick={handleClick}>Page#{index}</button>
        </div>
    )
}