import http from "k6/http"
import { check } from "k6"

export default function() {
    const result = http.get("https://test-api.k6.io/");
    check(result, {
        "Http status code must be 200": result => result.status === 200
    });
}
