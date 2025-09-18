export const compressImageToWebP = (file, quality = 0.5, identifier) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        // Resize the image if it exceeds the max width
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        // Apply some smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas content to Blob instead of data URL
        canvas.toBlob(
          (blob) => {
            // Create a new Blob with a unique name
            const uniqueName = `${identifier}-${Date.now()}.webp`;
            const uniqueBlob = new Blob([blob], { type: "image/webp" });
            uniqueBlob.name = uniqueName;
            resolve(uniqueBlob);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const compressMultipleImagesToWebP = (files, quality = 0.5) => {
  return Promise.all(files.map((file) => compressImageToWebP(file, quality)));
};
