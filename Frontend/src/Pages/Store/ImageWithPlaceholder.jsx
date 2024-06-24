import React, { useState } from "react";

function ImageWithPlaceholder({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="image-container">
      {!loaded && <SkeletonLoader />}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loaded ? "block" : "none" }}
        {...props}
      />
    </div>
  );
}

export default ImageWithPlaceholder;
