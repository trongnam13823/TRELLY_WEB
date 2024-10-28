export default function getOriginalImageUrl(url) {
  return url?.replace(/\/upload\/.*?(?=\/v)/, "/upload/");
}