import React, { useEffect, useState } from "react";
import './ResourcesPageStyles.css';
import Resource from "./Resource";
import useDebounce from "../../customHooks/useDebounce";
import axios from "axios";

function ResourcesPage({searchKeyword}) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const debouncedSearchKeyword = useDebounce(searchKeyword, 1000);
    useEffect(() => {
        const fetchResources = async () => {
            try {
                let url = `http://localhost:9090/api/resources/all/paginated`;
                const params = {
                  keyword: debouncedSearchKeyword,
                  page: page,
                  size: pageSize
                };
                const response = await axios.get(url, {params});
                console.log(response);
                setResources(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchResources();
    }, [debouncedSearchKeyword, page]);

    return (
        <div className="resourcesPageContent">
          {loading ? (
            <div>Loading library resources...</div>
          ) : error ? (
            <div>Failed to load library resources.</div>
          ) : resources.length === 0 ? (
            <div>No library resources available.</div>
          ) : (
            resources.map((resource) => (
              <div key={resource.id}>
                <Resource
                  id={resource.id}
                  resource={resource}
                />
              </div>
            ))
          )}
        </div>
      );
}

export default ResourcesPage;