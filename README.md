# 🔍 HalluciScan

<div align="center">

**Detect AI Hallucinations in Real-Time**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-halluciscan.vercel.app-black?style=for-the-badge&logo=vercel)](https://halluciscan.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

[🚀 Live Demo](https://halluciscan.vercel.app) • [📖 How It Works](#how-it-works) • [⚙️ Setup](#getting-started)

</div>

---

## 🧠 What is HalluciScan?

**HalluciScan** is an AI-powered hallucination detection tool that analyzes AI-generated content and identifies factual errors, unsupported claims, and hallucinations in real-time. Paste any AI response and let HalluciScan verify it using Google Gemini and Groq's LLaMA models.

---

## ✨ Features

- 🔬 **Real-time Hallucination Detection** — Analyze any AI-generated text instantly
- 🌐 **Multi-Model Analysis** — Uses Google Gemini + Groq LLaMA for cross-verification
- 📄 **PDF Upload Support** — Scan documents for AI-generated misinformation
- 📊 **Confidence Scoring** — Get a hallucination confidence score per sentence
- 🔦 **Sentence Highlighting** — Visual breakdown of flagged vs. verified claims
- 📋 **Evidence List** — See the reasoning behind each flagged claim
- 📱 **Browser Extension** — Detect hallucinations directly in your browser
- 🌙 **Dark Mode** — Sleek dark-first design

---

## 🚀 Live Demo

👉 **[https://halluciscan.vercel.app](https://halluciscan.vercel.app)**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Google Gemini API** | Primary AI analysis model |
| **Groq (LLaMA)** | Secondary AI model for cross-verification |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/deepanshu83/HalluciScan.git
cd HalluciScan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (get it from https://aistudio.google.com/app/apikey)
GOOGLE_API_KEY=your_google_api_key_here

# Groq API Key (get it from https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key_here

# Optional: Override Gemini model (default: gemini-2.0-flash)
# GEMINI_MODEL=gemini-2.0-flash
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Getting API Keys

| Key | Where to Get |
|---|---|
| `GOOGLE_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com/keys) |

---

## 📁 Project Structure

```
halluciscan/
├── app/                  # Next.js App Router
│   ├── api/analyze/      # API route for hallucination analysis
│   ├── analyzer/         # Analyzer page
│   ├── dashboard/        # Dashboard page
│   ├── blog/             # Blog page
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── landing/          # Landing page sections
│   ├── ResultPanel.tsx   # Analysis result display
│   ├── TextAnalyzer.tsx  # Text input analyzer
│   └── UploadPDF.tsx     # PDF upload component
├── lib/                  # Utility libraries
│   ├── geminiClient.ts   # Google Gemini API client
│   └── llamaClient.ts    # Groq LLaMA API client
├── extension/            # Browser extension source
└── public/               # Static assets
```

---

## 🌍 Deployment

This project is deployed on **Vercel**.

### Deploy your own instance:

```bash
npm install -g vercel
vercel --prod
```

Don't forget to add your environment variables in the [Vercel Dashboard](https://vercel.com/dashboard) under **Settings → Environment Variables**.

---

## 📜 License

MIT License © 2025 [Deepanshu](https://github.com/deepanshu83)
