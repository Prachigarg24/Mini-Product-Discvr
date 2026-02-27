# Product Discovery AI

## Overview
A Next.js 14 web app that lets users browse and search products using natural language. It integrates Google Gemini AI to interpret queries, identify matching products, and return a friendly explanation of the results.

## Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Gemini API** (`gemini-1.5-flash`)
- **@google/generative-ai** SDK

## Setup & Run

### Prerequisites
- Node.js 18+
- A Google Gemini API key — get one free at [https://aistudio.google.com](https://aistudio.google.com)

### Steps
1. Clone the repo
2. Run: `npm install`
3. Create `.env.local` in the project root and add:
   ```
   GEMINI_API_KEY=AIzaSyAK3xl59g153fFjscDgfwTA0_JwrjEG34o
   ```
4. Run: `npm run dev`
5. Open: [http://localhost:3000](http://localhost:3000)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Returns all products; optional `?category=laptop` filter |
| POST | `/api/ask` | Body: `{ "query": "string" }` — returns AI-matched products + summary |

## Project Structure
```
my-app/
├── app/
│   ├── page.jsx                    # Home page (client component)
│   ├── layout.tsx                  # Root layout with SEO metadata
│   └── products/
│       └── [id]/
│           └── page.jsx            # Product detail page (server component)
├── components/
│   ├── ProductCard.jsx             # Single product card with link
│   ├── ProductList.jsx             # Responsive product grid
│   ├── AskBar.jsx                  # Natural language search input
│   └── AISummary.jsx               # AI result summary display
├── data/
│   └── products.js                 # 8 mock products (in-memory)
├── app/api/
│   ├── products/route.js           # GET /api/products
│   └── ask/route.js                # POST /api/ask (Gemini)
├── .env.local                      # GEMINI_API_KEY (never commit)
└── README.md
```

## Features
- Browse all 8 products across 5 categories (laptops, phones, tablets, audio, gaming)
- Natural language AI search powered by Google Gemini
- Friendly AI summary explaining why results matched your query
- Product detail pages with specifications
- Category filter via API query parameter
- Full error handling — AI failures show a safe user-facing message
- Loading state with animated spinner
- Responsive grid layout (1 → 2 → 3 → 4 columns)
