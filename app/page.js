"use client";
import {useMemo,useState} from "react";
import { upload } from "@vercel/blob/client";

const PRICE=150;
const WA="37361272220";

function sameDayStatus(){
  const parts=new Intl.DateTimeFormat("ro-RO",{timeZone:"Europe/Chisinau",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
  const h=Number(parts.find(p=>p.type==="hour")?.value||0);
  const m=Number(parts.find(p=>p.type==="minute")?.value||0);
  return h<11 || (h===11&&m===0);
}

export default function Home(){
 const [qty,setQty]=useState(1);
 const [name,setName]=useState("");
 const [phone,setPhone]=useState("");
 const [delivery,setDelivery]=useState("Ridicare în Chișinău");
 const [note,setNote]=useState("");
 const [file,setFile]=useState(null);
 const [uploading,setUploading]=useState(false);
 const [uploadError,setUploadError]=useState("");
 const today=useMemo(()=>sameDayStatus(),[]);
 const total=qty*PRICE;
 async function order(){
   if(uploading)return;
   if(!file){setUploadError("Selectează fișierul înainte de trimitere.");return;}
   setUploading(true);setUploadError("");
   let fileUrl;
   try {
     const safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
     const result=await upload(`comenzi/${Date.now()}-${safeName}`,file,{access:"public",handleUploadUrl:"/api/upload"});
     fileUrl=result.url;
   }catch(error){setUploadError("Fișierul nu a fost încărcat. Încearcă din nou. "+(error?.message||""));setUploading(false);return;}
   setUploading(false);
   const msg=[
    "Salut! Vreau să comand print DTF.",
    `Client: ${name||"-"}`,
    `Telefon: ${phone||"-"}`,
    `Cantitate: ${qty} coală/coli 28 × 50 cm`,
    `Total: ${total} MDL`,
    `Livrare: ${delivery}`,
    `Fișier: ${file.name}`,
    `Link fișier: ${fileUrl}`,
    note?`Notă: ${note}`:""
   ].filter(Boolean).join("\n");
   window.location.href=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
 }
 return <main>
  <header className="nav"><a className="brand" href="#">DTF <span>Moldova</span></a><nav><a href="#pret">Prețuri</a><a href="#galerie">Galerie</a><a href="#cum">Cum funcționează</a><a className="mini" href="#comanda">Comandă</a></nav></header>
  <section className="hero">
   <div className="heroCopy"><div className="eyebrow">PRINT DTF • CHIȘINĂU + TOATĂ MOLDOVA</div><h1>Print DTF<br/><em>în aceeași zi.</em></h1><p>Pentru ateliere și branduri. Trimite fișierul până la <b>11:00</b> și imprimăm azi.</p><div className="heroActions"><a className="primary" href="#comanda">Încarcă fișierul →</a><a className="secondary" href="#pret">Vezi prețurile</a></div><div className="facts"><b>150 MDL <small>/ coală</small></b><b>28 × 50 cm</b><b>Livrare în Moldova</b></div></div>
   <div className="visual"><div className="photoFrame"><img src="https://images.unsplash.com/photo-1773525912465-47cf1050dd47?auto=format&fit=crop&w=1000&q=85" alt="Tricouri colorate într-un atelier de personalizare" /><div className="photoTint"></div><span className="photoIndex">01 / PRINT CULTURE</span></div><div className="floatingBadge"><span>DTF</span><strong>28 × 50</strong><small>CM / COALĂ</small></div><div className="tag">PENTRU CEI CARE CREEAZĂ ↗</div></div>
  </section>

  <div className="ticker" aria-label="Print DTF rapid"><div>PRINT DTF <span>✳</span> CULORI PUTERNICE <span>✳</span> 150 MDL / COALĂ <span>✳</span> LIVRARE ÎN MOLDOVA <span>✳</span> PRINT DTF <span>✳</span> CULORI PUTERNICE <span>✳</span> 150 MDL / COALĂ <span>✳</span> LIVRARE ÎN MOLDOVA <span>✳</span></div></div>
  <section id="comanda" className="orderSec">
   <div className="sectionIntro"><span>01 / COMANDĂ RAPIDĂ</span><h2>Trimite designul.<br/>Noi îl imprimăm.</h2><p className={today?"status good":"status"}>{today?"● Comenzile trimise acum pot fi imprimate azi":"● Termenul de 11:00 a trecut — confirmăm următorul termen pe WhatsApp"}</p></div>
   <div className="orderCard">
    <label className="drop"><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)}/><strong>{file?file.name:"Alege fișierul pentru print"}</strong><span>{file?"Fișier pregătit pentru încărcare automată":"Click pentru selectare • fișierul se încarcă la trimiterea comenzii"}</span></label>
    <div className="grid2"><label>Nume / companie<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex. Atelier Studio"/></label><label>Telefon<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+373 ..."/></label></div>
    <div className="grid2"><label>Cantitate<div className="step"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(qty+1)}>+</button></div></label><label>Primire<select value={delivery} onChange={e=>setDelivery(e.target.value)}><option>Ridicare în Chișinău</option><option>Livrare în Moldova</option></select></label></div>
    <label>Notă (opțional)<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Detalii despre comandă"/></label>
    <div className="total"><span>Total</span><strong>{total} MDL</strong></div>
    <button className="send" onClick={order} disabled={uploading}>{uploading?"Se încarcă fișierul...":"Încarcă fișierul și trimite comanda →"}</button>{uploadError&&<p role="alert" style={{color:"#b42318",fontWeight:700}}>{uploadError}</p>}
    <p className="fine">Fișierul este salvat în Vercel Blob înainte să se deschidă WhatsApp. Mesajul include linkul. Confirmă trimiterea mesajului în WhatsApp pentru finalizarea comenzii.</p>
   </div>
  </section>

  <section className="benefits"><article><b>01</b><h3>În aceeași zi</h3><p>Trimite fișierul până la 11:00. Dacă este pregătit pentru print, îl imprimăm azi.</p></article><article><b>02</b><h3>Preț transparent</h3><p>150 MDL pentru fiecare coală 28 × 50 cm. Fără calcule complicate.</p></article><article><b>03</b><h3>Creat pentru B2B</h3><p>Noi imprimăm transferurile. Tu te ocupi de personalizarea produselor.</p></article></section>

  <section className="gallery" id="galerie"><div className="galleryHead"><div><span>MADE FOR MAKERS / 2026</span><h2>Ideile tale.<br/><em>În culori reale.</em></h2></div><p>De la design la transfer. Imprimăm pentru ateliere care au nevoie de ritm, culoare și consistență.</p></div><div className="galleryGrid"><div className="galleryItem galleryLarge"><img loading="lazy" src="https://images.unsplash.com/photo-1773525912465-47cf1050dd47?auto=format&fit=crop&w=1200&q=85" alt="Tricouri cu designuri colorate" /><span>01 — CREATIVE WORKSHOP</span></div><div className="galleryItem gallerySmall"><img loading="lazy" src="https://images.unsplash.com/photo-1771098206944-ac1633b8276d?auto=format&fit=crop&w=900&q=85" alt="Textile colorate în tonuri intense" /><span>02 — COLOR STUDY</span></div><div className="galleryStatement"><div className="asterisk">✳</div><strong>PRINT<br/>FAST.<br/><i>CREATE</i><br/>MORE.</strong><a href="#comanda">COMANDĂ ACUM ↗</a></div></div><p className="galleryDisclaimer">Imagini de atmosferă ilustrative; nu reprezintă fotografii ale producției DTF Moldova.</p></section>
  <section id="cum" className="how"><div><span>02 / CUM FUNCȚIONEAZĂ</span><h2>De la fișier<br/>la transfer.</h2></div><ol><li><i>1</i><div><b>Încarci designul</b><p>Completezi cantitatea și datele comenzii.</p></div></li><li><i>2</i><div><b>Confirmăm comanda</b><p>Verificăm detaliile împreună pe WhatsApp.</p></div></li><li><i>3</i><div><b>Imprimăm</b><p>Comenzile eligibile până la 11:00 — în aceeași zi.</p></div></li><li><i>4</i><div><b>Ridici sau primești</b><p>Chișinău sau livrare în toată Moldova.</p></div></li></ol></section>

  <section id="pret" className="pricing"><span>03 / PREȚURI</span><h2>Prețuri simple,<br/><em>fără calcule ascunse.</em></h2><div className="priceRow"><div><small>COALĂ DTF</small><strong>28 × 50 cm</strong></div><div className="big">150 <small>MDL</small></div></div><div className="examples"><span>1 coală <b>150 MDL</b></span><span>5 coli <b>750 MDL</b></span><span>10 coli <b>1 500 MDL</b></span></div></section>

  <section className="faq"><span>04 / ÎNTREBĂRI</span><h2>Pe scurt.</h2><details><summary>Pot comanda o singură coală?</summary><p>Da. Comanda minimă este 1 coală — 150 MDL.</p></details><details><summary>Cât durează imprimarea?</summary><p>Dacă trimiți comanda până la 11:00 și fișierul este pregătit pentru print, imprimăm în aceeași zi.</p></details><details><summary>Aplicați DTF pe haine?</summary><p>Nu. Serviciul nostru este exclusiv imprimarea transferurilor DTF.</p></details><details><summary>Livrați în afara Chișinăului?</summary><p>Da, livrăm în toată Moldova.</p></details></section>

  <section className="final"><p>AI COMENZI DE PERSONALIZARE?</p><h2>Noi îți imprimăm <em>DTF-ul.</em></h2><a href="#comanda">Trimite designul →</a></section>
  <footer><b>DTF Moldova</b><span>Print DTF pentru ateliere și branduri.</span><span>© 2026 DTF Moldova</span></footer>
 </main>
}