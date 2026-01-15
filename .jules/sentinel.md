# Sentinel's Journal

## 2024-05-22 - Hardcoded YouTube API Key
**Vulnerability:** Hardcoded YouTube Data API key found in `src/api/youtube.ts`.
**Learning:** Developers often fallback to hardcoded keys for convenience during development, but this poses a significant security risk if committed.
**Prevention:** Always use environment variables for secrets. Implement strict checks in CI/CD to prevent committing keys. Use mock data as a default fallback instead of a "real" hardcoded key.
