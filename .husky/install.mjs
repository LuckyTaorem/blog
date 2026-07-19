// Skip Husky in CI and production
if (process.env.CI === 'true' || process.env.NODE_ENV === 'production') process.exit(0)
const husky = await import('husky')
husky.default()