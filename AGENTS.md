# Project Guidelines

## Project Context

This is a new, separate project inspired by the existing Beer-Scoring project. Do not assume the old project’s code, database, schema, credentials, or deployment setup should be copied into this one. Keep work within this project unless the user explicitly asks to change the old project.

The project’s main idea is a beer-discovery and review experience using the Catalog.beer API as the prospective source of beer data. The project may retain its own data for accounts, reviews, and other user-generated features, but its database requirements have not yet been finalized. Do not assume beer records need to be copied into a local database, or remove the possibility of caching them, until the external API’s data and stable identifiers are understood.

The intended experience discussed so far is:

- Visitors can browse beers and read reviews without signing in.
- Only signed-in users can create, edit, or delete reviews.
- Users may be able to save favourite beers in their browser. The persistence mechanism—local storage, cookies, or server-backed anonymous favourites—has not been decided.
- The visual direction is the `designIdea.png` reference: a dark charcoal background, warm amber accents, bold condensed headings, strong beer imagery, and editorial product sections. Use it for visual inspiration; do not copy its exact layout or assets.
- The user wants to build the project iteratively with an agent, understand changes as they are made, and avoid unnecessary complexity or a large rewrite.

Ask the user before making decisions that significantly affect product behavior, security, data retention, or external API usage. When possible, present a recommended default and a concise explanation.

## External Beer API

- Official documentation: <https://catalog.beer/api-docs>
- Documented API root: `https://api.catalog.beer`
- The documentation describes Basic authentication using the secret API key as the username and an empty password.
- Keep the API key on the server. Never put it in frontend source, browser storage, a public config value, a committed file, logs, or chat.
- Use an ignored local environment file for secrets and provide a safe example environment file containing placeholders only.
- Before writing an integration, inspect the current API documentation to verify the relevant endpoints, response fields, pagination, rate limits, attribution requirements, licensing, and whether stable beer identifiers are available.
- Do not guess endpoints or data shapes. Build and test a small, server-side API proof of concept before coupling reviews or favourites to external beer IDs.
- Handle upstream errors explicitly. Do not disguise API failures as successful empty results.
- Decide whether beer responses need caching only after verifying the API’s limits and behavior. If caching is used, preserve a stable mapping from a beer to its reviews and favourites.
- CraftBeer.com’s beer styles page was discussed as a possible supplementary reference: <https://www.craftbeer.com/beer-styles>. Scraping it has not been approved. Do not scrape or republish its content unless the user confirms that the relevant terms and permissions allow it. Prefer a permitted API or a small, clearly sourced taxonomy if beer-style data is needed.

## Authentication, Reviews, and Favourites

- Beer browsing and review reading should be available to logged-out visitors.
- Review creation, editing, and deletion must be protected by server-side authentication and authorization. Hiding controls in the interface is not sufficient.
- Verify review ownership on the server before allowing edits or deletion; allow administrative exceptions only if the project implements and documents an admin role.
- Store passwords using a suitable one-way password hash. Never store plaintext passwords or attempt to recover passwords from hashes.
- Do not invent a password-reset flow or account-recovery policy without discussing its scope with the user.
- Treat favourites as a separate feature from authentication. Do not use a favourite cookie as proof of identity or authorization.
- If favourites are browser-only, explain what happens when site data is cleared and whether favourites can be recovered on another device. Clearing browser history does not necessarily clear cookies or local storage.
- If anonymous server-backed favourites are proposed, explain the cookie’s purpose, lifetime, and data-loss behavior before implementing it.

## Design and Image Handling

- Follow the direction of `designIdea.png`: charcoal/dark surfaces, amber or copper highlights, bold condensed display typography, prominent beer photography, and clear editorial sections.
- Keep the redesign responsive and accessible, with readable contrast, keyboard-accessible controls, meaningful image alternative text, and visible focus states.
- The reference image is design input, not a reusable asset. Do not copy images or proprietary content from the reference.
- Add `designIdea.png` to the project’s `.gitignore` if the user wants the reference image kept local. Check whether it is already tracked before changing Git tracking; do not remove tracked files without telling the user.

## Agent Workflow

- Start by inspecting the project structure, existing instructions, package scripts, and current implementation before proposing edits.
- Work in small, reviewable stages. First establish the application stack and run commands, then prove external API access, then implement one user-facing feature at a time.
- Before changing data models, explain how reviews and favourites will keep pointing to the correct beer if the beer catalogue is external or cached.
- Preserve existing behavior unless the user approves a behavior change. Avoid unrelated cleanup, broad rewrites, and speculative abstractions.
- Search for existing helpers and patterns before adding new ones.
- Ask before running destructive database operations, migrations that could lose data, bulk imports, or scripts that modify a shared or production database.
- Keep errors visible and actionable. Do not use broad catches, silent fallbacks, or successful empty responses to hide failures.
- Update documentation that directly relates to a change, including setup instructions and environment-variable names.
- Do not commit secrets, generated credentials, or real user data.

## Validation and Reporting

- Use the commands and test tools defined by this project’s package manifests; do not assume the old project’s scripts or technology stack apply.
- Run the smallest relevant tests, lint, type checks, and build for each change. If a check cannot run, report why rather than claiming it passed.
- Verify the requested behavior itself, not only that the code compiles. For API integration, test both a successful response and a representative failure without exposing credentials.
- At the end of each stage, summarize what changed, what was verified, any remaining decisions, and the exact command(s) to run the project.