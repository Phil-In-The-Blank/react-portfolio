import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
const SAFE_URL = 'https://www.philintheblank.cloud/PChristensen_Resume.pdf'

async function downloadPdf(req, res) {
        const upstream = "https://www.philintheblank.cloud/PChristensen_Resume.pdf";
        const r = await fetch(upstream);
        if (!r.ok) return res.status(r.status).end();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Cache-Control", "public, max-age=3600");
        // Optional: force download
        res.setHeader("Content-Disposition", 'attachment; filename="Philip_Christensen_Resume.pdf"');
        const buf = Buffer.from(await r.arrayBuffer());
        res.status(200).send(buf);
    }

export function Resume() {
    const [busy, setBusy] = useState(false);
    
    const clickFuntion = async () => {
        try {
      setBusy(true);
      await downloadPdf('/api/resume', "Philip_Christensen_Resume.pdf");
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