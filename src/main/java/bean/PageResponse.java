package bean;

import java.util.List;

public class PageResponse <T>{
    private List<T> records;
    private int total;
    private int page;

    public PageResponse() {
    }

    public PageResponse(List<T> records, int total, int page) {
        this.records = records;
        this.total = total;
        this.page = page;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
