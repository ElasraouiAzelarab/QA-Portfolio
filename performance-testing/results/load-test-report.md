# Load Test Report — DemoShop API

**Date:** 2026-04-06  
**Environment:** QA — https://qa.demoshop.example.com  
**Tool:** Locust 2.x  
**Author:** Azelarab Elasraoui

---

## Test Configuration

| Parameter | Value |
|---|---|
| Concurrent Users | 50 |
| Ramp-up Rate | 5 users/second |
| Test Duration | 60 seconds |
| Target Endpoints | `/api/products`, `/api/products/{id}`, `/api/products?search=`, `/api/cart` |

---

## Summary Results

| Metric | Value |
|---|---|
| Total Requests | 3,842 |
| Failures | 12 (0.31%) |
| Median Response Time | 142 ms |
| 95th Percentile (p95) | 487 ms |
| 99th Percentile (p99) | 1,203 ms |
| Peak RPS | 68.4 |
| Avg RPS | 64.0 |

---

## Endpoint Breakdown

| Endpoint | Requests | Failures | Median (ms) | p95 (ms) | p99 (ms) |
|---|---|---|---|---|---|
| GET /api/products | 1,521 | 3 | 138 | 412 | 987 |
| GET /api/products/{id} | 912 | 2 | 95 | 210 | 540 |
| GET /api/products?search= | 760 | 5 | 205 | 680 | 1,403 |
| GET /api/cart | 649 | 2 | 112 | 325 | 890 |

---

## Observations

1. **Product search is the slowest endpoint** — p99 exceeds 1,400 ms under 50 concurrent users. The search query performs a full-text scan without an index. Recommend adding a full-text search index on `products.name` and `products.description`.

2. **Failure rate is within acceptable threshold** (< 1%), but 5 out of 12 failures originated from the search endpoint, suggesting it is the bottleneck.

3. **All other endpoints meet the SLA** of p95 < 500 ms under 50 concurrent users.

4. **Memory and CPU** remained stable throughout the test run (monitored via Datadog).

---

## Recommendations

| Issue | Recommendation | Priority |
|---|---|---|
| Search endpoint slow | Add DB full-text index; consider Elasticsearch | High |
| No HTTP caching | Add `Cache-Control` headers to product list response | Medium |
| No rate limiting | Implement API rate limiting to prevent abuse | Medium |

---

## Charts

> _Charts would be exported from the Locust HTML report and attached here in a real engagement._

- Response time over time (median + p95)
- Requests per second over time
- Error rate over time
