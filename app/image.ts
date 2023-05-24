export const getImageBase64 = async (photo: FormDataEntryValue | null) => {
  if (!photo || !(photo instanceof File) || !photo.size) {
    return undefined;
  }

  // import here due to weird remix stuff
  const { default: sharp } = await import("sharp");

  const resizedImageBuf = await sharp(await photo.arrayBuffer())
    .png()
    .resize(512, 512)
    .toBuffer();

  // https://github.com/lovell/sharp/issues/1337#issuecomment-412880172
  return `data:image/png;base64,${resizedImageBuf.toString("base64")}`;
};
