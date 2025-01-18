import {useEffect, useRef, useState} from "react";
import {List, Pagination} from "antd";
import style from './news.module.css'
import NewsCard from "./newsCard/NewsCard.jsx";
import {getAllNews} from "../../api/newsApi.js";
import NewsSearch from "./newsSearch/NewsSearch.jsx";

const News = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3); // State for items per page
  const listRef = useRef(null); // Reference to the list
  const [news, setNews] = useState([]);
  const [newsSearch, setNewsSearch] = useState('');
  const [backupNews, setBackupNews] = useState([]);

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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleItemsPerPageChange = (current, size) => {
    setItemsPerPage(size);
    handlePageChange(1); // Go to the first page when changing items per page
  };

  const handleSearchNewsItem = () => {
    if (newsSearch === '') {
      setNews(backupNews);
      return;
    }

    const newsNew = backupNews.filter((newsItem) => {
      if (newsItem.title.includes(newsSearch) || newsItem.description.includes(newsSearch)) {
        return newsItem;
      }
    })
    setNews(newsNew);
  }

  useEffect(() => {
    const getNews = async () => {
      const data = await getAllNews();
      setNews(data);
      setBackupNews(data);
    }

    getNews();
  }, [])

  useEffect(() => {
    handlePageChange(1);
    setDisplayedNews(news.slice(0, Math.min(itemsPerPage, news.length)));
  }, [itemsPerPage, news])

  useEffect(() => {
    handleSearchNewsItem();
  }, [newsSearch]);

  return (
    <article ref={listRef}>
      <h1>Новости</h1>

      <NewsSearch newsSearch={newsSearch} setNewsSearch={setNewsSearch}/>

      {displayedNews && displayedNews.length > 0 ?
      <List
        className={style.newsList}
        itemLayout="horizontal"
        dataSource={displayedNews}
        renderItem={(item) => (
          <List.Item className={style.newsListItem}
                     key={item.id}
          >
            <NewsCard
              photo={item.photo}
              id={item.id}
              title={item.title}
              date={item.date}
              file={item.file}
              description={item.description}
            />
          </List.Item>
        )}
      >
        <Pagination
          defaultCurrent={currentPage}
          total={news.length} // Total number of items
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger // Enable the "Items per page" dropdown
          onShowSizeChange={handleItemsPerPageChange} // Handle changes to items per page
        />
      </List> :
        <h3>Пока новостей нет</h3>
      }
    </article>
  );
};

export default News;