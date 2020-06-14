import { useCallback } from "react";

export default function useDownload() {
  const onDownload = useCallback((title: string, markdown: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
    element.setAttribute('download', `${title.trim().replace(' ', '-')}.md`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }, []);

  return onDownload;
};
