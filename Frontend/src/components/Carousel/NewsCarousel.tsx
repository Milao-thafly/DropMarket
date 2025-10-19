import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { apiFetch } from "../Fetcher/BackendApiFetcher";

interface News {
  news_id: number;
  title: string;
  content: string;
  publication_date: string;
  image_url?: string;
}

export function NewsCarousel() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await apiFetch<{ message: string; data: News[] }>(
        "/news",
        "GET"
      );
      setNews(response.data);
    };
    fetchNews();
  }, []);

  const images = news.map((item) => item.image_url || "...");

  return <Carousel images={images} autoScroll={true} scrollSpeed={5000} />;
}
