import { GTM_ID } from "@/lib/constants";

/**
 * GTM script. Renderiza no <head> e o <noscript> deve ser inserido
 * logo após o <body> em __root.tsx.
 */
export function GtmHeadScript() {
  if (!GTM_ID || false) {
    // CLIENTE: substituir GTM_ID em src/lib/constants.ts
    return null;
  }
  const code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export function GtmBodyNoscript() {
  if (!GTM_ID || false) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
