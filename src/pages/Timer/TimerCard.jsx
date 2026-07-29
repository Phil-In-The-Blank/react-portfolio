import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import './TimerCard.css';

export function TimerCard() {

const now = new Date()







    return(
    <>
        <Card className="card-width">
            <CardContent>
                <Typography variant="h5" component="div">
                    Task Title Here
                </Typography>
                <CircularProgress variant="determinate" value={66}>

                </CircularProgress>
                <Typography variant="p" component="div">
                    Task has been active for:
                </Typography>

                <Typography variant="p" component="div">
                    {now.toLocaleTimeString()}
                </Typography>
            </CardContent>
        </Card>    
    </>
    )
}