interface BannerProps {
  images: string[];
  speed?: number;
}

const Slider: React.FC<BannerProps> = ({ images, speed = 5000 }) => {
  return (
    <div className="inner">
      <div className="wrapper">
        {Array.from({ length: 3 }).map((_, idx) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <section key={idx} style={{ ["--speed" as any]: `${speed}ms` }}>
            {images.map((image, index) => (
              <div className="image" key={`${index}-${idx}`}>
                <img loading="lazy"
                  src={image}
                  alt={`Client logo ${index + 1}`}
                  className="clients-slider-image"
                  
                  decoding="async"
                />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Slider;
