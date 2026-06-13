---
trigger: always_on
---

# VyaparSetu — Frontend Instructions

## Stack
React 18 · TypeScript (strict) · Vite · Tailwind CSS · React Query v5 · React Hook Form · Zod · Axios

---

## Agent behaviour

- **Be concise.** Prefer code over explanation. Only explain when logic is non-trivial.
- **Stay scoped.** Analyse only the current file, directly imported files, and files explicitly referenced in the prompt. Do not scan the repository broadly.
- **Search only when needed.** Use specific queries (component names, exact identifiers). Do not search broadly for "auth system" or "form logic".
- **Surgical edits.** Modify only what the task requires. Do not rewrite unrelated code or alter existing APIs or function signatures.
- **Follow existing patterns.** Match the style, structure, and abstractions already in the codebase. Do not introduce new patterns when existing ones fit.
- **No guessing.** Ask for clarification rather than making broad assumptions about missing context.
- **No fluff.** No placeholder comments, no unused variables, no dead code, no over-engineering.

---

## Project structure

```
src/
├── components/
│   ├── ui/              # Atomic components: Button, Input, Badge, Card, Spinner
│   └── shared/          # Composite reusable: SchemeCard, StatusBadge, GapBridgeCard
├── features/
│   ├── profile/         # Business profile form feature
│   ├── results/         # Scheme match results feature
│   └── compliance/      # Compliance scorecard feature
├── hooks/               # Custom React hooks
├── pages/               # Route-level components only — no business logic
├── schemas/             # Zod schemas (shared across features)
├── services/            # Axios API calls
├── types/               # TypeScript interfaces and type aliases
└── utils/               # Pure functions with no side effects
```

---

## TypeScript

- `strict: true` is enforced — no exceptions.
- Never use `any`. Use `unknown` and narrow with type guards, or define a precise type.
- Every function and method must have an explicit return type declared.
- Every component must have a typed props interface or type alias.
- Name props types `<ComponentName>Props`.
- Use `z.infer<typeof schema>` to derive types from Zod schemas — do not duplicate type definitions.
- Use the `satisfies` operator when verifying an object's shape without widening.

```typescript
// Correct
const fetchSchemes = async (sector: string): Promise<Scheme[]> => { ... }

// Wrong — missing return type
const fetchSchemes = async (sector: string) => { ... }
```

---

## Validation

- All Zod schemas live in `src/schemas/`. Export named schemas and their inferred types together.
- Use `zodResolver` from `@hookform/resolvers/zod` for all React Hook Form instances.
- Validate API response payloads with Zod before consuming them in components or hooks.
- Never trust raw API data — always parse and strip unknown fields.

```typescript
// src/schemas/profile.schema.ts
export const profileSchema = z.object({
  businessName: z.string().min(1),
  sector: SectorEnum,
  annualTurnover: z.number().positive(),
});

export type ProfileForm = z.infer<typeof profileSchema>;
```

---

## Components

- Before creating a component, check `components/ui/` and `components/shared/` first.
- Extract to `components/ui/` when a pattern appears in 2+ unrelated places.
- Feature-specific components live in `features/<name>/` and are not imported outside that feature.
- No prop drilling beyond 2 levels — use React Query data or React Context.
- Keep components focused on rendering. Business logic belongs in hooks or services.

---

## Hooks

- Custom hooks live in `src/hooks/`.
- Every hook must declare the return type explicitly.
- Encapsulate React Query `useQuery` / `useMutation` calls inside named hooks.

```typescript
// src/hooks/useMatchProfile.ts
export const useMatchProfile = (): UseMutationResult<MatchResult, ApiError, ProfileForm> => {
  return useMutation({
    mutationFn: (profile: ProfileForm): Promise<MatchResult> => apiService.matchBusiness(profile),
  });
};
```

---

## API service

- All HTTP calls live in `src/services/apiService.ts`.
- Every method must have explicit parameter types and return type.
- Parse all responses through the corresponding Zod schema before returning.

```typescript
const matchBusiness = async (profile: ProfileForm): Promise<MatchResult> => {
  const { data } = await axiosInstance.post<unknown>('/match', profile);
  return matchResultSchema.parse(data);
};
```

---

## Error handling

- Use a top-level `ErrorBoundary` component to catch render-time errors.
- Handle React Query errors via the `error` property — display inline, never swallow silently.
- Define `ApiError` type and `apiErrorSchema`. Parse error responses before displaying messages.
- Never expose raw server error messages to the user.

---

## Testing

- Unit tests only. No e2e. No integration tests.
- Co-locate test files: `ComponentName.test.tsx` beside the component.
- Test behaviour, not implementation. Assert what the user sees and can do.
- Mock `src/services/apiService` at module level — not inline per test.
- All test functions must have typed parameters and return `void`.

```typescript
describe('SchemeCard', (): void => {
  it('renders benefit summary', (): void => {
    render(<SchemeCard scheme={mockScheme} />);
    expect(screen.getByText(mockScheme.benefitSummary)).toBeInTheDocument();
  });
});
```

---

## Tailwind CSS

- Use Tailwind utility classes directly. Do not create custom CSS files unless Tailwind cannot cover the case.
- Extract repeated class combinations into a shared component, not a CSS class.
- Use `cn()` (clsx + twMerge) for conditional class merging.

---

## Comments

- Comment non-trivial logic only — regex, bitwise ops, complex state transitions.
- Do not comment obvious code. Code should be self-documenting via naming.
- Use JSDoc only for exported utilities whose signature is non-obvious.
- No placeholder comments: no `// TODO`, `// implement later`, `// fix this`.

---

## What to avoid

- `any` type — anywhere
- Inline Zod schemas inside components — define in `src/schemas/`
- Feature components imported outside their feature directory
- `console.log` left in committed code
- Prop drilling more than 2 levels
- Creating a new hook or utility when an existing one covers the case
- Rewriting entire files when only a function needs to change