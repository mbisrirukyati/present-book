import React from "react";
import { Page as PdfPage } from "react-pdf";

export default function FlipPage({ pageNumber, links }) {
    return (
        <div className="page">
            <div className="pageInner">

                <PdfPage
                    pageNumber={pageNumber}
                    width={420}
                    renderTextLayer={false}
                    renderAnnotationLayer={true}
                />

                {links?.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdfLink"
                        style={{
                            left: link.x,
                            top: link.y,
                            width: link.width,
                            height: link.height,
                        }}

                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}

                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                ))}

            </div>
        </div>
    );
}