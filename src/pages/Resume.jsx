import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
const SAFE_URL = 'https://www.philintheblank.cloud/PChristensen_Resume.pdf'

async function downloadPdf(url, filename) {
        const res = await fetch(URL, {cache: "no-store"})
        if(!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a");
        a.href = objectUrl
        a.download = filename ?? url.split("/").pop() ?? "download";
        a.hidden = true
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
    }

export function Resume() {
    const [busy, setBusy] = useState(false);
    
    const clickFuntion = async () => {
        try {
      setBusy(true);
      await downloadPdf("/PChristensen_Resume.pdf", "Philip_Christensen_Resume.pdf");
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
            loading={busy}
        >Download PDF</Button>
        </>
    )
}