import React from "react";

const CareerNewsCard = ({ news }) => {
    return (
        <div
            className="bg-[#1a142e] border border-[#2d264a] rounded-2xl p-5 hover:border-[#8b5cf6]/50 transition-all cursor-pointer h-full flex flex-col"
            onClick={() => window.open(news.url, "_blank")}
        >
            {news.urlToImage && (
                <img
                    src={news.urlToImage}
                    alt={news.title}
                    className="rounded-xl mb-4 h-40 w-full object-cover"
                />
            )}

            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2">
                {news.title}
            </h3>

            <p className="text-[#a094b8] text-xs mb-4 line-clamp-3 flex-grow">
                {news.description || "Read more about this story."}
            </p>

            <p className="text-[#8b5cf6] text-xs font-semibold mt-auto">
                Read more →
            </p>
        </div>
    );
};

export default CareerNewsCard;
