export default function GoogleDriveImage(id: string, alt: string) {
  return (
    <img
      src={`https://drive.google.com/thumbnail?id=${id}&sz=w1000`}
      alt={alt}
    />
  );
}
