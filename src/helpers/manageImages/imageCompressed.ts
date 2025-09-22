export const compressImageToWebP = (
  file: File,
  quality: number = 0.5,
  identifier: string
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1200;

        let width = img.width;
        let height = img.height;

        // Resize the image if it exceeds the max width
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to get canvas context"));
          return;
        }

        // Apply smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas content to Blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Image compression failed"));
              return;
            }

            const uniqueName = `${identifier}-${Date.now()}.webp`;

            // Wrap blob in a File object for compatibility
            const compressedFile = new File([blob], uniqueName, {
              type: "image/webp",
            });

            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
