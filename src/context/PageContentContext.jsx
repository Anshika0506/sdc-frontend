import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_PAGE_CONTENT,
  PAGE_CONTENT_STORAGE_KEY,
} from "../constants/defaultPageContent";
import { getPageContent } from "../api/Public/pageContent";
import { updatePageContent } from "../api/Admin/pageContent";
import { getMergedPageContent } from "../utils/pageContentMerge";

const PageContentContext = createContext(null);

const readStoredContent = () => {
  try {
    const raw = localStorage.getItem(PAGE_CONTENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStoredContent = (content) => {
  localStorage.setItem(PAGE_CONTENT_STORAGE_KEY, JSON.stringify(content));
};

export const PageContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_PAGE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("default");

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPageContent();
      const data = res?.data ?? res;
      const merged = getMergedPageContent(data);
      setContent(merged);
      writeStoredContent(data);
      setSource("api");
    } catch {
      const stored = readStoredContent();
      if (stored) {
        setContent(getMergedPageContent(stored));
        setSource("local");
      } else {
        setContent(DEFAULT_PAGE_CONTENT);
        setSource("default");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const saveContent = useCallback(async (nextContent) => {
    const merged = getMergedPageContent(nextContent);
    try {
      await updatePageContent(nextContent);
      setSource("api");
    } catch {
      setSource("local");
    }
    writeStoredContent(nextContent);
    setContent(merged);
    return merged;
  }, []);

  return (
    <PageContentContext.Provider
      value={{ content, loading, source, loadContent, saveContent }}
    >
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (!context) {
    throw new Error("usePageContent must be used within PageContentProvider");
  }
  return context;
};
