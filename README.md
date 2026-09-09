<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# StyleCue — AI-Powered Fashion Stylist

A next-generation **in-store kiosk** experience that guides customers through a personalized AI styling journey and lets them browse and shop curated fashion recommendations. Built as a **frontend build of StyleCue** using Next.js.

## ✨ Features

### AI Stylist (Guided 6-Step Wizard)
A step-by-step flow that builds a personalized outfit recommendation:
1. **Gender** — Shopping for Men, Women, or Kids
2. **Category** — Casual, Formal, Accessories, Ethnic, Swimwear, Sports, Outerwear, Footwear
3. **Occasion** — Casual, Work/Corporate, Wedding/Gala, Party/Night Out
4. **Skin Tone** — Color palette matching with stylist tips
5. **Body Type** — Slim, Athletic, Regular, Broad/Fuller
6. **Measurements** — Height (cm) & waist (in), or a general size (XS–XXL)

Finish with a curated **"AI MATCH COMPLETE"** results screen showing recommended tops, bottoms, and accessories with a live preview card.

### Browse & Shop (Direct Catalog)
- Category gallery with search and Men/Women/Kids filtering
- Product listing and detail views with size selection
- Order review / cart and confirmation with fitting-cabin code

### Design Language
- Consistent purple gradient theme (`#2d1b4e` → `#5c1c5c`) with amber accents
- Glassmorphism cards, decorative SVG corner curves
- Nunito font family
- Multilingual label toggle (English / සිංහල / தமிழ்)

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |

## 🚀 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Useful scripts:

```bash
npm run dev      # Start the dev server
npm run build    # Build for production
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
app/
  page.tsx                 # Home / landing page
  gender/                  # Step 1: Who you're shopping for
  category/                # Step 2: Clothing categories
  occasion/                # Step 3: Occasion
  skintone/                # Step 4: Skin tone & color matching
  bodytype/                # Step 5: Body type
  measurements/            # Step 6: Measurements
  results/                 # AI Match Complete
  browsecategories/        # Browse & Shop gallery
  womentops/               # Product listing
  reviewselection/         # Product detail
  cart/                    # Order review / checkout
  confirmation/            # Order confirmation
public/Images/             # Product & category images
```
>>>>>>> 5c915a49049f50e4b7ffc5972423d33aab2c7bc3
