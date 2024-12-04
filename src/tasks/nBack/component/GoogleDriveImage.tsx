export default function GoogleDriveImage(id: string, alt: string) {
  return (
    <img
      src={`https://drive.google.com/thumbnail?id=${id}&sz=w1280`}
      width="1280"
      height="720"
      alt={alt}
    />
  );
}
