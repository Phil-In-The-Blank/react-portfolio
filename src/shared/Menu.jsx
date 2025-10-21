import { AppBar, Button, Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export function AppMenu({routes}) {
    const location = useLocation
    const isActive = (to) => (location.pathname === to ? "contained" : "text");

    return (
        <>
        <AppBar position="sticky" elevation={1} color="default">
            <Container className="flex justify-content-evenly">
            {routes.map((route) => (
                <Button
                    key={route.to}
                    component={Link}
                    to={route.to}
                    variant={isActive(route.to)}
                >
                    {route.label}
                </Button>
            ))}
            
            </Container>
        </AppBar>
        </>
    )
}