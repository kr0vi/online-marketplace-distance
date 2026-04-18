# Frontend TODO

This checklist is split into two levels:

- Resume-ready must-have: complete these before calling the frontend finished in a resume project section.
- Production-grade nice-to-have: advanced UX, reliability, and deployment polish.

## Resume-ready must-have

- [x] Fix app layout provider structure.
  - In `src/app/layout.tsx`, render providers inside `<body>`, not wrapping `<body>` from outside.
- [x] Enforce admin route protection.
  - In `src/app/admin/page.tsx`, re-enable role checks and route guard logic.
- [ ] Fix broken navigation link.
  - In `src/components/Navbar.tsx`, `"/all"` currently points to a non-existent route.
- [ ] Fix cart quantity update logic.
  - In `src/app/cart/page.tsx`, quantity updates currently compute from `productQuantity` prop instead of latest state.
- [ ] Improve checkout correctness and key handling.
  - In `src/app/checkout/page.tsx`, remove hardcoded Razorpay key and use env variable.
  - Ensure the frontend only relies on backend-confirmed payment/order data flow.
- [ ] Resolve lint/build blockers.
  - Current lint has multiple errors (hook naming, parser/type issues, unescaped entities, etc.).
  - Make `npm run lint` and `npm run build` pass consistently.
- [ ] Add user-facing error states for auth forms.
  - In login/signup flows, handle API failures and invalid input with inline feedback (not silent failure).
- [ ] Remove debug leftovers.
  - Remove temporary TODO debug comments and noisy console logs across product/search/checkout components.
- [ ] Ensure route-level auth behavior is consistent.
  - Protect orders/checkout/me/cart for unauthenticated users and provide clear redirect UX.

## Production-grade nice-to-have

- [ ] Improve accessibility baseline.
  - Alt text coverage, keyboard navigation, focus states, semantic controls, and color-contrast checks.
- [ ] Optimize images and rendering.
  - Replace heavy `<img>` usage with optimized image handling where appropriate.
- [ ] Add loading and empty states consistency.
  - Standardize skeletons, retry actions, and network error UX across pages.
- [ ] Add state and data-fetching strategy.
  - Introduce a consistent server/client fetching model with caching and invalidation.
- [ ] Add frontend test coverage.
  - Component tests for auth/cart/product views and end-to-end tests for checkout journey.
- [ ] Add analytics and product telemetry.
  - Funnel tracking for search, product views, add-to-cart, and checkout completion.
- [ ] Add i18n/currency formatting strategy.
  - Avoid mixed currency symbols/formatting and support locale-aware rendering.
- [ ] Add performance budgets.
  - Track Core Web Vitals and fail CI when key thresholds regress.
- [ ] Add deployment and environment documentation.
  - Document required env vars, staging/prod differences, and rollback steps.
