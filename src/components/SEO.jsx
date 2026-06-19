import React from "react";
import { Helmet } from "react-helmet-async";

export const SEO = ({
  title,
  description,
  canonical,
  schema,
  ogType = "website",
  ogImage,
}) => {
  const defaultTitle = "Mapman - Discover Local Businesses & Shop Videos";
  const defaultDesc =
    "Mapman is a modern local business discovery platform. Explore nearby shops, restaurants, services, watch video reels, and find directions on the interactive map.";

  const finalTitle = title ? `${title} | Mapman` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalCanonical = canonical || window.location.href;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalCanonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Schema Injection */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
