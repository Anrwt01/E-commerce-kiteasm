
# Load Testing Guide

You have successfully enabled **Clustering** in your backend.
Your system has **12 CPUs**, so the server will now spawn **12 worker processes** to handle requests in parallel.

## How to Check Performance

We will use `autocannon`, a powerful HTTP benchmarking tool for Node.js.

### 1. Start Your Server
First, ensure your backend is running. Open a terminal in `Backend/` and run:

```bash
npm run dev
```
You should see output like:
```text
Primary 12345 is running
Forking for 12 CPUs...
Worker 12346 running server at http://localhost:5000
Worker 12347 running server at http://localhost:5000
...
```

### 2. Run the Benchmark
Open a **new terminal window** (keep the server running) and execute this command:

```bash
npx autocannon -c 100 -d 10 http://localhost:5000/api/user/products
```

**Explanation of flags:**
- `-c 100`: Simulate **100 concurrent connections**.
- `-d 10`: Run the test for **10 seconds**.
- `http://localhost:5000/api/user/products`: The endpoint to test (fetching products is a good real-world test).

### 3. Interpret Results
After 10 seconds, you will see a table. Look for:
- **Req/Sec** (Requests per second): How many requests your server handled per second. Higher is better.
- **Latency**: How long (in ms) it took to respond. Lower is better.

### Example Output
```text
Running 10s test @ http://localhost:5000/api/user/products
100 connections

┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────┤
│ Latency │ 10 ms│ 25 ms│ 100 ms│ 150 ms│ 30.5 ms │ 10.2 ms │ 500 ms│
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────┘

Req/Bytes counts sampled once per second.
5k requests in 10.1s, 20 MB read
```

If you see thousands of requests handled, your clustering is working effectively!
