import React, { useState, useMemo, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const PAGE_WIDTH = 420;
const BOOK_WIDTH = PAGE_WIDTH * 2;
const PAGE_HEIGHT = 600;

export default function FlipBook() {
    const [numPages, setNumPages] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [containerWidth, setContainerWidth] = useState(PAGE_WIDTH);

    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setContainerWidth(mobile ? window.innerWidth * 0.85 : PAGE_WIDTH);
        };

        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const pages = useMemo(() => {
        if (!numPages) return [];

        const result = [];

        result.push({ type: "cover-front", page: 1 });

        for (let i = 2; i <= numPages - 1; i += 2) {
            result.push({ type: "spread", page: [i, i + 1] });
        }

        if (numPages > 1) {
            result.push({ type: "cover-back", page: numPages });
        }

        return result;
    }, [numPages]);

    return (
        <div className="bookContainer">

            <Document
                file="https://mbisrirukyati.github.io/present-book/file.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                {numPages && (
                    <HTMLFlipBook
                        width={isMobile ? containerWidth : BOOK_WIDTH}
                        height={PAGE_HEIGHT}
                        size="fixed"
                        showCover={true}
                        flippingTime={800}
                        drawShadow={true}
                        useMouseEvents={true} 
                        mobileScrollSupport={true}
                        disableFlipByClick={false} 
                        className="book"
                    >
                        {pages.map((item, index) => (
                            <div key={index} className="pageInner">

                                {item.type === "cover-front" && (
                                    <PdfPage
                                        pageNumber={item.page}
                                        width={containerWidth}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={true}
                                    />
                                )}

                                {item.type === "spread" && (
                                    isMobile ? (
                                        <PdfPage
                                            pageNumber={item.page[0]}
                                            width={containerWidth}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={true}
                                        />
                                    ) : (
                                        <div className="spread">
                                            <PdfPage
                                                pageNumber={item.page[0]}
                                                width={PAGE_WIDTH}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={true}
                                            />
                                            <PdfPage
                                                pageNumber={item.page[1]}
                                                width={PAGE_WIDTH}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={true}
                                            />
                                        </div>
                                    )
                                )}

                                {item.type === "cover-back" && (
                                    <PdfPage
                                        pageNumber={item.page}
                                        width={containerWidth}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={true}
                                    />
                                )}

                            </div>
                        ))}
                    </HTMLFlipBook>
                )}
            </Document>
        </div>
    );
}