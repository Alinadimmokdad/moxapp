// contexts/SearchContext.js
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { useLoading } from "@/contexts/LoadingContext";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const searchControllerRef = useRef(null);
  const { setLoading } = useLoading();

  const resetSearch = () => {
    setIsSearching(false);
    setSearchTerm("");
    setSearchBy("");
  };

  const cancelPreviousSearch = () => {
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }
  };

  // The actual search logic that can be reused
  const executeSearch = useCallback(
    async ({
      searchAPI,
      normalFetchAPI,
      searchParams = {},
      onSearchResults,
      onNormalResults,
      currentPage = 1,
    }) => {
      const { field = "all", value } = searchParams;
      const trimmedValue = value?.trim() || "";

      cancelPreviousSearch();

      const controller = new AbortController();
      searchControllerRef.current = controller;

      // Clear search
      if (trimmedValue === "") {
        resetSearch();
        setLoading(true);

        try {
          const res = await normalFetchAPI(currentPage, 15);
          if (!controller.signal.aborted && res.ok) {
            onNormalResults?.(res.data);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to fetch data:", error);
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
        return;
      }

      // Perform search
      setIsSearching(true);
      setSearchTerm(trimmedValue);
      setSearchBy(field);
      setLoading(true);

      try {
        const res = await searchAPI({
          searchBy: field,
          searchTerm: trimmedValue,
          ...searchParams,
        });

        if (!controller.signal.aborted) {
          if (res.ok) {
            onSearchResults?.(res.data);
          } else {
            onSearchResults?.([]);
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search failed:", error);
          onSearchResults?.([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          searchControllerRef.current = null;
        }
      }
    },
    [setLoading]
  );

  const value = {
    isSearching,
    setIsSearching,
    searchTerm,
    setSearchTerm,
    searchBy,
    setSearchBy,
    searchControllerRef,
    resetSearch,
    cancelPreviousSearch,
    executeSearch, // ✅ Now this contains the actual search logic
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
