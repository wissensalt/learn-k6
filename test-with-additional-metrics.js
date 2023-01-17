import http from "k6/http"
import { check } from "k6"
import { Rate } from "k6/metrics"

const failures = new Rate('Failed requests')

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 0 %
        http_req_duration: ['p(95)<500'] // P95 should be be below 500 ms
    }
}

export default function() {
    const result = http.get("https://test-api.k6.io/")
    check(result, {
        "Http status code must be 200": result => result.status === 200
    })
    failures.add(result.status !== 200)
}