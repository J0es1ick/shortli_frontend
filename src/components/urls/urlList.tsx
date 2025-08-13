import React from "react";
import URLItem from "./urlItem";
import styles from "./urlList.module.css";
import Pagination from "../UI/pagination/pagination";

export interface URL {
  url_id: number;
  original_url: string;
  short_code: string;
  user_id: number;
  click_count: number;
  created_at: Date;
}

export interface URLResponse {
  data: URL[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const getURLs = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: URL[]; total: number }> => {
  try {
    const response = await fetch(`api/stats?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result: URLResponse = await response.json();

    return {
      data: result.data,
      total: result.meta.total,
    };
  } catch (err) {
    console.error("Error fetching URLs:", err);
    throw err;
  }
};

export default function URLList() {
  const [urls, setURLs] = React.useState<URL[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalURLs, setTotalURLs] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [, setError] = React.useState<string | null>(null);
  const limit: number = 10;

  const fetchURLs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, total } = await getURLs(page);
      setURLs(data);
      setTotalURLs(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadURLs = async () => {
      await fetchURLs();
    };

    if (isMounted) {
      loadURLs();
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  React.useEffect(() => {
    if (page > 1 && Math.ceil(totalURLs / limit) < page) {
      setPage(1);
    }
  }, [totalURLs]);

  return (
    <div className={styles.url_list}>
      <div className={styles.url_list_header}>
        <h1>URLs</h1>
      </div>
      <div className={styles.table}>
        <div className={styles.option_names}>
          <button>Number</button>
          <button>Original URL</button>
          <button>Short Code</button>
          <button>User ID</button>
          <button>Click count</button>
          <button>Created at</button>
          <button>Short link</button>
        </div>
        {urls.map((url, index) => (
          <URLItem
            key={url.url_id}
            number={page === 1 ? index + 1 : index + 1 + 10 * (page - 1)}
            url={url}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={Math.ceil(totalURLs / 10)}
        loading={loading}
        setPage={setPage}
      />
    </div>
  );
}
