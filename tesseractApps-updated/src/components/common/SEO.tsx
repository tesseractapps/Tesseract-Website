import { useEffect } from "react";

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    type?: string;
    // Optional OG overrides (social preview can differ from meta title/description)
    ogTitle?: string;
    ogDescription?: string;
    // Article-specific
    publishedAt?: string;
    author?: string;
    section?: string;
    tags?: string[];
    // Twitter
    twitterCard?: "summary" | "summary_large_image";
    twitterCreator?: string;
    // Misc
    structuredData?: Record<string, unknown>;
    canonical?: string;
    noIndex?: boolean;
    schemaMarkup?: string;
}

const SITE_URL = "https://tesseractapps.com.au";
const TWITTER_SITE = "@TesseractApps";
const SEO_MANAGED_ATTR = "data-seo-managed";

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
    const head = document.head;
    let el = head.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement("meta");
        head.appendChild(el);
    }
    Object.entries(attrs).forEach(([key, value]) => {
        el!.setAttribute(key, value);
    });
    el.setAttribute(SEO_MANAGED_ATTR, "true");
};

const upsertCanonical = (href: string) => {
    const head = document.head;
    let el = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        head.appendChild(el);
    }
    el.setAttribute("href", href);
    el.setAttribute(SEO_MANAGED_ATTR, "true");
};

const clearManagedScripts = () => {
    document
        .querySelectorAll(`script[type=\"application/ld+json\"][${SEO_MANAGED_ATTR}=\"true\"]`)
        .forEach((node) => node.parentNode?.removeChild(node));
};

const appendManagedJsonLd = (jsonText: string) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(SEO_MANAGED_ATTR, "true");
    script.text = jsonText;
    document.head.appendChild(script);
};

const SEO = ({
    title,
    description,
    image = "/tesseract_logo.webp",
    imageAlt,
    url,
    type = "website",
    ogTitle,
    ogDescription,
    publishedAt,
    author,
    section,
    tags,
    twitterCard = "summary_large_image",
    twitterCreator,
    structuredData,
    canonical,
    noIndex,
    schemaMarkup,
}: SEOProps) => {
    const currentUrl = url || (typeof window !== "undefined" ? window.location.href : SITE_URL);

    const imageUrl = image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

    const canonicalUrl = canonical ?? currentUrl.split("?")[0];

    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDescription = ogDescription ?? description;

    const safeSchemaMarkup = (() => {
        if (!schemaMarkup) return null;
        try {
            JSON.parse(schemaMarkup);
            return schemaMarkup;
        } catch {
            return null;
        }
    })();

    useEffect(() => {
        document.title = title;

        upsertMeta('meta[name="description"]', { name: "description", content: description });
        upsertMeta('meta[name="robots"]', {
            name: "robots",
            content: noIndex ? "noindex, nofollow" : "index, follow",
        });
        upsertCanonical(canonicalUrl);

        upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
        upsertMeta('meta[property="og:url"]', { property: "og:url", content: currentUrl });
        upsertMeta('meta[property="og:title"]', { property: "og:title", content: resolvedOgTitle });
        upsertMeta('meta[property="og:description"]', {
            property: "og:description",
            content: resolvedOgDescription,
        });
        upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
        upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
        upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
        upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "TesseractApps" });
        if (imageAlt) {
            upsertMeta('meta[property="og:image:alt"]', {
                property: "og:image:alt",
                content: imageAlt,
            });
        }

        if (type === "article" && publishedAt) {
            upsertMeta('meta[property="article:published_time"]', {
                property: "article:published_time",
                content: publishedAt,
            });
        }
        if (type === "article" && author) {
            upsertMeta('meta[property="article:author"]', { property: "article:author", content: author });
        }
        if (type === "article" && section) {
            upsertMeta('meta[property="article:section"]', { property: "article:section", content: section });
        }

        document
            .querySelectorAll(`meta[property=\"article:tag\"][${SEO_MANAGED_ATTR}=\"true\"]`)
            .forEach((node) => node.parentNode?.removeChild(node));
        if (type === "article" && tags?.length) {
            tags.forEach((tag) => {
                const m = document.createElement("meta");
                m.setAttribute("property", "article:tag");
                m.setAttribute("content", tag);
                m.setAttribute(SEO_MANAGED_ATTR, "true");
                document.head.appendChild(m);
            });
        }

        upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: twitterCard });
        upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: TWITTER_SITE });
        if (twitterCreator) {
            upsertMeta('meta[name="twitter:creator"]', { name: "twitter:creator", content: twitterCreator });
        }
        upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: resolvedOgTitle });
        upsertMeta('meta[name="twitter:description"]', {
            name: "twitter:description",
            content: resolvedOgDescription,
        });
        upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
        if (imageAlt) {
            upsertMeta('meta[name="twitter:image:alt"]', {
                name: "twitter:image:alt",
                content: imageAlt,
            });
        }

        clearManagedScripts();
        if (safeSchemaMarkup) {
            appendManagedJsonLd(safeSchemaMarkup);
        }
        if (structuredData) {
            appendManagedJsonLd(JSON.stringify(structuredData));
        }
    }, [
        author,
        canonicalUrl,
        currentUrl,
        description,
        imageAlt,
        imageUrl,
        noIndex,
        publishedAt,
        resolvedOgDescription,
        resolvedOgTitle,
        safeSchemaMarkup,
        section,
        structuredData,
        tags,
        title,
        twitterCard,
        twitterCreator,
        type,
    ]);

    return null;
};

export default SEO;
