const generateExcerpt = (content: string) => {
  const plainText = content.replace(/<[^>]+>/g, '').trim();
  return plainText.length > 100
    ? plainText.substring(0, 100) + '...'
    : plainText;
};

export default generateExcerpt;
