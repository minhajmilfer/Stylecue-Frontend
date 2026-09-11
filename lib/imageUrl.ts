/**
 * Takes whatever image URL was saved for a product and returns one that
 * will actually load as an image.
 *
 * If it's a normal Google Drive "share" link (the kind you get from
 * right-click → Share → Copy link), this converts it into Drive's direct
 * image format automatically. Any other kind of URL (a real image host,
 * Supabase Storage, etc.) is returned unchanged.
 */
export function getDisplayImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  return url;
}