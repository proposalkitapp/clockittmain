import { createFileRoute } from "@tanstack/react-router";

const ROBOTS_TXT = `# Allow all Google crawlers, web search, and AI crawlers
User-agent: Googlebot
Allow: /

User-agent: Google-InspectionTool
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: *
Allow: /

Sitemap: https://clockitt.app/sitemap.xml
Sitemap: https://www.clockitt.app/sitemap.xml
Host: clockitt.app
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(ROBOTS_TXT, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
