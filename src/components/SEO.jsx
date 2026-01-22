import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Triathlon Time Calculator | Swim, Bike, Run Pace Calculator",
  description = "Free triathlon time calculator. Calculate your swim pace (300m-3800m), bike speed (20-180km), and running pace (5-42km). Perfect for Sprint, Olympic, Half Ironman, and Ironman distances.",
  keywords = "triathlon calculator, swim pace calculator, bike speed calculator, running pace calculator, triathlon training, ironman calculator",
  author = "Triathlon Calculator",
  image = "https://triathloncalculator.guru/og-image.jpg",
  url = "https://triathloncalculator.guru"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#2563eb" />
    </Helmet>
  );
};

export default SEO;
