import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
const SAFE_URL = 'https://www.philintheblank.cloud/PChristensen_Resume.pdf'

async function downloadPdf(url, filename) {
        const a = document.createElement("a");
        a.href = url;
        a.setAttribute("download", filename); // may be ignored by server headers
        a.hidden = true;
        a.style.position = "fixed";
        a.style.left = "-9999px";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

export function Resume() {
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
            loading={busy}
        >Download PDF</Button>
        </>
    )
}