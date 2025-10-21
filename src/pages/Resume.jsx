import { Download, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
const SAFE_URL = 'https://www.philintheblank.cloud/PChristensen_Resume.pdf'

async function downloadPdf(url, filename) {
        const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  // Guard: make sure we didn't get index.html
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("pdf")) {
    // Optionally read a bit to log/debug:
    const textHead = await res.clone().text();
    console.error("Expected a PDF, got:", ct, textHead.slice(0, 200));
    throw new Error("Server returned a non-PDF response.");
  }

  const blob = await res.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename ?? (url.split("/").pop() || "download.pdf");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(objectUrl);
    }

export function Resume({positions}) {
    const [busy, setBusy] = useState(false);
    
    const clickFuntion = async () => {
        try {
      setBusy(true);
      await downloadPdf(SAFE_URL, "Philip_Christensen_Resume.pdf");
    } catch (e) {
      console.error(e);
      // (optional) toast/snackbar here
      alert("Sorry—couldn’t download the resume. Please try again.");
    } finally {
      setBusy(false);
    }
    }



    return (
        <>
        <h1>Resume</h1>
        <Button
            variant="contained"
            startIcon={<Download/>}
            onClick={clickFuntion}
            disabled={busy}

        >Download PDF</Button>
        <div className="m-4"></div>
        {positions.map((position) => (
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                >
                    <Typography variant="p" component="h3" className="w-full">
                        <div className="flex justify-content-between">
                            <span>{position.title}</span> <span>{position.time}</span>
                        </div>
                    </Typography>
                    
                </AccordionSummary>
                <AccordionDetails
      sx={{
        textAlign: 'left',                             // keep text left
        '& ul': {
          listStyleType: 'disc',
          listStylePosition: 'outside',
          paddingInlineStart: '1.25rem',               // standard logical prop
          WebkitPaddingStart: '1.25rem',               // iOS Safari quirk
          margin: 0,
        },
        '& ul > li': { display: 'list-item' },         // re-enable markers if reset
      }}
    >
      <ul>
        {position.details.map((b, j) => (
          <li key={j}>{b}</li>
        ))}
      </ul>
    </AccordionDetails>
            </Accordion>
        ))}
        
        </>
    )
}