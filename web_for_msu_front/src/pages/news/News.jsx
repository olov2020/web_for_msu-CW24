import {useEffect, useRef, useState} from "react";
import {List, Pagination} from "antd";
import style from './news.module.css'
import NewsCard from "./newsCard/NewsCard.jsx";
import {getAllNews} from "../../api/newsApi.js";

const News = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3); // State for items per page
  const listRef = useRef(null); // Reference to the list
  const [news, setNews] = useState([
    {id: 1, title: 'Title', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {id: 2, title: 'Title2', photo: 'https://avatars.mds.yandex.net/i?id=49186f06e917afba928a97aa048bc067_l-5234693-images-thumbs&n=13', date: '2024-11-20', description: 'Lorem ipsum dolor sit amet, consectetur'},
  ]);

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

  /*useEffect(() => {
    const getNews = async () => {
      const data = await getAllNews();
      setNews(data);
    }

    getNews();
  }, [])*/

  useEffect(() => {
    handlePageChange(1);
    setDisplayedNews(news.slice(0, itemsPerPage));
  }, [itemsPerPage, news])

  return (
    <article ref={listRef}>
      <h1>Новости</h1>

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