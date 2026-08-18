# Picturesque Visions – Foundation Client

Next.js + Tailwind CSS frontend for the Austen landscape aesthetic exploration experience.

## Structure

```
src/client/
├── pages/
│   ├── index.tsx              # Hero page with scene selector
│   └── _document.tsx          # Custom document for metadata
├── public/
│   └── fallback-scenes/       # Static fallback images (if needed)
├── styles/
│   └── globals.css            # Tailwind import + global styles
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Development

```bash
cd src/client
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

## Key Features (Phase 1)

- Three aesthetic lens selection: Picturesque, Social Class, Psychological
- Scene description input with work context (Austen novel)
- Live prompt preview (Gemini/BytePlus optimized)
- Elegant classical UI inspired by Regency-era aesthetics
