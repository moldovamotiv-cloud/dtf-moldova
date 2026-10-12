import "./globals.css";

const siteUrl="https://dtf-moldova.vercel.app";

export const metadata={
  metadataBase:new URL(siteUrl),
  title:{default:"Print DTF Chișinău și Moldova | DTF Moldova",template:"%s | DTF Moldova"},
  description:"Print DTF în Chișinău pentru ateliere și branduri. Coală 28 × 50 cm de la 110 MDL. Fișierele PDF gata de print trimise până la 11:00 pot fi imprimate în aceeași zi.",
  keywords:["print DTF Chișinău","print DTF Moldova","imprimare DTF","transfer DTF","print DTF textile","DTF 28x50"],
  alternates:{canonical:"/"},
  openGraph:{
    title:"Print DTF Chișinău și Moldova | DTF Moldova",
    description:"Transferuri DTF pentru ateliere și branduri. 28 × 50 cm, reduceri la cantitate și imprimare în aceeași zi pentru comenzile eligibile.",
    url:siteUrl,siteName:"DTF Moldova",locale:"ro_MD",type:"website"
  },
  twitter:{card:"summary_large_image",title:"Print DTF Chișinău și Moldova | DTF Moldova",description:"Transferuri DTF 28 × 50 cm pentru ateliere și branduri din Moldova."},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}}
};

const structuredData={
  "@context":"https://schema.org",
  "@type":"ProfessionalService",
  name:"DTF Moldova",
  url:siteUrl,
  telephone:"+37361272220",
  description:"Serviciu de imprimare transferuri DTF pentru ateliere și branduri din Chișinău și Republica Moldova.",
  areaServed:[{"@type":"City","name":"Chișinău"},{"@type":"Country","name":"Moldova"}],
  priceRange:"110–150 MDL / coală 28 × 50 cm",
  knowsAbout:["Print DTF","Transfer DTF","Imprimare pentru textile"]
};

export default function RootLayout({children}){
 return <html lang="ro"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} /></body></html>
}