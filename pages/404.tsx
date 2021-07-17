const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  )
}

export default NotFoundPage

/**
 * Next.js comes with a static 404 and 500 page by default.
 * We can create our own custom error pages 404.tsx and 500.tsx.
 * Or a more advanced _error.tsx (only in production)
 * where the output is dynamic depending on the statusCode.
 * https://nextjs.org/docs/advanced-features/custom-error-page
 */