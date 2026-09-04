/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake icon/UI packages (smaller JS — better INP / main-thread time)
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
    ],
  },

  // Standalone output for Docker/Vercel optimization
  output: "standalone",

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.keepingcurrentmatters.com",
        pathname: "/**",
      },
    ],
  },

  // Compression
  compress: true,

  // Performance optimizations
  swcMinify: true,

  // Canonical host: www (matches siteConfig.url / metadataBase)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "springvalleylasvegashomes.com",
          },
        ],
        destination: "https://www.springvalleylasvegashomes.com/:path*",
        permanent: true,
      },
      // GSC 404: junk short URL — permanent to homepage
      {
        source: "/mo",
        destination: "/",
        permanent: true,
      },
      // Spring Valley hub — community page moves to the root
      {
        source: "/neighborhoods/spring-valley",
        destination: "/",
        permanent: true,
      },
      {
        source: "/neighborhoods/spring-valley/property-taxes",
        destination: "/guides/property-taxes",
        permanent: true,
      },
      // Market pages consolidate to the Spring Valley monthly report
      {
        source: "/market-update",
        destination: "/market-report",
        permanent: true,
      },
      {
        source: "/market-insights",
        destination: "/market-report",
        permanent: true,
      },
      {
        source: "/market-insights/kcm-blog",
        destination: "/market-report",
        permanent: true,
      },
      {
        source: "/sellers/relocation",
        destination: "/relocation",
        permanent: true,
      },
      // 55+ — sibling site (www returns 200)
      {
        source: "/55-plus-communities",
        destination: "https://www.vegas55plushomes.com/",
        permanent: true,
      },
      {
        source: "/55-plus-communities/:path*",
        destination: "https://www.vegas55plushomes.com/",
        permanent: true,
      },
      // Valley-wide neighborhood children → sibling domains (pre-flight 200 only)
      {
        source: "/neighborhoods/summerlin",
        destination: "https://searchforhomesinsummerlin.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/henderson",
        destination: "https://www.searchforhomesinhenderson.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/green-valley",
        destination: "https://www.greenvalleyranchinsider.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/inspirada",
        destination: "https://www.inspiradahomes.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/mountains-edge",
        destination: "https://www.mountainedgehomes.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/north-las-vegas",
        destination: "https://www.searchnorthlasvegashomes.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/skye-canyon",
        destination: "https://www.skyecanyonhomesforsale.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/centennial-hills",
        destination: "https://www.centennialhillshomesforsale.com/",
        permanent: true,
      },
      {
        source: "/neighborhoods/enterprise",
        destination: "https://www.rhodesranchlasvegas.com/",
        permanent: true,
      },
      // Skipped (pre-flight): /luxury-homes and /buyers/luxury-homes-las-vegas
      // → https://www.drjanduffy.com/luxury-homes returned 404
      // Skipped (pre-flight): /neighborhoods/the-ridges
      // → https://www.theridgessummerlinhomes.com/ returned 526
    ];
  },

  // Python API rewrites
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/:path*"
            : "/api/",
      },
    ];
  },

  // Enhanced security headers including CSP for RealScout widget
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // CSP for RealScout widget
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com https://www.realscout.com https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://*.homebot.com https://*.homebot.ai",
              "style-src 'self' 'unsafe-inline' https://em.realscout.com https://www.realscout.com https://fonts.googleapis.com https://assets.calendly.com https://*.homebot.com https://*.homebot.ai",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com https://*.homebot.com",
              "connect-src 'self' https://em.realscout.com https://www.realscout.com https://openrouter.ai https://api.openai.com https://calendly.com https://www.google-analytics.com https://analytics.google.com https://*.ingest.sentry.io https://maps.googleapis.com https://maps.gstatic.com https://*.homebot.com https://*.homebot.ai https://challenges.cloudflare.com",
              "frame-src 'self' https://em.realscout.com https://www.realscout.com https://calendly.com https://assets.calendly.com https://www.google.com https://maps.google.com https://*.google.com https://*.homebot.com https://*.homebot.ai https://challenges.cloudflare.com https://js-3d-area-explorer-demo-dev-t6a6o7lkja-uc.a.run.app https://storage.googleapis.com https://www.simplifyingthemarket.com",
              "worker-src 'self' blob:",
            ].join("; "),
          },
          // Additional security headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Bundle analyzer (when ANALYZE=true)
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === "true" && !isServer) {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "./analyze.html",
          openAnalyzer: false,
        }),
      );
    }
    return config;
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
