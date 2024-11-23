import {useEffect, useRef, useState} from "react";
import {List, Pagination} from "antd";
import style from './news.module.css'
import NewsCard from "./newsCard/NewsCard.jsx";
import {getAllNews} from "../../api/newsApi.js";

const News = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
  const listRef = useRef(null); // Reference to the list
  const [news, setNews] = useState([
    {title: 'Title', photo: null, date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
  ]);
  /*const [news, setNews] = useState([]);*/
  const [displayedNews, setDisplayedNews] = useState(
    news.slice(0, Math.min(itemsPerPage, news.length))
  );

  const handlePageChange = (newPage) => {
    if (news.length === 0) {
      setDisplayedNews([]);
      return;
    }
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedNews(news.slice(startIndex, endIndex));
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleItemsPerPageChange = (current, size) => {
    setItemsPerPage(size);
    handlePageChange(1); // Go to the first page when changing items per page
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await getAllNews();
        setNews(data);
      } catch (error) {
        console.log(error);
      }
    }

    getNews();
  }, [])

  useEffect(() => {
    handlePageChange(1);
    setDisplayedNews(news.slice(0, itemsPerPage));
  }, [itemsPerPage, news])

  return (
    <section ref={listRef} className={style.news}>
      <h1>Новости</h1>

      <List
        className={style.newsList}
        itemLayout="horizontal"
        dataSource={displayedNews}
        renderItem={(item) => (
          <List.Item>
            <NewsCard
              photo={item.photo}
              key={item.key}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          </List.Item>
        )}
      >
        <Pagination
          className={style.pagination}
          defaultCurrent={currentPage}
          total={news.length} // Total number of items
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger // Enable the "Items per page" dropdown
          onShowSizeChange={handleItemsPerPageChange} // Handle changes to items per page
        />
      </List>
    </section>
  );
};

export default News;