import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const CareerNewsCard = ({ news }) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div
            className={`border rounded-2xl p-5 transition-all cursor-pointer h-full flex flex-col ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] hover:border-[#8b5cf6]/50" : "bg-white border-border-light hover:border-primary/50"}`}
            onClick={() => window.open(news.url, "_blank")}
        >
            {news.urlToImage && (
                <img
                    src={news.urlToImage}
                    alt={news.title}
                    className="rounded-xl mb-4 h-40 w-full object-cover"
                />
            )}

            <h3 className={`font-bold text-sm leading-snug line-clamp-2 mb-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                {news.title}
            </h3>

            <p className={`text-xs mb-4 line-clamp-3 flex-grow ${isDarkMode ? "text-[#a094b8]" : "text-slate-600"}`}>
                {news.description || "Read more about this story."}
            </p>

            <p className={`text-xs font-semibold mt-auto ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>
                Read more →
            </p>
        </div>
    );
};

export default CareerNewsCard;
