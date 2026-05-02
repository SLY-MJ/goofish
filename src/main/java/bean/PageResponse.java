package bean;

import java.util.List;

public class PageResponse <T>{
    private List<T> records;
    private int pages;
    private int page;

    public PageResponse() {
    }

    public PageResponse(List<T> records, int pages, int page) {
        this.records = records;
        this.pages = pages;
        this.page = page;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
