import React from "react";
import HTMLFlipBook from "react-pageflip";
import Page from "./Page";

const images = [
    "/images/cover.jpg",
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/back.jpg",
];

export default function FlipBook() {
    return (
        <div className="bookContainer">
            <HTMLFlipBook
                width={400}
                height={500}
                size="stretch"
                minWidth={300}
                maxWidth={800}
                minHeight={400}
                maxHeight={600}
                drawShadow={true}
                flippingTime={1200}
                usePortrait={false}
                showCover={true}
                mobileScrollSupport={true}
            >
                {images.map((img, i) => (
                    <Page key={i} image={img} />
                ))}
            </HTMLFlipBook>
        </div>
    );
}