interface EmbeddedPDFProps {
    pdfSRC: string;
}

export function EmbeddedPDF({pdfSRC}: EmbeddedPDFProps) {

    return (
        <iframe src={pdfSRC} width='500px' height='500px' />
    )
}