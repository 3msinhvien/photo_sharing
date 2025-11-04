import React from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId} = useParams();
    const user = models.userModel(userId);
    
    if (!user) {
        return <Typography variant="h6">User not found</Typography>;
    }
    
    return (
        <div className="user-detail-container">
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {user.first_name} {user.last_name}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <strong>Location:</strong> {user.location}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <strong>Description:</strong> {user.description}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <strong>Occupation:</strong> {user.occupation}
                    </Typography>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to={`/photos/${userId}`}
                    >
                        View Photos
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
